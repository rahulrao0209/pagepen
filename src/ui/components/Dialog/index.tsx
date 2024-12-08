import React, { useContext, useEffect } from 'react';
import Marker from '../../../marker';
import { ColorContext, DialogContext } from '../../context';
import { DialogType } from '../../context/dialog/interfaces';
import Comment from '../Comment';
import './index.css';
import ColorOptionModal from '../ColorOptionModal';

type DialogProps = {
    marker: Marker;
    id: string;
    dialogType: DialogType;
};

const Dialog = ({ marker, id, dialogType }: DialogProps) => {
    const dialogContext = useContext(DialogContext);
    const colorContext = useContext(ColorContext);

    const dialogPosition = dialogContext.dialogState.position;
    const { top, left } = dialogPosition;

    const { color, displayColors } = colorContext;

    // Update the highlighted node's color when a new color is chosen.
    useEffect(() => {
        const nodes = document.querySelectorAll(`[data-id="${id}"]`);
        if (!nodes.length) return;

        nodes.forEach((node) => {
            node.classList.forEach((classname: string) => {
                if (classname.includes('highlight-')) {
                    node.classList.remove(classname);
                    node.classList.add(`highlight-${color.toLowerCase()}`);
                }
            });
        });
    }, [color]);

    return (
        <div className="dialog" style={{ top, left }}>
            {!displayColors ? (
                <Comment marker={marker} id={id} dialogType={dialogType} />
            ) : (
                <ColorOptionModal />
            )}
        </div>
    );
};

export default Dialog;
