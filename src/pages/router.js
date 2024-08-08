import { Routes, Route } from 'react-router-dom'
import { Home } from './home/home'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
