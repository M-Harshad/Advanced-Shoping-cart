import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ShoppingCartProvider } from './contexts/ShopingcartContext.tsx'
import { ProductsProvider } from './contexts/ProductsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ProductsProvider>
        <ShoppingCartProvider>
           <App />
        </ShoppingCartProvider>
    </ProductsProvider>
  </StrictMode>,
)
