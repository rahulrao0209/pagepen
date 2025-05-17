import { useContext } from 'react';
import Marker from '../../marker';
import { ColorContext } from '../context';
import { getHighlightStyles } from '../utils';
import { HIGHLIGHTER_COLORS } from '../constants';

const useHighlight = ({
    handleHighlightId,
    handleRange,
    handleDialogDisplay,
}) => {
    const colorContext = useContext(ColorContext);
    const { selectColor } = colorContext;

    const highlight = (
        marker: Marker,
        range: Range,
        color: HIGHLIGHTER_COLORS
    ) => {
        const timestamp = Date.now().toString();
        range?.toString().length > 0 &&
            marker.mark(range, getHighlightStyles(color), timestamp.toString());

        range.collapse();
        handleHighlightId(timestamp);
        handleRange(null);
    };

    const deleteHighlight = (id: string, marker: Marker) => {
        console.log('Delete highlight with id: ', id);
        if (!id) return;
        marker.unmark(id);
        selectColor(null);
        handleDialogDisplay(); // close dialog
    };

    const updateHighlight = (id: string, color: HIGHLIGHTER_COLORS) => {
        const nodes = document.querySelectorAll(`[data-id="${id}"]`);
        if (!nodes.length) return;

        nodes.forEach((node) => {
            node.classList.forEach((classname: string) => {
                if (classname.includes('highlight-')) {
                    node.classList.remove(classname);
                    node.classList.add(`highlight-${color.toLowerCase()}`);
                }
            });
        });
    };

    return {
        highlight,
        updateHighlight,
        deleteHighlight,
    };
};

export default useHighlight;
