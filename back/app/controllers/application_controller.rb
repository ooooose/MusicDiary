class ApplicationController < ActionController::API
  before_action :authenticate

  def encode_jwt(payload)
    JWT.encode(payload, Rails.application.credentials.secret_key_base, "HS256")
  end

  attr_reader :current_user

  private

    def authenticate
      encoded_token = request.headers["Authorization"]&.split&.last
      @current_user = User.find_with_jwt(encoded_token) if encoded_token

      return if @current_user

      render json: { error: "認証に失敗しました" }, status: :unauthorized
    end
end
