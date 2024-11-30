export interface DialogState {
    show: boolean;
    position?: Position;
}

export interface Position {
    top: number;
    left: number;
}

export interface DialogContextType {
    dialogState: DialogState;
    displayDialog: (position: Position) => void;
    hideDialog: () => void;
}
