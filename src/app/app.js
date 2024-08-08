import { BrowserRouter } from 'react-router-dom'
import { Router } from '../pages/router'
import './global.css'
import 'reset-css'
import { ThemeProvider } from 'shared/provider/themeProvider'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
