import React, { useContext, useEffect, useState } from 'react';
import { TEXT } from '../../constants';
import { DialogType } from '../../context/dialog/interfaces';
import Marker from '../../../marker';
import './index.css';
import { ColorContext } from '../../context';

type CommentProps = {
    marker: Marker;
    id: string;
    dialogType: DialogType;
};

const Comment = ({ marker, id, dialogType }: CommentProps) => {
    const [comment, setComment] = useState<string>();
    const colorContext = useContext(ColorContext);

    const { color, handleDisplayColors } = colorContext;

    const deleteHighlight = (id: string) => {
        if (!id) return;
        marker.unmark(id);
    };

    const addComment = (id: string) => {};

    return (
        <>
            <div className="comment">
                <textarea
                    className="comment-area"
                    autoFocus
                    placeholder="Add comment..."
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                ></textarea>
            </div>
            <div className="dialog__buttons">
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
                    onClick={() => {}}
                    disabled={!comment}
                >
                    {dialogType === DialogType.CREATE ? TEXT.ADD : TEXT.UPDATE}
                </button>
            </div>
        </>
    );
};

export default Comment;
