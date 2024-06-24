import AdminDashboard from '@/components/Dashboard/AdminDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VehiTrack | Dashboard',
};

const DashboardPage = () => {
  return <AdminDashboard />;
};

export default DashboardPage;