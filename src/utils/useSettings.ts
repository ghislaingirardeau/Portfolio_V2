import { ref } from 'vue'
export const PACMAN_SPEED = 0.05

export const PACMAN_LEVEL_GRID = ref([
  {
    x: 1,
    y: [
      { key: 'a', isBlock: false, point: 10 },
      { key: 'b', isBlock: false, point: 10 },
      { key: 'c', isBlock: false, point: 10 },
      { key: 'd', isBlock: false, point: 10 },
      { key: 'e', isBlock: false, point: 10 },
      { key: 'f', isBlock: false, point: 10 },
      { key: 'g', isBlock: false, point: 10 },
      { key: 'h', isBlock: false, point: 10 },
    ],
  },
  {
    x: 2,
    y: [
      { key: 'a', isBlock: false, point: 10 },
      { key: 'b', isBlock: true, point: 0 },
      { key: 'c', isBlock: false, point: 10 },
      { key: 'd', isBlock: true, point: 0 },
      { key: 'e', isBlock: false, point: 10 },
      { key: 'f', isBlock: true, point: 0 },
      { key: 'g', isBlock: true, point: 0 },
      { key: 'h', isBlock: false, point: 10 },
    ],
  },
  {
    x: 3,
    y: [
      { key: 'a', isBlock: false, point: 10 },
      { key: 'b', isBlock: true, point: 0 },
      { key: 'c', isBlock: false, point: 10 },
      { key: 'd', isBlock: true, point: 0 },
      { key: 'e', isBlock: false, point: 10 },
      { key: 'f', isBlock: false, point: 10 },
      { key: 'g', isBlock: false, point: 10 },
      { key: 'h', isBlock: false, point: 10 },
    ],
  },
  {
    x: 4,
    y: [
      { key: 'a', isBlock: false, point: 10 },
      { key: 'b', isBlock: true, point: 0 },
      { key: 'c', isBlock: false, point: 10 },
      { key: 'd', isBlock: true, point: 0 },
      { key: 'e', isBlock: false, point: 10 },
      { key: 'f', isBlock: false, point: 10 },
      { key: 'g', isBlock: true, point: 0 },
      { key: 'h', isBlock: false, point: 10 },
    ],
  },
  {
    x: 5,
    y: [
      { key: 'a', isBlock: false, point: 10 },
      { key: 'b', isBlock: false, point: 10 },
      { key: 'c', isBlock: false, point: 10 },
      { key: 'd', isBlock: true, point: 0 },
      { key: 'e', isBlock: true, point: 0 },
      { key: 'f', isBlock: false, point: 10 },
      { key: 'g', isBlock: false, point: 10 },
      { key: 'h', isBlock: false, point: 10 },
    ],
  },
  {
    x: 6,
    y: [
      { key: 'a', isBlock: false, point: 10 },
      { key: 'b', isBlock: false, point: 10 },
      { key: 'c', isBlock: false, point: 10 },
      { key: 'd', isBlock: false, point: 10 },
      { key: 'e', isBlock: false, point: 10 },
      { key: 'f', isBlock: false, point: 10 },
      { key: 'g', isBlock: true, point: 0 },
      { key: 'h', isBlock: false, point: 10 },
    ],
  },
  {
    x: 7,
    y: [
      { key: 'a', isBlock: false, point: 10 },
      { key: 'b', isBlock: true, point: 0 },
      { key: 'c', isBlock: true, point: 0 },
      { key: 'd', isBlock: true, point: 0 },
      { key: 'e', isBlock: true, point: 0 },
      { key: 'f', isBlock: false, point: 10 },
      { key: 'g', isBlock: true, point: 0 },
      { key: 'h', isBlock: false, point: 10 },
    ],
  },
  {
    x: 8,
    y: [
      { key: 'a', isBlock: false, point: 10 },
      { key: 'b', isBlock: false, point: 10 },
      { key: 'c', isBlock: false, point: 10 },
      { key: 'd', isBlock: false, point: 10 },
      { key: 'e', isBlock: false, point: 10 },
      { key: 'f', isBlock: false, point: 10 },
      { key: 'g', isBlock: false, point: 10 },
      { key: 'h', isBlock: false, point: 10 },
    ],
  },
])
