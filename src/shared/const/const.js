export const CONST = {
  GRID_SIZE: 33,

  ZOOM_SPEED: 0.00015,

  MIN_ZOOM: 0.25,
  MAX_ZOOM: 1.3,

  FADE_THRESHOLD: 0.1,
  MAX_OPACITY: 50,
  MIN_OPACITY: 2,

  CONN_WIDTH: 2,
  ARROW_SIZE: 10,
  CONN_SPACE: 22,

  NODE_SPACE: 66,

  MIN_EDITOR_WIDTH: 200,
  get MAX_EDITOR_WIDTH() {
    return window.innerWidth / 2
  },
}
