import Image from "next/image";

export default function VisionSection() {
  return (
    <div className="bg-white mx-4 mt-0 lg:mx-8 lg:mt-8 flex flex-col lg:flex-row gap-8 items-center">
      <div className="w-full lg:w-1/3 flex justify-center">
        <Image
          src="/home/vision.jpg"
          alt="Vision"
          width={500}
          height={500}
          className="rounded-lg object-cover max-h-[32rem] object-top"
        />
      </div>

      <div className="w-full lg:w-2/3">
        <h2 className="text-xl lg:text-3xl font-bold text-red-600 mb-4">
          Our Vision and Goals
        </h2>
        <ul className="list-none space-y-4 text-gray-700">
          <li className="flex items-start">
            <span className="text-red-600 mr-2 hidden sm:block">&#10003;</span>
            <p>
              <strong>Mission: </strong>
              At Riddhi Suman Fabrics, our mission is to empower individuals to
              start their own businesses with top-quality products in the fabric
              industry. We are committed to fostering entrepreneurship by
              providing the best resources and support to help our partners
              thrive.
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2 hidden sm:block">&#10003;</span>
            <p>
              <strong>Vision: </strong>
              Our vision is to emerge as India’s leading online company by 2031.
              We are dedicated to expanding our reach and impact, aiming to
              become the top choice for fabric products across the nation.
            </p>
          </li>

          <li className="flex items-start">
            <span className="text-red-600 mr-2 hidden sm:block">&#10003;</span>
            <div>
              <div className="flex gap-1">
                <strong>Core Values: </strong>
                <p>
                  We are driven by a set of core values that guide our
                  operations and interactions:
                </p>
              </div>

              <ul className="ml-4 list-disc">
                <li>
                  <strong>Best Quality: </strong> We ensure that every product
                  we offer meets the highest standards of quality.
                </li>
                <li>
                  <strong>Customer Satisfaction: </strong> Our customers are our
                  top priority. We are committed to providing exceptional
                  service and ensuring that every customer is satisfied with
                  their purchase.
                </li>
                <li>
                  <strong>Competitive Pricing: </strong> We strive to offer
                  competitive prices without compromising on quality.
                </li>

                <li>
                  <strong>Unique Designs: </strong>Our collection features
                  unique and innovative designs that set us apart in the market.
                </li>
              </ul>
            </div>
          </li>

          <li className="flex items-start">
            <span className="text-red-600 mr-2 hidden sm:block">&#10003;</span>
            <div>
              <div className="flex gap-1">
                <strong>Long-Term Goals: </strong>
                <p>
                  By 2031, Riddhi Suman Fabrics aims to achieve significant
                  milestones:
                </p>
              </div>
              <ul className="ml-4 list-disc">
                <li>
                  <strong>₹1000 crore valuation & IPO: </strong> We are on a
                  path to become a billion-rupee company with a public listing.
                </li>
                <li>
                  <strong>50 million social media followers: </strong> We aspire
                  to build a strong online community with a substantial social
                  media following.
                </li>
                <li>
                  <strong>500 franchises across India: </strong> We plan to
                  expand our presence through a robust franchise network
                  nationwide.
                </li>
              </ul>
            </div>
          </li>

          <li className="flex items-start">
            <span className="text-red-600 mr-2 hidden sm:block">&#10003;</span>
            <div>
              <div className="flex gap-1">
                <strong>Brand Value: </strong>
                <p>
                  Riddhi Suman Fabrics has built a strong brand value over the
                  years:
                </p>
              </div>

              <ul className="ml-4 list-disc">
                <li>
                  <strong>Established Since October 1, 2006: </strong> With over
                  18 years of experience, Riddhi Suman Fabrics has a
                  well-established national presence.
                </li>

                <li>
                  <strong>Trusted by the Industry: </strong> We are a trusted
                  name in the fabric industry, known for our reliability and
                  integrity.
                </li>

                <li>
                  <strong>Strong Reputation: </strong> Our strong reputation is
                  built on a foundation of quality, service, and innovation.
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
