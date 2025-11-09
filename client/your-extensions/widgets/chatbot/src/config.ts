import type { ImmutableObject } from 'jimu-core'

export interface Config {
  useMapWidgetIds?: string[]
  openRouterApiKey?: string
  openRouterModel?: string
}

export type IMConfig = ImmutableObject<Config>
