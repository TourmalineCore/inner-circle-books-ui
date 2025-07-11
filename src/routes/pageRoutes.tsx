import { addBookRoutes, allBooksRoutes } from '../pages/routes'
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'

export function getPageRoutes(accessPermissions: Map<any, boolean>) {
  const routes: {
    path: string,
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined),
    Component: () => JSX.Element,
  }[] = []

  if (accessPermissions.get(`CanViewBooks`)) { 
    routes.push(...allBooksRoutes)
  }

  if (accessPermissions.get(`CanManageBooks`)) {
    routes.push(...addBookRoutes)
  }

  return routes
}
