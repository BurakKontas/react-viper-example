import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routes'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}