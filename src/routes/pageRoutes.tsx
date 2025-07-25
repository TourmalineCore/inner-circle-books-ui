import { addBookRoutes, allBooksRoutes, bookRoutes, scanQRRoutes } from '../pages/routes'
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
  
  if (accessPermissions.get(`CanViewBooks`)) {
    routes.push(...bookRoutes)
  }

  if (accessPermissions.get(`CanViewBooks`)) {
    routes.push(...scanQRRoutes)
  }

  return routes
}
