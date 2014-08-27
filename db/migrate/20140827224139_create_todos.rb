class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :todo
    end
  end
end
