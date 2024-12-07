import React, { useContext, useEffect, useState } from 'react';
import { ColorContext, DialogContext } from '../../context';
import Marker from '../../../marker';
import { HIGHLIGHTER_COLORS } from '../../constants';
import { getHighlightStyles, restoreSelection } from '../../utils';
import { Delete } from '../../icons';
import './index.css';
import { DialogType } from '../../context/dialog/interfaces';

type DialogProps = {
    marker: Marker;
    id: string;
    dialogType: DialogType;
};

const Dialog = ({ marker, id, dialogType }: DialogProps) => {
    const [note, setNote] = useState<string>();
    const dialogContext = useContext(DialogContext);
    const colorContext = useContext(ColorContext);

    const dialogPosition = dialogContext.dialogState.position;
    const { top, left } = dialogPosition;
    const { color } = colorContext;

    const deleteHighlight = (id: string) => {
        if (!id) return;
        marker.unmark(id);
    };

    const addComment = (id: string) => {};

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
                <button
                    className="button--close"
                    onClick={() => deleteHighlight(id)}
                >
                    {dialogType === DialogType.CREATE ? 'Cancel' : 'Delete'}
                </button>
                <button
                    className="button--add"
                    onClick={() => {}}
                    disabled={!note}
                >
                    {dialogType === DialogType.CREATE ? 'Add' : 'Update'}
                </button>
            </div>
        </div>
    );
};

export default Dialog;
