require 'rails_helper'

RSpec.describe "Diaries", type: :request do
  let!(:user) { create(:user) }
  let!(:token) { encode_jwt({ user_id: user.id }) }
  let!(:headers) { { Authorization: "Bearer #{token}" } }

  describe 'GET /api/v1/diaries' do
    context 'when the user does not have any diaries' do
      it 'returns nil' do
        get(api_v1_diaries_path, headers:)
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['data'].length).to eq(0)
      end
    end

    context 'when the user has diaries' do
      it 'returns diaries' do
        create_list(:diary, 3, user:)
        binding.pry

        get(api_v1_diaries_path, headers:)
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['data'].length).to eq(3)
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        get api_v1_diaries_path
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
