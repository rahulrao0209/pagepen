/** Dom update map */
type DomData = {
  originals: Node[];
  fragments: DocumentFragment[];
};
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

    if (range.startContainer === range.endContainer) {
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
    } else this.walkTree(range);
  }

  walkTree(range: Range) {
    const startContainer = range.startContainer;
    const endContainer = range.endContainer;

    const domUpdateMap = new Map<ParentNode, DomData>();

    /** Use a tree walker */
    const walker = document.createTreeWalker(
      range.commonAncestorContainer || document,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT
    );

    let currentNode: Node | null = walker.nextNode();
    while (currentNode) {
      if (
        currentNode.nodeType === Node.TEXT_NODE &&
        range.intersectsNode(currentNode)
      ) {
        const startOffset =
          startContainer === currentNode ? range.startOffset : 0;
        const endOffset =
          endContainer === currentNode
            ? range.endOffset
            : currentNode.textContent?.length;

        const selectedText = currentNode.textContent
          ?.slice(startOffset, endOffset)
          .trim();
        const precedingText = currentNode.textContent
          ?.slice(0, startOffset)
          .trim();
        const succeedingText = currentNode.textContent
          ?.slice(endOffset, currentNode.textContent.length)
          .trim();

        const span = document.createElement("span");
        span.classList.add("highlight");
        span.textContent = selectedText || "";

        const fragment = document.createDocumentFragment();
        if (precedingText)
          fragment.appendChild(document.createTextNode(precedingText));

        if (selectedText) fragment.appendChild(span);

        if (succeedingText)
          fragment.appendChild(document.createTextNode(succeedingText));

        if (currentNode.parentNode) {
          const originals = domUpdateMap.get(currentNode.parentNode)?.originals;
          const fragments = domUpdateMap.get(currentNode.parentNode)?.fragments;

          domUpdateMap.set(currentNode.parentNode, {
            originals: originals ? [...originals, currentNode] : [currentNode],
            fragments: fragments ? [...fragments, fragment] : [fragment],
          });
        }
      }
      currentNode = walker.nextNode();
    }

    this.updateDOM(domUpdateMap);
  }

  updateDOM(map: Map<ParentNode, DomData>) {
    map.forEach((value: DomData, key: ParentNode) => {
      value.originals.forEach((original: Node, index: number) => {
        key.replaceChild(value.fragments[index], original);
      });
    });
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
    this.#marked.forEach((_, key) => this.unmark(key));
  }

  delete() {}
}
