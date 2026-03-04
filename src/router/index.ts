import type { Route } from '@booploops/pod-router'

export const routeTitles: Record<string, string> = {
  '/': 'Home',
  '/learn-more': 'Learn More',
  '/changelog': 'Changelog',
  '/docs': 'Documentation',
  '/products/cider': 'Cider Client',
  '/products/remote': 'Cider Remote',
}

export const routes: Route[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Home' },
  },
  {
    path: '/learn-more',
    name: 'learn-more',
    component: () => import('@/views/LearnMoreView.vue'),
    meta: { title: 'Learn More' },
  },
  {
    path: '/changelog',
    name: 'changelog',
    component: () => import('@/views/PlaceholderView.vue'),
    meta: { title: 'Changelog' },
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import('@/views/PlaceholderView.vue'),
    meta: { title: 'Documentation' },
  },
  {
    path: '/products/cider',
    name: 'cider-client',
    component: () => import('@/views/PlaceholderView.vue'),
    meta: { title: 'Cider Client' },
  },
  {
    path: '/products/remote',
    name: 'cider-remote',
    component: () => import('@/views/PlaceholderView.vue'),
    meta: { title: 'Cider Remote' },
  },
]
