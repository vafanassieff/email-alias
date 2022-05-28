#!/usr/bin/env node

import 'zx/globals'
import console from 'node:console'
import process from 'node:process'

import { Command } from 'commander'

import add from '#src/base/add.js'
import list from '#src/base/list.js'
import remove from '#src/base/remove.js'
import configure from '#src/provider/configure.js'
import set from '#src/provider/set.js'

const program = new Command()

const provider = new Command('provider')

$.verbose = false

provider
  .command('configure')
  .description('Configure a provider')
  .argument('<provider>', 'Provider to configure')
  .action(configure)

provider
  .command('set')
  .description('Set the used provider')
  .argument('<provider>', 'Provider to use')
  .action(set)

program.name('email-alias').description('Manage email aliass').version('0.1.0')

program.command('list').description('List current aliass').action(list)

program
  .command('add')
  .description('Add a new alias')
  .requiredOption('--from <string>', 'alias email')
  .requiredOption('--to <string>', 'Destination email')
  .action(add)

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
  console.error(error.message)
  process.exit(-1)
}
