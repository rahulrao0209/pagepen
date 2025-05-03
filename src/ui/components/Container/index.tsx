/** Script for listening for text selections */
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dialog } from '../';
import { DialogContext } from '../../context';
import Marker from '../../../marker';
import {
    getRangeEndPosition,
    isHighlighted,
    shouldCloseToolbar,
} from '../../utils';
import '../../../style.css';
import { DialogType, Position } from '../../context/dialog/interfaces';

// A list of css classes of elements that should not close the toolbar when clicked.
const KEEP_TOOLBAR_OPEN = [
    'color-option',
    'choose-color-btn',
    'back-btn',
    'button--colors',
    'comment-area',
    'dialog',
    'comment',
];

const marker = new Marker();

const Container = () => {
    const [range, setRange] = useState<Range>();
    const [highlightId, setHighlightId] = useState<string>();

    const dialogContext = useContext(DialogContext);
    const { dialogState, displayDialog, hideDialog } = dialogContext;

    const handleDialogDisplay = (type?: DialogType, position?: Position) => {
        if (position) setTimeout(() => displayDialog(type, position), 0);
        else
            setTimeout(() => {
                hideDialog();
                setRange(null);
            }, 0);
    };

    const handleHighlightId = (id: string) => {
        setHighlightId(id);
    };

    console.log('id: ', highlightId);

    const captureSelection = (event: MouseEvent) => {
        const currentSelection = document.getSelection();
        if (currentSelection && currentSelection.toString().length > 0) {
            const range = currentSelection.getRangeAt(0);
            console.log('current selection: ', currentSelection.toString());
            setRange(range);

            const positionData = getRangeEndPosition(range);

            // Show dialog
            handleDialogDisplay(DialogType.CREATE, positionData);
        } else {
            const target = event.target as HTMLSpanElement | HTMLButtonElement;
            if (!shouldCloseToolbar(KEEP_TOOLBAR_OPEN, target.classList)) {
                return;
            }

            if (isHighlighted(target)) {
                const positionData = getRangeEndPosition(target);
                setHighlightId(target.dataset.id);

                console.log('is Highlighted: ');

                // Show update dialog.
                handleDialogDisplay(DialogType.UPDATE, positionData);
                return;
            }

            // Hide dialogs
            handleDialogDisplay();
            setHighlightId('');
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', captureSelection);

        return () => {
            document.removeEventListener('mouseup', captureSelection);
        };
    }, []);

    return (
        <>
            {dialogState.visible ? (
                <Dialog
                    marker={marker}
                    range={range}
                    setRange={setRange}
                    id={highlightId}
                    dialogType={dialogState.type}
                    handleHighlightId={handleHighlightId}
                />
            ) : null}
        </>
    );
};

export default Container;
