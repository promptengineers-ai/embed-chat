import {useState, useRef, useEffect} from 'react'; // Import the useState hook
import marked from '../config/marked'; // Import the marked library
import DOMPurify from "dompurify";
import {
    MainButton, 
    ChatWindow,
    ChatContent,
    ChatInput, 
    InputArea, 
    SubmitButton, 
    FiSendIcon, 
    MessageContent,
    SiOpenaiIcon,
    AiOutlineCloseIcon,
    Message,
    ClearIcon,
    SettingsIcon,
    ControlButton,
    ControlButtons,
} from '../styles/EmbedChat.styles';
import {
    WelcomeArea,
    WelcomeHeading,
    WelcomeParagraph,
    ButtonGrid,
    GridButton,
} from '../styles/Welcome.styles';
import { useChatContext } from '../contexts/ChatContext';

interface EmbedChatProps {
    id: string;
    hoverColor?: string; // This prop is optional
    position?: string;
}

const EmbedChat: React.FC<EmbedChatProps> = () => {
    const {
        messages,
        chatboxRef,
        chatboxRefIsEmpty,
        setMessages,
        chatPayload,
        setChatPayload,
        sendChatPayload,
        resetMessages,
    } = useChatContext();
    const chatInputRef = useRef<HTMLTextAreaElement>(null);
    const [isChatOpen, setChatOpen] = useState(false);
    const [inputRows, setInputRows] = useState(1);

    const toggleChat = () => setChatOpen(!isChatOpen);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendChatPayload();
          submitCleanUp();
        }
    };

    // Event handler for clearing messages
    const handleClearMessages = () => {
        setMessages([]);
    };

    // Event handler for opening settings
    const handleOpenSettings = () => {
        // Placeholder function, replace with your actual logic
        console.log('Settings button clicked');
    };

    const submitCleanUp = () => {
        setInputRows(1)
        setChatPayload({...chatPayload, query: ''});

        chatInputRef.current?.focus();
    }

    // useEffect(() => {
    //     if (isChatOpen) {
    //       chatInputRef.current?.focus();
    //     }
    //   }, [isChatOpen]);

    return (
        <>
            <MainButton onClick={toggleChat}>
                {isChatOpen ? <AiOutlineCloseIcon /> : <SiOpenaiIcon />}
            </MainButton>
            {isChatOpen && (
                <ChatWindow>
                    <ControlButtons>
                        {messages.length > 0 && (
                            <ControlButton onClick={resetMessages}>
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
                                <WelcomeHeading>Welcome to AI Chat!</WelcomeHeading>
                                <WelcomeParagraph>How can we help you today?</WelcomeParagraph>
                                <ButtonGrid>
                                    <GridButton>FAQs</GridButton>
                                    <GridButton>Contact Us</GridButton>
                                    <GridButton>Support</GridButton>
                                    <GridButton>Feedback</GridButton>
                                </ButtonGrid>
                            </WelcomeArea>
                        )}
                    </ChatContent>
                    <InputArea>
                        <ChatInput
                            ref={chatInputRef}
                            rows={inputRows}
                            value={chatPayload.query}
                            onChange={(e) => setChatPayload({...chatPayload, query: e.target.value})}
                            placeholder="Type your message here..."
                            onKeyDown={handleKeyDown}
                        />
                        <SubmitButton onClick={() => sendChatPayload()}>
                            <FiSendIcon />
                        </SubmitButton>
                    </InputArea>
                </ChatWindow>
            )}
        </>
      );
};

export default EmbedChat;