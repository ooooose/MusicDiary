require "rspotify"

module Spotify
  class RequestRecommendationService
    def initialize(params)
      @limit = 1
      @genre = params["Genre"]
      @danceability = params["Danceability"]
      @valence = params["Valence"]
      @popularity = params["Popularity"]
      @acousticness = params["Acousticness"]
      @energy = params["Energy"]
      @instrumentalness = params["Instrumentalness"]
      @liveness = params["Liveness"]
      @speechiness = params["Speechiness"]
    end

    def request
      recommendations = RSpotify::Recommendations.generate(
        limit: @limit,
        seed_genres: [@genre],
        target_danceability: @danceability,
        target_valence: @valence,
        target_popularity: @popularity,
        target_acousticness: @acousticness,
        target_energy: @energy,
        target_instrumentalness: @instrumentalness,
        target_liveness: @liveness,
        target_speechiness: @speechiness
      )
      recommendations.tracks[0]
    end
  end
end
