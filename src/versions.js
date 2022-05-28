import console from 'node:console'
import fs from 'node:fs/promises'
import path from 'node:path'
import { URL } from 'node:url'

import { request } from '#src/utils.js'

/**
 * @typedef {object} Versions
 * @property {string} latest Latest semver
 * @property {string} current Insttaled semver
 */

/**
 * Get the installed version and the latest remote version of email-alias
 *
 * @returns {Versions} latest abd current version
 */
export default async () => {
  const { latest } = await request(
    'https://registry.npmjs.org/-/package/@vafanassieff/email-alias/dist-tags'
  )

  const { version: current } = await fs
    .readFile(
      path.join(new URL('.', import.meta.url).pathname, '../package.json')
    )
    .then(JSON.parse)

  if (current !== latest) {
    console.log(`There is a new email-alias version !`)
    console.log(`You are running the ${current} latest is ${latest}`)
    console.log(
      'To update the version run npm update -g @vafanassieff/email-alias'
    )
  }

  return { current, latest }
}
