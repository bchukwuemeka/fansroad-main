Rails.application.routes.draw do
  default_url_options :host => "localhost:3000"
  get "signed_in", to: "pages#signed_in"
  root 'pages#home'

  namespace :api do
    namespace :v1 do
      resources :sessions, only: [:create, :destroy]
      resources :registrations, only: [:create]
      resources :posts
      resources :comments
      resources :likes
      get "logged_in", to: "sessions#logged_in"
      post "likes", to: "likes#create"
      delete "likes/:id", to: "likes#destroy"
      delete "logout", to: "sessions#destroy"
      resources :users, only: [:index, :destroy]
      get "users/:username", to: "users#show"
      get "user/:id", to: "users#showWithId"
      get "posts/:id", to: "posts#show"
      patch "posts/:id", to: "posts#update"
      post '/omniauth/facebook/callback' => 'omniauths#redirect_callbacks'
      post '/omniauth/google/callback' => 'google_auths#redirect_callbacks'
      # devise_scope :user do
      #   post "sign_up", to: "registrations#create"
      #   post "sign_in", to: "sessions#create"
      # end
    end
  end

  # devise_for :users, :path_names => {
  #   :verify_authy => "/verify-token",
  #   :enable_authy => "/enable-two-factor",
  #   :verify_authy_installation => "/verify-installation",
  #   :authy_onetouch_status => "/onetouch-status"
  # }
  # devise_scope :user do
  #   #for a signed in user
  #   authenticated :user do
  #     root to: 'pages#home', as: :root
  #   end
  #   #for an unsigned in user
  #   unauthenticated do
  #     root to: 'devise/sessions#new', as: :unauthenticated_root
  #   end
  # end

  get '*path', to: 'pages#home', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
