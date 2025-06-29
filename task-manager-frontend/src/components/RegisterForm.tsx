import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Box } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { api } from '../services/api';

export function RegisterForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      showNotification({ color: 'green', message: 'Registration successful! Please login.' });
      setForm({ username: '', email: '', password: '' });
    } catch (error: any) {
      showNotification({ color: 'red', message: error.response?.data?.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ maxWidth: 400 }} mx="auto">
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          mb="sm"
        />
        <TextInput
          label="Email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          required
          mb="sm"
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          mb="sm"
        />
        <Button type="submit" loading={loading} fullWidth>
          Register
        </Button>
      </form>
    </Box>
  );
}
