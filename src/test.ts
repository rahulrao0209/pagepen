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
const hideMarkingButton = document.querySelector("#hide-marking");
const showMarkingButton = document.querySelector("#show-marking");

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

hideMarkingButton?.addEventListener("click", () => {
  marker.toggleMarkerVisibility(false);
});

showMarkingButton?.addEventListener("click", () => {
  marker.toggleMarkerVisibility(true);
});

document.addEventListener("click", (event: any) => {
  currentMarkedNode = event.target.dataset.id;
});

document.addEventListener("DOMContentLoaded", () => {
  marker.retrieveSavedAnnotations();
});

const handleSelection = function () {
  const selection = document.getSelection();

  if (selection && selection.toString().length > 0) {
    selections.push(selection);
    currentSelection = selection;
  }
};

document.addEventListener("mouseup", handleSelection);
