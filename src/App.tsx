import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './app/components/AuthProvider';
import { Layout } from './app/components/Layout/Layout';
import { useAuth } from './app/hooks/useAuth';
import { AppWrapper } from './app/components/AppWrapper';

// Landing Page
import AppLanding from './App-Landing';

// App Pages
import { LoginPage } from './app/pages/Auth/LoginPage';
import { RegisterPage } from './app/pages/Auth/RegisterPage';
import { OnboardingPage } from './app/pages/Onboarding/OnboardingPage';
import { MarketplacePage } from './app/pages/Marketplace/MarketplacePage';
import { DashboardPage } from './app/pages/Dashboard/DashboardPage';
import { CreateProjectPage } from './app/pages/Project/CreateProjectPage';
import { ProjectDetailPage } from './app/pages/Project/ProjectDetailPage';

// Import app styles (only for app routes)
// import './app/index.css';

// Protected Route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user needs to complete onboarding
  if (!user.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

// Onboarding Route wrapper
const OnboardingRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.onboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// App content that uses the auth context
const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<AppLanding />} />
      
      {/* App routes */}
      <Route path="/login" element={<AppWrapper>{user ? <Navigate to={user.onboardingCompleted ? "/dashboard" : "/onboarding"} /> : <LoginPage />}</AppWrapper>} />
      <Route path="/register" element={<AppWrapper>{user ? <Navigate to={user.onboardingCompleted ? "/dashboard" : "/onboarding"} /> : <RegisterPage />}</AppWrapper>} />
      <Route path="/marketplace" element={<AppWrapper><Layout><MarketplacePage /></Layout></AppWrapper>} />
      <Route path="/project/:id" element={<AppWrapper><Layout><ProjectDetailPage /></Layout></AppWrapper>} />
      
      {/* Onboarding route */}
      <Route path="/onboarding" element={
        <AppWrapper>
          <OnboardingRoute>
            <OnboardingPage />
          </OnboardingRoute>
        </AppWrapper>
      } />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <AppWrapper>
          <ProtectedRoute>
            <Layout><DashboardPage /></Layout>
          </ProtectedRoute>
        </AppWrapper>
      } />
      <Route path="/create-project" element={
        <AppWrapper>
          <ProtectedRoute>
            <Layout><CreateProjectPage /></Layout>
          </ProtectedRoute>
        </AppWrapper>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App component with AuthProvider
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;