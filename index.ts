/// <reference types = "../CTAutocomplete" />
/// <reference lib = "es2015" />

import { createConditionally } from "./src/files.js";
import { checkVersion, loadCurrent, loadFallBack } from "./src/keybinds.js";
import { loadCustom } from "./src/custom/handler.js";
import sbkCommand from "./src/command/sbk.js";
import deleteCSM from "./src/migrate.js";
import Changelog from "../ChangelogLib/index.js";
const changelog = new Changelog("SkyBlockKeybinds", "2.0.0", "&aToo many changes for here.\n&e/sbk cl &afor a detailed changelog")
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

register("command", sbkCommand).setTabCompletions(["custom","settings", "request"]).setName("sbk")
deleteCSM()