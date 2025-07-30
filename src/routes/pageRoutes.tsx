import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { addBookRoutes, allBooksRoutes, bookRoutes, scanRoutes } from '../pages/routes'

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
    routes.push(...scanRoutes)
  }

  return routes
}
