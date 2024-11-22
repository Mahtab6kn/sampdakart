import React from "react";

import Image from "next/image";

const Card = ({ label, value, color, image }) => (
  <div
    className={`p-7 rounded-lg flex gap-4 items-center`}
    style={{
      border: `2px solid ${color}`,
      color: `${color}`,
    }}
  >
    <Image alt="" src={image} height={78} width={78} className="object-cover" />
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div>{label}</div>
    </div>
  </div>
);
const DashboardCard = ({ data }) => {
  const cardData = [
    {
      id: 1,
      label: "Total Category",
      value: data.categoriesCount,
      color: "#FFC700",
      image: "/admin/dashboard/category.png",
    },
    {
      id: 2,
      label: "Total SubCategory",
      value: data.subCategoriesCount,
      color: "#fb923c",
      image: "/admin/dashboard/subcategory.png",
    },
    {
      id: 3,
      label: "Total user",
      value: data.usersCount,
      color: "#816797",
      image: "/admin/dashboard/users.png",
    },
    {
      id: 4,
      label: "Total Products",
      value: data.productsCount,
      color: "#D2649A",
      image: "/admin/dashboard/products.png",
    },
    {
      id: 6,
      label: "Delivered orders",
      value: data.deliveredOrdersCount,
      color: "#3AA6B9",
      image: "/admin/dashboard/delivered.png",
    },
    {
      id: 7,
      label: "Ongoing orders",
      value: data.ongoingOrdersCount,
      color: "#7EA1FF",
      image: "/admin/dashboard/ongoing.png",
    },
    {
      id: 8,
      label: "Cancelled orders",
      value: data.canceledOrdersCount,
      color: "#F31559",
      image: "/admin/dashboard/cancel.png",
    },
  ];
  return (
    <>
      {cardData.map(({ id, label, value, color, image }) => (
        <Card
          key={id}
          label={label}
          value={value}
          color={color}
          image={image}
        />
      ))}
    </>
  );
};

export default DashboardCard;
