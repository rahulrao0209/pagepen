import React from 'react';
import { HIGHLIGHTER_COLORS } from '../../../constants';
import { MessageReplyIcon, DeleteIcon } from '../../../icons';
import './index.css';

interface UpdateToolbarProps {
    toolbarData: {
        show: boolean;
        top: number;
        left: number;
    };
    deleteHighlight: () => void;
}

const UpdateToolbar = ({
    toolbarData,
    deleteHighlight,
}: UpdateToolbarProps) => {
    const { top, left } = toolbarData;
    const toolbarPosition = { top, left };

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
                    onClick={deleteHighlight}
                >
                    <DeleteIcon />
                </span>
            </div>
        </>
    );
};

export default UpdateToolbar;
