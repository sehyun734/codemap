import { BrowserRouter } from 'react-router-dom'
import { Router } from '../page/router'
import { ThemeProvider } from 'shared/provider/themeProvider'
import { MsgProvider } from 'shared/provider/msgProvider/msgProvider'
import { ModalProvider } from 'shared/provider/modalProvider/modalProvider'
import './global.css'
import './reset.css'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MsgProvider>
          <ModalProvider>
            <Router />
          </ModalProvider>
        </MsgProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
