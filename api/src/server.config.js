
const envSchema = {
  type: 'object',
  required: [ 'PORT' ],
  properties: {
    PORT: {
      type: 'number',
      default: 3000
    },
    PG_CONNECTION: {
      type: 'string'
    }
  }
}

export const envOptions = {
  confKey: 'config',
  schema: envSchema
}