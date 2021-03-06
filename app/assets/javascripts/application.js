// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function () {

// Create form
  var body = $('body');

  var html = "";
  html += "<h1>Todo.ly</h1>";
  html += "<input type='text' id='todo'/><br>";
  html += "<input type='submit' class='button' value='Create Todo'/>";

  body.append(html);


//Todos from database are visible
  var previousTodos = $.getJSON('/todos');

  previousTodos.success(function () {
    var listitems = previousTodos.responseJSON;
    $('#todosUl').remove();
    $('#todoHeader').remove();
    if (listitems.length > 0) {
      body.append("<h2 id='todoHeader'>Todo!</h2><ul id='todosUl'></ul>");
    }
    $.each(listitems, function () {
      $('#todosUl').append("<li class='todos' data-todo-id='" + this.id + "'>" + this.todo + "<p id='delete'>&#x2717;</p><p id='openComplete'>&#10003;</p></li>");
    });
  });


// Create list and list items
  var button = $('.button');

  button.one('click', function (e) {
    e.preventDefault();
  });

  button.click(function (e) {
    e.preventDefault();
    var todo = $("#todo").val();

    $.ajax({
      type: 'POST',
      url: '/todos',
      data: { todo: { todo: todo }}
    });
    var previousTodos = $.getJSON('/todos');

    previousTodos.success(function () {
      var listitems = previousTodos.responseJSON;
      $('#todosUl').remove();
      $('#todoHeader').remove();
      if (listitems.length > 0) {
        body.append("<h2 id='todoHeader'>Todo!</h2><ul id='todosUl'></ul>");
      }
      $.each(listitems, function () {
        $('#todosUl').append("<li class='todos' data-todo-id='" + this.id + "'>" + this.todo + "<p id='delete'>&#x2717;</p><p id='openComplete'>&#10003;</p></li>");
      });
    });
    $('#todo').val("");
    $('ul').css({"padding": "0"});
  });


// Delete list items
  body.on('click', '#delete', function () {
    var el = document.querySelector('.todos');

    $.ajax({
      type: 'POST',
      url: '/todos/' + el.dataset.todoId,
      data: { "_method": "delete"}
    });

    var li = $(this).parent('.todos');
    li.remove();
  });

// Flash message for creating
  button.click(function () {
    $('#createFlash').remove();
    $('#deleteFlash').remove();
    $('#completeFlash').remove();
    $('#todosUl').before("<div id='createFlash'>Todo Created<p id='closeCreate'>&#x2717;</p></div>");
    $('#closeCreate').css({"color": "black", "display": "inline", "margin-right": "-31%", "margin-left": "24%"});
    $('#createFlash').fadeOut(5000, function () {
      $(this).remove();
    })
  });

  body.on('click', '#closeCreate', function () {
    $('#createFlash').remove();
  });

// Flash message for deleting
  body.on('click', '#delete', function () {
    $('#deleteFlash').remove();
    $('#createFlash').remove();
    $('#completeFlash').remove();
    $('#todosUl').before("<div id='deleteFlash'>Todo deleted<p id='closeDelete'>&#x2717;</p></div>");
    $('#closeDelete').css({"color": "black", "display": "inline", "margin-right": "-31%", "margin-left": "24%"});
    $('#deleteFlash').fadeOut(5000, function () {
      $(this).remove();
    })
  });

  body.on('click', '#closeDelete', function () {
    $('#deleteFlash').remove();
  });

// Complete tasks and add to completed list
  body.one('click', '#openComplete', function () {
    $('#todosUl').after("<h2 id='completeHeader'>Completed</h2><ul id='complete'></ul>");
  });
  body.on('click', '#openComplete', function () {

    var el = document.querySelector('.todos');

    $.ajax({
      type: 'POST',
      url: '/todos/' + el.dataset.todoId,
      data: { "_method": "patch"}
    });
  });


  body.on('click', '#openComplete', function () {
    $('#completeHeader').show();
    var todoItem = $(this).parent('.todos');
    $('#delete').remove();
    $('#openComplete').remove();
    todoItem.append("");
    $('#complete').append(todoItem);
  });

//Completed todos are visible on reload
  var allCompleted = $.getJSON('/completed');
  allCompleted.success(function () {
    var completedItems = allCompleted.responseJSON;
    $('#completeHeader').remove();
    if (completedItems.length > 0) {
    $('body').append("<h2 id='completeHeader'>Completed</h2><ul id='complete'></ul>");
    }
    $.each(completedItems, function(){
      $('#complete').append("<li class='todos' data-todo-id='" + this.id + "'>" + this.todo + "<p id='deleteCompleted'>&#x2717;</p><p id='undo'>undo</p>")
    })
  });

// Flash message for completed task
  body.on('click', '#openComplete', function () {
    $('#deleteFlash').remove();
    $('#createFlash').remove();
    $('#completeFlash').remove();
    $('#complete').before("<div id='completeFlash'>Todo completed<p id='closeComplete'>&#x2717;</p></div>")
    $('#completeFlash').fadeOut(5000, function () {
      $(this).remove();
    })
  });

  body.on('click', '#closeComplete', function () {
    $('#completeFlash').remove();
  });

// User can delete completed items
  body.on('click', '#deleteCompleted', function () {
    var liComplete = $(this).parent('.todos');
    liComplete.remove();
  });

// Undo moves completed items back
  body.on('click', '#undo', function () {
    $('#completeFlash').remove();
    var completedItem = $(this).parent('.todos');
    var undobutton = completedItem.children();
    undobutton.remove();
    $('#todosUl').append(completedItem);
    completedItem.append("<p id='delete'>&#x2717;</p><p id='openComplete'>&#10003;</p>");
  });

// Completed section disappears when there are no completed tasks
  body.on('click', '#undo', function () {
    if ($('#complete').has('li').length === 0) {
      $('#completeHeader').hide();
    }
  });

  body.on('click', '#deleteCompleted', function () {
    if ($('#complete').has('li').length === 0) {
      $('#completeHeader').hide();
    }
  });
});

