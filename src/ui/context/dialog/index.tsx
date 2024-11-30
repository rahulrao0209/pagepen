import React, { createContext, PropsWithChildren, useState } from 'react';
import { DialogContextType, DialogState, Position } from './interfaces';

export const DialogContext = createContext<DialogContextType>(null);

const initialState: DialogState = {
    show: false,
    position: {
        top: 0,
        left: 0,
    },
};

export const DialogContextProvider = (props: PropsWithChildren) => {
    const [dialogState, setDialogState] = useState<DialogState>(initialState);

    const displayDialog = (position: Position) => {
        setDialogState({
            show: true,
            position,
        });
    };

    const hideDialog = () => {
        setDialogState({
            ...dialogState,
            show: false,
        });
    };

    const providerData: DialogContextType = {
        dialogState,
        displayDialog,
        hideDialog,
    };

    return (
        <DialogContext.Provider value={providerData}>
            {props.children}
        </DialogContext.Provider>
    );
};
