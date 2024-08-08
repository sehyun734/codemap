import { BrowserRouter } from 'react-router-dom'
import { Router } from '../page/router'
import { ThemeProvider } from 'shared/provider/themeProvider'
import './global.css'
import './reset.css'
import { MsgProvider } from 'shared/provider/msgProvider/msgProvider'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MsgProvider>
          <Router />
        </MsgProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
