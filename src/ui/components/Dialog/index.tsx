import React, { useContext, useEffect } from 'react';
import './index.css';
import { ColorContext, DialogContext } from '../../context';
import Marker from '../../../marker';
import { HIGHLIGHTER_COLORS } from '../../constants';
import { getHighlightStyles, restoreSelection } from '../../utils';

type DialogProps = {
    marker: Marker;
    range: Range;
};

const Dialog = ({ marker, range }: DialogProps) => {
    const dialogContext = useContext(DialogContext);
    const colorContext = useContext(ColorContext);

    const dialogPosition = dialogContext.dialogState.position;
    const { hideDialog } = dialogContext;
    const { top, left } = dialogPosition;
    const { color } = colorContext;

    console.log('Range: ', range);

    const highlight = (color: HIGHLIGHTER_COLORS) => {
        const timestamp = Date.now();
        range?.toString().length > 0 &&
            marker.mark(range, getHighlightStyles(color), timestamp.toString());

        hideDialog();
    };

    // useEffect(() => {
    //     if (range) restoreSelection(range);
    // }, [colorContext.color]);

    return (
        <div className="dialog" style={{ top, left }}>
            <textarea className="comment"></textarea>
            <div className="dialog__buttons">
                <button className="button--delete">Delete</button>
                <button className="button--close">Close</button>
                <button
                    className="button--add"
                    onClick={() => highlight(color)}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default Dialog;
