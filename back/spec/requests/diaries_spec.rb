require 'rails_helper'

RSpec.describe "Diaries", type: :request do
  let!(:user) { create(:user) }
  let!(:token) { encode_jwt({ user_id: user.id }) }
  let!(:headers) { { Authorization: "Bearer #{token}" } }

  describe 'GET /api/v1/diaries' do
    context 'when the user does not have any diaries' do it 'returns nil' do get(api_v1_diaries_path, headers:)
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['data'].length).to eq(0)
      end
    end

    context 'when the user has diaries' do
      it 'returns diaries' do
        create_list(:diary, 3, user:)

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

  describe 'POST /api/v1/diaries' do
    context 'when authenticated' do
      context 'when params are valid' do
        it 'creates an diary' do
          post(api_v1_diaries_path, params: { diary: { body: 'test', uid: user.uid } }, headers:)
          expect(response).to have_http_status(:created)

          expect(JSON.parse(response.body)['body']).to eq('test')
          expect(JSON.parse(response.body)['user_id']).to eq(user.id)
        end
      end

      context 'when params are invalid' do
        it 'returns errors' do
          post(api_v1_diaries_path, params: { diary: { body: nil, uid: user.uid } }, headers:)
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
          post(api_v1_diaries_path, params: { diary: { body: 'test', uid: user.uid } }, headers: {})
          expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
