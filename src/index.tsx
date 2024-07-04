
import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './ui/popup/Popup';


const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<Popup />)