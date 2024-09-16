import React, { useContext, useEffect } from 'react';
import { useColorOptions } from '../hooks';
import { ColorContext, ToolbarContext } from '../../../context';
import Marker from '../../../../marker';
import { ColorOptionModal } from '../..';
import { MessageReplyIcon, DeleteIcon } from '../../../icons';
import { HIGHLIGHTER_COLOR_CODES } from '../../../constants';
import './index.css';

interface UpdateToolbarProps {
    marker: Marker;
    id: string;
}

const UpdateToolbar = ({ marker, id }: UpdateToolbarProps) => {
    const toolbarContext = useContext(ToolbarContext);
    const colorContext = useContext(ColorContext);
    const colorOptions = useColorOptions();

    const { color } = colorContext;
    const { state, methods } = toolbarContext;
    const { top, left } = state.update;
    const { showColorOptions, toggleColorOptions } = colorOptions;
    const toolbarPosition = { top, left };

    const deleteHighlight = (id: string) => {
        marker.unmark(id);
        methods.dispatchUpdate({ show: false });
    };

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
        <>
            {showColorOptions ? (
                <ColorOptionModal
                    modal={{
                        show: true,
                        top: toolbarPosition.top - 60,
                        left: toolbarPosition.left,
                    }}
                />
            ) : null}
            <div className="update-toolbar" style={toolbarPosition}>
                {' '}
                <span
                    aria-label="Make note"
                    role="button"
                    className="reply-note-btn"
                >
                    <MessageReplyIcon />
                </span>
                <span
                    aria-label="Choose color"
                    role="button"
                    className="choose-color-btn"
                    onClick={() => toggleColorOptions()}
                    style={{ backgroundColor: HIGHLIGHTER_COLOR_CODES[color] }}
                ></span>
                <span
                    aria-label="Delete higlight"
                    role="button"
                    className="delete-btn"
                    onClick={() => deleteHighlight(id)}
                >
                    <DeleteIcon />
                </span>
            </div>
        </>
    );
};

export default UpdateToolbar;
