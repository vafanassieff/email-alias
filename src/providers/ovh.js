import { createHash } from 'node:crypto'

const endpoints = {
  'ovh-eu': 'eu.api.ovh.com',
  'ovh-us': 'api.us.ovhcloud.com',
  'ovh-ca': 'ca.api.ovh.com',
}

const getOvhTime = async (config) => {
  const url = `https://${endpoints[config.endpoint]}/1.0/auth/time`

  const response = await fetch(url)
  return response.json()
}

const request = async (path, method, parameters, config) => {
  const options = { method }
  const timestamp = await getOvhTime(config)
  const url = `https://${endpoints[config.endpoint]}/1.0${path}`

  if (method === 'POST' || method === 'PUT') {
    options.body = JSON.stringify(parameters) || ''
  }

  options.headers = {
    'Content-Type': 'application/json',
    'X-Ovh-Application': config.applicationKey,
    'X-Ovh-Consumer': config.consumerKey,
    'X-Ovh-Timestamp': timestamp,
    'X-Ovh-Signature':
      '$1$' +
      createHash('sha1')
        .update(
          [
            config.applicationSecret,
            config.consumerKey,
            method,
            url,
            options.body,
            timestamp,
          ].join('+')
        )
        .digest('hex'),
  }

  const response = await fetch(url, options)

  if (response.ok) {
    return response.json()
  } else {
    const data = await response.json()

    const error = data.message ? new Error(data.message) : new Error(data)

    throw error
  }
}

/**
 * @typedef {object} OvhConfiguration
 * @property {string} domain Domain for alias on OVH
 * @property {string} endpoint OVH api endpoint
 * @property {string} applicationKey OVH application key
 * @property {string} applicationSecret OVH application secret
 * @property {string} consumerKey OVH consumer key
 */

/**
 * Configure the OVH access
 *
 * @returns {OvhConfiguration} User OVH configuration
 */
export const configure = async () => {
  const endpoint = await question('Which api endpoint should we use ? ', {
    choices: Object.keys(endpoints),
  })

  if (!endpoint) {
    throw new Error('You need a endpoint')
  }

  const applicationKey = await question('What is your OVH application key ? ')

  if (!applicationKey) {
    throw new Error('You need an application key')
  }

  const applicationSecret = await question(
    'What is your OVH application secret ? '
  )

  if (!applicationSecret) {
    throw new Error('You need an application secret')
  }

  const consumerKey = await question('What is your OVH consumer key ? ')

  if (!consumerKey) {
    throw new Error('You need an consumer key')
  }

  const domain = await question(
    'On which domain do you want to create email alias ? '
  )

  if (!domain) {
    throw new Error('You need a domain')
  }

  return {
    applicationKey,
    applicationSecret,
    consumerKey,
    domain,
    endpoint,
  }
}

/**
 * Get the alias from OVH
 *
 * @param {OvhConfiguration} config OVH configuration
 * @returns {Array<string>} List of alias
 */
export const list = async (config) => {
  const list = await request(
    `/email/domain/${config.domain}/redirection`,
    'GET',
    undefined,
    config
  )

  const alias = []
  for (const id of list) {
    const { from, to } = await request(
      `/email/domain/${config.domain}/redirection/${id}`,
      'GET',
      undefined,
      config
    )

    alias.push(`${from} --> ${to}`)
  }

  return alias
}

/**
 * Add a new alias to OVH
 *
 * @param {object} params Object
 * @param {string} params.from From address
 * @param {string} params.to to address
 * @param {OvhConfiguration} config OVH configuration
 * @returns {Array<string>} List of alias
 */
export const add = async ({ from, to }, config, { defaultTo }) => {
  if (!from.includes(config.domain)) {
    throw new Error(`From address should use the ${config.domain} domain`)
  }

  await request(
    `/email/domain/${config.domain}/redirection`,
    'POST',
    { from, to: to || defaultTo, localCopy: false },
    config
  )
}

/**
 * Remove an alias address from OVH
 *
 * @param {string} alias Alias address to remove
 * @param {OvhConfiguration} config OVH configuration
 * @returns {Array<string>} List of alias
 */
export const remove = async (alias, config) => {
  const list = await request(
    `/email/domain/${config.domain}/redirection`,
    'GET',
    undefined,
    config
  )

  for (const item of list) {
    const { from, id } = await request(
      `/email/domain/${config.domain}/redirection/${item}`,
      'GET',
      undefined,
      config
    )

    if (from === alias) {
      await request(
        `/email/domain/${config.domain}/redirection/${id}`,
        'DELETE',
        undefined,
        config
      )
      break
    }
  }
}
