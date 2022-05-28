import os from 'node:os'
import path from 'node:path'

/**
 * App default configuration
 */
export default {
  path: path.join(os.homedir(), '.mail-alias.json'),
}
