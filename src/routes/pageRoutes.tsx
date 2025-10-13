import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { addBookRoutes, allBooksRoutes, bookCopyRoutes, bookHistoryRoutes, bookRoutes, returnBookRoutes, scanRoutes } from '../pages/routes'

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
    routes.push(...bookCopyRoutes)
  }

  if (accessPermissions.get(`CanViewBooks`)) {
    routes.push(...returnBookRoutes)
  }

  if (accessPermissions.get(`CanViewBooks`)) {
    routes.push(...scanRoutes)
  }
  
  if (accessPermissions.get(`CanViewBooks`)) {
    routes.push(...bookHistoryRoutes)
  }

  return routes
}
