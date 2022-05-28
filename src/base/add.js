import console from 'node:console'

import { loadConfig, loadProvider } from '#src/utils.js'

/**
 * Add a new redirecion to the current provider
 *
 * @param {object} params Object
 * @param {string} params.from From address
 * @param {string} params.to To address
 */
export default async ({ from, to }) => {
  const appConfig = await loadConfig()
  const provider = await loadProvider(appConfig.provider)

  await provider.add({ from, to }, appConfig[appConfig.provider])
  console.log(`New alias from ${from} to ${to} !`)
}
