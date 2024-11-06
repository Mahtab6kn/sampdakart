import Image from "next/image";

export default function OwnerImageSection() {
  return (
    <div className="bg-white mx-4 mt-0 lg:mx-8 lg:mt-8 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3 flex justify-center">
        <Image
          src="/home/owner-2.png"
          alt="Award Ceremony"
          width={500}
          height={500}
          className="rounded-lg object-cover max-h-[32rem] object-top"
        />
      </div>

      <div className="w-full lg:w-2/3">
        <h1 className="text-xl lg:text-3xl font-bold text-blue-600 mb-4">
          GhostingTech E-Commerce - Rated #1 Most Trusted Textile Company in
          Patna, Bihar (India)
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to GhostingTech E-Commerce, where tradition meets elegance in
          Indian ethnic wear. As a top choice for quality{" "}
          <strong>Indian Lehenga, Sarees and Suits in Surat</strong>, we are
          proud to offer a wide collection that combines classic craftsmanship
          with modern style. Explore our range and find the beauty of Indian
          sarees that reflect both tradition and creativity.
        </p>
        <ul className="list-none space-y-4 text-gray-700">
          <li className="flex items-start">
            <span className="text-red-600 mr-2 hidden sm:block">&#10003;</span>
            <p>
              <strong>Diverse Range:</strong> Our collection includes many types
              of sarees, from the classic Banarasi silk to the light and airy
              georgette. No matter the occasion, we have the perfect saree to
              match your style.
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2 hidden sm:block">&#10003;</span>
            <p>
              <strong>Quality Assurance:</strong> We focus on quality. Each
              saree is made from high-quality fabrics and goes through strict
              checks to make sure our customers get only the best.
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2 hidden sm:block">&#10003;</span>
            <p>
              <strong>Customization Options:</strong> We know that everyone has
              different tastes. That's why we offer customization options, so
              you can adjust your saree to fit your needs and make it uniquely
              yours.
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2 hidden sm:block">&#10003;</span>
            <p>
              <strong>Affordable Luxury:</strong> Enjoy the luxury of wearing
              beautiful Indian sarees without spending too much. We are
              dedicated to providing affordable, high-quality options, making
              traditional Indian clothing available to everyone.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
