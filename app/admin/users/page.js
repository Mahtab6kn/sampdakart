import UserCard from "@/components/layout/admin/users/UserCard";
import Heading from "@/components/ui/heading/Heading";
import PaginationBtn from "@/components/ui/PaginationBtn";
import React, { Suspense } from "react";
import { RiCoupon4Line } from "react-icons/ri";

async function getUsers(page = 1, size = 12) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users?page=${page}&size=${size}`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch users",
        status: res.status,
        data: [],
        meta: { page, size, totalPages: 1, totalItems: 0 },
      };
    }

    const data = await res.json();

    return {
      success: true,
      data: data.data,
      meta: data.meta,
    };
  } catch (error) {
    console.error("Error fetching users:", error);

    return {
      success: false,
      message: "An error occurred while fetching the users",
      data: [],
      meta: { page, size, totalPages: 1, totalItems: 0 },
    };
  }
}

const page = async ({ searchParams: { page, size } }) => {
  const data = await getUsers(page, size);

  return (
    <main className="p-4 flex flex-col gap-4">
      <Heading
        icon={
          <div className="bg-gradient-to-r from-red-400 to-pink-400 p-1 rounded-full inline-block">
            <RiCoupon4Line size={20} color="white" />
          </div>
        }
        title={"Users"}
      />

      <Suspense>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full px-4">
          {data.data?.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </Suspense>

      <PaginationBtn totalPages={data.meta?.totalPages} />
    </main>
  );
};

export default page;
