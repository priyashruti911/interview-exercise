import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await api('/auth/login', {
        method: 'POST',
        data,
      });
      const result = res.data;
      const token = result.access_token;
      localStorage.setItem('token', token);
      return token;
    },
  });
};
