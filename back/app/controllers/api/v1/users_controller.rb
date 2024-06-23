class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate, only: [:create]

  def show
    render json: UserSerializer.new(current_user).serializable_hash.to_json, status: :ok
  end

  def create
    @current_user = User.find_by(email: user_params[:email])

    if @current_user.nil?
      @current_user = User.new(user_params)
      @current_user.uid = SecureRandom.uuid
      @current_user.save!
    end

    payload = { user_id: @current_user.id, exp: 24.hours.from_now.to_i }
    encoded_token = encode_jwt(payload)

    render json: { user: @current_user, accessToken: encoded_token, status: :ok }
  rescue => e
    render json: { error: "ログインに失敗しました: #{e.message}" }, status: :internal_server_error
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :image)
    end

    def encode_jwt(payload)
      JWT.encode(payload, Rails.application.secret_key_base, "HS256")
    end
end
