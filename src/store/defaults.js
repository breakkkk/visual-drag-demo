let defaultcomponentData = []

export function getDefaultcomponentData() {
  return JSON.parse(JSON.stringify(defaultcomponentData))
}

export function setDefaultcomponentData(data = []) {
  defaultcomponentData = data
}
