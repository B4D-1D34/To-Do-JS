let activeEdit;
let activeLi;
let initialHTML;
let activeIsDone;
let editTargetId;

const viewToDo = ({ value, id, done }, index, length) => {
  //creation of li element and all elements contained inside
  const li = document.createElement("div");
  const liWrapper = document.createElement("li");
  const span = document.createElement("span");
  const btnContainer = document.createElement("div");
  const arrowContainer = document.createElement("div");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const confirmButton = document.createElement("button");

  //adding classes for styling
  //asdasdasdasd
  li.classList.add("li");
  arrowContainer.classList.add("arrow_container");

  //elements' values assignment
  span.innerText = value;
  editButton.innerText = "...";
  deleteButton.innerText = "X";

  //assembling elements into completed li and putting li into list
  li.appendChild(span);
  btnContainer.appendChild(editButton);
  btnContainer.appendChild(deleteButton);
  li.appendChild(btnContainer);

  //creating buttons to move records in the list,
  //making unavailable moving records off the list edges
  if (index !== length - 1) {
    const upArrow = document.createElement("button");
    upArrow.innerText = "up";

    arrowContainer.appendChild(upArrow);
    upArrow.addEventListener("click", () => {
      moveToDo(id, "up");
    });
  }
  if (index !== 0) {
    const downArrow = document.createElement("button");
    downArrow.innerText = "down";

    arrowContainer.appendChild(downArrow);
    downArrow.addEventListener("click", () => {
      moveToDo(id, "down");
    });
  }

  liWrapper.appendChild(arrowContainer);
  liWrapper.appendChild(li);
  list.prepend(liWrapper);

  //displaying todo as completed if it's marked as "done" in the array
  if (done) {
    li.classList.add("done");
  }

  //callback helper function from li event listener, calls
  //change state function if user clicks on li element itself,
  //not any button inside of it
  function doneListen({ target }) {
    if (btnContainer.contains(target) || confirmButton.contains(target)) {
      return;
    }
    changeState(id);
  }

  //creating listener described above
  li.addEventListener("click", doneListen);

  //EDITING-------------------------------------------------------
  editButton.addEventListener("click", function createEditBtn() {
    const editInput = document.createElement("input");
    editTargetId = id;

    if (activeEdit !== id && activeEdit !== undefined) {
      initApp(filterBy);
      return;
    }
    activeEdit = id;
    activeLi = li;
    initialHTML = activeLi.innerHTML;
    activeIsDone = done;
    //when we start editing completed todo, it's more comfortable
    //to see styling of incomplete one. also editing completed todo
    //means that you're going to use it again, so we're making it
    //"undone" for editing time
    li.classList.remove("done");

    //for li editing period we don't need to toggle todo completion
    //at all, so we remove event listener responsible for this
    li.removeEventListener("click", doneListen);

    //!!!
    //if another element is being edited at the moment, sends
    //value to check function, function deletes event listener of another
    //element and refreshes list

    //putting together editing form inside of li,
    //text input and confirmation button
    editInput.value = span.innerText;
    confirmButton.innerText = "V";
    li.replaceChild(editInput, span);
    li.appendChild(confirmButton);
    btnContainer.classList.add("hidden");

    //listens if user clicks away from li which is being edited
    //and declines any changes if so
    // document.addEventListener("click", editCheck(li, id, value, done));
    document.onclick = editCheck(li, id, value, done);

    //confirm button handler
    confirmButton.addEventListener("click", () => {
      editRecord(id, editInput.value, false);
    });
  });

  //what happens if you click deletion button
  deleteButton.addEventListener("click", () => {
    deleteRecord(id);
  });
  if (editTargetId === id) {
    const clickLiEvent = new Event("click");
    activeEdit = id;

    editButton.dispatchEvent(clickLiEvent);
    editTargetId = null;
  }
};
