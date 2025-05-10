import React, { useContext } from 'react';
import Marker from '../../../marker';
import { DialogContext } from '../../context';
import { DialogType } from '../../context/dialog/interfaces';
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
};

const Dialog = ({
    marker,
    id,
    dialogType,
    range,
    handleRange,
    handleHighlightId,
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
                handleRange={handleRange}
                handleHighlightId={handleHighlightId}
            />
            <Comment
                marker={marker}
                id={id}
                dialogType={dialogType}
                // handleDialogId={handleDialogId}
                range={range}
            />
        </div>
    );
};

export default Dialog;
