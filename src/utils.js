import fs from 'node:fs/promises'
import path from 'node:path'
import { URL } from 'node:url'

import config from '#src/config.js'
const __dirname = new URL('.', import.meta.url).pathname

/**
 * @param {string} path Path to test
 * @returns {boolean} Does the file exist ?
 */
export const fileExists = (path) => {
  return fs
    .access(path, fs.F_OK)
    .then(() => true)
    .catch(() => false)
}

/**
 * @returns {object} email-alias condiguration object
 */
export const loadConfig = async () => {
  if (!(await fileExists(config.path))) {
    throw new Error('You need to run mail-alias provider configure first')
  }

  return fs.readFile(config.path).then(JSON.parse)
}

/**
 * @typedef {object} Provider
 * @property {Function} list List provider alias
 * @property {Function} add Add alias to provider
 * @property {Function} remove Remove alias of provider
 */

/**
 * Import the provider script
 *
 * @param {string} name Provider name
 * @returns {Provider} Loaded provider
 */
export const loadProvider = async (name) => {
  const providerFolder = path.join(__dirname, '../src/providers')
  const providerPath = path.join(providerFolder, `${name}.js`)

  if (!(await fileExists(providerPath))) {
    const files = await fs.readdir(providerFolder)
    const providers = files.map((p) => p.split('.js')[0]).join(', ')
    throw new Error(`There is only ${providers} avalaible`)
  }

  return import(providerPath)
}
