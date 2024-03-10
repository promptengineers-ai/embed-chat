import {
    useContext,
    createContext,
    useState,
    useRef,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import { ChatClient } from "../utils/api";
import { ChatContextType } from "../types";
import { IContextProvider } from "../interfaces";
import { log } from "../utils/log";

const defaultChatContextValue: ChatContextType = {
    loading: false,
    setLoading: () => {},
    chatboxRef: { current: null },
    userInputRef: { current: null },
    messages: [],
    setMessages: () => {},
    sendChatPayload: () => {},
    chatPayload: { query: "" },
    setChatPayload: () => {},
    handleChatboxClick: () => {},
    chatboxRefIsEmpty: true,
    setChatboxRefIsEmpty: () => {},
    resetChat: () => {},
};

const ChatContext = createContext(defaultChatContextValue);
export default function ChatProvider({
    children,
    apiHost,
    id,
    theme,
}: IContextProvider & {
    apiHost: string | undefined;
    id: string;
    theme: any;
}) {
    const chatboxRef = useRef<HTMLInputElement | null>(null);
    const [chatboxRefIsEmpty, setChatboxRefIsEmpty] = useState(true);
    const userInputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [chatPayload, setChatPayload] = useState({
        systemMessage: "You are a helpful assistant.",
        query: "",
        temperature: 0,
    });
    const [messages, setMessages] = useState([{ role: "system", content: "" }]);

    const resetChat = useCallback(() => {
        if (chatboxRefIsEmpty) {
            setChatboxRefIsEmpty(true);
            while (chatboxRef.current?.firstChild) {
                chatboxRef.current.removeChild(chatboxRef.current.firstChild);
            }
            setMessages([{ role: "system", content: "" }]);
            setChatPayload((prev) => ({
                ...prev,
                _id: "",
                functions: [],
            }));
        }
        // eslint-disable-next-line
    }, []);

    function handleChatboxClick(e: MouseEvent) {
        if ((e.target as HTMLElement).closest(".copy-btn")) {
            // 2. Get the code content
            const preElement = (e.target as HTMLElement).closest("pre");
            const codeContent =
                preElement?.querySelector("code")?.innerText || "";
            log(
                "contexts.ChatContext.handleChatboxClick",
                codeContent,
                "Code Content"
            );
            // 3. Use Clipboard API to copy
            navigator.clipboard
                .writeText(codeContent)
                .then(() => {
                    // Optional: Show a toast or feedback to user saying "Copied to clipboard!"
                    alert("Copied to clipboard!");
                    return;
                })
                .catch((err) => {
                    console.error("Failed to copy: ", err);
                });
        }
    }

    const updateCallback = useCallback(
        async (streamMessages: { role: string; content: string }[]) => {
            setMessages(streamMessages);
            setChatPayload((prev) => ({ ...prev, query: "" }));
            userInputRef.current?.focus();
        },
        []
    );

    const sendChatPayload = useCallback(() => {
        if (!chatPayload.query) {
            alert("Please enter a message first.");
            return;
        }
        setChatboxRefIsEmpty(false);

        // Create a copy of the current messages
        const updatedMessages = [...messages];

        // Append the user's message to the conversation
        updatedMessages[0].content =
            localStorage.getItem("systemMessage") || chatPayload.systemMessage;
        updatedMessages.push({ role: "user", content: chatPayload.query });
        const payload = { messages: updatedMessages };

        const chatClient = new ChatClient(apiHost, "", theme);
        chatClient.sendChatStreamMessage(id, payload, updateCallback, () =>
            setLoading(false)
        );
    }, [apiHost, chatPayload, id, messages, theme, updateCallback]);

    useEffect(() => {
        // 1. Add an event listener on the chatbox
        const chatbox = document.getElementById("chatbox");
        chatbox?.addEventListener("click", handleChatboxClick);

        userInputRef.current?.focus();

        // Cleanup event listener
        return () => {
            chatbox?.removeEventListener("click", handleChatboxClick);
        };
    }, [messages, userInputRef]);

    // useEffect(() => {
    // 	if (messages.length > 1) {
    // 		setChatboxRefIsEmpty(false);
    // 	} else {
    // 		setChatboxRefIsEmpty(true);
    // 	}
    // }, [messages]);

    return (
        <ChatContext.Provider
            value={useMemo(() => {
                return {
                    loading,
                    chatboxRef,
                    userInputRef,
                    messages,
                    chatPayload,
                    chatboxRefIsEmpty,
                    resetChat,
                    setMessages,
                    setLoading,
                    setChatPayload,
                    sendChatPayload,
                    handleChatboxClick,
                    setChatboxRefIsEmpty,
                };
            }, [
                loading,
                chatboxRef,
                userInputRef,
                messages,
                chatPayload,
                chatboxRefIsEmpty,
                resetChat,
                sendChatPayload,
            ])}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext(): any {
    return useContext(ChatContext);
}
