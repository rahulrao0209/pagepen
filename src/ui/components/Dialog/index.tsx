import React, { useContext } from 'react';
import Marker from '../../../marker';
import { DialogContext } from '../../context';
import { DialogType, Position } from '../../context/dialog/interfaces';
import Comment from '../Comment';
import './index.css';
import ColorOptionModal from '../ColorOptionModal';

type DialogProps = {
    marker: Marker;
    range: Range;
    id: string;
    dialogType: DialogType;
    handleHighlightId: (id: string) => void;
    handleRange: (range: Range | null) => void;
    handleDialogDisplay: (type?: DialogType, position?: Position) => void;
};

const Dialog = ({
    marker,
    id,
    dialogType,
    range,
    handleRange,
    handleHighlightId,
    handleDialogDisplay,
}: DialogProps) => {
    const dialogContext = useContext(DialogContext);
    const dialogPosition = dialogContext.dialogState.position;
    const { top, left } = dialogPosition;

    return (
        <div className="dialog" style={{ top, left }}>
            <ColorOptionModal
                range={range}
                marker={marker}
                id={id}
                dialogType={dialogType}
                handleRange={handleRange}
                handleHighlightId={handleHighlightId}
                handleDialogDisplay={handleDialogDisplay}
            />
            <Comment
                range={range}
                marker={marker}
                handleRange={handleRange}
                handleHighlightId={handleHighlightId}
                handleDialogDisplay={handleDialogDisplay}
            />
        </div>
    );
};

export default Dialog;
