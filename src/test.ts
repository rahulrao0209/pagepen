import { Marker } from ".";

const marker = new Marker();

const selections: Selection[] = [];
let currentSelection: Selection;
let currentMarkedNode: string;

/** Get dom elements */
const markButton = document.querySelector("#mark");
const unmarkButton = document.querySelector("#unmark");
const deleteButton = document.querySelector("#delete");

/** Add event listeners */
markButton?.addEventListener("click", () => {
  const timestamp = Date.now();
  currentSelection &&
    marker.mark(currentSelection, "highlight", timestamp.toString());
});

unmarkButton?.addEventListener("click", () => {
  if (!currentMarkedNode) return;
  marker.unmark(currentMarkedNode);
});

document.addEventListener("click", (event: any) => {
  currentMarkedNode = event.target.id;
  console.log(currentMarkedNode);
});

const handleSelection = function () {
  const selection = document.getSelection();

  if (selection && selection.toString().length > 0) {
    selections.push(selection);
    currentSelection = selection;
  }
};

document.addEventListener("mouseup", handleSelection);
