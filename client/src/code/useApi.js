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
      logout: async () => apiRequest(`${apiRoot}/auth/logout`, 'POST'),
    },

    utils: {
      tableCols: async (tableName) => apiRequest(`${apiRoot}/tablecols/${tableName}`),
    }
    
  }

}
