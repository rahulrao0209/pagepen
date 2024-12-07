import React, { createContext, PropsWithChildren, useState } from 'react';
import {
    DialogContextType,
    DialogState,
    DialogType,
    Position,
} from './interfaces';

export const DialogContext = createContext<DialogContextType>(null);

const initialState: DialogState = {
    type: DialogType.CREATE,
    visible: false,
    text: '',
    position: {
        top: 0,
        left: 0,
    },
};

export const DialogContextProvider = (props: PropsWithChildren) => {
    const [dialogState, setDialogState] = useState<DialogState>(initialState);

    const displayDialog = (type: DialogType, position: Position) => {
        setDialogState({
            type,
            visible: true,
            position,
        });
    };

    const hideDialog = () => {
        setDialogState({
            ...dialogState,
            visible: false,
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
