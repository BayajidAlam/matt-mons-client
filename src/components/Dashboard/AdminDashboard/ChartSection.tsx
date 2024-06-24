import dynamic from 'next/dynamic';

const ColumnChart = dynamic(() => import('@/components/Charts/LineChart'), {
  ssr: false,
});
const LineChart = dynamic(() => import('@/components/Charts/LineChart'), {
  ssr: false,
});

const ChartSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
      <div className="bg-white border border-blue-200 shadow-md shadow-blue-200 rounded-lg p-5">
        <ColumnChart />
      </div>
      <div className="bg-white border border-blue-200 shadow-md shadow-blue-200 rounded-lg p-5">
        <LineChart />
      </div>
    </div>
  );
};

export default ChartSection;