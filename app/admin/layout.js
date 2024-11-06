import AdminNavbar from "@/components/layout/admin/AdminNavbar";
import Marquee from "@/components/layout/home/NavHeader/Marquee";

import ShiprocketProvider from "@/provider/ShiprocketProvider";

const layout = ({ children }) => {
  return (
    <ShiprocketProvider>
      <Marquee />
      <AdminNavbar />

      {children}
    </ShiprocketProvider>
  );
};

export default layout;
