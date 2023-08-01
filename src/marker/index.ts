import type { DomData } from "../types";
export default class Marker {
  #marked = new Map<string, HTMLSpanElement[]>();
  /**
   * Mark or highlight a text selection on the webpage.
   * @param {Selection} node
   * @param {string[]} features
   */
  mark(
    node: Selection,
    features: string[] = ["highlight"],
    uid: string = Date.now().toString()
  ): void {
    /** Get the range. */
    const range = node.getRangeAt(0);

    /** Mark the selection using the range */
    if (range.startContainer === range.endContainer)
      this.#handleSingleNode(range, uid, features);
    else this.#handleNestedNodes(range, uid, features);

    /** Collapse the selection to the end */
    node.collapseToEnd();
  }

  #saveMarkedNode(uid: string, node: HTMLSpanElement) {
    const nodesWithUid = this.#marked.get(uid);
    if (nodesWithUid && nodesWithUid.length > 0) {
      this.#marked.set(uid, [...nodesWithUid, node]);
    } else this.#marked.set(uid, [node]);
  }

  /**
   * Mark / Highlight a single text node
   * @param {Range} range
   * @param {string} uid
   * @param {string[]} features
   */
  #handleSingleNode(range: Range, uid: string, features: string[]): void {
    /** Get and store range contents */
    const content = range.cloneContents();

    /** Delete range contents. */
    range.deleteContents();

    /** Append a new node with the range content */
    const span = document.createElement("span");
    span.append(content);
    span.dataset.id = uid;
    span.classList.add(...features);
    this.#saveMarkedNode(uid, span);
    range.insertNode(span);
  }

  /**
   * Mark / Highlight a range with nested nodes.
   * @param {Range} range
   * @param {string} uid
   * @param {string} features
   */
  #handleNestedNodes(range: Range, uid: string, features: string[]): void {
    const startContainer = range.startContainer;
    const endContainer = range.endContainer;

    /**
     *  Initialize a map to store the parent node and the corresponding
     *  DomData which consists of the original child nodes as well as the
     *  fragments which will be used as a replacement.
     */
    const domUpdateMap = new Map<ParentNode, DomData>();

    /** Initialize a tree walker */
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
        span.dataset.id = uid;
        span.classList.add(...features);
        span.textContent = selectedText || "";
        this.#saveMarkedNode(uid, span);

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

    this.#updateDOM(domUpdateMap);
  }

  /**
   * Updates the DOM by replacing the child elements.
   * @param {Map<ParentNode, DomData>} map
   */
  #updateDOM(map: Map<ParentNode, DomData>): void {
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
    /** Check if the node/nodes we want to unmark are marked. */
    const markedNodes = this.#marked.get(id);
    if (markedNodes && markedNodes.length === 0) return;

    /**
     * If we have marked nodes, create a range to extract its contents
     * as a document fragment.
     */
    const range = new Range();

    markedNodes?.forEach((node: HTMLSpanElement) => {
      range.selectNodeContents(node);
      const fragment = range.extractContents();

      /** Replace the marked node with the fragment. */
      node.parentNode?.replaceChild(fragment, node);
    });

    /** Finally delete the id from the map */
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
