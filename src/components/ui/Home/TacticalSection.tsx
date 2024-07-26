import { motion, useAnimation } from "framer-motion";

import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import one from "../../../assets/1h.png";
import two from "../../../assets/2h.png";
import trhee from "../../../assets/3h.png";
import four from "../../../assets/4h.png";
import five from "../../../assets/5h.png";
import ser from "../../../assets/6h.png";

export default function TacticalSection() {
  const data = [
    {
      title: "Remote store Management",
      img: one,
      details:
        "Manage product, orders, sells managers and customers from your home",
    },
    {
      title: "Create a store in one minute",
      img: ser,
      details:
        "Now creating a store and your online presence will be in less then one minute",
    },
    {
      title: "Your shop our system",
      img: five,
      details:
        "We are providing whole infrastructure, just create a shop and run your business",
    },
    {
      title: "Track your orders",
      img: four,
      details:
        "Track your new, returned or cancelled orders in your dashboard",
    },
    {
      title: "Secure payment",
      img: trhee,
      details:
        "We are taking the responsibility of your payment and other processing",
    },
    {
      title: "Fastest delivery",
      img: two,
      details:
        "We are providing the fast delivery in the country for your business",
    },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2, delayChildren: 0.8 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <>
      <motion.div
        className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%]  text-center mx-auto py-24"
        variants={containerVariants}
        ref={ref}
        initial="hidden"
        animate={controls}
      >
        <h1 className="text-2xl md:text-4xl font-semibold mb-4">
          Welcome to Matt-Mons ECommerce
        </h1>
        <p className="text-xl mx-auto mb-8">
        Matt-Mons ECommerce is your all-in-one solution for ECommerce Business
        </p>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto mt-10">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center h-full"
              variants={itemVariants}
            >
              <div
                className="h-40 mb-4 overflow-hidden"
                style={{ borderRadius: "50%" }}
              >
                <Image
                  src={item.img}
                  width={200}
                  height={200}
                  alt={item.title}
                  objectFit="cover"
                  className="mx-auto my-auto"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.details}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}