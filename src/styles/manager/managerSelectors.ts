export const rootId = `#root`

export const mainRoot = `${rootId} > div > div:last-of-type > div`

export const sidebarHeading = `${rootId} .sidebar-header`
export const sidebarForm = `${sidebarHeading} + form`
export const sidebarMenu = `${sidebarForm} + div`

export const menuHeader = `${sidebarMenu} .sidebar-subheading`
export const menuItem = `${sidebarMenu} .sidebar-item`
export const menuItemSelected = `${sidebarMenu} .sidebar-item.selected`

export const menuItemExpander = `${menuItem} .sidebar-expander`
export const menuIcon = `${menuItem} .sidebar-svg-icon`
export const menuItemIcon = `${menuItem} .sidebar-expander + .sidebar-svg-icon`
export const menuItemTitle = `${menuItem} .sidebar-expander + .sidebar-svg-icon + span`
export const menuSubitem = `${sidebarMenu} > div > section > div > .sidebar-item`

export const menuItemIconSelected = `${menuItemSelected} .sidebar-svg-icon`
export const menuItemTitleSelected = `${menuItemSelected} .sidebar-svg-icon + span`
