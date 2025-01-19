import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // URL principal
  timeout: 5000, // Timeout padrão
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Verifica se é um erro de servidor e garante que o fallback ainda não foi tentado
    console.log('Erro:', error.response?.status);
    if (!originalRequest._retry && error.response?.status === undefined) {
      originalRequest._retry = true; // Marca a requisição como já tentada

      try {
        console.warn('Tentando fallback para o servidor secundário...');

        const fallbackUrl = 'http://127.0.0.1:8001/api' + originalRequest.url;
        console.log(fallbackUrl);

        return axios({
          ...originalRequest, // Copia as configurações originais
          url: fallbackUrl,   // Substitui a URL com a URL de fallback
        });
      } catch (fallbackError) {
        console.error('Erro no fallback:', fallbackError);
        return Promise.reject(fallbackError); // Retorna o erro se o fallback também falhar
      }
    }

    return Promise.reject(error);
  }
);

export default api;
