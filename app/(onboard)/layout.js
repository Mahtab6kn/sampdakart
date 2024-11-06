const OnboardLayout = ({ children }) => {
  return (
    <div className="h-screen bg-white relative overflow-hidden selection:bg-red-200 selection:text-black">
      {children}
    </div>
  );
};

export default OnboardLayout;
