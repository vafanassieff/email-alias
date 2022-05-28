import console from 'node:console'
import fs from 'node:fs/promises'

import config from '#src/config.js'
import configure from '#src/provider/configure.js'
import { loadConfig, getProviders } from '#src/utils.js'

/**
 * Configure the application
 */
export default async () => {
  const appConfig = await loadConfig()

  appConfig.defaultTo = await question(
    'On which email do you want a redirection by default ? ',
    {
      choices: [appConfig.defaultTo],
    }
  )

  const providers = await getProviders()

  appConfig.provider = await question('Which provider will you use ? ', {
    choices: providers,
  })

  await fs.writeFile(config.path, JSON.stringify(appConfig, undefined, 2))

  console.log('Successfully configure email-alias ! Yai !')

  const shouldConfigProvider = await question(
    `Do you want to configure the ${appConfig.provider} provider ? `,
    {
      choices: ['Yes', 'No'],
    }
  )

  if (shouldConfigProvider === 'Yes') {
    await configure(appConfig.provider)
  }
}
