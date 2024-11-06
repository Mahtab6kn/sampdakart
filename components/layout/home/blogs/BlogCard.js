// "use client";
// import React, { useEffect, useState } from "react";
// import { Button, Carousel, IconButton } from "@material-tailwind/react";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
// import Image from "next/image";
// import Link from "next/link";
// import { IoMdArrowForward } from "react-icons/io";

// const BlogCard = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog?limit=5`,
//           {
//             method: "GET",
//             cache: "no-store",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (res.ok) {
//           const data = await res.json();
//           setBlogs(data.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch blogs:", error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   if (blogs.length === 0) return null;
//   return (
//     <>
//       <div className="relative px-0">
//         <div className="flex items-center justify-between h-full w-full absolute z-0">
//           <div className="w-1/3 bg-white h-full" />
//           <div className="w-4/6 ml-16 sm:bg-gray-100 h-[80%]" />
//         </div>
//         <div className="xl:px-20 md:px-8 px-2 pb-20 2xl:mx-auto 2xl:container relative z-40">
//           <div>
//             <h2 className="text-4xl font-bold xl:block hidden leading-tight text-gray-800">
//               <span className="text-white bg-blue-500 mr-2 rounded-full p-1">
//                 📜
//               </span>
//               Blog
//             </h2>

//             <h2 className="text-3xl font-bold xl:hidden block leading-tight lg:leading-10 text-gray-800">
//               <span className="text-white bg-blue-500 mr-2 rounded-full p-1">
//                 📜
//               </span>
//               Blog
//             </h2>
//             <Carousel
//               loop
//               autoplay
//               prevArrow={({ handlePrev }) => (
//                 <IconButton
//                   variant="text"
//                   color="white"
//                   size="lg"
//                   onClick={handlePrev}
//                   className="!absolute top-2/4 left-4 -translate-y-2/4 text-black bg-white/50 shadow rounded-full hover:bg-white/70 hover:scale-105 active:scale-100 transition-all duration-100 z-30"
//                 >
//                   <ChevronLeftIcon className="h-6 w-6 text-black" />
//                 </IconButton>
//               )}
//               nextArrow={({ handleNext }) => (
//                 <IconButton
//                   variant="text"
//                   color="white"
//                   size="lg"
//                   onClick={handleNext}
//                   className="!absolute top-2/4 !right-4 -translate-y-2/4 text-black bg-white/50 shadow rounded-full hover:bg-white/70 hover:scale-105 active:scale-100 transition-all duration-100 z-30"
//                 >
//                   <ChevronRightIcon className="h-6 w-6 text-black" />
//                 </IconButton>
//               )}
//             >
//               {blogs.map((blog, index) => (
//                 <div className="flex" key={index}>
//                   <div className="mt-14 md:flex">
//                     <div className="relative lg:w-1/2 sm:w-96 xl:h-96 h-80">
//                       <Image
//                         fill
//                         src={blog.image.url}
//                         alt="image of Blog"
//                         className="w-full h-full flex-shrink-0 object-cover shadow-lg rounded object-top"
//                       />
//                     </div>

//                     <div className="md:w-1/3 lg:w-1/3 xl:ml-32 md:ml-20 md:mt-0 mt-4 flex flex-col justify-between">
//                       <div>
//                         <h2 className="text-2xl font-semibold  text-gray-800">
//                           {blog.title}
//                         </h2>

//                         <p className="text-base font-medium leading-6 mt-4 text-gray-600">
//                           {blog.description?.length > 350
//                             ? blog.description.substring(0, 350) + "..."
//                             : blog.description}
//                         </p>
//                       </div>

//                       <div className="md:mt-0 mt-8">
//                         <Link href={`/blogs/${blog._id}`}>
//                           <Button
//                             size="lg"
//                             color="pink"
//                             className="py-2 px-3 text-xs flex gap-[6px]"
//                           >
//                             Read More
//                             <IoMdArrowForward size={15} />
//                           </Button>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </Carousel>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center items-center w-full mb-6">
//         <Link
//           href={"/blogs"}
//           className="text-sm rounded-full border border-black capitalize px-6 py-2 hover:shadow-lg hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
//         >
//           VIEW MORE
//         </Link>
//       </div>
//     </>
//   );
// };

// export default BlogCard;
