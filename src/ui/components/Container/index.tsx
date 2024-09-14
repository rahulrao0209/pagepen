/** Script for listening for text selections */
import React, { useState, useEffect, useContext } from 'react';
import { CreateToolbar, UpdateToolbar } from '../';
import { ColorContext, ToolbarContext } from '../../context';
import Marker from '../../../marker';
import {
    getHighlightStyles,
    isHighlighted,
    restoreSelection,
    shouldCloseToolbar,
} from '../../utils';
import '../../../style.css';
import { HIGHLIGHTER_COLORS } from '../../constants';

const marker = new Marker();

// A list of css classes of elements that should not close the toolbar when clicked.
const KEEP_TOOLBAR_OPEN = ['color-option', 'choose-color-btn'];

const Container = () => {
    const [selection, setSelection] = useState<Range>();
    const [highlightId, setHighlightId] = useState<string>();

    const toolbarContext = useContext(ToolbarContext);
    const colorContext = useContext(ColorContext);
    const { state, methods } = toolbarContext;

    const findSelectionCoordinates = (range: Range | HTMLElement) => {
        const rects = range.getClientRects();
        if (rects.length === 0) return;
        const endRect = rects[rects.length - 1];

        return {
            show: true,
            top: endRect.bottom + window.scrollY,
            left: endRect.right + window.scrollX,
        };
    };

    const captureSelection = (event: MouseEvent) => {
        const currentSelection = document.getSelection();
        if (currentSelection && currentSelection.toString().length > 0) {
            const range = currentSelection.getRangeAt(0);
            setSelection(range);
            const toolbarData = findSelectionCoordinates(range);
            methods.dispatchCreate(toolbarData);
        } else {
            const target = event.target as HTMLSpanElement;
            if (!shouldCloseToolbar(KEEP_TOOLBAR_OPEN, target.classList)) {
                return;
            }

            if (isHighlighted(target)) {
                console.log(target);
                const toolbarData = findSelectionCoordinates(target);
                setHighlightId(target.dataset.id);
                setTimeout(() => methods.dispatchUpdate(toolbarData), 0);
                return;
            }

            setTimeout(() => methods.dispatchUpdate({ show: false }), 0);
            setTimeout(() => {
                methods.dispatchCreate({ show: false });
                setSelection(null);
            }, 0);
        }
    };

    const highlight = (color: HIGHLIGHTER_COLORS) => {
        const timestamp = Date.now();
        selection?.toString().length > 0 &&
            marker.mark(
                selection,
                getHighlightStyles(color),
                timestamp.toString()
            );
        methods.dispatchCreate({
            show: false,
        });
    };

    const deleteHighlight = () => {
        marker.unmark(highlightId);
        methods.dispatchUpdate({ show: false });
    };

    useEffect(() => {
        document.addEventListener('mouseup', captureSelection);

        return () => {
            document.removeEventListener('mouseup', captureSelection);
        };
    }, []);

    useEffect(() => {
        if (selection) restoreSelection(selection);
    }, [colorContext.color]);

    return (
        <>
            {state.create.show ? (
                <CreateToolbar
                    highlight={highlight}
                    modal={state.create}
                    range={selection}
                />
            ) : null}
            {state.update.show ? (
                <UpdateToolbar
                    toolbarData={state.update}
                    deleteHighlight={deleteHighlight}
                />
            ) : null}
        </>
    );
};

export default Container;
