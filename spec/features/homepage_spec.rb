require 'rails_helper'

describe "viewing the homepage" do
  it "shows rails and js rendered text" do
    visit root_path

    expect(page).to have_content('Todo.ly')
    fill_in 'todo', with: 'haircut'
    click_on 'Create Todo'
  end
end