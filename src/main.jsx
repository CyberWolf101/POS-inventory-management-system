import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle"
import './StyleSheets/index.css'
import './StyleSheets/responsive.css'
import './StyleSheets/animation.css'
import './StyleSheets/admin.css'
import './StyleSheets/dashboard.css'
import { ChakraProvider } from '@chakra-ui/react';
import UserContextProvider from './contexts/userContext';
import PriceContextProvider from './contexts/priceContext'
import ThemeContextProvider from './contexts/themeContext'
import SubContextProvider from './contexts/subContext'
import InventoryDataContextProvider from './contexts/inventoryDataContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ChakraProvider>
    <ThemeContextProvider>
      <UserContextProvider>
        <SubContextProvider>
          <InventoryDataContextProvider>
            <PriceContextProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </PriceContextProvider>
          </InventoryDataContextProvider>
        </SubContextProvider>
      </UserContextProvider>
    </ThemeContextProvider>
  </ChakraProvider>
)

