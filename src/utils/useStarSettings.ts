import { computed } from 'vue'
import { useQuasar } from 'quasar'

export function useStarSettings() {
  const $q = useQuasar()

  const radientColorStart = computed(() => {
    return $q.dark.isActive
      ? `radial-gradient(
        hsl(27, 91%, 61%),
        hsl(11, 100%, 58%) 10%,
        hsla(180, 100%, 80%, 0) 40%
      )`
      : `radial-gradient(hsl(6, 94%, 35%), hsl(10, 89%, 55%) 10%, hsla(180, 100%, 80%, 0) 56%);`
  })

  const radientColorEnd = computed(() => {
    return $q.dark.isActive
      ? `radial-gradient(
        hsl(186, 89%, 86%),
        hsl(186, 89%, 86%) 10%,
        hsla(180, 100%, 80%, 0) 56%
      )`
      : `radial-gradient(
      hsl(228, 94%, 35%),
      hsl(225, 100%, 28%) 10%,
      hsla(180, 100%, 80%, 0) 56%
    )`
  })

  return {
    radientColorStart,
    radientColorEnd,
  }
}
