// Global admin storage
declare global {
  var adminUser: any
}

if (!global.adminUser) {
  global.adminUser = null
}

export const setAdminUser = (user: any) => {
  global.adminUser = user
}

export const getAdminUser = () => {
  return global.adminUser
}

export const hasAdmin = () => {
  return global.adminUser !== null
}