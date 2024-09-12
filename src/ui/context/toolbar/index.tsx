/** Decides which toolbar needs to be shown. */
import React, { createContext, PropsWithChildren, useReducer } from 'react';
import {
    ToolbarActions,
    ToolbarContext as ToolbarContextType,
    ToolbarPayload,
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
};

export const ToolbarContext = createContext<ToolbarContextType>(null);

export const ToolbarContextProvider = (props: PropsWithChildren) => {
    const [state, dispatch] = useReducer(toolbarReducer, initialState);

    const dispatchCreate = (payload: ToolbarPayload) => {
        dispatch({
            type: ToolbarActions.CREATE,
            payload,
        });
    };

    const dispatchUpdate = (payload: ToolbarPayload) => {
        dispatch({
            type: ToolbarActions.UPDATE,
            payload,
        });
    };

    const providerData: ToolbarContextType = {
        state,
        methods: {
            dispatchCreate,
            dispatchUpdate,
        },
    };

    return (
        <ToolbarContext.Provider value={providerData}>
            {props.children}
        </ToolbarContext.Provider>
    );
};
