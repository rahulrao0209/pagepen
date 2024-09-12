import React from 'react';
import { ToolbarContextProvider, ColorContextProvider } from './context';
import { Container } from './components';

export default function App() {
    return (
        <ToolbarContextProvider>
            <ColorContextProvider>
                <Container />
            </ColorContextProvider>
        </ToolbarContextProvider>
    );
}
