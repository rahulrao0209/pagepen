import React, { useContext } from 'react';
import { HIGHLIGHTER_COLORS } from '../../constants';
import './index.css';
import { ColorContext } from '../../context';

type ColorOptionModalProps = {
    modal: {
        show: boolean;
        top: number;
        left: number;
    };
};

const ColorOptionModal = ({ modal }: ColorOptionModalProps) => {
    const modalPosition = {
        top: modal.top,
        left: modal.left,
    };

    const colorContext = useContext(ColorContext);
    const { selectColor } = colorContext;

    const onSelectColor = (
        event: React.MouseEvent<HTMLElement>,
        selectColor: (color: HIGHLIGHTER_COLORS) => void
    ) => {
        const target = event.target as HTMLElement;
        const color = HIGHLIGHTER_COLORS[target.dataset.color];
        if (!color) return;
        selectColor(color);
    };

    return (
        <div
            className="color-option-modal"
            aria-role="dialog"
            style={modalPosition}
            onClick={(event: React.MouseEvent<HTMLElement>) =>
                onSelectColor(event, selectColor)
            }
        >
            <span
                className="color-option yellow"
                aria-role="button"
                data-color={HIGHLIGHTER_COLORS.YELLOW}
            ></span>
            <span
                className="color-option orange"
                aria-role="button"
                data-color={HIGHLIGHTER_COLORS.ORANGE}
            ></span>
            <span
                className="color-option pink"
                aria-role="button"
                data-color={HIGHLIGHTER_COLORS.PINK}
            ></span>
            <span
                className="color-option green"
                aria-role="button"
                data-color={HIGHLIGHTER_COLORS.GREEN}
            ></span>
        </div>
    );
};

export default ColorOptionModal;
