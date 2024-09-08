import React from 'react';
import { ToolbarContextProvider } from './context';
import { Container } from './components';

export default function App() {
    return (
        <ToolbarContextProvider>
            <Container />
        </ToolbarContextProvider>
    );
}
