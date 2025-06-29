import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Paper, Title, Container } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../services/api';

export const LoginForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
    },
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
      navigate('/projects');
      setAuthToken(data.access_token);
    },
    onError: (error: any) => {
      alert(error?.response?.data?.message || 'Login failed');
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    mutation.mutate(values);
  };

  return (
    <Container size={420} my={40}>
      <Title style={{ textAlign: 'center' }}>Welcome back</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />

          <Button fullWidth mt="xl" type="submit" loading={mutation.isPending}>
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
