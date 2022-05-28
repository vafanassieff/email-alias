import console from 'node:console'

import { loadConfig } from '#src/utils.js'

/**
 * Print the app configuration
 */
export default async () => {
  const config = await loadConfig()
  console.log(config)
}
