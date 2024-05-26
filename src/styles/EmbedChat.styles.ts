// Styled button component
import styled from 'styled-components';
import theme from "../config/theme";

import { FiSend, FiSettings } from 'react-icons/fi';
import { FaUndo } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";
import { ThemeProps } from "../interfaces";

export const MainButton = styled.div<ThemeProps>`
    position: fixed;
    bottom: 20px;
    ${(props) => props.theme?.position || "right"}: 20px;
    background-color: ${(props) =>
        props.theme?.button?.backgroundColor || theme.button.backgroundColor};
    color: ${(props) =>
        props.theme?.button?.icon?.color || theme.button.icon.color};
    display: flex; // Use flexbox to center content
    align-items: center; // Center vertically
    justify-content: center; // Center horizontally
    padding: ${(props) => props.theme?.button?.padding || theme.button.padding};
    border-radius: ${(props) =>
        props.theme?.button?.borderRadius || theme.button.borderRadius};
    cursor: pointer;
    box-shadow: ${(props) => props.theme?.button?.width || theme.button.width};
    transition: background-color 0.3s;
    font-family: sans-serif;
    font-size: ${(props) => props.theme?.button?.icon?.fontSize || theme.button.icon.fontSize};
    width: ${(props) => props.theme?.button?.width || theme.button.width};
    height: ${(props) =>
        props.theme?.button?.height ||
        theme.button.height};
    &:hover {
        background-color: ${(props) =>
            props.theme?.button?.hoverColor || theme.button.hoverColor};
    }
`;

export const ChatWindow = styled.div<ThemeProps>`
    position: fixed;
    z-index: 9999;
    bottom: ${(props) =>
        props.theme?.chatWindow?.bottom || theme.chatWindow.bottom};
    right: ${(props) =>
        props.theme?.chatWindow?.right || theme.chatWindow.right};
    width: ${(props) =>
        props.theme?.chatWindow?.width ||
        theme.chatWindow.width}; /* Or any other size */
    height: ${(props) =>
        props.theme?.chatWindow?.height ||
        theme.chatWindow.height}; /* Or any other size */
    background-color: ${(props) =>
        props.theme?.chatWindow?.backgroundColor ||
        theme.chatWindow.backgroundColor};
    box-shadow: ${(props) =>
        props.theme?.chatWindow?.boxShadow || theme.chatWindow.boxShadow};
    border-radius: ${(props) =>
        props.theme?.chatWindow?.borderRadius || theme.chatWindow.borderRadius};
    padding: ${(props) =>
        props.theme?.chatWindow?.padding || theme.chatWindow.padding};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: space-between;
    font-family: ${(props) =>
        props.theme?.chatWindow?.fontFamily || theme.chatWindow.fontFamily};

    /* Media query for mobile devices */
    @media (max-width: 600px) {
        bottom: 0;
        right: 0;
        width: 100vw;
        height: 100%;
        border-radius: 0;
    }
`;

export const ChatContent = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

export const InputArea = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    background: white;
`;

// export const ChatInput = styled.textarea<ThemeProps>`
//     flex-grow: 1;
//     padding: 8px 10px;
//     border: none;
//     border-radius: 4px;
//     resize: none;
//     font-family: sans-serif;
//     font-size: ${(props) =>
//         props.theme?.chatWindow?.chatInput?.fontSize ||
//         theme.chatWindow.chatInput.fontSize};
//     color: black;
//     &:focus {
//         outline: none;
//     }
//     margin: 0;
//     &::-webkit-scrollbar {
//         display: none;
//     }
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//     overflow: hidden;
//     &:focus {
//         overflow-y: auto;
//     }
// `;

export const SubmitButton = styled.button<ThemeProps>`
    background: none;
    border: none;
    cursor: pointer;
    color: ${(props) =>
        props.theme?.chatWindow?.submitButton?.backgroundColor || theme.chatWindow.submitButton.backgroundColor};
    display: flex;
    align-items: center; // Align the icon inside the button
    justify-content: center; // Center the icon horizontally
    padding: ${(props) =>
        props.theme?.chatWindow?.submitButton?.padding ||
        theme.chatWindow.submitButton.padding};
    &:hover {
        color: ${(props) =>
            props.theme?.chatWindow?.submitButton?.hoverColor ||
            theme.chatWindow.submitButton.hoverColor};
    }
    &:focus {
        outline: none;
    }
`;

export const StyledSpinner = styled.svg<ThemeProps>`
    animation: rotate 1s linear infinite;
    margin: ${(props) =>
        props.theme?.chatWindow?.chatInput?.spinner?.margin ||
        theme.chatWindow.chatInput.spinner.margin};
    width: ${(props) =>
        props.theme?.chatWindow?.chatInput?.spinner?.width ||
        theme.chatWindow.chatInput.spinner.width};
    height: ${(props) =>
        props.theme?.chatWindow?.chatInput?.spinner?.height ||
        theme.chatWindow.chatInput.spinner.height};

    & .path {
        stroke: ${(props) =>
            props.theme?.chatWindow?.chatInput?.spinner.backgroundColor ||
            theme.chatWindow.chatInput.spinner.backgroundColor};
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
`;

export const ControlButtons = styled.div`
    display: flex;
    justify-content: right; // Align buttons to the left
    gap: 5px; // Spacing between buttons
    margin-bottom: 5px; // Space between buttons and chat content
`;

export const ControlButton = styled.button<ThemeProps>`
    background-color: ${(props) =>
        props.theme?.chatWindow?.controlButton?.backgroundColor ||
        theme.chatWindow.controlButton.backgroundColor};
    border: ${(props) =>
        props.theme?.chatWindow?.controlButton?.border ||
        theme.chatWindow.controlButton.border};
    border-radius: ${(props) =>
        props.theme?.chatWindow?.controlButton?.borderRadius ||
        theme.chatWindow.controlButton.borderRadius};
    width: ${(props) =>
        props.theme?.chatWindow?.controlButton?.width ||
        theme.chatWindow.controlButton.width};
    height: ${(props) =>
        props.theme?.chatWindow?.controlButton?.height ||
        theme.chatWindow.controlButton.height};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: ${(props) =>
        props.theme?.chatWindow?.controlButton?.boxShadow ||
        theme.chatWindow.controlButton.boxShadow};
    transition: background-color 0.3s;
    color: ${(props) =>
        props.theme?.chatWindow?.controlButton?.color ||
        theme.chatWindow.controlButton.color};
    &:hover {
        background-color: ${(props) =>
            props.theme?.chatWindow?.controlButton?.hoverColor ||
            theme.chatWindow.controlButton.hoverColor};
    }
`;

export const MessageContent = styled.div`
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-x: auto; // Scroll horizontally only if needed
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox
`;

// Add some simple styling for messages
export const Message = styled.div<{ sender: 'user' | 'bot' }>`
    background-color: ${props => props.sender === 'user' ? theme.button.backgroundColor : '#ECECEC'};
    color: ${props => props.sender === 'user' ? 'white' : 'purple'};
    border-radius: 7px;
    padding: 5px 10px;
    margin-bottom: 10px;
    align-self: ${props => props.sender === 'user' ? 'flex-start' : 'flex-end'};
    max-width: 85%;
`;

export const iconStyle = `
  font-size: 1.5em;
  line-height: 1;
`;
export const FiSendIcon = styled(FiSend)`${iconStyle}`;
export const SiOpenaiIcon = styled(SiOpenai)`${iconStyle}`;
export const AiOutlineCloseIcon = styled(AiOutlineClose)`${iconStyle}`;
export const ClearIcon = styled(FaUndo)``; // Replace FiTrash with the actual icon you use for clear
export const SettingsIcon = styled(FiSettings)``; // Replace FiSettings with the actual icon you use for settings
