import { useState, useRef, useEffect } from "react";
import defaultTheme from "../config/theme";
import MainButton from "./buttons/MainButton";
import {
    // MainButton,
    ChatWindow,
    ChatContent,
    // ChatInput,
    InputArea,
    SubmitButton,
    FiSendIcon,
    AiOutlineCloseIcon,
    ClearIcon,
    SettingsIcon,
    ControlButton,
    ControlButtons,
} from "../styles/EmbedChat.styles";
import {
    WelcomeArea,
    WelcomeHeading,
    WelcomeParagraph,
    ButtonGrid,
    GridButton,
    StarterButton,
} from "../styles/Welcome.styles";
import { useChatContext } from "../contexts/ChatContext";
import DOMPurify from "dompurify";
import Spinner from "./Spinner";
import { truncate } from "../utils/format";
import ChatInput from "./input/ChatInput";

interface EmbedChatProps {
    theme?: any;
}

const EmbedChat: React.FC<EmbedChatProps> = ({ theme }) => {
    const {
        loading,
        setMessages,
        chatboxRef,
        chatInputRef,
        chatboxRefIsEmpty,
        chatPayload,
        setChatPayload,
        sendChatPayload,
        resetChat,
    } = useChatContext();
    const [isChatOpen, setChatOpen] = useState(false);
    const [inputRows, setInputRows] = useState(1);

    const toggleChat = () => setChatOpen(!isChatOpen);

    useEffect(() => {
        localStorage.removeItem("chatbox");
    }, []);

    useEffect(() => {
        if (isChatOpen && chatboxRef.current) {
            const chatboxContent = localStorage.getItem("chatbox");
            const messages = localStorage.getItem("messages");
            if (messages) {
                setMessages(JSON.parse(messages));
            }
            if (chatboxContent) {
                chatboxRef.current.innerHTML =
                    DOMPurify.sanitize(chatboxContent);
            }
        }
    }, [isChatOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendChatPayload();
            submitCleanUp();
        }
        if (e.altKey && e.key === "n") {
            e.preventDefault();
            resetChat();
        }
    };

    // Event handler for opening settings
    const handleOpenSettings = () => {
        // Placeholder function, replace with your actual logic
        alert("Opened settings");
    };

    const submitCleanUp = () => {
        setInputRows(1);
        setChatPayload({ ...chatPayload, query: "" });
        chatInputRef.current?.focus();
    };

    const calculatedButtons =
        theme?.chatWindow?.welcomeButtons ||
        defaultTheme.chatWindow.welcomeButtons;

    return (
        <>
            <MainButton
                isChatOpen={isChatOpen}
                toggleChat={toggleChat}
                theme={null}
            />
            {isChatOpen && (
                <ChatWindow theme={theme}>
                    <ControlButtons>
                        {!chatboxRefIsEmpty && (
                            <ControlButton onClick={resetChat}>
                                <ClearIcon />
                            </ControlButton>
                        )}
                        <ControlButton onClick={handleOpenSettings}>
                            <SettingsIcon fontSize={"20px"} />
                        </ControlButton>
                        {window.innerWidth < 768 && (
                            <ControlButton onClick={toggleChat} theme={theme}>
                                <AiOutlineCloseIcon />
                            </ControlButton>
                        )}
                    </ControlButtons>
                    <ChatContent id="chatbox" ref={chatboxRef}>
                        {chatboxRefIsEmpty && (
                            <WelcomeArea>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img
                                        src={
                                            theme?.chatWindow?.icon?.src ||
                                            defaultTheme.chatWindow.icon.src
                                        }
                                        alt="logo"
                                        style={{
                                            width:
                                                theme?.chatWindow?.icon
                                                    ?.width ||
                                                defaultTheme.chatWindow.icon
                                                    .width,
                                            height:
                                                theme?.chatWindow?.icon
                                                    ?.height ||
                                                defaultTheme.chatWindow.icon
                                                    .height,
                                            borderRadius:
                                                theme?.chatWindow?.icon
                                                    ?.borderRadius ||
                                                defaultTheme.chatWindow.icon
                                                    .borderRadius,
                                        }} // Adjust the size as needed
                                    />
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <WelcomeHeading>
                                        {theme?.chatWindow?.title ||
                                            defaultTheme.chatWindow.title}
                                    </WelcomeHeading>
                                    <WelcomeParagraph>
                                        {theme?.chatWindow?.welcomeMessage ||
                                            defaultTheme.chatWindow
                                                .welcomeMessage}
                                    </WelcomeParagraph>
                                </div>
                                {calculatedButtons.length > 0 && (
                                    <ButtonGrid>
                                        {calculatedButtons.map(
                                            (item: any, index: number) => {
                                                return (
                                                    <GridButton
                                                        theme={theme}
                                                        key={index}
                                                        onClick={() =>
                                                            window.open(
                                                                item.href,
                                                                "_blank",
                                                            )
                                                        }
                                                    >
                                                        {item.label}
                                                    </GridButton>
                                                );
                                            },
                                        )}
                                    </ButtonGrid>
                                )}
                                {theme?.chatWindow?.starters && (
                                    <div
                                        style={{
                                            display: "flex",
                                            overflowX: "auto",
                                            scrollbarWidth: "thin",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                            }}
                                        >
                                            {theme?.chatWindow?.starters?.map(
                                                (item: any, index: number) => (
                                                    <StarterButton
                                                        theme={theme}
                                                        key={index}
                                                        onClick={() =>
                                                            setChatPayload(
                                                                (
                                                                    prev: any,
                                                                ) => ({
                                                                    ...prev,
                                                                    query: item.template,
                                                                }),
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            {item.label}
                                                        </div>
                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    "smaller",
                                                            }}
                                                            title={
                                                                item.template
                                                            }
                                                        >
                                                            {truncate(
                                                                item.template,
                                                                40,
                                                            )}
                                                        </div>
                                                    </StarterButton>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </WelcomeArea>
                        )}
                    </ChatContent>
                    <div className="tw-w-full tw-border-t tw-bg-white tw-pt-2 md:tw-border-t-0 md:tw-bg-transparent md:tw-pt-0">
                        <form className="tw-stretch tw-flex tw-flex-row tw-gap-3 lg:tw-mx-auto lg:tw-max-w-2xl xl:tw-max-w-3xl">
                            <div className="tw-relative tw-flex tw-h-full tw-flex-1 tw-items-stretch md:tw-flex-col">
                                <div className="tw-flex tw-w-full tw-items-center">
                                    <div className="tw-shadow-custom tw-bg-primary-300 tw-shadow-xs tw-relative tw-flex tw-w-full tw-flex-grow tw-flex-col tw-overflow-hidden tw-rounded-lg tw-border tw-border-black/10">
                                        <ChatInput />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="tw-text-secondary-100 tw-relative tw-bg-white tw-pt-1 tw-text-center tw-text-[11px]">
                            <span>
                                AI can make mistakes. Consider checking
                                important information.
                            </span>
                        </div>
                    </div>
                </ChatWindow>
            )}
        </>
    );
};

export default EmbedChat;
