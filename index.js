const ENTER_KEY_CODE = 13;
const addTodoButton = document.getElementById("add");
const input = document.getElementById("addinput");
const errormessage = document.querySelector(".errormessage");
const list = document.getElementById("list");
const clearButton = document.getElementById("clearButton");

/////////////////////////
//parsing localstorage data to array to work with records
let toDoArr = JSON.parse(localStorage.getItem("toDoList"));

//app decides what will be shown at the list and then shows it
const initApp = (filterBy) => {
  input.classList.remove("error");
  errormessage.classList.remove("error");
  list.innerHTML = "";

  sortHighlight(filterBy);

  const filteredArr = toDoArr.filter((item) => item.done !== filterBy);
  filteredArr.forEach((item, index) => {
    viewToDo(
      { value: item.value, id: item.id, done: item.done },
      index,
      filteredArr.length
    );
  });
};

const makeToDoFromInput = () => {
  if (!input.value.replaceAll(" ", "")) {
    input.classList.add("error");
    errormessage.classList.add("error");
    input.value = "";
    return;
  }
  input.classList.remove("error");
  errormessage.classList.remove("error");
  createRecord(input.value);
  input.value = "";
};

//todo creation button handler
addTodoButton.addEventListener("click", () => {
  makeToDoFromInput();
});
input.addEventListener("keypress", ({ keyCode }) => {
  if (keyCode === ENTER_KEY_CODE) {
    makeToDoFromInput();
  }
});

//deleting all records
clearButton.addEventListener("click", () => {
  toDoArr = [];
  initApp(filterBy);
});

//recording all changes to localStorage before
//every close or refresh of the page
window.onbeforeunload = function () {
  localStorage.setItem("toDoList", JSON.stringify(toDoArr));
};

initApp(filterBy);
