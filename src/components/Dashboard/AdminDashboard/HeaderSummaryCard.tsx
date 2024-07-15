import { FundProjectionScreenOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { FaSellsy } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";

const HeaderSummaryCard = () => {
  // const { data, isLoading } = useTripSummaryQuery('', {
  //   refetchOnMountOrArgChange: true,
  // });

  const data = [];
  const summaries = data?.summaries;

  const totalTrip = summaries?.count || 0;
  const totalIncome = summaries?.amount || 0;
  const totalExpense = summaries?.expense || 0;
  const netProfit = totalIncome - totalExpense;

  const count = [
    {
      today: "Total Products",
      title: totalTrip,
      percent: "+20%",
      icon: (
        <div className="text-white">
          <FundProjectionScreenOutlined className="text-xl" />
        </div>
      ),
      bnb: "bnb2",
    },
    {
      today: "Total Sell",
      title: `৳${totalIncome}`,
      percent: "+30%",
      icon: (
        <div className="text-white">
          <FaSellsy className="text-xl" />
        </div>
      ),
      bnb: "bnb2",
    },

    {
      today: "Total Profit",
      title: `৳${totalExpense}`,
      percent: "-20%",
      icon: (
        <div className="text-white">
          <GiProfit className="text-xl" />
        </div>
      ),
      bnb: "redtext",
    },
    {
      today: "Total Manager",
      title: `${totalExpense}`,
      percent: "-20%",
      icon: <div className="text-white">
      <TbTruckDelivery  className="text-xl" />
    </div>,
      bnb: "redtext",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <motion.div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
      {count.map((c, index) => (
        <motion.div
          key={index}
          className="flex items-center justify-between bg-white border border-blue-200 shadow-md shadow-blue-200 rounded-lg p-5"
          variants={itemVariants}
        >
          <div>
            <span className="text-[#8c8c8c] font-semibold text-sm">
              {c.today}
            </span>
            <p className="text-3xl font-bold ">
              {c.title}{" "}
              {/* 
                  <small
                    className={`text-sm font-semibold ${
                      c.bnb === "redtext" ? "text-red-500" : "text-[#52c41a]"
                    }`}
                  >
                    {c.percent}
                  </small> 
                  */}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center w-12 h-12 bg-[#1890ff] rounded-[0.5rem]">
              {c.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HeaderSummaryCard;
