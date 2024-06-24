'use client';

import { motion } from 'framer-motion';
import ChartSection from './ChartSection';
import HeaderSummaryCard from './HeaderSummaryCard';
import IncomeExpenseSection from './IncomeExpenseSection';
import RecentSection from './RecentSection';
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
      {/* Section 1 */}
      {/* Header Summary Cards */}
      <HeaderSummaryCard />

      {/* Section 2 */}
      {/* Chart section */}
      <ChartSection />

      {/* Section 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        {/* Recent Data */}
        <RecentSection />

        {/* Income/Expense */}
        <IncomeExpenseSection />
      </div>

      {/* Section 4 */}
      {/* Upcoming Data */}
      <UpcomingDataSection />
    </motion.div>
  );
};

export default AdminDashboard;