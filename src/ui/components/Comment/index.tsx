import React, { useContext, useState } from 'react';
import { HIGHLIGHTER_COLORS } from '../../constants';
import { DialogType, Position } from '../../context/dialog/interfaces';
import Marker from '../../../marker';
import './index.css';
import { ColorContext } from '../../context';
import useHighlight from '../../hooks/useHighlight';

type CommentProps = {
    range: Range;
    marker: Marker;
    handleRange: (range: Range | null) => void;
    handleHighlightId: (id: string) => void;
    handleDialogDisplay: (type?: DialogType, position?: Position) => void;
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
    range,
    marker,
    handleRange,
    handleHighlightId,
    handleDialogDisplay,
}: CommentProps) => {
    const [comment, setComment] = useState<string>();

    const { selectColor } = useContext(ColorContext);
    const { highlight } = useHighlight({
        handleHighlightId,
        handleRange,
        handleDialogDisplay,
    });

    const handleClick = () => {
        highlight(marker, range, HIGHLIGHTER_COLORS.YELLOW);
        selectColor(HIGHLIGHTER_COLORS.YELLOW);
    };

    return (
        <div className="comment">
            <textarea
                className="comment-area"
                placeholder="Add comment..."
                value={comment}
                onClick={handleClick}
                onChange={(event) => setComment(event.target.value)}
            ></textarea>
        </div>
    );
};

export default Comment;
