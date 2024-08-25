import React from 'react';
import { createRoot } from 'react-dom/client';
import { SidePanel } from './components';
import '../style.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<SidePanel />);
