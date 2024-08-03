/** Script for listening for text selections */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ColorOptionModal } from '../ui/components';
import Marker from '../marker';
import '../style.css';

const marker = new Marker();
const selections: Selection[] = [];
let currentSelection: Selection;
let currentMarkedNode: string;
const styles = ['highlight', 'cursor-pointer'];

const handleSelection = function () {
    const selection = document.getSelection();

    console.log('text: ', selection.toString());

    if (selection && selection.toString().length > 0) {
        selections.push(selection);
        currentSelection = selection;

        const timestamp = Date.now();
        currentSelection &&
            marker.mark(currentSelection, styles, timestamp.toString());
    }
};

const injectModal = () => {
    console.log('injecting modal');
    const domNode = document.createElement('div');
    domNode.id = 'react-root';
    document.body.prepend(domNode);
    const container = document.getElementById('react-root');
    const root = createRoot(container);
    root.render(<ColorOptionModal />);
};

document.addEventListener('mouseup', handleSelection);
document.addEventListener('readystatechange', injectModal);
