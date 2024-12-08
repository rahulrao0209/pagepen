import React, { createContext, PropsWithChildren, useState } from 'react';
import { HIGHLIGHTER_COLORS } from '../../constants';

interface ColorContextType {
    color: HIGHLIGHTER_COLORS;
    displayColors: boolean;
    selectColor: (color: HIGHLIGHTER_COLORS) => void;
    handleDisplayColors: (display: boolean) => void;
}

export const ColorContext = createContext<ColorContextType>(null);

export const ColorContextProvider = (props: PropsWithChildren) => {
    const [color, setColor] = useState<HIGHLIGHTER_COLORS>(
        HIGHLIGHTER_COLORS.YELLOW
    );
    const [displayColors, setDisplayColors] = useState(false);

    const selectColor = (color: HIGHLIGHTER_COLORS) => {
        setColor(color);
    };

    const handleDisplayColors = (display: boolean) => {
        setDisplayColors(display);
    };

    const providerData = {
        color,
        displayColors,
        selectColor,
        handleDisplayColors,
    };

    return (
        <ColorContext.Provider value={providerData}>
            {props.children}
        </ColorContext.Provider>
    );
};
