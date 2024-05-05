/// <reference types = "../CTAutocomplete" />
/// <reference lib = "es2016" />

import { createConditionally } from "./src/files.js";
import { checkVersion, loadCurrent, loadFallBack } from "./src/keybinds.js";
import { loadCustom } from "./src/custom/handler.js";
import sbkCommand from "./src/command/sbk.js";
import deleteCSM from "./src/migrate.js";
import Changelog from "../ChangelogLib/index.js";
const changelog = new Changelog("SkyBlockKeybinds", "2.2.0", "&aOverhauled the Custom Keybinds GUI. Run &e/sbk custom &ato check it out and run &e/sbk cl &afor more info")
changelog.writeChangelog({changelog: "&b", name: "&e", version: "&e"})
const path = `${Config.modulesFolder}/SkyBlockKeybinds`
createConditionally(`${path}/data.json`, JSON.stringify({}))
createConditionally(`${path}/keybinds/custom.json`, JSON.stringify({keybinds: []}))
checkVersion()

try {
    loadCurrent()
} catch (err) {
    ChatLib.chat("&f[&6SkyBlockKeybinds&f] &cThere was a critical error while loading KeyBinds and the module has switched to fallback data")
    loadFallBack()
}
loadCustom()

register("command", sbkCommand).setTabCompletions(["custom","settings", "request", "discord"]).setName("sbk")
deleteCSM()
