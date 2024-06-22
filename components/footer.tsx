import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "../components/ui/Magicbutton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 text-white" id="contact">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a href="mailto:quentinatuobi@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Quentin Atuobi
        </p>

        <div className="flex items-center md:gap-3 gap-6">

        </div>
      </div>
    </footer>
  );
};

export default Footer;