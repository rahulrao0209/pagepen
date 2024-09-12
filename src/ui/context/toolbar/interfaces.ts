export enum ToolbarActions {
    CREATE,
    UPDATE,
}

export interface ToolbarPayload {
    show: boolean;
    top?: number;
    left?: number;
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
}

export interface ToolbarMethods {
    dispatchCreate: (payload: ToolbarPayload) => void;
    dispatchUpdate: (payload: ToolbarPayload) => void;
}

export interface ToolbarContext {
    state: ToolbarState;
    methods: ToolbarMethods;
}

export interface ToolbarAction {
    type: ToolbarActions;
    payload: ToolbarPayload;
}
