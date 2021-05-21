//create new todo as an array record,
//pushing value from the main app input,
//assigning new randomly generated id and setting default
//completion status as incomplete
const createRecord = (value) => {
  const idNew = Math.floor(Math.random() * 10000);

  toDoArr.push({
    value,
    id: idNew,
    done: false,
  });
  initApp(filterBy);
};

//edit array record by finding existing by id
const editRecord = (id, value, done) => {
  const record = toDoArr.find((item) => item.id === id);
  record.value = value;
  record.done = done;
  //when editing is finished we need to remove clicking
  //away check, cause if we don't it will decline
  //any changes at the next click
  //   document.removeEventListener("click", closeEdit);
  document.onclick = null;

  initApp(filterBy);
};

//deletion of record by rewriting record array without it
const deleteRecord = (id) => {
  toDoArr = toDoArr.filter((item) => item.id !== id);
  initApp(filterBy);
};

//record status change handler, done/undone
const changeState = (id) => {
  const record = toDoArr.find((item) => item.id === id);
  if (record.done) {
    record.done = false;
  } else {
    record.done = true;
  }
  initApp(filterBy);
};
//moves selected todo
const moveToDo = (id, direction) => {
  const record = toDoArr.find((item) => item.id === id);
  const index = toDoArr.indexOf(record);
  const targetIndex = direction === "up" ? index + 1 : index - 1;
  toDoArr[index] = toDoArr[targetIndex];
  toDoArr[targetIndex] = record;
  initApp(filterBy);
};

//helper function to check for missclicks when editing record,
//if catches a missclick sends initial, unedited data to
//recording function
let closeEdit;
const editCheck = (element, id, value, done) => {
  return (closeEdit = ({ target }) => {
    if (!element.contains(target)) {
      editRecord(id, value, done);
    }
  });
};
