import { Typography } from 'antd';

const { Title } = Typography;

const IncomeExpenseSection = () => {
  return (
    <div className="bg-white border border-blue-200 shadow-md shadow-blue-200 rounded-lg py-5 pl-5 pr-1.5 lg:col-span-5 overflow-auto">
      <div className="pr-3.5">
        <Title level={5}>Income/Expenses</Title>
        {/* <Paragraph className="lastweek !m-0">
                than last year <span className="blue">+10%</span>
              </Paragraph> */}
      </div>
      <div className="overflow-auto h-[352px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-200 scrollbar-track-rounded-full scrollbar-thumb-rounded-full pr-1.5">
        <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">
          Today
        </header>
        <ul className="my-1">
          {/* Item */}
          {incomeExpenseData.map((d, i) => (
            <li key={i} className="flex px-2 hover:bg-slate-50">
              <div
                className={`w-9 h-9 rounded-full shrink-0 ${
                  d.type === 'income'
                    ? 'bg-emerald-500'
                    : d.type === 'expense'
                    ? 'bg-rose-500'
                    : 'bg-slate-200'
                } my-2 mr-3`}
              >
                {d.type === 'income' && (
                  <svg
                    className="w-9 h-9 fill-current text-emerald-50"
                    viewBox="0 0 36 36"
                  >
                    <path d="M18.3 11.3l-1.4 1.4 4.3 4.3H11v2h10.2l-4.3 4.3 1.4 1.4L25 18z" />
                  </svg>
                )}
                {d.type === 'expense' && (
                  <svg
                    className="w-9 h-9 fill-current text-rose-50"
                    viewBox="0 0 36 36"
                  >
                    <path d="M17.7 24.7l1.4-1.4-4.3-4.3H25v-2H14.8l4.3-4.3-1.4-1.4L11 18z" />
                  </svg>
                )}
                {d.type === 'cancel' && (
                  <svg
                    className="w-9 h-9 fill-current text-slate-400"
                    viewBox="0 0 36 36"
                  >
                    <path d="M21.477 22.89l-8.368-8.367a6 6 0 008.367 8.367zm1.414-1.413a6 6 0 00-8.367-8.367l8.367 8.367zM18 26a8 8 0 110-16 8 8 0 010 16z" />
                  </svg>
                )}
              </div>
              <div className="grow flex items-center border-b border-slate-100 text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">{d.name}</div>
                  <div className="shrink-0 self-start ml-2">
                    <span
                      className={`font-medium  ${
                        d.type === 'income'
                          ? 'text-emerald-500'
                          : d.type === 'expense'
                          ? 'text-rose-500'
                          : 'text-slate-800 line-through'
                      }`}
                    >
                      {d.amount}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IncomeExpenseSection;

const incomeExpenseData = [
  {
    type: 'expense',
    name: 'Fuel bill',
    amount: '-৳700',
  },
  {
    type: 'income',
    name: 'Trip bonus',
    amount: '+1000',
  },
  {
    type: 'income',
    name: 'Trip completed',
    amount: '+12000',
  },
  {
    type: 'cancel',
    name: 'Trip cancel',
    amount: '+৳800',
  },
  {
    type: 'expense',
    name: 'Glass repair',
    amount: '-৳1350',
  },
  {
    type: 'expense',
    name: 'Bumper repair',
    amount: '-৳680',
  },
  {
    type: 'income',
    name: 'Trip completed',
    amount: '+20000',
  },
  {
    type: 'cancel',
    name: 'Trip cancel',
    amount: '+৳1300',
  },
  {
    type: 'expense',
    name: 'Tire change',
    amount: '-৳2000',
  },
];