import Image from "next/image";

import { weOfferData } from "@/utils/HomePageData";

function WeOffer() {
  return (
    <section className="mx-auto justify-evenly hidden lg:flex mb-20">
      {weOfferData.map((data) => (
        <div className="uppercase font-medium" key={data.text}>
          <Image
            src={data.src}
            width={100}
            height={100}
            alt=""
            className="mb-3 mx-auto"
          />

          {data.text}
        </div>
      ))}
    </section>
  );
}

export default WeOffer;
