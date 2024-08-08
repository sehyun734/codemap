import { BrowserRouter } from 'react-router-dom'
import { Router } from '../pages/router'
import { ThemeProvider } from 'shared/provider/themeProvider'
import './global.css'
import './reset.css'

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
