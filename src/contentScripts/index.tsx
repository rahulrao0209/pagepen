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
    const [modal, setModal] = useState({
        show: false,
        top: 0,
        left: 0,
    });

    const findSelectionCoordinates = (range: Range) => {
        const rect = range.getBoundingClientRect();
        setModal({
            show: true,
            top: rect.bottom + window.scrollY + 25,
            left: rect.right + window.scrollX + 25,
        });
    };

    const captureSelection = (_event: MouseEvent) => {
        const currentSelection = document.getSelection();
        if (currentSelection && currentSelection.toString().length > 0) {
            const range = currentSelection.getRangeAt(0);
            setSelection(range);
            findSelectionCoordinates(range);
        } else {
            // If no text selection is present, hide the modal.
            setTimeout(() => setModal({ ...modal, show: false }), 0);
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
        setModal({
            ...modal,
            show: false,
        });
    };

    useEffect(() => {
        document.addEventListener('mouseup', captureSelection);

        return () => {
            document.removeEventListener('mouseup', captureSelection);
        };
    }, []);

    return modal.show ? (
        <ColorOptionModal highlight={highlight} modal={modal} />
    ) : null;
};

const domNode = document.createElement('div');
domNode.id = 'react-root';
document.body.prepend(domNode);
const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(<App />);
