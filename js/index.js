let todoItems = [];

let currentChange;

function renderTodo(todo) {
    const list = document.querySelector('.flex-row-list');
  
    const isChecked = todo.checked ? 'card-item-checked': '';
    const node = document.createElement("div");
    node.setAttribute('class', `card`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `<p class="card-heading">${todo.heading}</p>
    <hr>
    <ul style="list-style-type:none;">
    </ul>
    <p class = 'btn-add' style="display: inline;" onclick="toggleAddItem(this)"><i class="fa fa-plus-circle"></i></p>
    <button class='btn-completed' onclick="removeToDo(this)">Completed</button> 
    `;
    // <p class="card-heading">Trip To Paris</p>
    // <hr>
    // <ul style="list-style-type:none;">
    //     <li class="card-item card-item-checked">Completed Task </li>
    //     <li class="card-item">Pending Task <i class="fa fa-check" aria-hidden="true" onclick="markCompleted(this)"></i></li>
    // </ul>  
    //     <p class = 'btn-add' style="display: inline;" onclick="toggleAddItem(this)"><i class="fa fa-plus-circle"></i></p>
    //     <button class='btn-completed' onclick="removeToDo(this)">Completed</button>
    
    
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
  
    // console.log(list[5]);
    list.append(node);
  }

  function removeToDo(element) {
    let tempElement = element.parentNode;
    tempElement.parentNode.removeChild(tempElement);
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
