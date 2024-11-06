import Footer from "@/components/layout/home/footer/Footer";
import Nav from "@/components/layout/home/NavHeader/Nav";


const layout = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default layout;
