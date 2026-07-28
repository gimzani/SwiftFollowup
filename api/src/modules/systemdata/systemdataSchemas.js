
export const reqSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        data_key: { type: 'string' }
      },
      required: ["data_key"]
    }
  }
}


export const resSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        data_key: { type: 'string' },
        data_label: { type: 'string' },
        sort_order: { type: 'number' },
        is_default: { type: 'boolean' }
      }
    }
  }
}