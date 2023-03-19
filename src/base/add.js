import console from 'node:console'

import { loadConfig, loadProvider } from '#src/utils.js'

/**
 * Add a new redirection to the current provider
 *
 * @param {string} from From address
 * @param {object} params Object
 * @param {string} params.to To address
 */
export default async (from, { to }) => {
  const appConfig = await loadConfig()
  const provider = await loadProvider(appConfig.provider)

  await provider.add({ from, to }, appConfig[appConfig.provider], appConfig)
  console.log(`New alias ${from} to ${to} !`)
}
