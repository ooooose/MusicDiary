Rails.application.routes.draw do
  if Rails.env.development?
    require 'sidekiq/web'
    mount Sidekiq::Web, at: '/sidekiq'
  end
  post 'auth/:provider/callback', to: 'api/v1/users#create'
  namespace :api, format: 'json' do
    namespace :v1 do
      resources :diaries, param: :uid, only: [:index, :show, :create, :update, :destroy] do
        collection do
          get 'date/:date', to: 'diaries#dairy_index', as: :date
        end
      end
      resources :tracks, only: %i[destroy]
    end
  end
end
