#!/usr/bin/env node

import 'zx/globals'
import console from 'node:console'
import process from 'node:process'

import { Command } from 'commander'

import add from '#src/base/add.js'
import configuration from '#src/base/configuration.js'
import list from '#src/base/list.js'
import printConfiguration from '#src/base/print-configuration.js'
import remove from '#src/base/remove.js'
import configure from '#src/provider/configure.js'
import versions from '#src/versions.js'

const program = new Command()

const provider = new Command('provider')

$.verbose = false

const { current } = await versions()

provider
  .command('configure')
  .description('Configure a provider')
  .argument('<provider>', 'Provider to configure')
  .action(configure)

program.name('email-alias').description('Manage email alias').version(current)

program.command('list').description('List current alias').action(list)

program
  .command('add')
  .description('Add a new alias')
  .argument('<from>', 'alias email')
  .option('--to <string>', 'Destination email')
  .action(add)

program
  .command('configuration')
  .description('Configure the application')
  .action(configuration)

program
  .command('print-config')
  .description('Print the app configuration')
  .action(printConfiguration)

program
  .command('remove')
  .description('Add a new alias')
  .argument('<alias>', 'alias to remove')
  .action(remove)

program.addCommand(provider)

program.exitOverride()

try {
  await program.parseAsync(process.argv)
} catch (error) {
  if (error.constructor.name === 'CommanderError') {
    process.exit(error.exitCode)
  } else {
    console.error(error.message)
    process.exit(-1)
  }
}
