import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router'
import { ConfiguratorProvider } from './utils';

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <ConfiguratorProvider>
        <AppRouter />
      </ConfiguratorProvider>
    </BrowserRouter>
  </StrictMode>
);
