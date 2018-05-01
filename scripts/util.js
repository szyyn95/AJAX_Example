/* global  $ */
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(show_todos)
    .catch(function(err){
        alert(err);
    });
    
    // only when hit enter key
    $("#todoInput").keypress(function(event){
        if (event.which == 13){
            create_todo();
        }
    });
    
    // recall that span doesn't exist when page is loaded
    // append click listener on list first
    $(".list").on("click", "span", function(event){
        event.stopPropagation() //stop triggering click effct on the whole <li>
        //console.log($(this).parent().data("id"));
        remove_todo($(this).parent());
    });
    
    $(".list").on("click", "li", function(){
        toggle_todo($(this));
    });
});

function show_todos(todos){
    for (var todo of todos){
        add_todo(todo);
    }
}

function add_todo(todo){
    var newtodo = $("<li>" + todo.name + "<span>X</span></li>");
    newtodo.addClass('task');
    newtodo.data("id", todo._id);
    newtodo.data("completed", todo.completed);
    if (todo.completed){
        newtodo.addClass('done');
    }
    $('.list').append(newtodo);
}

function remove_todo(todo){
    var cur_id = todo.data("id");
    todo.remove();
    $.ajax({
        method: "DELETE",
        url: "/api/todos/" + cur_id
    })
    .then(function(data){
        console.log(data);
    });
}

function create_todo(){
    var user_input = $("#todoInput").val();
    $.post("/api/todos", {name: user_input})
    .then(function(newtodo){
        $("#todoInput").val("");
        add_todo(newtodo);
    })
    .catch(function(err){
        alert(err);
    });
}

function toggle_todo(todo){
    //console.log(todo.data("completed"));
    var cur_id = todo.data("id");
    var cur_status = todo.data("completed");
    $.ajax({
        method: "PUT",
        url: "/api/todos/" + cur_id,
        data: {completed: !cur_status}
    })
    .then(function(updated_todo){
        todo.toggleClass("done");
        todo.data("completed", !cur_status);
    });
}