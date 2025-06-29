import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../services/api';
import { Card, Text, Loader, Box, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  name: string;
  description: string;
}

export function ProjectsList() {
  const { data, isLoading, isError } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  if (isLoading) return <Loader mt="xl" />;
  if (isError) return <Text color="red">Failed to load projects.</Text>;

  return (
    <Box maw={600} mx="auto" mt="lg">
      <Title order={3} mb="md">Your Projects</Title>

      {data?.map((project) => (
        <Card
          key={project.id}
          withBorder
          shadow="sm"
          p="lg"
          radius="md"
          mb="sm"
          component={Link}
          to={`/projects/${project.id}/tasks`}
          style={{ textDecoration: 'none' }}
        >
          <Text fw={500}>{project.name}</Text>
          <Text size="sm" c="dimmed">{project.description}</Text>
        </Card>
      ))}
    </Box>
  );
}
