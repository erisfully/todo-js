class TodosController < ApplicationController

  def index
    todos = Todo.all
    render json: todos
  end

  def create
    todo = Todo.create(todo: params['todo']['todo'])
    render json: todo
  end

  def destroy
    todo = Todo.find(params['id'])
    todo.destroy
    render json: todo
  end
end