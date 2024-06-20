class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate, only: [:create]

  def create
    @current_user = User.find_or_create_by!(user_params)

    payload = { user_id: @current_user.id, exp: 24.hours.from_now.to_i }
    encoded_token = encode_jwt(payload)

    render json: { user: @current_user, accessToken: encoded_token, status: :ok }
  rescue StandardError => e
    render json: { error: "ログインに失敗しました: #{e.message}" }, status: :internal_server_error
  end

  private

    def user_params
      params.require(:user).permit(:name, :email)
    end

    def encode_jwt(payload)
      JWT.encode(payload, Rails.application.secret_key_base, 'HS256')
    end
end
