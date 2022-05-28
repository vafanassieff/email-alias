import console from 'node:console'

import { loadConfig, loadProvider } from '#src/utils.js'

/**
 * Remove a alias of the current provider
 *
 * @param {string} alias alias to remove
 */
export default async (alias) => {
  const appConfig = await loadConfig()
  const provider = await loadProvider(appConfig.provider)

  await provider.remove(alias, appConfig[appConfig.provider])

  console.log(`Successfully removed ${alias} !`)
}
