export function useApi() {

  const httpHeaders = new Headers({'Content-Type': 'application/json'});
  const apiRoot = import.meta.env.VITE_API_URL

  async function apiRequest(url, method, body) {
    method = method || 'GET'; body = body || null;
    let json = body ? JSON.stringify(body) : null;
    return fetch(url, { method: method, body: json, headers: httpHeaders, credentials: 'include' }).then(r => r.json());
  }

  return {

    auth: {
      login: async (payload) => apiRequest(`${apiRoot}/auth/login`, 'POST', payload),
      me: async () => apiRequest(`${apiRoot}/auth/me`),
      register: async (payload) => apiRequest(`${apiRoot}/auth/register`, 'POST', payload),
      verifyEmail: async (payload) => apiRequest(`${apiRoot}/auth/verify-email`, 'POST', payload),
      forgotPassword: async (payload) => apiRequest(`${apiRoot}/auth/forgot-password`, 'POST', payload),
      resetPassword: async (payload) => apiRequest(`${apiRoot}/auth/reset-password`, 'POST', payload),
      logout: async () => apiRequest(`${apiRoot}/auth/logout`),
    },

    bizCards: {
      list: async (useraccount_id) => apiRequest(`${apiRoot}/bizcards/${useraccount_id}`),
      get: async (id) => apiRequest(`${apiRoot}/bizcard/${id}`),
      create: async (payload) => apiRequest(`${apiRoot}/bizcards`, 'POST', payload),
      update: async (id, payload) => apiRequest(`${apiRoot}/bizcard/${id}`, 'PUT', payload),
      delete: async (id) => apiRequest(`${apiRoot}/bizcard/${id}`, 'DELETE'),
    },

    bizCardTemplates: {
      list: async () => apiRequest(`${apiRoot}/bizcardtemplates`),
      get: async (id) => apiRequest(`${apiRoot}/bizcardtemplate/${id}`),
      create: async (payload) => apiRequest(`${apiRoot}/bizcardtemplates`, 'POST', payload),
      update: async (id, payload) => apiRequest(`${apiRoot}/bizcardtemplate/${id}`, 'PUT', payload),
      delete: async (id) => apiRequest(`${apiRoot}/bizcardtemplate/${id}`, 'DELETE'),
    },

    plans: {
      list: async () => apiRequest(`${apiRoot}/plans`),
      get: async (id) => apiRequest(`${apiRoot}/plan/${id}`),
      create: async (payload) => apiRequest(`${apiRoot}/plans`, 'POST', payload),
      update: async (id, payload) => apiRequest(`${apiRoot}/plan/${id}`, 'PUT', payload),
      delete: async (id) => apiRequest(`${apiRoot}/plan/${id}`, 'DELETE'),
    },

    qrCodes: {
      list: async (useraccount_id) => apiRequest(`${apiRoot}/qrcodes/${useraccount_id}`),
      get: async (id) => apiRequest(`${apiRoot}/qrcode/${id}`),
      create: async (payload) => apiRequest(`${apiRoot}/qrcodes`, 'POST', payload),
      update: async (id, payload) => apiRequest(`${apiRoot}/qrcode/${id}`, 'PUT', payload),
      delete: async (id) => apiRequest(`${apiRoot}/qrcode/${id}`, 'DELETE'),
    },

    qrCodeTemplates: {
      list: async () => apiRequest(`${apiRoot}/qrcodetemplates`),
      get: async (id) => apiRequest(`${apiRoot}/qrcodetemplate/${id}`),
      create: async (payload) => apiRequest(`${apiRoot}/qrcodetemplates`, 'POST', payload),
      update: async (id, payload) => apiRequest(`${apiRoot}/qrcodetemplate/${id}`, 'PUT', payload),
      delete: async (id) => apiRequest(`${apiRoot}/qrcodetemplate/${id}`, 'DELETE'),
    },

    userAccounts: {
      list: async () => apiRequest(`${apiRoot}/useraccounts`),
      get: async (id) => apiRequest(`${apiRoot}/useraccount/${id}`),
      create: async (payload) => apiRequest(`${apiRoot}/useraccounts`, 'POST', payload),
      update: async (id, payload) => apiRequest(`${apiRoot}/useraccount/${id}`, 'PUT', payload),
      delete: async (id) => apiRequest(`${apiRoot}/useraccount/${id}`, 'DELETE'),
    },

    userProfiles: {
      get: async (id) => apiRequest(`${apiRoot}/userprofile/${id}`),
      update: async (id, payload) => apiRequest(`${apiRoot}/userprofile/${id}`, 'PUT', payload),
    },

    utils: {
      tableCols: async (tableName) => apiRequest(`${apiRoot}/tablecols/${tableName}`),
    }

  }

}
