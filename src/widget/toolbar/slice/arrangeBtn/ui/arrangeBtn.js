import React from 'react'
import { asset } from 'shared/asset'
import { useArrangeEvent } from '../lib/useArrangeEvent'
import { shared } from '../../../shared'

export const ArrangeBtn = React.memo(() => {
  const { handleArrange } = useArrangeEvent()

  return (
    <shared.Btn onClick={handleArrange}>
      <asset.svg.Arrange />
    </shared.Btn>
  )
})
