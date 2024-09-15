import { ToolbarAction, ToolbarActions, ToolbarState } from './interfaces';

const toolbarReducer = (
    state: ToolbarState,
    action: ToolbarAction
): ToolbarState => {
    switch (action.type) {
        case ToolbarActions.CREATE:
            return {
                ...state,
                create: {
                    ...state.create,
                    show: action.payload.show,
                    left: action.payload.left,
                    top: action.payload.top,
                },
                update: {
                    ...state.update,
                    show: false,
                },
            };
        case ToolbarActions.UPDATE:
            return {
                ...state,
                create: {
                    ...state.create,
                    show: false,
                },
                update: {
                    ...state.update,
                    show: action.payload.show,
                    left: action.payload.left,
                    top: action.payload.top,
                },
            };
        default:
            return state;
    }
};

export default toolbarReducer;
