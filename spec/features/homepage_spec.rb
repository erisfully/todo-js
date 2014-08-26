require 'rails_helper'

describe "viewing the homepage" do
  it "shows rails and js rendered text" do
    visit root_path

    expect(page).to have_content('Todo.ly')
    fill_in 'todo', with: 'haircut'
    click_on 'Create Todo'

    expect(page).to have_content 'Todo!'
    expect(page).to have_content 'haircut'
    expect(page).to have_content 'Todo Created'

    page.find('#closeCreate').click
    expect(page).to_not have_content 'Todo Created'

    page.find('#delete').click
    expect(page).to_not have_content 'haircut'
    expect(page).to have_content 'Todo deleted'

    page.find('#closeDelete').click
    expect(page).to_not have_content 'Todo deleted'

    fill_in 'todo', with: 'haircut'
    click_on 'Create Todo'

    page.find('#openComplete').click
    expect(page).to have_content 'Todo completed'
    page.find('#closeComplete').click
    expect(page).to have_content 'Completed haircut'

    page.find('#deleteCompleted').click
    expect(page).to_not have_content 'haircut'

    fill_in 'todo', with: 'haircut'
    click_on 'Create Todo'
    page.find('#openComplete').click
    page.find('#undo').click
    expect(page).to have_content 'Todo! haircut'
  end
end
