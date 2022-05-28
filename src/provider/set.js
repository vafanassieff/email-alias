import console from 'node:console'
import fs from 'node:fs/promises'

import config from '#src/config.js'
import { loadConfig, loadProvider } from '#src/utils.js'

/**
 * Choose the current provider
 *
 * @param {string} name Provider name
 */
export default async (name) => {
  await loadProvider(name)
  const appConfig = await loadConfig()
  appConfig.provider = name
  await fs.writeFile(config.path, JSON.stringify(appConfig, undefined, 2))
  console.log(`Provider set to ${name}`)
}
