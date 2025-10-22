import apiFetch from './apiFetch';

export const AuthService = {
  async login(email, password) {
    const data = await apiFetch('login', {
      method: 'POST',
      body: { email, password },
    });
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};