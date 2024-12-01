import React, { useContext, useEffect, useState } from 'react';
import { ColorContext, DialogContext } from '../../context';
import Marker from '../../../marker';
import { HIGHLIGHTER_COLORS } from '../../constants';
import { getHighlightStyles, restoreSelection } from '../../utils';
import { Delete } from '../../icons';
import './index.css';

type DialogProps = {
    marker: Marker;
    range: Range;
    id: string;
};

const Dialog = ({ marker, range, id }: DialogProps) => {
    const [note, setNote] = useState<string>();
    const dialogContext = useContext(DialogContext);
    const colorContext = useContext(ColorContext);

    console.log('note: ', note);

    const dialogPosition = dialogContext.dialogState.position;
    const { hideDialog } = dialogContext;
    const { top, left } = dialogPosition;
    const { color } = colorContext;

    const deleteHighlight = (id: string) => {
        if (!id) return;
        marker.unmark(id);
    };

    return (
        <div className="dialog" style={{ top, left }}>
            <textarea
                className="comment"
                autoFocus
                placeholder="Add note..."
                value={note}
                onChange={(event) => setNote(event.target.value)}
            ></textarea>
            <div className="dialog__buttons">
                <button className="button--delete" onClick={() => {}}>
                    <Delete />
                </button>
                <button
                    className="button--close"
                    onClick={() => deleteHighlight(id)}
                >
                    Cancel
                </button>
                <button
                    className="button--add"
                    onClick={() => {}}
                    disabled={!note}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default Dialog;
