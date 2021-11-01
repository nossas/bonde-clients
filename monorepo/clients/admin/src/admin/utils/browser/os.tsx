const appVersion = window.navigator.userAgent

export const isMac = () => appVersion.includes('Mac')
export const isLinux = () => appVersion.includes('Linux')
export const isWindows = () => appVersion.includes('Win')
export const isUnix = () => appVersion.includes('X11')
