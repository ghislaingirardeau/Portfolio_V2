import { MaybeRefOrGetter } from '@vueuse/core'
import { computed, ref, toRef } from 'vue'

// COMPOSABLE SAMPLE
// Pour gérer les cas où on ne connait pas le type de l'argument Ref ou non ?

// si je veux que l'utilisateur puisse configurer le comopsable, je vais utiliser un objet qui sera optionnel
interface ConfigList {
  fallbackIndex?: number | undefined
  fallbackValue?: string | undefined
}
// si pas de config, je mets en place une config par défaut comme quoi tout est undefined
const defaultConfigList: ConfigList = {
  fallbackIndex: undefined,
  fallbackValue: undefined,
}
// FALLBACK => A faire si erreur ou si qq chose n'est pas trouvé...

// l'utilisateur a alors le choix de mettre une config ou non, mais aussi de mettre une seul propriété en config et non les 2...

export function useTestArgumentRef(list: MaybeRefOrGetter<string[]>, config?: ConfigList) {
  // Config:
  // On va alors merger l'objet: la config par défaut avec celle passé en argument
  const _config = {
    ...defaultConfigList,
    ...config,
  }

  // MaybeRefOrGetter: permet de définir l'argument si ce sera une REF ou une variable simple, pour gérer les 2 cas
  // Dans tous les cas, on va transformer ce params en REF et l'utiliser comme tel
  const _list = toRef(list)
  const activeIndex = ref(0)
  // si je veux pouvoir changer le state d'une computed
  const state = computed({
    get() {
      return _list.value[activeIndex.value]
    },
    set(value: string) {
      // regarde si la nouvelle valeur existe dans le champs des possibles (ici dans la liste)
      const foundIndex = _list.value.indexOf(value)
      if (foundIndex === -1) {
        // si cette valeur n'est pas possible renvoie une erreur
        throw Error('value not available')
      } else {
        // sinon, change l'activeIndex => comme le get() return est basé sur "activeIndex, il sera alors mise à jour
        activeIndex.value = foundIndex
      }
    },
  })
  return {
    state,
  }
}
