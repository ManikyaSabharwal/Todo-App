let todoItems = [];

let currentChange;

function initialisation () {
console.log(todoItems.length);
  if(todoItems.length === 0) {
    console.log(document.getElementById('noTodo'))
    document.getElementById('noTodo').style.display = "block";
  } else {
    console.log('inside');
    document.getElementById('noTodo').style.display = "none";
  }
}

initialisation();

function renderTodo(todo) {
  initialisation();
    const list = document.querySelector('.flex-row-list');
  
    const isChecked = todo.checked ? 'card-item-checked': '';
    const node = document.createElement("div");
    node.setAttribute('class', `card`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `<p class="card-heading">${todo.heading}</p>
    <hr>
    <ul style="list-style-type:none;">
    </ul>
    <button class='btn-completed' onclick="removeToDo(this)">Completed</button> 
    <p class = 'btn-add' style="display: inline;" onclick="toggleAddItem(this)"><i class="fa fa-plus-circle"></i></p>
    
    `;
    
    console.log(node);
    list.append(node);
  }

  function markCompleted(element) {
    console.log(element.parentNode);
    element.parentNode.setAttribute('class', 'card-item card-item-checked');
    element. parentNode. removeChild(element);
  }
  

  function addTodo() {
    let heading = document.getElementById('listHeading').value;
    const todo = {
      heading,
      completed: false,
      subTask:[],
      id: Date.now(),
    };
  
    todoItems.push(todo);
    renderTodo(todo);
  }

  function addSubTodo() {
    let taskHeading = document.getElementById('subListHeading').value;
    let list = currentChange.parentNode.childNodes[4];
    console.log(currentChange.parentNode.childNodes);
    const node = document.createElement("li");
    node.setAttribute('class', `card-item`);
    node.setAttribute('data-key', Date.now());
    node.innerHTML = `${taskHeading}<i class="fa fa-check" aria-hidden="true" onclick="markCompleted(this)"></i>
    `;
  
    list.append(node);
  }

  function removeToDo(element) {
    let tempElement = element.parentNode;
    tempElement.parentNode.removeChild(tempElement);
    todoItems.pop();
    initialisation();
  }

function toggle() {
  var blur = document.getElementById("blur");
  blur.classList.toggle("active");

  var popup = document.getElementById("pop");
  popup.classList.toggle("active");
}

function toggleAddItem(item) {
  currentChange = item;
  var blur = document.getElementById("blur");
  blur.classList.toggle("active");

  var popup = document.getElementById("popAddItem");
  console.log(popup);

  popup.classList.toggle("active");
}
