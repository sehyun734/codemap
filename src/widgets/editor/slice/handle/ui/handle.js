"use client"

import React, { useRef } from "react"
import style from "./style.module.css"
import { useHandleEvents } from "../lib/useHandleEvents"
import { shared } from "../../../shared"

export const Handle = React.memo(({ textareaRef, setTextareaStyle }) => {
  const handleRef = useRef(null)
  useHandleEvents(textareaRef, setTextareaStyle, handleRef)

  return <span ref={handleRef} className={`${shared.animation} ${style.bar}`} />
})
