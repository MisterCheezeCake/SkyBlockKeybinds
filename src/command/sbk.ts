/// <reference types = "../../../CTAutocomplete" />
/// <reference lib = "es2015" />
import customBind from "../custom/gui";
import settings from "../settings.js"
const Desktop = Java.type("java.awt.Desktop")
const URI = Java.type("java.net.URI")

const helpTC = (command: string, description: string) => new TextComponent(`&0&l- &e${command} &a${description}`).setClick("run_command", command).setHoverValue(`&3Click to run &e${command}`)
function sbkCommand (...args) {
    if (args[0] === undefined || args[0] === "help") {
        ChatLib.chat("&8------------ &f[&6SkyBlockKeybinds&f] &8------------")
        ChatLib.chat(helpTC("/sbk custom", "Open the GUI for custom KeyBinds"))
        ChatLib.chat(helpTC("/sbk settings", "Open settings GUI"))
        ChatLib.chat(helpTC("/sbk request", "Open the form to submit requests"))
        ChatLib.chat(new TextComponent("&aIf you need more help, click here to join the &3Discord").setClick("open_url", "https://discord.gg/9RJKbCtEUz").setHoverValue("&3Join the Discord"))
    }
    else if (args[0] === "custom") customBind.open()
    else if (args[0] === "settings" || args[0] === "config") settings.openGUI()
    else if (args[0] === "installcs" || args[0] ===  "sayno" || args[0] === "refreshremote" || args[0] === "devmode" || args[0] === "eval" ) ChatLib.chat("&f[&6SkyBlockKeybinds&f] &cThat command has been removed")
    else if (args[0] === "request") Desktop.getDesktop().browse(new URI(`https://mistercheezecake.github.io/sbkform.html?u=${Player.getUUID()}`))
    else if (args[0] === "cl") ChatLib.chat(new TextComponent("&3Click here to view the full Changelog").setClick("open_url", "https://gist.github.com/MisterCheezeCake/9147dec2e7f642872f734a5409185c68").setHoverValue("&3Click Me"))
    else ChatLib.chat(new TextComponent("&f[&6SkyBlockKeybinds&f] &cThat command does not exist. Run &e/sbk help &cfor a list of commands").setClick("run_command", "/sbk help").setHoverValue("&3Click to run &e/sbk help"))

}

export default sbkCommand