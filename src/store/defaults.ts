let defaultcomponentData: Project.ComponentData[] = []

export function getDefaultcomponentData() {
  return JSON.parse(JSON.stringify(defaultcomponentData))
}

export function setDefaultcomponentData(data: Project.ComponentData[] = []) {
  defaultcomponentData = data
}
