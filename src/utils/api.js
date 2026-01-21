const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  // Contoh fungsi fetch with auth
  async function _fetchws(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    return responseJson.data.threads;
  }
  
  // ... Buat fungsi lain: login, register, seeDetail, createThread, dll.
  
  return {
    putAccessToken,
    getAccessToken,
    getAllThreads,
    // export fungsi lainnya
  };
})();

export default api;