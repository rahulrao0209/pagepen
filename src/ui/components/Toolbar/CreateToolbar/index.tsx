import React from 'react';
import { MessageIcon, HighlightIcon } from '../../../icons';
import './index.css';
import { HIGHLIGHTER_COLORS } from '../../../constants';

type CreateToolbarProps = {
    modal: {
        show: boolean;
        top: number;
        left: number;
    };
    highlight: (color: string) => void;
};

const CreateToolbar = ({ highlight, modal }: CreateToolbarProps) => {
    const handleHighlight = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const color = target.dataset.color;
        console.log('color: ', color);
        if (!color) return;
        highlight(color);
    };

    const modalPosition = {
        top: modal.top,
        left: modal.left,
    };

    return (
        <div
            className="create-toolbar"
            style={modalPosition}
            onClick={handleHighlight}
        >
            <span
                aria-label="Make note"
                role="button"
                className="make-note-btn"
                data-color={HIGHLIGHTER_COLORS.yellow}
            >
                <MessageIcon data-color={HIGHLIGHTER_COLORS.yellow} />
            </span>
            <span
                aria-label="Highlighter"
                role="button"
                className="highlighter-btn"
                data-color={HIGHLIGHTER_COLORS.yellow}
            >
                <HighlightIcon data-color={HIGHLIGHTER_COLORS.yellow} />
            </span>
            <span
                aria-label="Choose color"
                role="button"
                className="choose-color-btn"
                data-color={HIGHLIGHTER_COLORS.yellow}
            ></span>
        </div>
    );
};

export default CreateToolbar;
