import React from 'react';
import { createRoot } from 'react-dom/client';
import "./global.css"// 导入全局样式
import App from "./dev/App"

const root = createRoot(document.getElementById('root')!);
root.render(<App/>);