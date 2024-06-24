"use client";

import { monthOfYear } from '@/constants/global';
import { useFuelSummaryGroupByMonthYearQuery } from '@/redux/api/report/reportApi';
import { MinusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import ReactApexChart from 'react-apexcharts';
import lineChart from './configs/lineChart';

const LineChart = () => {
  const { Title, Paragraph } = Typography;

  const { data, isLoading } = useFuelSummaryGroupByMonthYearQuery('', {
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
      name: 'Fuel',
      data: mappedData,
      offsetY: 0,
    },
  ];

  return (
    <div className="overflow-hidden">
      <div className="linechart mb-[14px]">
        <div>
          <Title level={5}>Fuel Summery</Title>
          <Paragraph className="lastweek !m-0">
            than last year <span className="bnb2">+10%</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Fuel</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        // @ts-ignore
        options={lineChart.options}
        series={series}
        type="area"
        height={300}
        width={'100%'}
      />
    </div>
  );
};

export default LineChart;