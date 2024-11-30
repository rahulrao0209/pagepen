import React from 'react';
import {
    ToolbarContextProvider,
    ColorContextProvider,
    DialogContextProvider,
} from './context';
import { Container } from './components';

export default function App() {
    return (
        <ToolbarContextProvider>
            <DialogContextProvider>
                <ColorContextProvider>
                    <Container />
                </ColorContextProvider>
            </DialogContextProvider>
        </ToolbarContextProvider>
    );
}
