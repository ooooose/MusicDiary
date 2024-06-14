class Api::V1::AuthController < ApplicationController
  skip_before_action :authenticate_user!

  def google_auth
    token = request.headers['Authorization'].split(' ').last
    payload = JWT.decode(token, Rails.application.credentials.devise[:jwt_secret_key], true, algorithm: 'HS256')[0]

    user = User.find_or_create_by(email: payload['email']) do |user|
      user.name = payload['name']
      user.uid = payload['sub']
      user.image = payload['picture'] if payload['picture']
    end

    if user.persisted?
      render json: { user: user }, status: :ok
    else
      render json: { error: 'Unable to create user' }, status: :unprocessable_entity
    end
  end
end
