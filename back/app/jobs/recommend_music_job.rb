class RecommendMusicJob < ApplicationJob
  queue_as :default

  def perform(diary_id, user_id)
    @diary = Diary.find(diary_id)
    service = Openai::ChatResponseService.new
    response = service.call(@diary.body)
    recommendations = fetch_recommendations(response)

    track = build_track_from_recommendations(recommendations)
    if track.save
      broadcast_recommendation(track, user_id)
    else
      handle_error(ActiveRecord::RecordInvalid.new(track), user_id)
    end
  rescue => e
    handle_error(e, user_id)
  end

  private

  def fetch_recommendations(response)
    Spotify::RequestRecommendationService.new(response).request
  end

  def build_track_from_recommendations(recommendations)
    @diary.tracks.build(
      spotify_id: recommendations.id,
      title: recommendations.name,
      artist: recommendations.artists[0].name,
      image: recommendations.album.images[0]["url"]
    )
  end

  def broadcast_recommendation(track, user_id)
    ActionCable.server.broadcast "track_channel_#{user_id}", TrackSerializer.new(track).serializable_hash
  end

  def handle_error(error, user_id)
    Rails.logger.error(error.message)
    error_message = case error
                    when ActiveRecord::RecordInvalid
                      "データベースの更新に失敗しました。"
                    when Openai::TimeoutError, Openai::UnauthorizedError,
                        Openai::ServiceUnavailableError, Openai::TooManyRequestsError,
                        Openai::InternalServerError
                      "APIの呼び出しに失敗しました。"
                    else
                      "予期せぬエラーが発生しました。"
                    end
    ActionCable.server.broadcast "track_channel_#{user_id}", { error: error_message }
  end
end