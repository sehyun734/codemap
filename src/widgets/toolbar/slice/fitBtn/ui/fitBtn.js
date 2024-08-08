import React from 'react'
import { asset } from 'shared/assets'
import { useFitEvent } from '../lib/useFitEvent'
import { shared } from '../../../shared'

export const FitBtn = React.memo(() => {
  const { handleFit } = useFitEvent()

  return (
    <shared.Btn onClick={handleFit}>
      <asset.svg.Fit style={{ color: 'white' }} />
    </shared.Btn>
  )
})
