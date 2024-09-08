import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../ui/App';

const domNode = document.createElement('div');
domNode.id = 'react-root';
document.body.append(domNode);
const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(<App />);
