import { AiOutlineClose } from "react-icons/ai";

const MainButton = ({ toggleChat, isChatOpen }: any) => {

  return (
    <div
      onClick={toggleChat}
      className="tw-fixed tw-bottom-2 tw-right-2 tw-flex tw-h-[60px] tw-w-[60px] tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-xl tw-bg-black tw-p-[3px] tw-text-white tw-shadow-md tw-transition tw-duration-300 hover:tw-bg-purple-600"
    >
      {isChatOpen ? (
        <AiOutlineClose className="tw-h-3/4 tw-w-3/4 tw-rounded-xl tw-object-contain" />
      ) : (
        <img
          src="https://dev.promptengineers.ai/192.png"
          alt="Logo"
          className="tw-h-full tw-w-full tw-rounded-xl tw-object-contain"
        />
      )}
    </div>
  );
};

export default MainButton;
