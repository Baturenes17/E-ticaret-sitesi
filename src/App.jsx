import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import ProductList from './components/ProductList'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import { Drawer } from '@mui/material'
import Drawerr from './components/Drawerr'
import Snackbarr from './components/Snackbarr'

function App() {
  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawerr />
        <Snackbarr />
      </PageContainer>
    </div>
  )
}

export default App
