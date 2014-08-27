Rails.application.routes.draw do
  root :to => "home#show"

  get '/todos' => "todos#index"
  post '/todos' => "todos#create"
end
