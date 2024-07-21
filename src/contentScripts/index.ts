/** Script for listening for text selections */
import Marker from "../marker";
import "../style.css";

const marker = new Marker();
const selections: Selection[] = [];
let currentSelection: Selection;
let currentMarkedNode: string;
const styles = ["highlight", "cursor-pointer"];

const handleSelection = function () {
  const selection = document.getSelection();

  if (selection && selection.toString().length > 0) {
    selections.push(selection);
    currentSelection = selection;

    const timestamp = Date.now();
    currentSelection &&
      marker.mark(currentSelection, styles, timestamp.toString());
  }
};

document.addEventListener("mouseup", handleSelection);
