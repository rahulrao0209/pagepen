import React from 'react';
import './index.css';

const HIGHLIGHTER_COLORS = {
    yellow: 'yellow',
    orange: 'orange',
    pink: 'pink',
    green: 'green',
};

type ColorOptionModalProps = {
    highlight: (color: string) => void;
    setShowModal: any;
};

const ColorOptionModal = ({
    highlight,
    setShowModal,
}: ColorOptionModalProps) => {
    const handleHighlight = (event) => {
        highlight(event.target.dataset.color);
        setShowModal(false);
    };

    return (
        <div className="color-option-modal" onClick={handleHighlight}>
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
