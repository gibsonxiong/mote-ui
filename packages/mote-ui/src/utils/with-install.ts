import type { App, Plugin, Component } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T extends Component>(component: T, name: string): SFCWithInstall<T> {
  const comp = component as SFCWithInstall<T>
  comp.install = (app: App) => {
    app.component(name, component)
  }
  return comp
}
