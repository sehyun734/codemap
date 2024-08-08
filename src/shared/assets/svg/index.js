import React from 'react'
import Fit from './fit.svg'
import Arrange from './arrange.svg'
import ArrowLeft from './arrow-left.svg'
import ArrowRight from './arrow-right.svg'
import ArrowUp from './arrow-up.svg'
import ArrowDown from './arrow-down.svg'
import Rename from './rename.svg'
import Trash from './trash.svg'
import Account from './account.svg'
import Google from './google.svg'
import Moon from './moon.svg'
import Add from './add.svg'

const createSvgComponent = (SvgComponent, name) => {
  return function SvgIcon({ width = 24, height = 24, ...props }) {
    return (
      <img
        src={SvgComponent}
        alt={`${name} icon`}
        width={width}
        height={height}
        {...props}
      />
    )
  }
}

export const svg = {
  Fit: createSvgComponent(Fit, 'Fit'),
  Arrange: createSvgComponent(Arrange, 'Arrange'),
  ArrowDown: createSvgComponent(ArrowDown, 'Arrow Down'),
  ArrowLeft: createSvgComponent(ArrowLeft, 'Arrow Left'),
  ArrowRight: createSvgComponent(ArrowRight, 'Arrow Right'),
  ArrowUp: createSvgComponent(ArrowUp, 'Arrow Up'),
  Rename: createSvgComponent(Rename, 'Rename'),
  Trash: createSvgComponent(Trash, 'Trash'),
  Account: createSvgComponent(Account, 'Account'),
  Google: createSvgComponent(Google, 'Google'),
  Moon: createSvgComponent(Moon, 'Moon'),
  Add: createSvgComponent(Add, 'Add'),
}
