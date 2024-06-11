class BaseController < ApplicationController
  include FirebaseAuth
  include Api::ExceptionHandler
  include ActionController::HttpAuthentication::Token::ControllerMethods
  before_action :authenticate

  def authenticate
    authenticate_with_http_token do |token, _options|
      result = verify_id_token(token)

      if result[:errors]
        render_error400(nil, result[:errors])
      else
        @_current_user = User.find_or_create_by!(result)
      end
    end
  end

  def current_user
    @_current_user
  end
end
