const OverlayContent = ({ heading, paragraph, children }) => {
  return (
    <div className="p-8 text-center space-y-8">
      <div>
        <h2 className="text-4xl xl:text-5xl font-bold text-white mb-2 xl:mb-4">
          {heading}
        </h2>

        <p className="lg:text-base xl:text-lg text-white">{paragraph}</p>
      </div>

      {children || null}
    </div>
  );
};

export default OverlayContent;
