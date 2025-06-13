import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Public/Public.jsx'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/Store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>
      <App></App>
    </RouterProvider>
    </Provider>
  </StrictMode>,
)
