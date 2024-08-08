import { Routes, Route } from 'react-router-dom'
import { Home } from './home/ui/home'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
