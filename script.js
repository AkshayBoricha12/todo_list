const allTasks = document.querySelector(".tasks");
const tasks = document.querySelectorAll(".task");
const input = document.querySelector(".form-input");
let itemToRemove = document.querySelectorAll("i");
let checkboxes = document.querySelectorAll("input[type='checkbox']");
let taskCompleted = {};
let checkboxesPreviousLength = checkboxes.length;

for (const item of itemToRemove) {
  item.addEventListener("click", removeItem);
}

for (const checkbox of checkboxes) {
  checkbox.addEventListener("click", changeCompleteStatus);
  taskCompleted[checkbox] = false;
}

document.onchange = updateCheckboxes;

function updateCheckboxes() {
  checkboxes = document.querySelectorAll("input[type='checkbox']");
  itemToRemove = document.querySelectorAll("i");
  if (checkboxesPreviousLength < checkboxes.length) {
    let checkbox = checkboxes[checkboxes.length - 1];
    taskCompleted[checkbox] = false;
    checkbox.addEventListener("click", changeCompleteStatus);
    itemToRemove[itemToRemove.length - 1].addEventListener("click", removeItem);
    checkboxesPreviousLength = checkboxes.length;
  }
}

function addItem(event) {
  event.preventDefault();
  let value = input.value;
  if (value) {
    let task = document.createElement("div");
    task.className = "task";
    task.innerHTML = `
  <div class="form-check-input-group">
    <input type="checkbox" />
    <label>${value}</label>
  </div>
  <i class="fa-solid fa-x"></i>
`;
    allTasks.appendChild(task);
  }
  input.value = "";
  updateCheckboxes();
}

function removeItem(event) {
  let element = event.target;
  element.parentElement.style.display = "none";
}

function changeCompleteStatus(event) {
  let checkbox = event.target;
  if (taskCompleted[checkbox] === "true" || taskCompleted[checkbox]) {
    checkbox.nextElementSibling.style.textDecoration = "";
    taskCompleted[checkbox] = false;
  } else {
    checkbox.nextElementSibling.style.textDecoration = "line-through";
    taskCompleted[checkbox] = true;
  }
}
