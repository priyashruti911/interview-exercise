import React, { useState } from 'react';
import { TextInput, Textarea, Button, Box } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../services/api';

export function CreateProjectForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: '', description: '' });

  const mutation = useMutation({
    mutationFn: (newProject: { name: string; description: string }) =>
      createProject(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setForm({ name: '', description: '' });
    },
    onError: (error: any) => {
      alert(error?.response?.data?.message || 'Failed to create project');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <Box maw={400} mx="auto" mt="md">
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Project Name"
          placeholder="Enter project name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ marginBottom: '1rem' }}
        />
        <Textarea
          label="Description"
          placeholder="Enter description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          style={{ marginBottom: '1rem' }}
        />
        <Button type="submit" loading={mutation.isPending} fullWidth>
          Create Project
        </Button>
      </form>
    </Box>
  );
}
