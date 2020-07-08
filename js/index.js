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
    var child = list.lastElementChild;  
    while (child) { 
        list.removeChild(child); 
        child = list.lastElementChild; 
    } 

    for(let i = 0; i < todoItems.length; i++) {
      const node = document.createElement("div");
      node.setAttribute('class', `card`);
      node.setAttribute('data-key', todoItems[i].id);
      node.innerHTML = `<p class="card-heading" onclick="redirect(this)">${todoItems[i].heading}</p>
      <ul style="list-style-type:none;">
      </ul>
      <div class='footer'>
          <button class='btn-completed' onclick="removeToDo(this)"><i class="fa fa-trash" aria-hidden="true"></i></button> 
          <p class = 'btn-add' onclick="toggleAddItem(this)"><i class="fa fa-plus-circle"></i></p>
      </div>
      `;
      console.log(node.childNodes);
      list.append(node);
      let currentTodo = todoItems[i];
      for(let j = 0; j < currentTodo.subTask.length; j++) {
        let classToPut = currentTodo.subTask[j].marked ? 'card-item card-item-checked' : 'card-item';
        let rest = currentTodo.subTask[j].marked ? '' : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
        const liNode = document.createElement("li");
          liNode.setAttribute('class', classToPut);
          liNode.setAttribute('data-key', currentTodo.subTask[j].id);
          liNode.innerHTML = ` ${currentTodo.subTask[j].name} ${rest}`;
          node.childNodes[2].append(liNode);
      }
    }
  
    // const isChecked = todo.checked ? 'card-item-checked': '';
    // const node = document.createElement("div");
    // node.setAttribute('class', `card`);
    // node.setAttribute('data-key', todo.id);
    // node.innerHTML = `<p class="card-heading" onclick="redirect(this)">${todo.heading}</p>
    // <ul style="list-style-type:none;">
    // </ul>
    // <div class='footer'>
    //     <button class='btn-completed' onclick="removeToDo(this)"><i class="fa fa-trash" aria-hidden="true"></i></button> 
    //     <p class = 'btn-add' onclick="toggleAddItem(this)"><i class="fa fa-plus-circle"></i></p>
    // </div>
    // `;
    
    // list.append(node);
  }

  function markCompleted(element) {
    element.parentNode.setAttribute('class', 'card-item card-item-checked');
    let id = element.parentNode.parentNode.parentNode.getAttribute('data-key');
    let subTaskId = element.parentNode.getAttribute('data-key');

      // Find in the todo array
      for(let i = 0; i < todoItems.length; i++) {
        if(todoItems[i].id == id) {
          for(let j = 0; j < todoItems[i].subTask.length; j++) {
            if(todoItems[i].subTask[j].id == subTaskId) {
              todoItems[i].subTask[j].marked = true;
            }
          }
        }
      }
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
      let list;
      if(flag) {
        list = currentChange.parentNode.parentNode.childNodes[2];
      } else {
        list = currentChange.parentNode.parentNode.childNodes[3];
      }
      console.log(currentChange.parentNode, currentChange.parentNode.parentNode);
      let id = currentChange.parentNode.parentNode.getAttribute('data-key');
      console.log(currentChange.parentNode.parentNode);

      const node = document.createElement("li");
      node.setAttribute('class', `card-item`);
      node.setAttribute('data-key', Date.now());
      node.innerHTML = ` ${taskHeading}<button class = 'markDone' onclick="markCompleted(this)">Mark Done</button>`;

      let currentTodo;
      //Find in the todo array
      for(let i = 0; i < todoItems.length; i++) {
        if(todoItems[i].id == id) {
          todoItems[i].subTask.push({name: taskHeading, marked: false, id: node.getAttribute('data-key')});
        }
      }

      
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
  document.getElementById('currentHeading-1').parentNode.setAttribute('data-key', currentTodo.id);

  console.log(currentTodo);
  let e = document.getElementById('singleList');
  var child = e.lastElementChild;  
  while (child) { 
      e.removeChild(child); 
      child = e.lastElementChild; 
  } 
  for(let i = 0; i < currentTodo.subTask.length; i++) {
    let classToPut = currentTodo.subTask[i].marked ? 'card-item-2 card-item-checked' : 'card-item-2';
    let rest = currentTodo.subTask[i].marked ? '' : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
    const node = document.createElement("li");
      node.setAttribute('class', classToPut);
      node.setAttribute('data-key', currentTodo.subTask[i].id);
      node.innerHTML = ` ${currentTodo.subTask[i].name} ${rest}`;
      e.append(node);
  }
  // console.log(e);
  // document.getElementsByClassName('card-item').style.display = 'block';
  // document.getElementsByClassName('footer').style.display = 'block';
}
function goBack() {
  flag = true;
  initialisation();
  renderTodo();

  // console.log('Here');
  // document.getElementsByClassName('card-item').style.display = 'none';
  // document.getElementsByClassName('footer').style.display = 'none';
}
