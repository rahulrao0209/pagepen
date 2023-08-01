import { Marker } from ".";

const marker = new Marker();

const selections: Selection[] = [];
let currentSelection: Selection;
let currentMarkedNode: string;
const styles = ["highlight", "cursor-pointer"];

/** Get dom elements */
const markButton = document.querySelector("#mark");
const unmarkButton = document.querySelector("#unmark");
const unmarkAllButton = document.querySelector("#unmark-all");

/** Add event listeners */
markButton?.addEventListener("click", () => {
  const timestamp = Date.now();
  currentSelection &&
    marker.mark(currentSelection, styles, timestamp.toString());
});

unmarkButton?.addEventListener("click", () => {
  if (!currentMarkedNode) return;
  marker.unmark(currentMarkedNode);
});

unmarkAllButton?.addEventListener("click", () => {
  marker.unmarkAll();
});

document.addEventListener("click", (event: any) => {
  currentMarkedNode = event.target.dataset.id;
});

const handleSelection = function () {
  const selection = document.getSelection();

  if (selection && selection.toString().length > 0) {
    selections.push(selection);
    currentSelection = selection;
  }
};

document.addEventListener("mouseup", handleSelection);
