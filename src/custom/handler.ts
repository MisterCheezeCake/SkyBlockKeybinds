import { SBKeybind } from "../keybinds"
function removeItemOnce(arr, index) {
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
export const saveCustomKeybind = (name, command, cs) => {
    const currentCustom: Custom = JSON.parse(FileLib.read("SkyBlockKeybinds/keybinds", "custom.json"))
    const nk = {
        name,
        command,
        clientSide: cs
    }
    currentCustom.keybinds.push(nk)
    FileLib.write("SkyBlockKeybinds/keybinds", "custom.json", JSON.stringify(currentCustom))
    tempRegister(nk)
}

export const saveEditedVersion = (name, command, cs, id) => {
    const currentCustom: Custom = JSON.parse(FileLib.read("SkyBlockKeybinds/keybinds", "custom.json"))
    const nk = {
        name,
        command,
        clientSide: cs
    }
    currentCustom.keybinds[id] = nk
    FileLib.write("SkyBlockKeybinds/keybinds", "custom.json", JSON.stringify(currentCustom))
}

const tempRegister = (keybind: CustomKeybind) => {
    const kb = new SBKeybind(keybind.name, "SBK - Custom Keybinds", keybind.command, keybind.clientSide)
    return kb
    // This func serves to temperarily register the keybind until it is loaded again by the mod on reload
}
export const loadCustom = () => {
    const c = fetchCurrent()
    const gameKeybinds: SBKeybind[] = c.keybinds.map(kb => {
        return new SBKeybind(kb.name, "SBK - Custom Keybinds", kb.command, kb.clientSide)
    })
    return gameKeybinds
}
export const fetchCurrent = (): Custom => {
    const currentCustom: Custom = JSON.parse(FileLib.read("SkyBlockKeybinds/keybinds", "custom.json"))
    return currentCustom
}

export const deleteCustom = (id) => {
    const currentCustom: Custom = JSON.parse(FileLib.read("SkyBlockKeybinds/keybinds", "custom.json"))
    removeItemOnce(currentCustom.keybinds, id)
    FileLib.write("SkyBlockKeybinds/keybinds", "custom.json", JSON.stringify(currentCustom))
}
export interface Custom {
    keybinds: CustomKeybind[]
}

interface CustomKeybind {
    name: string,
    command: string,
    clientSide: boolean
}
