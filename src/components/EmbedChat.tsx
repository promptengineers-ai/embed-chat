import { useState, useRef } from "react";
import defaultTheme from "../config/theme";
import {
    MainButton,
    ChatWindow,
    ChatContent,
    ChatInput,
    InputArea,
    SubmitButton,
    FiSendIcon,
    // SiOpenaiIcon,
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
} from "../styles/Welcome.styles";
import { useChatContext } from "../contexts/ChatContext";
import { Welcome } from "../types";

interface EmbedChatProps {
    theme?: any;
    welcome?: Welcome;
}

const EmbedChat: React.FC<EmbedChatProps> = ({ theme, welcome }) => {
    const {
        messages,
        chatboxRef,
        chatboxRefIsEmpty,
        chatPayload,
        setChatPayload,
        sendChatPayload,
        resetChat,
    } = useChatContext();
    const chatInputRef = useRef<HTMLTextAreaElement>(null);
    const [isChatOpen, setChatOpen] = useState(false);
    const [inputRows, setInputRows] = useState(1);

    const toggleChat = () => setChatOpen(!isChatOpen);

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
            <MainButton onClick={toggleChat} theme={theme}>
                {isChatOpen ? (
                    <AiOutlineCloseIcon
                        style={{ padding: defaultTheme.button.icon.padding }}
                    />
                ) : (
                    <img
                        src={
                            theme?.button?.icon?.src ||
                            defaultTheme.button.icon.src
                        }
                        alt="Logo"
                        height={
                            theme?.button?.icon?.height ||
                            defaultTheme.button.icon.height
                        }
                    />
                )}
            </MainButton>
            {isChatOpen && (
                <ChatWindow theme={theme}>
                    <ControlButtons>
                        {messages.length > 0 && (
                            <ControlButton onClick={resetChat}>
                                <ClearIcon />
                            </ControlButton>
                        )}
                        <ControlButton onClick={handleOpenSettings}>
                            <SettingsIcon />
                        </ControlButton>
                    </ControlButtons>
                    <ChatContent id="chatbox" ref={chatboxRef}>
                        {chatboxRefIsEmpty && (
                            <WelcomeArea>
                                <WelcomeHeading>
                                    {theme?.chatWindow?.title ||
                                        defaultTheme.chatWindow.title}
                                </WelcomeHeading>
                                <WelcomeParagraph>
                                    {theme?.chatWindow?.welcomeMessage ||
                                        defaultTheme.chatWindow.welcomeMessage}
                                </WelcomeParagraph>
                                <ButtonGrid>
                                    {calculatedButtons.map(
                                        (item: any, index: number) => {
                                            return (
                                                <GridButton
                                                    key={index}
                                                    onClick={() =>
                                                        window.open(
                                                            item.href,
                                                            "_blank"
                                                        )
                                                    }
                                                >
                                                    {item.label}
                                                </GridButton>
                                            );
                                        }
                                    )}
                                </ButtonGrid>
                            </WelcomeArea>
                        )}
                    </ChatContent>
                    <InputArea>
                        <ChatInput
                            ref={chatInputRef}
                            rows={inputRows}
                            value={chatPayload.query}
                            onChange={(e) =>
                                setChatPayload({
                                    ...chatPayload,
                                    query: e.target.value,
                                })
                            }
                            placeholder="Type your message here..."
                            onKeyDown={handleKeyDown}
                            style={{ fontSize: "14px" }}
                        />
                        <SubmitButton
                            onClick={() => sendChatPayload()}
                            theme={theme}
                        >
                            <FiSendIcon />
                        </SubmitButton>
                    </InputArea>
                </ChatWindow>
            )}
        </>
    );
};

export default EmbedChat;
