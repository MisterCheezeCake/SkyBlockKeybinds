/// <reference types = "../../CTAutocomplete" />
/// <reference lib = "es2015" />
const File = Java.type("java.io.File")
const JSContext = Java.type("org.mozilla.javascript.Context")
export default function deleteCSM() {
    // An old version of the module contained this jar which is no longer needed and will be loaded by CT 2.0 complicating the module's update and delete process. Huge thanks to DJTheRedstoner for giving me the way to do this!
    if (!FileLib.exists(`${Config.modulesFolder}/SkyBlockKeybinds/dep/CSM.jar`) && !FileLib.exists(`${Config.modulesFolder}/SkyBlockKeybinds/dep/Controls Saved 1.0.0.2 (Forge 1.8.9).jar`)) return;
    let deleteQ = []
    if (FileLib.exists(`${Config.modulesFolder}/SkyBlockKeybinds/dep/CSM.jar`)) deleteQ.push(new File(`${Config.modulesFolder}/SkyBlockKeybinds/dep/CSM.jar`))
    if (FileLib.exists(`${Config.modulesFolder}/SkyBlockKeybinds/dep/Controls Saved 1.0.0.2 (Forge 1.8.9).jar`)) deleteQ.push(new File(`${Config.modulesFolder}/SkyBlockKeybinds/dep/Controls Saved 1.0.0.2 (Forge 1.8.9).jar`))

    ChatLib.chat("&f[&6SkyBlockKeybinds&f] &aSkyBlockKeybinds found an old JAR in the module and deleted it to prevent errors")
    // @ts-ignore
    JSContext.getCurrentContext().getApplicationClassLoader().close()
    deleteQ.forEach(f => f.delete())
    ChatTriggers.loadCT()
}