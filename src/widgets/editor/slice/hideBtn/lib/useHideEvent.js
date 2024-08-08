import { useCallback } from "react"

export const useHideEvent = (setTextareaStyle) => {
  const handleHide = useCallback(() => {
    setTextareaStyle((prev) => ({
      ...prev,
      display: prev.display === "none" ? "" : "none",
    }))
  }, [setTextareaStyle])

  return { handleHide }
}
