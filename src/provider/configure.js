import console from 'node:console'
import fs from 'node:fs/promises'

import config from '#src/config.js'
import { fileExists, loadProvider } from '#src/utils.js'

/**
 * Configure a provider
 *
 * @param {string} name Provider name
 */
export default async (name) => {
  try {
    const provider = await loadProvider(name)
    let appConfig = {}
    const exists = fileExists(config.path)

    if (exists) {
      appConfig = JSON.parse(await fs.readFile(config.path))
    }

    appConfig[name] = await provider.configure()
    await fs.writeFile(config.path, JSON.stringify(appConfig, undefined, 2))
  } catch (error) {
    console.error(error)
  }
}
