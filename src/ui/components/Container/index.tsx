/** Script for listening for text selections */
import React, { useState, useEffect, useContext } from 'react';
import { CreateToolbar, UpdateToolbar } from '../';
import { ColorContext, ToolbarContext } from '../../context';
import Marker from '../../../marker';
import {
    getPosition,
    isHighlighted,
    restoreSelection,
    shouldCloseToolbar,
} from '../../utils';
import '../../../style.css';

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
const KEEP_TOOLBAR_OPEN = ['color-option', 'choose-color-btn'];

const Container = () => {
    const [selection, setSelection] = useState<Range>();
    const [highlightId, setHighlightId] = useState<string>();

    const toolbarContext = useContext(ToolbarContext);
    const colorContext = useContext(ColorContext);
    const { state, methods } = toolbarContext;

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

    const captureSelection = (event: MouseEvent) => {
        const currentSelection = document.getSelection();
        if (currentSelection && currentSelection.toString().length > 0) {
            const range = currentSelection.getRangeAt(0);
            setSelection(range);
            const positionData = getPosition(range);
            // Show create toolbar.
            handleToolbarDisplay({
                type: ToolbarType.CREATE,
                show: true,
                positionData,
            });
        } else {
            const target = event.target as HTMLSpanElement;
            if (!shouldCloseToolbar(KEEP_TOOLBAR_OPEN, target.classList)) {
                return;
            }

            if (isHighlighted(target)) {
                const positionData = getPosition(target);
                setHighlightId(target.dataset.id);
                // Show update toolbar.
                handleToolbarDisplay({
                    type: ToolbarType.UPDATE,
                    show: true,
                    positionData,
                });
                return;
            }

            // Hide both toolbars.
            handleToolbarDisplay({
                type: ToolbarType.UPDATE,
                show: false,
            });

            handleToolbarDisplay({
                type: ToolbarType.CREATE,
                show: false,
            });
        }
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
                <CreateToolbar marker={marker} range={selection} />
            ) : null}
            {state.update.show ? (
                <UpdateToolbar marker={marker} id={highlightId} />
            ) : null}
        </>
    );
};

export default Container;
