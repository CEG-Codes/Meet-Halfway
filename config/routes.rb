Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

root to: "maps#index"
resources :maps
resources :users
resources :places
resources :favorites, only:[:create, :destroy]


delete "/maps" => "favorites#delete_fav", as: :delete_fav

post "/results" => "places#list_results"
get "/auth/:provider/callback" => "sessions#create"
get "signout" => "sessions#destroy", :as => :signout

end
