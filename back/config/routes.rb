Rails.application.routes.draw do
  post 'auth/:provider/callback', to: 'api/v1/users#create'
  namespace :api, format: 'json' do
    namespace :v1 do
      resources :diaries, param: :uid, only: [:index, :show, :create, :update, :destroy] do
        collection do
          get 'date/:date', to: 'diaries#dairy_index', as: :date
          post ':uid/music', to: 'diaries#set_music'
        end
      end
    end
  end
end
