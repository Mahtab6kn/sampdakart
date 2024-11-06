"use client";
import DashboardCard from "@/components/layout/admin/DashboardCard";
import Nav from "@/components/layout/home/NavHeader/Nav";
import HorizontalBarChart from "@/components/utils/chartjs/HorizontalBarChart";
import PieChart from "@/components/utils/chartjs/PieChart";
import { useEffect, useState } from "react";
import Heading from "@/components/ui/heading/Heading";
import { FaTshirt } from "react-icons/fa";
import { GiSteelClaws } from "react-icons/gi";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    categoriesCount: 0,
    subCategoriesCount: 0,
    usersCount: 0,
    productsCount: 0,
    deliveredOrdersCount: 0,
    ongoingOrdersCount: 0,
    canceledOrdersCount: 0,
  });

  const getDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setData(data);
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="w-full">
      <div
        className={`grid place-items-center min-h-screen absolute w-full bg-white transition-all duration-700 top-0 ${
          loading ? "opacity-100" : "opacity-0"
        } ${loading ? "z-50" : "-z-50"}`}
      >
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        className={`transition-all duration-700 ${
          loading ? "hidden" : "block"
        } w-full`}
      >
        <div className="px-8 mt-4">
          <Heading
            icon={
              <div className="bg-gradient-to-r from-red-400 to-pink-400 p-1 rounded-full inline-block">
                <GiSteelClaws size={20} color="white" />
              </div>
            }
            title={"Dashboard"}
          />
        </div>
        <div className="flex lg:flex-row flex-col h-full items-start gap-10 px-8 my-4">
          <div className="grid grid-cols-1 gap-6 self-start w-full h-full">
            <DashboardCard data={data} />
          </div>
          <div className="w-full h-full flex flex-col items-start gap-6">
            <div className="w-full h-full p-4 bg-white shadow-lg rounded-lg">
              <HorizontalBarChart data={data} />
            </div>
            <div className="w-full h-full p-4 bg-white shadow-lg rounded-lg">
              <PieChart data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
