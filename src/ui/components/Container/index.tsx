/** Script for listening for text selections */
import React, { useState, useEffect, useContext } from 'react';
import { CreateToolbar, UpdateToolbar, Dialog } from '../';
import { ColorContext, DialogContext, ToolbarContext } from '../../context';
import Marker from '../../../marker';
import {
    getHighlightStyles,
    getMouseClickPosition,
    getRangeEndPosition,
    isHighlighted,
    restoreSelection,
    shouldCloseToolbar,
} from '../../utils';
import '../../../style.css';
import { Position } from '../../context/dialog/interfaces';
import { HIGHLIGHTER_COLORS } from '../../constants';

enum ToolbarType {
    CREATE,
    UPDATE,
}

type DisplayToolbar = {
    type: ToolbarType;
    show: boolean;
    positionData?: {
        top: number;
        left: number;
    };
};

const marker = new Marker();

// A list of css classes of elements that should not close the toolbar when clicked.
const KEEP_TOOLBAR_OPEN = [
    'color-option',
    'choose-color-btn',
    'dialog',
    'comment',
];

const Container = () => {
    const [selection, setSelection] = useState<Range>();
    const [highlightId, setHighlightId] = useState<string>();

    const toolbarContext = useContext(ToolbarContext);
    const { state, methods } = toolbarContext;

    const dialogContext = useContext(DialogContext);
    const { dialogState, displayDialog, hideDialog } = dialogContext;

    const handleToolbarDisplay = ({
        type,
        show,
        positionData,
    }: DisplayToolbar) => {
        const { dispatchCreate, dispatchUpdate } = methods;

        if (type === ToolbarType.CREATE) {
            if (positionData)
                setTimeout(() => dispatchCreate({ show, ...positionData }), 0);
            else
                setTimeout(() => {
                    dispatchCreate({ show });
                    setSelection(null);
                }, 0);
        }

        if (type === ToolbarType.UPDATE) {
            if (positionData)
                setTimeout(() => dispatchUpdate({ show, ...positionData }), 0);
            else setTimeout(() => dispatchUpdate({ show }), 0);
        }
    };

    const handleDialogDisplay = (position?: Position) => {
        if (position) setTimeout(() => displayDialog(position), 0);
        else
            setTimeout(() => {
                console.log('hide dialog with timeout.');
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
            handleDialogDisplay(positionData);
        } else {
            const target = event.target as HTMLSpanElement;
            if (!shouldCloseToolbar(KEEP_TOOLBAR_OPEN, target.classList)) {
                return;
            }

            if (isHighlighted(target)) {
                const positionData = getMouseClickPosition(event);
                setHighlightId(target.dataset.id);
                // Show update toolbar.
                handleToolbarDisplay({
                    type: ToolbarType.UPDATE,
                    show: true,
                    positionData,
                });
                return;
            }

            // hide dialog
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
            {dialogState.show ? (
                <Dialog marker={marker} range={selection} id={highlightId} />
            ) : null}
            {state.update.show ? (
                <UpdateToolbar marker={marker} id={highlightId} />
            ) : null}
        </>
    );
};

export default Container;
