import { useGetAllMaintenanceQuery } from '@/redux/api/maintenance/maintenanceApi';
import { useGetAllTripQuery } from '@/redux/api/trip/tripApi';
import type { RadioChangeEvent } from 'antd';
import { Empty, Radio, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';

const { Title } = Typography;

const UpcomingDataSection = () => {
  const [upcomingTabData, setUpcomingTabData] = useState('trip');

  const upcomingTabChange = (e: RadioChangeEvent) => {
    setUpcomingTabData(e.target.value);
  };

  // recent trips
  const { data: tripData, isLoading: isTripLoading } = useGetAllTripQuery(
    {
      limit: 10,
      status: 'Pending',
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const allTrips = tripData?.trips || [];

  // recent maintenance
  const { data: maintenanceData, isLoading: isMaintenanceLoading } =
    useGetAllMaintenanceQuery(
      {
        limit: 10,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const allMaintenances = maintenanceData?.maintenances || [];

  return (
    <div className="bg-white border border-blue-200 shadow-md shadow-blue-200 rounded-lg py-5 pl-5 pr-1.5 lg:col-span-7 overflow-x-auto">
      <div className="flex justify-between items-center mb-3 pr-3.5">
        <div>
          <Title level={5} className="!m-0 flex-1">
            Upcoming Data
          </Title>
        </div>
        <div>
          <Radio.Group
            onChange={upcomingTabChange}
            defaultValue={upcomingTabData}
          >
            <Radio.Button value="trip">TRIP</Radio.Button>
            <Radio.Button value="maintenance">MAINTENANCE</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      {/* Trip */}
      {upcomingTabData === 'trip' && (
        <div className="inline-block min-w-full align-middle overflow-auto h-[340px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-200 scrollbar-track-rounded-full scrollbar-thumb-rounded-full pr-1.5">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="">
                <th
                  scope="col"
                  className="py-2 pl-3 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Vehicle
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                >
                  Destination
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allTrips?.length ? (
                allTrips?.map(
                  (
                    { vehicle, startDate, id, from, to }: any,
                    index: number
                  ) => (
                    <tr key={id} className="hover:bg-slate-50 w-full">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <div className="flex items-center gap-x-4 group">
                          <Image
                            src={images[index]}
                            width={300}
                            height={300}
                            alt="Image"
                            className="h-9 w-9 rounded-full bg-gray-800"
                          />
                          <div className="truncate font-medium leading-6 text-gray-700 group-hover:text-gray-900 capitalize duration-200">
                            <p> {vehicle?.regNo}</p>
                            <p>{dayjs(startDate).format('DD/MM/YYYY')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500  capitalize truncate hover:text-clip">
                        <span>{from}</span>
                        <em> to </em>
                        <span>{to}</span>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td className="py-20 w-full text-center text-red-400">
                    {isTripLoading ? <Spin /> : <Empty />}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Maintenance */}
      {upcomingTabData === 'maintenance' && (
        <div className="inline-block min-w-full align-middle overflow-auto h-[340px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full pr-1.5">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="">
                <th
                  scope="col"
                  className="py-2 pl-3 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Vehicle
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                >
                  Maintenance Head
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allMaintenances?.length ? (
                allMaintenances?.map(
                  (
                    { vehicle, date, id, maintenanceHead }: any,
                    index: number
                  ) => (
                    <tr key={id} className="hover:bg-slate-50 w-full">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <div className="flex items-center gap-x-4 group">
                          <Image
                            width={300}
                            height={300}
                            src={images[index]}
                            alt="Image"
                            className="h-9 w-9 rounded-full bg-gray-800"
                          />
                          <div className="truncate font-medium leading-6 text-gray-700 group-hover:text-gray-900 capitalize duration-200">
                            <p>{vehicle?.regNo}</p>
                            <p>{dayjs(date).format('DD/MM/YYYY')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500  capitalize truncate hover:text-clip">
                        {maintenanceHead?.label}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td className="py-20 w-full text-center text-red-400">
                    {isMaintenanceLoading ? <Spin /> : <Empty />}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpcomingDataSection;

const data2 = [
  {
    businessDetails: {
      businessName: 'Truck REWK421',
      businessLogo:
        'https://plus.unsplash.com/premium_photo-1664695368767-c42483a0bda1?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1dsdfd',
    create_date: new Date().toLocaleDateString(),
  },
  {
    businessDetails: {
      businessName: 'Truck KJYD097',
      businessLogo:
        'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1dsdfsdd',
    create_date: new Date().toLocaleDateString(),
  },
  {
    businessDetails: {
      businessName: 'Truck KJUY563',
      businessLogo:
        'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1dsdfsdd',
    create_date: new Date().toLocaleDateString(),
  },
  {
    businessDetails: {
      businessName: 'BMW DKIU765',
      businessLogo:
        'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1dsfdsdd',
    create_date: new Date().toLocaleDateString(),
  },
  {
    businessDetails: {
      businessName: 'BMW HSFRE876',
      businessLogo:
        'https://images.unsplash.com/flagged/photo-1553505192-acca7d4509be?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1dddsfdd',
    create_date: new Date().toLocaleDateString(),
  },
  {
    businessDetails: {
      businessName: 'Bus HYFOI5603',
      businessLogo:
        'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1dddd',
    create_date: new Date().toLocaleDateString(),
  },

  {
    businessDetails: {
      businessName: 'Bus KHSYG56',
      businessLogo:
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'Bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1',
    create_date: new Date().toLocaleDateString(),
  },
];

const dataM = [
  {
    businessDetails: {
      businessName: 'Bus KHSYG56',
      businessLogo:
        'https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'Bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1',
    create_date: new Date().toLocaleDateString(),
  },
  {
    businessDetails: {
      businessName: 'Bus HYFOI5603',
      businessLogo:
        'https://plus.unsplash.com/premium_photo-1661370367221-982fdba4ce89?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1dddd',
    create_date: new Date().toLocaleDateString(),
  },
  {
    businessDetails: {
      businessName: 'BMW HSFRE876',
      businessLogo:
        'https://images.unsplash.com/photo-1597328290883-50c5787b7c7e?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1dddsfdd',
    create_date: new Date().toLocaleDateString(),
  },
  {
    businessDetails: {
      businessName: 'BMW DKIU765',
      businessLogo:
        'https://plus.unsplash.com/premium_photo-1683140564690-e9bc8a5c6fd4?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1dsfdsdd',
    create_date: new Date().toLocaleDateString(),
  },
  {
    businessDetails: {
      businessName: 'Truck KJUY563',
      businessLogo:
        'https://plus.unsplash.com/premium_photo-1663091693418-a64b58275ca4?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1dsdfsdd',
    create_date: new Date().toLocaleDateString(),
  },
  {
    businessDetails: {
      businessName: 'Truck KJYD097',
      businessLogo:
        'https://plus.unsplash.com/premium_photo-1664475106832-6bcabd2ce4f3?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1dsdfsdd',
    create_date: new Date().toLocaleDateString(),
  },
  {
    businessDetails: {
      businessName: 'Truck REWK421',
      businessLogo:
        'https://images.unsplash.com/photo-1623706897185-32d543db92cf?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    address: {
      city: 'dhaka',
      country: 'bangladesh',
      state: 'dkahak',
      street: 'noaklue',
    },
    _id: '1dsdfd',
    create_date: new Date().toLocaleDateString(),
  },
];

const images = [
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/flagged/photo-1553505192-acca7d4509be?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1664695368767-c42483a0bda1?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1661370367221-982fdba4ce89?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1597328290883-50c5787b7c7e?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1683140564690-e9bc8a5c6fd4?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1663091693418-a64b58275ca4?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1664475106832-6bcabd2ce4f3?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1623706897185-32d543db92cf?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];