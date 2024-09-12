import React, { createContext, PropsWithChildren, useState } from 'react';
import { HIGHLIGHTER_COLORS } from '../../constants';

interface ColorContextType {
    color: HIGHLIGHTER_COLORS;
    selectColor: (color: HIGHLIGHTER_COLORS) => void;
}

export const ColorContext = createContext<ColorContextType>(null);

export const ColorContextProvider = (props: PropsWithChildren) => {
    const [color, setColor] = useState<HIGHLIGHTER_COLORS>(
        HIGHLIGHTER_COLORS.YELLOW
    );

    const selectColor = (color: HIGHLIGHTER_COLORS) => {
        setColor(color);
    };

    const providerData = {
        color,
        selectColor,
    };

    return (
        <ColorContext.Provider value={providerData}>
            {props.children}
        </ColorContext.Provider>
    );
};
