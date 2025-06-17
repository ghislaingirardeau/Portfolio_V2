import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      {
        path: '/projects/mobile',
        name: 'projects-mobile',
        component: () => import('pages/projects/mobilePage.vue'),
      },
      {
        path: '/projects/desktop',
        name: 'projects-desktop',
        component: () => import('pages/projects/desktopPage.vue'),
      },
      { path: '/aboutMe', name: 'aboutMe', component: () => import('pages/AboutMePage.vue') },
      { path: '/aboutWork', name: 'aboutWork', component: () => import('pages/AboutWorkPage.vue') },

      { path: '/stack', name: 'stack', component: () => import('pages/stackPage.vue') },
      {
        path: '/project/:id',
        name: 'project-detail',
        component: () => import('src/pages/project/ProjectDetail.vue'),
      },
      { path: '/game', name: 'game', component: () => import('pages/GamePage.vue') },
      { path: '/test', name: 'test', component: () => import('pages/testPage.vue') },

      {
        path: '/:catchAll(.*)*',
        name: 'error',
        component: () => import('pages/ErrorNotFound.vue'),
      },
    ],
  },
]

export default routes
