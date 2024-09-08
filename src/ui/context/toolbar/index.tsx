/** Decides which toolbar needs to be shown. */
import React, { createContext, PropsWithChildren, useReducer } from 'react';
import {
    ToolbarContext as ToolbarContextType,
    ToolbarState,
} from './interfaces';
import toolbarReducer from './reducer';

const initialState: ToolbarState = {
    create: {
        show: false,
        top: 0,
        left: 0,
    },
    update: {
        show: false,
        top: 0,
        left: 0,
    },
    colors: {
        show: false,
        top: 0,
        left: 0,
    },
};

export const ToolbarContext = createContext<ToolbarContextType>(null);

export const ToolbarContextProvider = (props: PropsWithChildren) => {
    const [state, dispatch] = useReducer(toolbarReducer, initialState);

    const dispatchCreate = () => {};
    const dispatchUpdate = () => {};
    const dispatchColors = () => {};

    const providerData: ToolbarContextType = {
        state,
        methods: {
            dispatchCreate,
            dispatchUpdate,
            dispatchColors,
        },
    };

    return (
        <ToolbarContext.Provider value={providerData}>
            {props.children}
        </ToolbarContext.Provider>
    );
};
