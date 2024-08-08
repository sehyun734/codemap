import { BrowserRouter } from 'react-router-dom'
import { Router } from '../pages/router'
import './global.css'
import 'reset-css'

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
