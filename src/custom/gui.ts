/// <reference types = "../../../CTAutocomplete" />
/// <reference lib = "es2016" />

import { saveCustomKeybind, fetchCurrent, Custom, saveEditedVersion, deleteCustom } from "./handler"
import settings from "../settings.js"
import { CheezeGUI, CheezeText } from "./lib"

const Essential = Java.type("gg.essential.api.EssentialAPI")
const box = Image.fromFile(`${Config.modulesFolder}/SkyBlockKeybinds/assets/box.png`)
const check = Image.fromFile(`${Config.modulesFolder}/SkyBlockKeybinds/assets/check.png`)

let delid = -1

let name = new CheezeText()
let command = new CheezeText()

let selected =  null
let checked = false
let editMode = false
let slashWarn = false
let editId: number

function resetNewBind() {
    name = new CheezeText()
    command = new CheezeText()
    selected = null
    checked = false
    editMode = false
    slashWarn = false
}
function setUpEditMode(nme: string, cmd: string, chk: boolean, id: number) {
    resetNewBind()
    editMode = true
    name = new CheezeText(nme)
    command = new CheezeText(cmd)
    checked = chk
    editId = id
}
const customBind = new Gui()

customBind.registerDraw(draw)


customBind.addButton(1, CheezeGUI.center(270), 20, 270, 20, "Create new Custom Keybind");
customBind.addButton(2, CheezeGUI.center(270), 60, 270, 20, "Manage Existing Custom Keybinds");
customBind.addButton(6, CheezeGUI.center(270), 100, 270, 20, "Back to Main Settings Menu")

function draw() {
    CheezeGUI.drawBackground()
    CheezeGUI.drawCenteredString("&a&lSkyBlockKeybinds Custom Keybinds by &6&lMisterCheezeCake", 5)
} 

customBind.registerActionPerformed(button => {
    //@ts-ignore
    if (button === 1) {
        newBind.open()
        resetNewBind()
    }
       
    //@ts-ignore
    if (button === 2)  {
        createListGui().open()
    }
    //@ts-ignore
    if (button === 6) settings.openGUI()
})




const newBind = new Gui() 

newBind.addButton(3, CheezeGUI.center(270), 180, 270, 20, "Save custom Keybind");
newBind.addButton(4, CheezeGUI.center(270), 210, 270, 20, "Cancel")
newBind.registerDraw(newBindDraw)

function newBindDraw() {
    CheezeGUI.drawBackground()
    const leftEdge = CheezeGUI.center(270)
    CheezeGUI.drawCenteredString(`&6&l${editMode ? "Edit": "Create"} Custom Keybinds`, 5)
    CheezeGUI.drawCenteredString("Enter Unique Name", 20)
    CheezeGUI.drawBorderedRect(leftEdge, 32, 270, 15, Renderer.BLACK, selected == "name" ? Renderer.YELLOW : Renderer.GRAY)
    CheezeGUI.drawCenteredString("Enter Command Without /", 60)
    CheezeGUI.drawBorderedRect(leftEdge, 72, 270, 15, Renderer.BLACK, selected == "command" ? Renderer.YELLOW : Renderer.GRAY)
    Renderer.drawStringWithShadow(name.getText(selected == "name"), leftEdge + 2, 35)
    Renderer.drawStringWithShadow(command.getText(selected == "command"), leftEdge +2, 75)
    CheezeGUI.drawCenteredString("Clientside (Click to Change)", 103)
    Renderer.drawImage(box, CheezeGUI.center(50), 115, 50, 50)  
    if (checked) Renderer.drawImage(check, CheezeGUI.center(32), 123, 32, 32)
    if (name.text.length > 0 && command.text.length > 0) newBind.setButtonEnabled(3, true)
    else newBind.setButtonEnabled(3, false)


    
}
function handleTextInput (text: CheezeText, char: string, keycode: number) {
    if (keycode === 14) {
        if (Client.isControlDown()) {
            text.setText("")
            text.setCursorPos(0)
            return;
        }
        return text.backspace()
    }
    if (keycode === 203) return text.moveCursor(-1)
    if (keycode === 205) return text.moveCursor(1)
    let c = "" + char
    if (Client.isControlDown()) {
        if (keycode == 47) {
            let clipboard = CheezeText.getClipboard()
            for (let i = 0; i < clipboard.length; i++) {
                handleTextInput(text, clipboard[i], 0)
            }
            return;
        }
        if (keycode === 46) {
            CheezeText.setClipboard(text.text)
            return;
        }
        if (keycode === 45) {
            CheezeText.setClipboard(text.text)
            text.setText("")
            text.setCursorPos(0)
            return;
        }
    }
    if (!CheezeText.allowedChars.includes(c)) return;
    text.type(c)
}
newBind.registerKeyTyped((typed, key) => {
   if (selected === "name") handleTextInput(name, typed, key)
    else if (selected === "command") handleTextInput(command, typed, key)
})
// New Code
newBind.registerClicked((x,y) => {
    const rectEdges = CheezeGUI.getHorizontalEdges(270)

    if (CheezeGUI.between(x, ...rectEdges) && CheezeGUI.between(y, 32, 47)) {
        selected = "name"
    } else if (CheezeGUI.between(x, ...rectEdges) && CheezeGUI.between(y, 72, 87)) {
        selected = "command"
    } else if (CheezeGUI.between(x, CheezeGUI.center(50), CheezeGUI.center(50) + 50) && CheezeGUI.between(y, 115, 165)){
        checked = !checked
        selected = null
    } else {
        selected = null
    }
})

newBind.registerActionPerformed((button) => {
    if (!button) return;
    //@ts-ignore
    if (button === 3) {
        if (command.text.startsWith("/") && !slashWarn) {
            Essential.getNotifications().push("&6SkyBlockKeybinds", `&cYou don't need to put a slash in front of the Command. Press this again if you want to add the command: &e/${command.text}`, 7.5)
            slashWarn = true
            return;
        }
        
            if (editMode === false) {
                saveCustomKeybind(name.text, command.text, checked)
                Essential.getNotifications().push("&6SkyBlockKeybinds", `&aSaved your custom KeyBind &e${name.text}\n&aYou can find it in your controls`, 10)
                newBind.close()
                resetNewBind()
            } else if (editMode === true) {
                saveEditedVersion(name.text, command.text, checked, editId)
                Essential.getNotifications().push("&6SkyBlockKeybinds", `&aSaved your changes`, 10)
                newBind.close()
                resetNewBind()
                // Remove this once loader changes are done
                ChatTriggers.loadCT()
            }

            
     
        }
            //@ts-ignore
    if (button === 4) {
        customBind.open()
        resetNewBind()
    }
})


function createListGui() {
    const listGui = new Gui()
    const w = Renderer.screen.getWidth() / 4
    const drawFuncs: Function[] = []
    listGui.registerDraw(() => {
        CheezeGUI.drawBackground()
        for (let i = 0; i < Renderer.screen.getHeight() / 20; i++) {
            Renderer.drawLine(Renderer.BLACK, 0, (20 * i) + 20, Renderer.screen.getWidth(),(20 * i) + 20, 1 )
        }
        for (let i = 1; i < 4; i++) {
            Renderer.drawLine(Renderer.BLACK, w * i, 0, w * i, Renderer.screen.getHeight(), 1)
        }
        drawFuncs.forEach(func => func())
    })
    const customKeybinds: Custom = fetchCurrent()
    customKeybinds.keybinds.forEach((kb, index) => {
        drawFuncs.push(() => {
            Renderer.drawStringWithShadow(kb.name, 1, 20 * index + 1)
            Renderer.drawStringWithShadow("/" + kb.command, w + 1, 20 * index + 1)
        })
        listGui.addButton(parseInt(1 + "" + index, 10), (w * 2 )+ 2, 20 * index, w - 3, 20, "Edit")
        listGui.addButton(parseInt(2 + "" + index, 10), (w * 3 )+ 2, 20 * index, w - 3, 20, "Delete")
    })
    listGui.registerActionPerformed(button => {
        let str = button.toString()
        if (str.startsWith("1")) {
            let id = parseInt(str.substring(1, str.length))
            let cr = customKeybinds.keybinds[id]
            setUpEditMode(cr.name, cr.command, cr.clientSide, id)
            newBind.open()
        } else if (str.startsWith("2")) {
            let id = parseInt(str.substring(1, str.length))
            delid = id
            delGui.open()
        }
    })
    return listGui
}


const delGui = new Gui()
delGui.registerDraw(delGUiDraw)
delGui.addButton(5, CheezeGUI.center(300), 40, 300, 20, "Yes, I am sure")
delGui.addButton(7, CheezeGUI.center(300), 80 , 300, 20, "No, take me back")
function delGUiDraw() {
    CheezeGUI.drawBackground()
    Renderer.drawStringWithShadow("&4&lAre you sure?", 200, 10)
}

delGui.registerActionPerformed((button: any)=> {
    if (button === 5 ) {
        deleteCustom(delid)
        delGui.close()
        Essential.getNotifications().push("&6SkyBlockKeybinds", `&cDeleted Keybind`, 10)
        ChatTriggers.loadCT()
    }
    if (button === 7) {
        createListGui().open()
    }
})

export default customBind

// const testGUI = new Gui()
// let testText = new CheezeText()

// testGUI.registerDraw(() => {
//     CheezeGUI.drawCenteredString(testText.text, 5)
//     CheezeGUI.drawCenteredString("Control: "+Client.isControlDown(), 20)
//     CheezeGUI.drawCenteredString("Shift: "+Client.isShiftDown(), 35)
//     CheezeGUI.drawCenteredString("Alt: "+Client.isAltDown(), 50)
// })
// testGUI.registerKeyTyped((char, keycode) => {
//     testText.setText(`Char: ${char} Keycode: ${keycode}`)
// })

// register("command", () => {
//     testGUI.open()
// }).setName("testgui")
