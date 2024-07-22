class Api::V1::TracksController < ApplicationController
  before_action :set_track, only: %i[destroy]

  # DELETE /tracks/{id}
  def destroy
    @track.destroy!
  rescue ActiveRecord::RecordNotDestroyed => e
    render json: { error: e.message }, status: :unprocessable_entity
  else
    render json: { message: "楽曲の削除に成功しました" }, status: :ok
  end

  private

    def set_track
      @track = Track.find(params[:id])
    end
end
