let todoItems = [];

let currentChange;
let flag = true;

function initialisation () {
  if(flag) {
    document.getElementById('blur-2').style.display = "none";
    document.getElementById('blur').style.display = 'block';
  } else {
    document.getElementById('blur').style.display = 'none';
    document.getElementById('blur-2').style.display = "block";
  }
  if(todoItems.length === 0) {
    console.log(document.getElementById('noTodo'))
    console.log(todoItems);
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
    node.innerHTML = `<p class="card-heading" onclick="redirect(this)">${todo.heading}</p>
    <ul style="list-style-type:none;">
    </ul>
    <div class='footer'>
        <button class='btn-completed' onclick="removeToDo(this)"><i class="fa fa-trash" aria-hidden="true"></i></button> 
        <p class = 'btn-add' onclick="toggleAddItem(this)"><i class="fa fa-plus-circle"></i></p>
    </div>
    `;
    
    list.append(node);
  }

  function markCompleted(element) {
    element.parentNode.setAttribute('class', 'card-item card-item-checked');
    element. parentNode. removeChild(element);
  }
  

  function addTodo() {
    let heading = document.getElementById('listHeading').value;
    if(heading !== '') {
      const todo = {
        heading,
        completed: false,
        subTask:[],
        id: Date.now(),
      };
    
      todoItems.push(todo);
      renderTodo(todo);
      toggle();
    }
  }

  function addSubTodo() {
    let taskHeading = document.getElementById('subListHeading').value;
    if(taskHeading !== '') {
      let list = currentChange.parentNode.parentNode.childNodes[2];
      let id = currentChange.parentNode.parentNode.getAttribute('data-key');

      let currentTodo;
      //Find in the todo array
      for(let i = 0; i < todoItems.length; i++) {
        if(todoItems[i].id == id) {
          todoItems[i].subTask.push(taskHeading);
        }
      }

      const node = document.createElement("li");
      node.setAttribute('class', `card-item`);
      node.setAttribute('data-key', Date.now());
      node.innerHTML = ` ${taskHeading}<button class = 'markDone' onclick="markCompleted(this)">Mark Done</button>`;
      list.append(node);
      toggleAddItem();
    }
    console.log(todoItems);
    
  }

  function removeToDo(element) {
    let tempElement = element.parentNode.parentNode;
    console.log(tempElement)

    //Find in the todo array and remove
    for(let i = 0; i < todoItems.length; i++) {
      if(todoItems[i].id == tempElement.getAttribute('data-key')) {
        todoItems.splice(i, 1);
      }
    }
    tempElement.parentNode.removeChild(tempElement);
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
  popup.classList.toggle("active");
}

function redirect(element) {
  let id = element.parentNode.getAttribute('data-key');

  let currentTodo;
  //Find in the todo array
  for(let i = 0; i < todoItems.length; i++) {
    if(todoItems[i].id == id) {
      currentTodo = todoItems[i];
    }
  }
  // window.location = '../list.html';
  // window.navigate("../list.html")
  // window.history.pushState("object or string", "Page Title", "/list.html");
  // window.history.replaceState("object or string", "Page Title 2", "/list.html");
  flag = false;
  initialisation();
  document.getElementById('currentHeading').textContent = currentTodo.heading;
  document.getElementById('currentHeading-1').textContent = currentTodo.heading;

  let e = document.getElementById('singleList');
  for(let i = 0; i < currentTodo.subTask.lenght; i++) {
    const node = document.createElement("li");
      node.setAttribute('class', `card-item-2`);
      node.setAttribute('data-key', Date.now());
      node.innerHTML = ` ${taskHeading}<button class = 'markDone' onclick="markCompleted(this)">Mark Done</button>`;
      e.append(node);
  }
  console.log(e);
  // document.getElementsByClassName('card-item').style.display = 'block';
  // document.getElementsByClassName('footer').style.display = 'block';
}
function goBack() {
  flag = true;
  initialisation();
  // console.log('Here');
  // document.getElementsByClassName('card-item').style.display = 'none';
  // document.getElementsByClassName('footer').style.display = 'none';
}
