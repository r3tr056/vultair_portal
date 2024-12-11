import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthProvider';
import { ProjectsProvider } from './context/ProjectsContext';
import AutomatorLayout from './layout/automator_layout';
import { DashboardLayout } from './layout/dashboard_layout';
import { HomeLayout } from './layout/home_layout';
import { LoadingScreen } from './layout/loading_screen';
import WorkflowEditor from './lib/modules/flow_builder/workflow_builder';
import LoginPage from './pages/auth';
import MarketplacePage from './pages/dashboard/cloud/cloud_home';
import AndroidDevicePage from './pages/dashboard/cloud/services/android/android_device';
import AVDCreatorPage from './pages/dashboard/cloud/services/android/create_device';
import EmulatorPage from './pages/dashboard/cloud/services/emulator/emulator_page';
import StoragePage from './pages/dashboard/cloud/services/storage/storage_page';
import { DeviceList } from './pages/dashboard/devices/device_list';
import { ForensicWhiteboard } from './pages/dashboard/forensic_whiteboard/whiteboard';
import ProjectPage from './pages/dashboard/projects/project_view';
import ProjectsPage from './pages/dashboard/projects/projects_page';
import SignupPage from './pages/signup_page';

function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <LoadingScreen />;
  }

  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <Routes>
          {/* Public routes */}
          <Route element={<HomeLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>

          {/* Protected routes */}
          <Route element={<AuthenticatedRoute><DashboardLayout /></AuthenticatedRoute>}>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:projectId" element={<ProjectPage />} />
            <Route path="devices" element={<DeviceList />} />
            <Route path="whiteboard" element={<ForensicWhiteboard />} />
            <Route path="cloud" element={<MarketplacePage />} />
            <Route path="cloud/storage" element={<StoragePage />} />
            <Route path="cloud/emulator">
              <Route index element={<EmulatorPage />} />
              <Route path="create" element={<AVDCreatorPage />} />
            </Route>
            <Route path="cloud/android" element={<AndroidDevicePage />} />
          </Route>

          <Route element={<AuthenticatedRoute><AutomatorLayout /></AuthenticatedRoute>}>
            <Route path="workflow" element={<WorkflowEditor />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ProjectsProvider>
    </AuthProvider>
  );
}

export default App;

