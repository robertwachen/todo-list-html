const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// Tracks when a user finished typing a letter
inputBox.onkeyup = ()=>{

  // Tracks the value of the input field
  let userEnteredValue = inputBox.value;

  // If the item in the todo list has a character other than a space, make the add button active
  if (userEnteredValue.trim() != 0)
  { 
    addBtn.classList.add("active");
  }
  else
  {
    addBtn.classList.remove("active");
  }
}

showTasks();

// Adds todo list item to local storage
addBtn.onclick = () =>
{ 
  let userEnteredValue = inputBox.value;
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null)
  { 
    listArray = []; 
  }
  else
  {
    // Transforms JSON string into an object
    listArray = JSON.parse(getLocalStorageData);  
  }

  // Adds new todo list to front of array of todos
  listArray.unshift([userEnteredValue, 'unchecked']); 

  // Updates local storage with a JSON string
  localStorage.setItem("New Todo", JSON.stringify(listArray));

  showTasks();

  // Unactivates add button after task added
  addBtn.classList.remove("active");
}

// Shows all tasks in local storage
function showTasks()
{
  let getLocalStorageData = localStorage.getItem("New Todo");

  if (getLocalStorageData == null)
  {
    listArray = [];
  }
  else
  {
    listArray = JSON.parse(getLocalStorageData); 
  }

  const upcomingTasksNumb = document.querySelector(".upcomingTasks");

  // Allows array length to be referenced in upcomingtask
  let unfinishedTasks = 0;
  listArray.forEach((element, index) => {
    if (element[1] === 'unchecked')
    {
      unfinishedTasks++;
    }
  })

  if (listArray.length === 0)
  {
    upcomingTasksNumb.textContent = "Add some tasks!"
  }
  else if (unfinishedTasks === 0)
  {
    upcomingTasksNumb.textContent = "You finished your tasks!"
  }
  else if (unfinishedTasks === 1)
  {
    upcomingTasksNumb.textContent = "You have " + unfinishedTasks + " unfinished task"
  }
  else
  {
    upcomingTasksNumb.textContent = "You have " + unfinishedTasks + " unfinished tasks"
  }

  // upcomingTasksNumb.textContent = unfinishedTasks;
  
  if (listArray.length > 0)
  {
    deleteAllBtn.classList.add("active");
  }
  else
  {
    deleteAllBtn.classList.remove("active");
  }

  let newLiTag = "";

  // Adds each individual task to the todo list
  listArray.forEach((element, index) => 
  {

    if (element[1] === 'checked')
    {
      newLiTag += 
      `
        <li class="todoItem" onclick="checkTask(${index})">
          <text class="checkText">✅</text>
          <a class="todoTextChecked" checked="checked" href="#">
          ${element[0]}
          </a>
          <span class="icon" onclick="deleteTask(${index})">
                  <i class="fas fa-trash">
                  </i>
          </span>
        </li>
      `;
    }
    else
    {
      newLiTag += 
      `
        <li class="todoItem" onclick="checkTask(${index})"> 
          <text class="checkText">☐</text>
          <a class="todoText"" href="#">
          ${element[0]}
          </a>
          <span class="icon" onclick="deleteTask(${index})">
                  <i class="fas fa-trash">
                  </i>
          </span>
        </li>
      `;
    }
    
  });

  // Adds new li tag to the todo list ul tag
  todoList.innerHTML = newLiTag;

  // Resets input field after task added
  inputBox.value = "";
}

// Deletes task from local storage
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);

  // Removes task from array and updates local storage
  listArray.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArray));

  // Shows new task list
  showTasks();
}

// Allows user to mark a task as done without deleting it
function checkTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);

  // Changes metadata for checkbox to check/uncheck it
  if (listArray[index][1] === 'unchecked')
  {
    listArray[index][1] = 'checked';

    let temp = listArray[index];
    listArray.splice(index, 1)
    listArray.push(temp)

    $(this).addClass("checkedText");
  }
  else
  {
    listArray[index][1] = 'unchecked';
    $(this).removeClass("checkedText");
  }
  
  localStorage.setItem("New Todo", JSON.stringify(listArray));

  // Shows updated task list
  showTasks();
}

// Clears all tasks from local storage and updates UI
deleteAllBtn.onclick = () =>
{
  listArray = [];
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}