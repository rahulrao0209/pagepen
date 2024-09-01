import React, { useEffect } from 'react';
import './index.css';

const HIGHLIGHTER_COLORS = {
    yellow: 'yellow',
    orange: 'orange',
    pink: 'pink',
    green: 'green',
};

type ColorOptionModalProps = {
    modal: {
        show: boolean;
        top: number;
        left: number;
    };
    highlight: (color: string) => void;
};

const ColorOptionModal = ({ highlight, modal }: ColorOptionModalProps) => {
    const handleHighlight = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const color = target.dataset.color;
        if (!color) return;
        highlight(color);
    };

    const modalPosition = {
        top: modal.top,
        left: modal.left,
    };

    return (
        <div
            className="color-option-modal"
            aria-role="dialog"
            onClick={handleHighlight}
            style={modalPosition}
        >
            <span
                className="color-option yellow"
                aria-role="button"
                data-color={HIGHLIGHTER_COLORS.yellow}
            ></span>
            <span
                className="color-option orange"
                aria-role="button"
                data-color={HIGHLIGHTER_COLORS.orange}
            ></span>
            <span
                className="color-option pink"
                aria-role="button"
                data-color={HIGHLIGHTER_COLORS.pink}
            ></span>
            <span
                className="color-option green"
                aria-role="button"
                data-color={HIGHLIGHTER_COLORS.green}
            ></span>
        </div>
    );
};

export default ColorOptionModal;
