import React, { useContext } from 'react';
import Marker from '../../../marker';
import { DialogContext } from '../../context';
import { DialogType, Position } from '../../context/dialog/interfaces';
import Comment from '../Comment';
import ColorOptionModal from '../ColorOptionModal';
import './index.css';

type DialogProps = {
    marker: Marker;
    range: Range;
    id: string;
    handleHighlightId: (id: string) => void;
    handleRange: (range: Range | null) => void;
    handleDialogDisplay: (type?: DialogType, position?: Position) => void;
};

const Dialog = ({
    marker,
    id,
    range,
    handleRange,
    handleHighlightId,
    handleDialogDisplay,
}: DialogProps) => {
    const dialogContext = useContext(DialogContext);
    const dialogPosition = dialogContext.dialogState.position;
    const { top, left } = dialogPosition;

    return (
        <dialog open className="dialog" style={{ top, left }}>
            <ColorOptionModal
                range={range}
                marker={marker}
                id={id}
                handleRange={handleRange}
                handleHighlightId={handleHighlightId}
                handleDialogDisplay={handleDialogDisplay}
            />
            <hr className="sep"></hr>
            <Comment
                range={range}
                marker={marker}
                handleRange={handleRange}
                handleHighlightId={handleHighlightId}
                handleDialogDisplay={handleDialogDisplay}
            />
        </dialog>
    );
};

export default Dialog;
