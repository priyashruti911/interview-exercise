import { Container } from '@mantine/core';
import { CreateProjectForm } from '../components/CreateProjectForm';
import { ProjectsList } from '../components/ProjectsList';

export default function Projects() {
  return (
    <Container>
      <CreateProjectForm />
      <ProjectsList />
    </Container>
  );
}
