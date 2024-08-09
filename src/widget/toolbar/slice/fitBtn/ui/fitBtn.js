import React from 'react'
import { asset } from 'shared/asset'
import { useFit } from '../lib/useFit'
import { shared } from '../../../shared'

export const FitBtn = React.memo(() => {
  const { handleFit } = useFit()

  return (
    <shared.Btn onClick={handleFit}>
      <asset.svg.Fit style={{ color: 'white' }} />
    </shared.Btn>
  )
})
