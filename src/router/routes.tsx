import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router'
import { Layout } from '@components/common/Layout/Layout'
import { UserList } from '@features/users/components/UserList/UserList'

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <UserList />,
})

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: () => <UserList />,
})

export const routeTree = rootRoute.addChildren([indexRoute, usersRoute])