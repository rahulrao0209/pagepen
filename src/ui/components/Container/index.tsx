/** Script for listening for text selections */
import React, { useState, useEffect, useContext } from 'react';
import { Dialog } from '../';
import { ColorContext, DialogContext, ToolbarContext } from '../../context';
import Marker from '../../../marker';
import {
    getHighlightStyles,
    getRangeEndPosition,
    isHighlighted,
    shouldCloseToolbar,
} from '../../utils';
import '../../../style.css';
import { DialogType, Position } from '../../context/dialog/interfaces';
import { HIGHLIGHTER_COLORS } from '../../constants';

// A list of css classes of elements that should not close the toolbar when clicked.
const KEEP_TOOLBAR_OPEN = [
    'color-option',
    'choose-color-btn',
    'dialog',
    'comment',
];

const marker = new Marker();

const Container = () => {
    const [selection, setSelection] = useState<Range>();
    const [highlightId, setHighlightId] = useState<string>();

    const dialogContext = useContext(DialogContext);
    const { dialogState, displayDialog, hideDialog } = dialogContext;

    const handleDialogDisplay = (type?: DialogType, position?: Position) => {
        if (position) setTimeout(() => displayDialog(type, position), 0);
        else
            setTimeout(() => {
                hideDialog();
                setSelection(null);
            }, 0);
    };

    const highlight = (range: Range, color: HIGHLIGHTER_COLORS) => {
        const timestamp = Date.now();
        range?.toString().length > 0 &&
            marker.mark(range, getHighlightStyles(color), timestamp.toString());
        setHighlightId(timestamp.toString());
    };

    const captureSelection = (event: MouseEvent) => {
        const currentSelection = document.getSelection();
        if (currentSelection && currentSelection.toString().length > 0) {
            const range = currentSelection.getRangeAt(0);
            setSelection(range);
            const positionData = getRangeEndPosition(range);

            // Highlight selection
            highlight(range, HIGHLIGHTER_COLORS.INITIAL);

            // Show dialog
            handleDialogDisplay(DialogType.CREATE, positionData);
        } else {
            const target = event.target as HTMLSpanElement;
            if (!shouldCloseToolbar(KEEP_TOOLBAR_OPEN, target.classList)) {
                return;
            }

            if (isHighlighted(target)) {
                const positionData = getRangeEndPosition(target);
                setHighlightId(target.dataset.id);

                // Show update dialog.
                handleDialogDisplay(DialogType.UPDATE, positionData);
                return;
            }

            // Hide dialogs
            handleDialogDisplay();
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
                    dialogType={dialogState.type}
                    id={highlightId}
                />
            ) : null}
        </>
    );
};

export default Container;
