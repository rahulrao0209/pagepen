import React, { useContext, useState } from 'react';
import { ColorOptionModal } from '../../';
import { ToolbarContext, ColorContext } from '../../../context';
import { MessageIcon, HighlightIcon } from '../../../icons';
import {
    HIGHLIGHTER_COLOR_CODES,
    HIGHLIGHTER_COLORS,
} from '../../../constants';
import './index.css';
import { restoreSelection } from '../../../utils';

type CreateToolbarProps = {
    modal: {
        show: boolean;
        top: number;
        left: number;
    };
    highlight: (color: HIGHLIGHTER_COLORS) => void;
    range: Range;
};

const CreateToolbar = ({ highlight, modal, range }: CreateToolbarProps) => {
    const [showColorOptions, setShowColorOptions] = useState(false);
    const colorContext = useContext(ColorContext);

    const { color } = colorContext;

    const handleHighlight = (color: HIGHLIGHTER_COLORS) => {
        if (!color) return;
        highlight(color);
    };

    const modalPosition = {
        top: modal.top,
        left: modal.left,
    };

    const displayColorOptions = (_event: any) => {
        restoreSelection(range);
        setShowColorOptions((prevOption) => !prevOption);
    };

    return (
        <>
            {showColorOptions ? (
                <ColorOptionModal
                    modal={{
                        show: true,
                        top: modal.top - 60,
                        left: modal.left,
                    }}
                />
            ) : null}
            <div className="create-toolbar" style={modalPosition}>
                <span
                    aria-label="Make note"
                    role="button"
                    className="make-note-btn"
                    onClick={() => handleHighlight(color)}
                >
                    <MessageIcon />
                </span>
                <span
                    aria-label="Highlighter"
                    role="button"
                    className="highlighter-btn"
                    onClick={() => handleHighlight(color)}
                >
                    <HighlightIcon />
                </span>
                <span
                    aria-label="Choose color"
                    role="button"
                    className="choose-color-btn"
                    onClick={displayColorOptions}
                    style={{ backgroundColor: HIGHLIGHTER_COLOR_CODES[color] }}
                ></span>
            </div>
        </>
    );
};

export default CreateToolbar;
