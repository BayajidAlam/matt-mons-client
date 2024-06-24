'use client';

import { monthOfYear } from '@/constants/global';
import { useTripSummaryGroupByMonthYearQuery } from '@/redux/api/report/reportApi';
import { Typography } from 'antd';
import ReactApexChart from 'react-apexcharts';
import columnChart from './configs/columnChart';

const ColumnChart = () => {
  const { Title, Paragraph } = Typography;

  const { data, isLoading } = useTripSummaryGroupByMonthYearQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const summaries = data?.summaries || [];
  const filterByYear = summaries?.filter(
    (el: any) => el.year === new Date().getFullYear()
  );

  const mappedData = monthOfYear?.map((el: number) => {
    const findValue = filterByYear?.find((fv: any) => fv.month === el);
    return findValue?.total_quantity || 0;
  });

  const series = [
    {
      name: 'Trip Income',
      data: mappedData,
      color: '#fff',
    },
  ];

  return (
    <div className="overflow-hidden">
      <div>
        <Title level={5}>Trip Summery</Title>
        <Paragraph className="lastweek">
          than last year <span className="bnb2">+30%</span>
        </Paragraph>
      </div>
      <div>
        <ReactApexChart
          className="bar-chart"
          // @ts-ignore
          options={columnChart.options}
          series={series}
          type="bar"
          height={300}
        />
      </div>
    </div>
  );
};

export default ColumnChart;