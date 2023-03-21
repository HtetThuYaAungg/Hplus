import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { StoreProvider } from 'easy-peasy'
import store from './store'

import './App.css'


ReactDOM.createRoot(document.getElementById('root')).render(

     <StoreProvider store={store}>
    <BrowserRouter>
        <App/>
        </BrowserRouter>
    </StoreProvider>
)
    
   
