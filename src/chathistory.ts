import settings from "./settings.js";
export default function addChaHistory(message) {
    if (!settings.chatHistory) return;
    //@ts-ignore
    //Client.getMinecraft().field_71456_v.func_146158_b().func_146239_a(`/${message}`);
    ChatLib.addToSentMessageHistory(`/${message}`);
}