import React from 'react'
import { asset } from 'shared/asset'
import { useArrange } from '../lib/useArrange'
import { shared } from '../../../shared'

export const ArrangeBtn = React.memo(() => {
  const { handleArrange } = useArrange()

  return (
    <shared.Btn onClick={handleArrange}>
      <asset.svg.Arrange />
    </shared.Btn>
  )
})
