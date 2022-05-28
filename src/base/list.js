import console from 'node:console'

import { loadConfig, loadProvider } from '#src/utils.js'

/**
 * List all alias using the current provider
 */
export default async () => {
  const appConfig = await loadConfig()
  const provider = await loadProvider(appConfig.provider)
  const list = await provider.list(appConfig[appConfig.provider], appConfig)

  console.log(`Found ${list.length} alias :`)

  for (const alias of list) {
    console.log(`  ${alias}`)
  }
}
