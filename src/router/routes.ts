import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      {
        path: '/projects',
        name: 'project',
        component: () => import('pages/ProjectsPage.vue'),
      },
      { path: '/aboutMe', name: 'aboutMe', component: () => import('pages/AboutMePage.vue') },
      { path: '/aboutWork', name: 'aboutWork', component: () => import('pages/AboutWorkPage.vue') },

      { path: '/stack', name: 'stack', component: () => import('pages/stackPage.vue') },
      {
        path: '/project/:id',
        name: 'project-detail',
        component: () => import('src/pages/project/ProjectDetail.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
