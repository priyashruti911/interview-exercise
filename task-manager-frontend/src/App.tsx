import { Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { AuthGuard } from './components/AuthGuard';
import { ProjectsList } from './components/ProjectsList';
import { CreateProjectForm } from './components/CreateProjectForm';
import { ProjectTasks } from './components/ProjectTasks';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/projects/:projectId/tasks"
        element={
          <AuthGuard>
            <ProjectTasks />
          </AuthGuard>
        }
      />

      <Route
        path="/projects"
        element={
          <AuthGuard>
            <ProjectsList />
          </AuthGuard>
        }
      />

      <Route
        path="/projects/create"
        element={
          <AuthGuard>
            <CreateProjectForm />
          </AuthGuard>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
