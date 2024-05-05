import settings from "./settings.js";
export default function addChaHistory(message: string) {
    if (!settings.chatHistory) return;
    //@ts-ignore
    ChatLib.addToSentMessageHistory(`/${message}`);
}