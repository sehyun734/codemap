import { useContext } from 'react'
import { ThemeContext } from 'shared/provider/themeProvider'

export const useTheme = () => useContext(ThemeContext)
