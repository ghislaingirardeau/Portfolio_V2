import { boot } from 'quasar/wrappers'
import { useAnimationSettings } from 'src/stores/animationSettings'

const animationSettings = useAnimationSettings()

export default boot(({ router, redirect }) => {
  router.beforeEach((to, from, next) => {
    animationSettings.resetRobotAction()
    // if (!from.name && to.name !== 'home') {
    //   redirect('/')
    // }
    next()
  })
})
