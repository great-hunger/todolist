var todo = [];
var ul = document.querySelector('#todo');
var ul1 = document.querySelector('#Done');
if (localStorage.getItem('todolist') != null) {
    todo = JSON.parse(localStorage.getItem('todolist'));
}
var input = document.querySelector('#_input');
input.addEventListener('keydown', function (event) {
    if (event.key == "Enter") {
        var text = {
            "name": input.value,
            "state": false
        }
        todo.push(text);
        update(todo);
        input.value = '';
    }
});
document.getElementById('delete').onclick = function () {
    localStorage.clear();
    ul.innerHTML = "";
    todo.splice(0, todo.length);
}
document.getElementById('delete1').onclick = function () {
    ul1.innerHTML = "";
}
function update(todo) {
    localStorage.setItem('todolist', JSON.stringify(todo));
    var data = JSON.parse(localStorage.getItem('todolist'));
    ul.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        if (!data[i].state) {
            var li = document.createElement('li');
            li.innerHTML = "<input type='checkbox' onchange='javascript:change(" + i + ",\"state\",true" + ")'></input>" + data[i].name + "<a href='javascript:remove(" + i + ")'>删除</a>";
            li.className = "todo_list";
            ul.appendChild(li);
        }
        else {
            var li1 = document.createElement('li');
            li1.innerHTML = '<input type="checkbox" checked="checked" disabled="disabled"></input>' + data[i].name;
            li1.className = "done_list";
            ul1.appendChild(li1);
            todo.splice(i, 1);
        }
    }
}
function remove(i) {
    var data = [];
    if (localStorage.getItem('todolist') != null) {
        data = JSON.parse(localStorage.getItem('todolist'));
    }
    data.splice(i, 1);
    todo.splice(i, 1);
    localStorage.setItem('todolist', JSON.stringify(todo));
    update(todo);
}
function change(i, state, value) {
    var data = [];
    if (localStorage.getItem('todolist') != null) {
        data = JSON.parse(localStorage.getItem('todolist'));
    }
    var changeItem = data.splice(i, 1)[0];
    todo.splice(i, 1);
    changeItem[state] = value;
    todo.splice(i, 0, changeItem);
    localStorage.setItem("todolist", JSON.stringify(todo));
    update(todo);
}