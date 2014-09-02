class CompletedController < ApplicationController
  def index
    todos = Todo.where(completed: true)
    render json: todos
  end
end