export enum ToolbarActions {
    DISPLAY_CREATE,
    DISPLAY_UPDATE,
    DISPLAY_COLORS,
    HIDE_CREATE,
    HIDE_UPDATE,
}

export interface ToolbarState {
    create: {
        show: boolean;
        top: number;
        left: number;
    };
    update: {
        show: boolean;
        top: number;
        left: number;
    };
    colors: {
        show: boolean;
        top: number;
        left: number;
    };
}

export interface ToolbarMethods {
    dispatchCreate: () => void;
    dispatchUpdate: () => void;
    dispatchColors: () => void;
}

export interface ToolbarContext {
    state: ToolbarState;
    methods: ToolbarMethods;
}

export interface ToolbarAction {
    type: ToolbarActions;
    payload: {
        show: boolean;
        top?: number;
        left?: number;
    };
}
