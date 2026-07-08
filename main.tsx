import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ignore benign Vite HMR websocket connection errors in AI Studio preview iframe
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason?.message || String(event.reason || "");
    if (
      reason.includes("WebSocket") ||
      reason.includes("websocket") ||
      reason.includes("vite") ||
      reason.includes("WS")
    ) {
      event.preventDefault();
    }
  });

  window.addEventListener("error", (event) => {
    const msg = event.message || "";
    if (
      msg.includes("WebSocket") || 
      msg.includes("websocket") || 
      msg.includes("vite")
    ) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
