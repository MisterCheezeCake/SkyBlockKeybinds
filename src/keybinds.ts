/// <reference types = "../../CTAutocomplete" />
/// <reference lib = "es2015" />
import addChaHistory from "./chathistory.js"
import axios from "../../axios/index.js"
import settings from "./settings.js"
function loadCurrent() {
    try {
    const { keybinds } = JSON.parse(FileLib.read("SkyBlockKeybinds/keybinds", "current.json"))
    const cmds: string[] = JSON.parse(FileLib.read("SkyBlockKeybinds/keybinds", "security.json")).allowedCommands
    const gameKeybinds: SBKeybind[] = keybinds.map(kb => {
        //@ts-ignore
        // This is a security feature to prevent attacks via an eval command in another module from a compramised repo. The security file is only changes with module updates.
        if (kb.clientside && !cmds.includes(kb.command)) return;
        return new SBKeybind(kb.name, kb.category, kb.command, kb.clientside)
    })
    return gameKeybinds
} catch (error) {
    loadFallBack()
    ChatLib.chat("&f[&6SkyBlockKeybinds&f] &cThere was an error when loading KeyBinds and switched to fallback data as a result")
}
}

function loadFallBack() {
    const { keybinds } = JSON.parse(FileLib.read("SkyBlockKeybinds/keybinds", "fallback.json"))
    const gameKeybinds: SBKeybind[] = keybinds.map(kb => {
        return new SBKeybind(kb.name, kb.category, kb.command, kb.clientside)
    })
    return gameKeybinds

}


class SBKeybind {

    kb: KeyBind
    constructor(name: string, category: string, command: string, cs?: boolean) {
        this.kb = new KeyBind(name, 0, category)
        
        this.kb.registerKeyPress(function () {
            ChatLib.command(command, !!cs)
            addChaHistory(command)
        })
    
        // register("tick", () => {
        //     if (this.kb.isPressed()) ChatLib.command(command, !!cs)
        // })
    }

}
const update = () => {
    //https://raw.githubusercontent.com/MisterCheezeCake/RemoteData/main/SBK/keybinds.json
    axios.get({
        url: settings.remoteDataURL,
        headers: {
            "User-Agent": "Mozilla/5.0 (ChatTriggers)"
        },
        parseBody: true
    }).then(res => {
        FileLib.write("SkyBlockKeybinds/keybinds", "current.json" ,JSON.stringify(res.data))
        ChatLib.chat("&f[&6SkyBlockKeybinds&f] &aNew keybinds sucessfully downloaded. Run &e/ct load &ato complete this process")
    }).catch(e => {
        ChatLib.chat("&f[&6SkyBlockKeybinds&f] &cThere was an error when fetching keybinds")
        console.log(JSON.stringify(e))
    })
}
const checkVersion = () => {
    let version: number
    let sr: boolean
    try {
        try {
        version = JSON.parse(FileLib.read("SkyBlockKeybinds/keybinds", "current.json")).version
        } catch (e) {
            sr = true
            ChatLib.chat("&f[&6SkyBlockKeybinds&f] &cThere is a couruption in the KeyBinds file. Attempting to fix it.")
            update()
        }
    if(sr === true) return;
    axios.get({
        url: settings.versionURL,
        headers: {
            "User-Agent": "Mozilla/5.0 (ChatTriggers)"
        },
        parseBody: false
    }).then(res => {
        const parsed = parseInt(res.data, 10)
        if (parsed > version) update()
    }).catch(e => {
        ChatLib.chat("&f[&6SkyBlockKeybinds&f] &cThere was an error when loading version information")
        console.log(JSON.stringify(e))
    })
} catch (err) {

}
}

export {loadCurrent, checkVersion, SBKeybind, loadFallBack}