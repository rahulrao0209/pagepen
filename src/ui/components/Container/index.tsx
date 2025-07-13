/** Script for listening for text selections */
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dialog } from '../';
import { ColorContext, DialogContext } from '../../context';
import Marker from '../../../marker';
import {
    getColorFromClassName,
    getRangeEndPosition,
    isHighlighted,
    shouldCloseToolbar,
} from '../../utils';
import { DialogType, Position } from '../../context/dialog/interfaces';
import '../../../style.css';

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
    const rangeRef = useRef<Range>(null);
    const [highlightId, setHighlightId] = useState<string>();

    const dialogContext = useContext(DialogContext);
    const colorContext = useContext(ColorContext);
    const { dialogState, displayDialog, hideDialog } = dialogContext;
    const { selectColor } = colorContext;

    const handleDialogDisplay = (type?: DialogType, position?: Position) => {
        if (position) setTimeout(() => displayDialog(type, position), 0);
        else
            setTimeout(() => {
                hideDialog();
                setRange(null);
                setHighlightId('');
            }, 0);
    };

    const handleHighlightId = (id: string) => {
        setHighlightId(id);
    };

    const handleRange = (range: Range | null) => {
        setTimeout(() => setRange(range), 0);
    };

    const captureSelection = (event: MouseEvent) => {
        const currentSelection = document.getSelection();
        if (currentSelection && currentSelection.toString().length > 0) {
            const range = currentSelection.getRangeAt(0);
            setRange(range);
            rangeRef.current = range;

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

                // Update selected color to the color of the current highlighted node
                const color = getColorFromClassName(target.classList);
                selectColor(color);

                // Show update dialog.
                handleDialogDisplay(DialogType.UPDATE, positionData);
                return;
            }

            // Hide dialogs
            handleDialogDisplay();
        }
    };

    const redrawDialog = () => {
        if (!rangeRef.current) return;
        handleDialogDisplay(
            DialogType.CREATE,
            getRangeEndPosition(rangeRef.current)
        );
    };

    useEffect(() => {
        document.addEventListener('mouseup', captureSelection);

        // TODO: Add throttling.
        window.addEventListener('resize', redrawDialog);

        return () => {
            document.removeEventListener('mouseup', captureSelection);
            window.removeEventListener('resize', redrawDialog);
        };
    }, []);

    return (
        <>
            {dialogState.visible ? (
                <Dialog
                    marker={marker}
                    range={range}
                    id={highlightId}
                    handleHighlightId={handleHighlightId}
                    handleRange={handleRange}
                    handleDialogDisplay={handleDialogDisplay}
                />
            ) : null}
        </>
    );
};

export default Container;
