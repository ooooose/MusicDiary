require 'rails_helper'

RSpec.describe "Api::V1::Tracks", type: :request do
  let!(:user) { create(:user) }
  let!(:token) { encode_jwt({ user_id: user.id }) }
  let!(:headers) { { Authorization: "Bearer #{token}" } }

  describe "DELETE /api/v1/tracks/:id" do
    let!(:diary) { create(:diary, body: "test", user:) }
    let!(:track) { create(:track, diary:) }

    context "when authenticated" do
      before do
        delete api_v1_track_path(track.id), headers:
      end

      it "return status ok" do
        expect(response).to have_http_status(:ok)
      end
    end

    context "when unauthenticated" do
      it "returns unauthorized status" do
        delete api_v1_track_path(diary.uid), headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
