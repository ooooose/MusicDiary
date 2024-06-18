Rails.application.routes.draw do
  post 'auth/:provider/callback', to: 'api/v1/users#create'
  namespace :api, format: 'json' do
    namespace :v1 do
      resources :diaries
    end
  end
end
