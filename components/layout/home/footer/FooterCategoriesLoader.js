import TooltipFooter from "@/components/ui/Tooltip";

const FooterCategoriesLoader = () => {
  return (
    <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 px-6 gap-x-6 gap-y-8 text-gray-600 mb-10">
      <div className="border p-3 rounded-md w-full">
        <span className="font-semibold text-lg capitalize border-b pb-2 border-grey-500 truncate block">
          Loading...
        </span>

        <div className="flex flex-col mt-2 space-y-1">
          <TooltipFooter label="Loading...">
            <span className="text-base capitalize text-gray-500 hover:text-orange-500 cursor-pointer truncate">
              Loading...
            </span>
          </TooltipFooter>
        </div>
      </div>
    </div>
  );
};

export default FooterCategoriesLoader;
