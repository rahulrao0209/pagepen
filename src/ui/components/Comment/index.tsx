import React, { useContext, useEffect, useState } from 'react';
import { HIGHLIGHTER_COLORS, TEXT } from '../../constants';
import { DialogType } from '../../context/dialog/interfaces';
import Marker from '../../../marker';
import './index.css';
import { ColorContext } from '../../context';

type CommentProps = {
    marker: Marker;
    id: string;
    dialogType: DialogType;
    // setHighlightId: any;
    range: any;
};

export const getHighlightStyles = (color: HIGHLIGHTER_COLORS) => {
    const styles = ['cursor-pointer'];

    switch (color) {
        case HIGHLIGHTER_COLORS.YELLOW:
            styles.push('highlight-yellow');
            break;
        case HIGHLIGHTER_COLORS.ORANGE:
            styles.push('highlight-orange');
            break;
        case HIGHLIGHTER_COLORS.PINK:
            styles.push('highlight-pink');
            break;
        case HIGHLIGHTER_COLORS.GREEN:
            styles.push('highlight-green');
            break;
        default:
            styles.push('highlight-orange');
    }

    return styles;
};

const Comment = ({
    marker,
    id,
    dialogType,
    // setHighlightId,
    range,
}: CommentProps) => {
    const [comment, setComment] = useState<string>();
    const colorContext = useContext(ColorContext);

    const { color } = colorContext;

    const deleteHighlight = (id: string) => {
        if (!id) return;
        marker.unmark(id);
    };

    const highlight = (range: Range, color: HIGHLIGHTER_COLORS) => {
        console.log('range: ', range);
        const timestamp = Date.now();
        range?.toString().length > 0 &&
            marker.mark(range, getHighlightStyles(color), timestamp.toString());
        // setHighlightId(timestamp.toString());
    };

    const addComment = (id: string) => {};

    return (
        <>
            <div className="comment">
                <textarea
                    className="comment-area"
                    // autoFocus
                    placeholder="Add comment..."
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                ></textarea>
            </div>
            {/* <div className="dialog__buttons">
                <button
                    className="button--colors"
                    onClick={() => handleDisplayColors(true)}
                >
                    Colors
                </button>
                <button
                    className="button--close"
                    onClick={() => deleteHighlight(id)}
                >
                    {dialogType === DialogType.CREATE
                        ? TEXT.CANCEL
                        : TEXT.DELETE}
                </button>
                <button
                    className="button--add"
                    onClick={() => highlight(range, HIGHLIGHTER_COLORS.INITIAL)}
                    disabled={!comment}
                >
                    {dialogType === DialogType.CREATE ? TEXT.ADD : TEXT.UPDATE}
                </button>
            </div> */}
        </>
    );
};

export default Comment;
