import { FaLocationArrow, FaDiscord, FaGithub, FaWhatsapp } from "react-icons/fa6";
import MagicButton from "@/components/ui/Magicbutton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 text-white" id="contact">
      <div className="flex flex-col items-center px-4 md:px-0">
        <h1 className="heading text-center lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital presence to the next level?
        </h1>
        <p className="text-white-200 my-5 md:mt-10 text-center">
          Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
        </p>
        <a href="mailto:quentinatuobi@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-16 px-4 md:px-0">
        <p className="text-sm md:text-base font-light md:font-normal">
          Copyright © 2024 Quentin Atuobi
        </p>
        <div className="flex items-center gap-6 md:gap-3 mt-4 md:mt-0">
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
            <FaDiscord className="text-white text-2xl hover:text-blue-500" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-white text-2xl hover:text-blue-500" />
          </a>
          <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-white text-2xl hover:text-blue-500" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
