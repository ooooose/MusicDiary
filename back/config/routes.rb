Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    omniauth_callbacks: 'omniauth_callbacks'
  }
  namespace :api, format: 'json' do
    namespace :v1 do
      resources :diaries
    end
  end
end
