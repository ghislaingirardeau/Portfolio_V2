import { boot } from 'quasar/wrappers'

export default boot(({ router, redirect }) => {
  router.beforeEach((to, from, next) => {
    if (!from.name && to.name !== 'home') {
      redirect('/')
    }
    next()
  })
})
