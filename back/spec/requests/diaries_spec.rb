require "rails_helper"

RSpec.describe "Diaries", type: :request do
  let!(:user) { create(:user) }
  let!(:token) { encode_jwt({ user_id: user.id }) }
  let!(:headers) { { Authorization: "Bearer #{token}" } }

  describe "GET /api/v1/diaries" do
    context "when the user does not have any diaries" do
      before { get api_v1_diaries_path, headers: }

      it "returns status ok" do
        expect(response).to have_http_status(:ok)
      end

      it "returns no diaries" do
        expect(JSON.parse(response.body)["data"].length).to eq(0)
      end
    end

    context "when the user has diaries" do
      before do
        create_list(:diary, 3, user:)
        get api_v1_diaries_path, headers:
      end

      it "returns status ok" do
        expect(response).to have_http_status(:ok)
      end

      it "returns diaries" do
        expect(JSON.parse(response.body)["data"].length).to eq(3)
      end
    end

    context "when unauthenticated" do
      before { get api_v1_diaries_path }

      it "returns unauthorized status" do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /api/v1/diaries" do
    context "when authenticated" do
      context "when params are valid" do
        before { post api_v1_diaries_path, params: { diary: { body: "test", uid: user.uid } }, headers: }

        it "creates an diary and returns status created" do
          expect(response).to have_http_status(:created)
        end

        it "returns the created diary body" do
          expect(JSON.parse(response.body)["body"]).to eq("test")
        end

        it "returns the created diary user_id" do
          expect(JSON.parse(response.body)["user_id"]).to eq(user.id)
        end
      end

      context "when params are invalid" do
        it "returns errors without body" do
          post(api_v1_diaries_path, params: { diary: { body: nil, uid: user.uid } }, headers:)
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it "returns errors without user_id" do
          post(api_v1_diaries_path, params: { diary: { body: "test", uid: nil } }, headers:)
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context "when unauthenticated" do
      it "returns unauthorized status" do
        post(api_v1_diaries_path, params: { diary: { body: "test", uid: user.uid } }, headers: {})
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "GET /api/v1/diaries/:uid" do
    let!(:diary) { create(:diary, body: "test", user:) }

    context "when authenticated" do
      before do
        get api_v1_diary_path(diary.uid), headers:
      end

      it "returns status ok" do
        expect(response).to have_http_status(:ok)
      end

      it "returns diaries" do
        expect(JSON.parse(response.body)["data"]["attributes"]["body"]).to eq("test")
      end
    end

    context "when unauthenticated" do
      before { get api_v1_diaries_path, headers: {} }

      it "returns unauthorized status" do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "PUT /api/v1/diaries/:uid" do
    let!(:diary) { create(:diary, body: "test", user:) }

    context "when authenticated" do
      before do
        put api_v1_diary_path(diary.uid), params: { diary: { body: "Edit body" } }, headers:
      end

      it "returns the updated diary for body" do
        expect(JSON.parse(response.body)["body"]).to eq("Edit body")
      end
    end

    context "when unauthenticated" do
      it "returns unauthorized status" do
        put api_v1_diary_path(diary.uid), params: { diary: { body: "Edit body" } }, headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
