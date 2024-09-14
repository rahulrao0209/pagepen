import React, { useContext, useState } from 'react';
import { ColorOptionModal } from '../../';
import { ToolbarContext, ColorContext } from '../../../context';
import { MessageIcon, HighlightIcon } from '../../../icons';
import {
    HIGHLIGHTER_COLOR_CODES,
    HIGHLIGHTER_COLORS,
} from '../../../constants';
import './index.css';
import { getHighlightStyles, restoreSelection } from '../../../utils';
import Marker from '../../../../marker';

type CreateToolbarProps = {
    marker: Marker;
    range: Range;
};

const CreateToolbar = ({ marker, range }: CreateToolbarProps) => {
    const [showColorOptions, setShowColorOptions] = useState(false);
    const colorContext = useContext(ColorContext);
    const toolbarContext = useContext(ToolbarContext);

    const { color } = colorContext;
    const { state, methods } = toolbarContext;

    const toolbarPosition = {
        top: state.create.top,
        left: state.create.left,
    };

    const highlight = (color: HIGHLIGHTER_COLORS) => {
        const timestamp = Date.now();
        range?.toString().length > 0 &&
            marker.mark(range, getHighlightStyles(color), timestamp.toString());
        methods.dispatchCreate({
            show: false,
        });
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
                        top: toolbarPosition.top - 60,
                        left: toolbarPosition.left,
                    }}
                />
            ) : null}
            <div className="create-toolbar" style={toolbarPosition}>
                <span
                    aria-label="Make note"
                    role="button"
                    className="make-note-btn"
                    onClick={() => highlight(color)}
                >
                    <MessageIcon />
                </span>
                <span
                    aria-label="Highlighter"
                    role="button"
                    className="highlighter-btn"
                    onClick={() => highlight(color)}
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
