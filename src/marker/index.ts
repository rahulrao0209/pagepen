import type { DomData, RangeData } from '../types';
import { calculateXPath, getNodeByXPath } from '../path/';

export default class Marker {
    #marked = new Map<string, HTMLSpanElement[]>();
    /**
     * Mark or highlight a text selection on the webpage.
     * @param {Selection} node
     * @param {string[]} features
     */
    mark(
        range: Range,
        features: string[] = ['highlight'],
        uid: string = Date.now().toString()
    ): void {
        /** Get the range. */
        // const range = node.getRangeAt(0);

        /** Save the xpaths for range nodes */
        this.#saveAnnotations(range, uid);

        /** Mark the selection using the range */
        if (range.startContainer === range.endContainer)
            this.#handleTextRange(range, uid, features);
        else this.#handleNodeRange(range, uid, features);

        /** Collapse the selection to the end */
        // node.collapseToEnd();
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

        /** Remove the annotation from the storage */
        this.#removeAnnotation(id);
    }

    /**
     * Unmark or remove any marking or annotation from all selections.
     */
    unmarkAll() {
        this.#marked.forEach((_, key) => this.unmark(key));
    }

    /**
     * Toggles the visibility of the markings/annotations
     * @param {boolean} on
     * @returns {void}
     */
    toggleMarkerVisibility(on: boolean): void {
        if (this.#marked.size < 0) return;

        if (on) this.#marked.forEach((_, key) => this.#displayMarkings(key));
        else this.#marked.forEach((_, key) => this.#hideMarkings(key));
    }

    retrieveSavedAnnotations() {
        const local = localStorage;
        for (let i = 0; i < local.length; i++) {
            const key = local.key(i);
            if (!key) continue;
            const localObj = local.getItem(key);
            if (!localObj) continue;
            const rangeData: RangeData = JSON.parse(localObj);
            this.#applySavedAnnotations(rangeData);
        }
    }

    #handleRange(range: Range, uid: string, features: string[]) {
        /** Mark the selection using the range */
        if (range.startContainer === range.endContainer)
            this.#handleTextRange(range, uid, features);
        else this.#handleNodeRange(range, uid, features);
    }

    #saveAnnotations(range: Range, uid: string) {
        /** Calculate xpaths */
        const xpathStart = calculateXPath(range.startContainer);
        const xpathEnd = calculateXPath(range.endContainer);
        const startOff = range.startOffset;
        const endOff = range.endOffset;

        /** Save XPaths in Local storage */
        const rangeData: RangeData = {
            xpathStart,
            xpathEnd,
            startOff,
            endOff,
            uid,
        };

        localStorage.setItem(uid, JSON.stringify(rangeData));
    }

    #removeAnnotation(uid: string) {
        localStorage.removeItem(uid);
    }

    #applySavedAnnotations(rangeData: RangeData) {
        const { xpathStart, xpathEnd, startOff, endOff, uid } = rangeData;

        if (xpathStart && xpathEnd) {
            const startNode = getNodeByXPath(xpathStart);
            const endNode = getNodeByXPath(xpathEnd);
            const newRange = document.createRange();
            if (startNode) newRange.setStart(startNode, startOff);
            if (endNode) newRange.setEnd(endNode, endOff);
            this.#handleRange(newRange, uid, ['highlight', 'cursor-pointer']);
        }
    }

    /**
     * Save marked node(s) for a given uid.
     * @param {string} uid
     * @param {HTMLSpanElement} node
     */
    #saveMarkedNode(uid: string, node: HTMLSpanElement) {
        const nodesWithUid = this.#marked.get(uid);
        if (nodesWithUid && nodesWithUid.length > 0) {
            this.#marked.set(uid, [...nodesWithUid, node]);
        } else this.#marked.set(uid, [node]);
    }

    /**
     * Handles range containing a single text node.
     * @param {Range} range
     * @param {string} uid
     * @param {string[]} features
     */
    #handleTextRange(range: Range, uid: string, features: string[]): void {
        /** Get and store range contents */
        const content = range.cloneContents();

        /** Delete range contents. */
        range.deleteContents();

        /** Append a new node with the range content */
        const span = document.createElement('span');
        span.append(content);
        span.dataset.id = uid;
        span.classList.add(...features);
        this.#saveMarkedNode(uid, span);
        range.insertNode(span);
    }

    /**
     * Handles range containing element nodes.
     * @param {Range} range
     * @param {string} uid
     * @param {string} features
     */
    #handleNodeRange(range: Range, uid: string, features: string[]): void {
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

                const span = document.createElement('span');
                span.dataset.id = uid;
                span.classList.add(...features);
                span.textContent = selectedText || '';
                this.#saveMarkedNode(uid, span);

                const fragment = document.createDocumentFragment();
                if (precedingText)
                    fragment.appendChild(
                        document.createTextNode(precedingText)
                    );

                if (selectedText) fragment.appendChild(span);

                if (succeedingText)
                    fragment.appendChild(
                        document.createTextNode(succeedingText)
                    );

                if (currentNode.parentNode) {
                    const originals = domUpdateMap.get(
                        currentNode.parentNode
                    )?.originals;
                    const fragments = domUpdateMap.get(
                        currentNode.parentNode
                    )?.fragments;

                    domUpdateMap.set(currentNode.parentNode, {
                        originals: originals
                            ? [...originals, currentNode]
                            : [currentNode],
                        fragments: fragments
                            ? [...fragments, fragment]
                            : [fragment],
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
     * Displays all the marked nodes.
     * @param {string} id
     * @returns {void}
     */
    #displayMarkings(id: string): void {
        const markedNodes = this.#marked.get(id);
        if (markedNodes && markedNodes.length === 0) return;

        markedNodes?.forEach((node: HTMLSpanElement) => {
            node.classList.add('highlight', 'cursor-pointer');
        });
    }

    /**
     * Hides all the marked nodes
     * @param {string} id
     * @returns {void}
     */
    #hideMarkings(id: string): void {
        const markedNodes = this.#marked.get(id);
        if (markedNodes && markedNodes.length === 0) return;

        markedNodes?.forEach((node: HTMLSpanElement) => {
            node.className = '';
        });
    }
}
