import { useEffect, useRef, useState } from "react";


const ChatInput = () => {
    const chatInputRef = useRef<HTMLTextAreaElement | null>(null);
    const [userInput, setUserInput] = useState("");

    const adjustHeight = (height?: string) => {
        const textarea = chatInputRef.current as unknown as HTMLTextAreaElement; // Type assertion
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = height
                ? height
                : `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [userInput]);
    
    return (
        <textarea
              ref={chatInputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            //   onPaste={handlePaste}
            //   onKeyDown={handleKeyDown}
            id="prompt-textarea"
            tabIndex={0}
            data-id="root"
            rows={1}
            // disabled={files.length > 0}
            placeholder="Acting as a expert at..."
            className="tw-m-0 tw-max-h-52 tw-w-full tw-resize-none tw-border-0 tw-bg-white tw-px-3 tw-py-[5px] tw-placeholder-black/50 focus:tw-outline-none"
            style={{
                overflowY: "auto",
                borderRadius: "10px",
                // backgroundColor:
                //     files.length > 0 ? "#F9F9F9" : "",
            }}
        ></textarea>
    );
};

export default ChatInput;
