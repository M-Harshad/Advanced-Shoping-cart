import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ShopingCartprovider } from './contexts/ShopingcartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShopingCartprovider>
    <App />
    </ShopingCartprovider>
  </StrictMode>,
)
