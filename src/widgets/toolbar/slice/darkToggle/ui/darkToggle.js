import { useTheme } from 'shared/hook/useTheme'
import { shared } from '../../../shared'
import { asset } from 'shared/assets'

export const DarkToggle = () => {
  const { handleTheme, isDark } = useTheme()
  return (
    <shared.Btn onClick={handleTheme}>
      {isDark ? <asset.svg.Sun /> : <asset.svg.Moon />}
    </shared.Btn>
  )
}
