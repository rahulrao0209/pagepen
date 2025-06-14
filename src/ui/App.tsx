import React from 'react';
import { ColorContextProvider, DialogContextProvider } from './context';
import { Container } from './components';

export default function App() {
    return (
        <DialogContextProvider>
            <ColorContextProvider>
                <Container />
            </ColorContextProvider>
        </DialogContextProvider>
    );
}
