/** Script for listening for text selections */
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ColorOptionModal } from '../ui/components';
import Marker from '../marker';
import '../style.css';

const marker = new Marker();

const getHighlightStyles = (color: string) => {
    const styles = ['cursor-pointer'];
    switch (color) {
        case 'yellow':
            styles.push('highlight-yellow');
            break;
        case 'orange':
            styles.push('highlight-orange');
            break;
        case 'pink':
            styles.push('highlight-pink');
            break;
        case 'green':
            styles.push('highlight-green');
            break;
        default:
            styles.push('highlight-orange');
    }

    return styles;
};

const App = () => {
    const [selection, setSelection] = useState<Range>();
    const [showModal, setShowModal] = useState(false);

    const captureSelection = (_event: MouseEvent) => {
        const currentSelection = document.getSelection();
        if (currentSelection && currentSelection.toString().length > 0) {
            setShowModal(true);
            setSelection(currentSelection.getRangeAt(0));
        }
    };

    const highlight = (color: string) => {
        const timestamp = Date.now();
        selection?.toString().length > 0 &&
            marker.mark(
                selection,
                getHighlightStyles(color),
                timestamp.toString()
            );
    };

    useEffect(() => {
        document.addEventListener('mouseup', captureSelection);
        return () => document.removeEventListener('mouseup', captureSelection);
    }, []);

    return showModal ? (
        <ColorOptionModal highlight={highlight} setShowModal={setShowModal} />
    ) : null;
};

const domNode = document.createElement('div');
domNode.id = 'react-root';
document.body.prepend(domNode);
const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(<App />);
