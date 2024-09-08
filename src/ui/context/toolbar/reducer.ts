import {
    ToolbarAction,
    ToolbarActions,
    ToolbarContext,
    ToolbarState,
} from './interfaces';

const toolbarReducer = (
    state: ToolbarState,
    action: ToolbarAction
): ToolbarState => {
    switch (action.type) {
        case ToolbarActions.DISPLAY_CREATE:
            return state;
        case ToolbarActions.DISPLAY_UPDATE:
            return state;
        case ToolbarActions.DISPLAY_COLORS:
            return state;
        default:
            return state;
    }
};

export default toolbarReducer;
