import { BrowserRouter as Router } from 'react-router-dom'

import { Routes } from './routes'

import { GlobalStyles } from './styles/global'

export function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes />
      </Router>
    </>
  )
}
