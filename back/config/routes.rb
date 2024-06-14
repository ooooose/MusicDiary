Rails.application.routes.draw do
  namespace :api, format: 'json' do
    namespace :v1 do
      post 'auth/google', to: 'auth#google_auth'
      resources :diaries
    end
  end
end
