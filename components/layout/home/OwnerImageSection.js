import Image from "next/image";
import Link from "next/link";

export default function OwnerImageSection() {
  return (
    <div className="bg-white mx-4 mt-0 lg:mx-8 lg:mt-8 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3 flex justify-center animate-float">
        <Image
          src="/home/owner-2.png"
          alt="Award Ceremony"
          width={500}
          height={500}
          className="rounded-lg object-cover max-h-[33rem] object-top"
        />
      </div>

      <div className="w-full lg:w-2/3 bg-gradient-to-r from-amber-50 to-amber-100 p-5">
        <h1 className="text-xl lg:text-3xl font-bold text-amber-600 mb-4">
          Sampdakart - Your Trusted Source for Musical Instruments and Statues
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to Sampdakart, where tradition meets quality in our selection
          of musical instruments and religious statues. Explore our range and
          find the perfect piece to enhance your spiritual and cultural journey.
        </p>
        <ul className="list-none space-y-4 text-gray-700">
          <li className="flex items-start">
            <span className="text-amber-500 mr-2 hidden sm:block">
              &#10003;
            </span>
            <p>
              <strong>Diverse Selection:</strong> Discover a curated selection
              of traditional instruments and exquisite statues, crafted to
              perfectly resonate with your unique tastes.
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-2 hidden sm:block">
              &#10003;
            </span>
            <p>
              <strong>Quality Craftsmanship:</strong> Each piece is crafted with
              care to ensure the highest quality.
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-2 hidden sm:block">
              &#10003;
            </span>
            <p>
              <strong>Customization Options:</strong> Customize your choices to
              match your distinct preferences and requirements, ensuring a truly
              personalized and satisfying experience.
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-2 hidden sm:block">
              &#10003;
            </span>
            <p>
              <strong>Affordable Prices:</strong>
              Experience top-quality products at affordable prices, combining
              luxury and value without exceeding your budget.
            </p>
          </li>
        </ul>
        <Link href={"/category"}>
          <button className="mt-6 bg-amber-500 hover:bg-amber-600 p-3">
            Explore Now
          </button>{" "}
        </Link>
      </div>
    </div>
  );
}
