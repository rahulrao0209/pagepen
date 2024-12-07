export enum DialogType {
    CREATE,
    UPDATE,
}

export interface DialogState {
    type: DialogType;
    visible: boolean;
    text?: string;
    position?: Position;
}

export interface Position {
    top: number;
    left: number;
}

export interface DialogContextType {
    dialogState: DialogState;
    displayDialog: (type: DialogType, position: Position) => void;
    hideDialog: () => void;
}
