const SORT_CONSTANT = {
  sortAll: "",
  sortDone: false,
  sortUndone: true,
};
let filterBy = SORT_CONSTANT.sortAll;
const sortAll = document.getElementById("sort_all");
const sortDone = document.getElementById("sort_done");
const sortUndone = document.getElementById("sort_undone");

sortAll.addEventListener("click", () => {
  filterBy = SORT_CONSTANT.sortAll;
  initApp(filterBy);
});

sortDone.addEventListener("click", () => {
  filterBy = SORT_CONSTANT.sortDone;
  initApp(filterBy);
});

sortUndone.addEventListener("click", () => {
  filterBy = SORT_CONSTANT.sortUndone;
  initApp(filterBy);
});

const sortHighlight = (filterBy) => {
  if (filterBy === SORT_CONSTANT.sortAll) {
    sortAll.classList.add("active");
    sortDone.classList.remove("active");
    sortUndone.classList.remove("active");
  } else if (filterBy === SORT_CONSTANT.sortDone) {
    sortAll.classList.remove("active");
    sortDone.classList.add("active");
    sortUndone.classList.remove("active");
  } else if (filterBy === SORT_CONSTANT.sortUndone) {
    sortAll.classList.remove("active");
    sortDone.classList.remove("active");
    sortUndone.classList.add("active");
  }
};
