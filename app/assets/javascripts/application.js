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

  var body = $('body');


  var html  = "";
  html += "<h1>Todo.ly</h1>";
  html += "<input type='text' id='todo'/><br>";
  html += "<input type='submit' value='Create Todo' />";

  body.append(html);

  var button = $('button');

  button.one('click', function (e) {
    e.preventDefault();
    body.append("<h2>Todo!</h2>");
  });

  button.click(function (e) {
    e.preventDefault();
    var todo = $("#todo").val();
    body.append("<ul><li>" + todo + "</li></ul>");
    $('#todo').val("");
  });

  button.click(function () {
    $('h2').prepend("<span>Todo Created</span><br>");
    $('span').css("background", "green");
    $('span').fadeOut(5000)
  });

});

