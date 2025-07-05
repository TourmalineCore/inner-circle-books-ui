import { addBookRoutes, allBooksRoutes } from '../pages/routes'
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'

export function getPageRoutes(accessPermissions: Map<any, boolean>) {
  const routes: {
    path: string,
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined),
    Component: () => JSX.Element,
  }[] = []

  // TODO fix permissions when add them
  if (accessPermissions.get(`ViewContacts`)) { 
    routes.push(...allBooksRoutes)
  }

  if (accessPermissions.get(`ViewContacts`)) {
    routes.push(...addBookRoutes)
  }

  return routes
}
