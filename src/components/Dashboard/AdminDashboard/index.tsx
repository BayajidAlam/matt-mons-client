'use client';

import { motion } from 'framer-motion';
import HeaderSummaryCard from './HeaderSummaryCard';
import ChartSection from './ChartSection';
import RecentSection from './RecentSection';
import IncomeExpenseSection from './IncomeExpenseSection';
import UpcomingDataSection from './UpcomingDataSection';


const AdminDashboard = () => {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className="your-container-styles"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <HeaderSummaryCard />
      <ChartSection />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        <RecentSection />
        <IncomeExpenseSection />
      </div>
      <UpcomingDataSection />
    </motion.div>
  );
};

export default AdminDashboard;
