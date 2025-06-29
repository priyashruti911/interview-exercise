import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTasksByProjectId,
  updateTaskStatus,
  deleteTask,
  api,
} from '../services/api';

import {
  Box,
  Button,
  TextInput,
  Textarea,
  List,
  Loader,
  Text,
  Group,
  Title,
  Divider,
  Paper,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  projectId: number;
}

export function ProjectTasks() {
  const [statusFilter] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const { projectId } = useParams<{ projectId: string }>();
  const queryClient = useQueryClient();

  // Fetch tasks
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<Task[]>({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasksByProjectId(projectId!),
    enabled: !!projectId,
  });

  // Add new task mutation
  const addTaskMutation = useMutation({
    mutationFn: async (task: { title: string; description: string }) => {
      const res = await api(`/projects/${projectId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(task),
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
      setNewTask({ title: '', description: '' });

      showNotification({
        title: 'Task Created',
        message: 'Your new task was successfully added.',
        color: 'green',
        icon: <IconCheck />,
      });
    },
    onError: () => {
      showNotification({
        title: 'Error',
        message: 'Something went wrong while adding the task.',
        color: 'red',
        icon: <IconX />,
      });
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: number) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
      showNotification({
        title: 'Task Deleted',
        message: 'Task was deleted successfully.',
        color: 'green',
        icon: <IconCheck />,
      });
    },
    onError: () => {
      showNotification({
        title: 'Error',
        message: 'Failed to delete the task.',
        color: 'red',
        icon: <IconX />,
      });
    },
  });

  // Update task status mutation
  const updateStatusMutation = useMutation({
    mutationFn: (data: { taskId: number; status: string }) =>
      updateTaskStatus(data.taskId, data.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    addTaskMutation.mutate(newTask);
  };

//   const handleStatusChange = (taskId: number, newStatus: string | null) => {
//     if (!newStatus) return;
//     updateStatusMutation.mutate({ taskId, status: newStatus });
//   };

  const filteredTasks = statusFilter
    ? tasks?.filter((task) => task.status === statusFilter)
    : tasks;

  if (!projectId) return <Text color="red">Invalid project ID</Text>;
  if (isLoading) return <Loader mt="xl" />;
  if (isError) return <Text color="red">Failed to load tasks.</Text>;

  return (
    <Box maw={600} mx="auto" mt="lg">
      <Button variant="subtle" component={Link} to="/projects" size="xs" mb="sm">
        ← Back to Projects
      </Button>

      <Title order={3} mb="md">
        Tasks for Project #{projectId}
      </Title>

      {/* Add New Task Form */}
      <Paper shadow="xs" p="md" mb="lg" withBorder>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            name="title"
            placeholder="Enter task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
            mb="sm"
          />
          <Textarea
            label="Description"
            name="description"
            placeholder="Enter task description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            mb="sm"
          />
          <Button
            type="submit"
            disabled={!newTask.title.trim()}
            loading={addTaskMutation.status === 'pending'}
          >
            Add Task
          </Button>
        </form>
      </Paper>

      <Divider my="md" />

      {/* Task List */}
      {filteredTasks && filteredTasks.length > 0 ? (
        <List spacing="md">
          {filteredTasks.map((task) => (
            <List.Item key={task.id}>
              <Paper withBorder shadow="xs" p="sm">
                <Group justify="space-between" align="center">
                  <Box>
                    <Text fw={500}>{task.title}</Text>
                    {task.description && (
                      <Text size="sm" c="dimmed">
                        {task.description}
                      </Text>
                    )}
                  </Box>
                  <Group gap="xs">
                    <Button
                      color="red"
                      size="xs"
                      variant="outline"
                      onClick={() => deleteTaskMutation.mutate(task.id)}
                    >
                      Delete
                    </Button>
                  </Group>
                </Group>
              </Paper>
            </List.Item>
          ))}
        </List>
      ) : (
        <Text c="dimmed">No tasks match the selected filter.</Text>
      )}
    </Box>
  );
}
