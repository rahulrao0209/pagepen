import React from 'react';
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
    const handleHighlight = (event: React.MouseEvent<HTMLSpanElement>) => {
        const target = event.target as HTMLSpanElement;
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
            onClick={handleHighlight}
            style={modalPosition}
        >
            <span
                className="color-option yellow"
                data-color={HIGHLIGHTER_COLORS.yellow}
            ></span>
            <span
                className="color-option orange"
                data-color={HIGHLIGHTER_COLORS.orange}
            ></span>
            <span
                className="color-option pink"
                data-color={HIGHLIGHTER_COLORS.pink}
            ></span>
            <span
                className="color-option green"
                data-color={HIGHLIGHTER_COLORS.green}
            ></span>
        </div>
    );
};

export default ColorOptionModal;
