export default class Marker {
  #marked = new Map<string, HTMLSpanElement>();
  /**
   * Mark or highlight a text selection on the webpage.
   * @param {Selection} node
   * @param {string} feature
   */
  mark(
    node: Selection,
    feature: string = "highlight",
    uid: string = Date.now().toString()
  ) {
    /** Get the range and extract its contents. */
    const range = node.getRangeAt(0);
    const content = range.cloneContents();

    /** Delete the range. */
    range.deleteContents();

    /** Append a new node with the range content */
    const replacement = document.createElement("span");
    replacement.append(content);
    replacement.id = uid;
    replacement.classList.add(feature, "cursor-pointer");
    this.#marked.set(uid, replacement);
    range.insertNode(replacement);
    node.collapseToEnd();
  }

  /**
   * Unmark a marked node on the webpage.
   * @param {string} id of the node to be unmarked.
   * @returns {void}
   */
  unmark(id: string): void {
    /** Check if the node we want to unmark is marked. */
    if (!this.#marked.has(id)) return;
    const markedNode = this.#marked.get(id);

    if (!markedNode) return;
    /**
     * If we have a marked node, create a range to extract its contents
     * as a document fragment.
     */
    const range = new Range();
    range.selectNodeContents(markedNode);
    const fragment = range.extractContents();

    /** Replace the marked node with the fragment. */
    markedNode.parentNode?.replaceChild(fragment, markedNode);
    this.#marked.delete(id);
  }

  /**
   * Unmark or remove any marking or annotation from all selections.
   */
  unmarkAll() {
    this.#marked.forEach((value, key) => this.unmark(key));
  }

  delete() {}
}
