import React, { useContext } from 'react';
import { HIGHLIGHTER_COLORS } from '../../../constants';
import { MessageReplyIcon, DeleteIcon } from '../../../icons';
import './index.css';
import { ToolbarContext } from '../../../context';
import Marker from '../../../../marker';

interface UpdateToolbarProps {
    marker: Marker;
    id: string;
}

const UpdateToolbar = ({ marker, id }: UpdateToolbarProps) => {
    const { state, methods } = useContext(ToolbarContext);
    const { top, left } = state.update;
    const toolbarPosition = { top, left };

    const deleteHighlight = (id: string) => {
        marker.unmark(id);
        methods.dispatchUpdate({ show: false });
    };

    return (
        <>
            <div className="update-toolbar" style={toolbarPosition}>
                {' '}
                <span
                    aria-label="Make note"
                    role="button"
                    className="reply-note-btn"
                    // onClick={() => handleHighlight(color)}
                >
                    <MessageReplyIcon />
                </span>
                <span
                    aria-label="Choose color"
                    role="button"
                    className="choose-color-btn"
                    // onClick={displayColorOptions}
                    // style={{ backgroundColor: HIGHLIGHTER_COLOR_CODES[color] }}
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
