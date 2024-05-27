import { createApp as createClientApp } from 'vue'

import { createHead } from '@unhead/vue'
import { InferSeoMetaPlugin } from '@unhead/addons'
import { createPinia } from 'pinia'
import { createRouter } from './router'
import DemesupApp from './DemesupApp.vue'
import './styles'

import { createApi } from '/@src/composable/useApi'

export type DemesupAppContext = Awaited<ReturnType<typeof createApp>>
export type DemesupPlugin = (demesup: DemesupAppContext) => void | Promise<void>

const plugins = import.meta.glob<{ default: DemesupPlugin }>('./plugins/*.ts')

// this is a helper function to define plugins with autocompletion
export function definePlugin(plugin: DemesupPlugin) {
  return plugin
}

export async function createApp() {
  const app = createClientApp(DemesupApp)
  const router = createRouter()
  const api = createApi()

  const head = createHead({
    plugins: [InferSeoMetaPlugin()],
  })
  app.use(head)

  const pinia = createPinia()
  app.use(pinia)

  const demesup = {
    app,
    api,
    router,
    head,
    pinia,
  }

  app.provide('demesup', demesup)

  for (const path in plugins) {
    try {
      const { default: plugin } = await plugins[path]()
      await plugin(demesup)
    }
    catch (error) {
      console.error(`Error while loading plugin "${path}".`)
      console.error(error)
    }
  }

  // use router after plugin registration, so we can register navigation guards
  app.use(demesup.router)

  return demesup
}
