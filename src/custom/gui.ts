/// <reference types = "../../../CTAutocomplete" />
/// <reference lib = "es2015" />
import { drawBorderedRect, between, drawBackground, allowedChars } from "./render"
import { saveCustomKeybind, fetchCurrent, Custom, saveEditedVersion, deleteCustom } from "./handler"
import settings from "../settings.js"
let current: Custom
const Essential = Java.type("gg.essential.api.EssentialAPI")
const box = new Image("box1", "https://raw.githubusercontent.com/MisterCheezeCake/RemoteData/main/SBK/box.png")
const check = new Image("check", "https://raw.githubusercontent.com/MisterCheezeCake/RemoteData/main/SBK/check.png")
const buttons = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
}
let delid = -1
function dontSpam(buttonAction: Function, id: number) {
    buttons[id] = true
    buttonAction()
    setTimeout(() => buttons[id] = false, 200)
}
function dontSpamDlg(buttonAction: Function, id: any) {
    dlgButtons[id] = true
    buttonAction()
    setTimeout(() => dlgButtons[id] = false, 200)
}

const customBind = new Gui()
customBind.registerDraw(draw)
function draw() {
    customBind.addButton(1, 90, 10, 300, 20, "Create new Custom Keybind");
    customBind.addButton(2, 90, 50, 300, 20, "Manage Existing Custom Keybinds");
    customBind.addButton(6, 90, 90, 300, 20, "Back to Main Settings Menu")
    drawBackground()
    

 
     
} 

customBind.registerActionPerformed(button => {
    //@ts-ignore
    if (button === 1 && buttons[1] === false) dontSpam(() => {
        newBind.open()
        if (txts.edit === true) {
            txts.edit = false
            txts[1] = ""
            txts[2] = ""
            txts.selected = 0
            txts.b1 = false
            txts.b2 = false
            txts.checked = false

        }
    },1)
    //@ts-ignore
    if (button === 2 && buttons[2] === false) dontSpam(() => {
        current = fetchCurrent()
        listGUi.open()
    },2)
    if (button === 6 && buttons[6] === false) dontSpam(() => {
        settings.openGUI()
    }, 6)
})

let txts = {
    1: "",
    2: "",
    b1: false,
    b2: false,
    selected: 0,
    checked: false,
    edit: false,
    editID: -1
}
let outLineColor = Renderer.color(0, 255, 0)
let outLineColor2 = Renderer.color(0, 255, 0)
register("step", () => {
    if (txts.b1 === true) {
        
        if (txts.selected !== 1) {
            txts[1] = ""
            txts.b1 = false
            return;
        }
        if (txts[1] === "") txts[1] = "|"
        else if (txts[1] === "|") txts[1] = ""  
    }

    if (txts.b2 === true) {
        if (txts.selected !== 2) {
            txts[2] = ""
            txts.b2 = false
            return;
        }
        if (txts[2] === "") txts[2] = "|"
        else if (txts[2] === "|") txts[2] = ""
    }

    if (txts.b2 === false && txts.b1 === false) {
        if (txts[1] === "|") txts[1] = ""
        if (txts[2] === "|") txts[2] = ""

    }

}).setFps(2)

register("renderOverlay", () => {
    if (!newBind.isOpen()) return;
    if (txts.selected === 1) {
        outLineColor = Renderer.color(232, 232, 21)
        outLineColor2 =  Renderer.color(0,255,0)
    } else if (txts.selected === 2) {
        outLineColor2 = Renderer.color(232, 232, 21)
        outLineColor =  Renderer.color(0,255,0)
    } else if (txts.selected === 0) {
        outLineColor2 = Renderer.color(0,255,0)
        outLineColor =  Renderer.color(0,255,0)
    }
})
const newBind = new Gui() 
 
newBind.registerDraw(newBindDraw)
function newBindDraw() {
    drawBackground()
    drawBorderedRect(
        Renderer.color(0,0,0),
         outLineColor,
            90,
            13,
            300,
            15
    )
    Renderer.drawStringWithShadow("&lEnter Unique Name", 175, 2)

    drawBorderedRect(
        Renderer.color(0,0,0),
         outLineColor2,
            90,
            63,
            300,
            15
    )
    Renderer.drawStringWithShadow("&lEnter Command Without /", 175, 52)

    Renderer.drawStringWithShadow(txts[1], 92, 17)
    Renderer.drawStringWithShadow(txts[2], 92, 67)
    Renderer.drawImage(box, 205, 120, 50, 50)
    if (txts.checked) Renderer.drawImage(check, 213, 128, 32, 32)
    Renderer.drawStringWithShadow("&lClientside (click to change)", 150, 110);
    newBind.addButton(3, 90, 180, 300, 20, "Save custom Keybind");
    newBind.addButton(4, 90, 210, 300, 20, "Cancel");

   
}
newBind.registerKeyTyped((typed, key) => {
    if (txts.selected === 0) return;
    if (key === 14) {
        txts[txts.selected] = txts[txts.selected].substring(0, txts[txts.selected].length -1)
        if (txts[txts.selected].length === 0) txts["b" + txts.selected] = true
        return;
    }
    //@ts-ignore
    if (!allowedChars.includes("" + typed)) return;
    if (txts[txts.selected].length === 0 || txts[txts.selected] === "|") {
        txts["b" + txts.selected] = false
        txts[txts.selected] = ""
    }
    txts[txts.selected] = txts[txts.selected] + "" + typed

})
newBind.registerClicked((x,y) => {
    if (between(89, 391,x) && between(12,29,y)) {
        txts.selected = 1
        if (txts[1].length === 0) txts.b1 = true
    } else if (between(89, 391,x) && between(62, 79, y)) {
        txts.selected = 2
        if (txts[2].length === 0) txts.b2 = true
    } else {
        txts.selected = 0
        txts.b1 = false
        txts.b2 = false
    }

    if (between(205, 255, x) && between(120, 170, y)) {
        txts.checked = !txts.checked
    }
})

newBind.registerActionPerformed((button) => {
    if (!button) return;
    //@ts-ignore
    if (button === 3 && buttons[3] === false) dontSpam(() => {
        if (txts[2].startsWith("/")) {
            Essential.getNotifications().push("&6SkyBlockKeybinds", `&cYou don't need to put a slash in front of the Command`, 5)
            return;
        }
        if (txts[1] && txts[2])  {
            if (txts.edit === false) {
                saveCustomKeybind(txts[1], txts[2], txts.checked)
                Essential.getNotifications().push("&6SkyBlockKeybinds", `&aSaved your custom KeyBind &e${txts[1]}\n&aYou can find it in your controls`, 10)
                newBind.close()
                txts[1] = ""
                txts[2] = ""
                txts.selected = 0
                txts.b1 = false
                txts.b2 = false
                txts.checked = false
            } else {
                saveEditedVersion(txts[1], txts[2], txts.checked, txts.editID)
                Essential.getNotifications().push("&6SkyBlockKeybinds", `&aSaved your changes`, 10)
                newBind.close()
                txts.edit = false
                txts[1] = ""
                txts[2] = ""
                txts.selected = 0
                txts.b1 = false
                txts.b2 = false
                txts.checked = false
                txts.editID = -1
                ChatTriggers.loadCT()

            }
        } else {
            Essential.getNotifications().push("&6SkyBlockKeybinds", `&cYou need to fill out all fields`, 5)
        }
    }, 3) 

        //@ts-ignore
if (button === 4 && buttons[4] === false) dontSpam(() => {
    newBind.close()
    txts[1] = ""
    txts[2] = ""
    txts.selected = 0
    txts.b1 = false
    txts.b2 = false
    txts.checked = false
    txts.edit = false
    txts.editID = -1
}, 4)
})
const dlgButtons = {

}
function drawListGui() {
    drawBackground()
    for (let i = 0; i < Renderer.screen.getHeight() / 20; i++) {
        Renderer.drawLine(Renderer.BLACK, 0, (20 * i) + 20, Renderer.screen.getWidth(),(20 * i) + 20, 1 )
    }
    const w = Renderer.screen.getWidth() / 4
    for (let i = 1; i < 4; i++) {
        Renderer.drawLine(Renderer.BLACK, w * i, 0, w * i, Renderer.screen.getHeight(), 1)
    }
    
    current.keybinds.forEach((kb, index) => {
        Renderer.drawStringWithShadow(kb.name, 1, 20 * index + 1)
        Renderer.drawStringWithShadow("/" + kb.command, w + 1, 20 * index + 1)
        listGUi.addButton(parseInt(1 + "" + index, 10), (w * 2 )+ 2, 20 * index, w - 3, 20, "Edit")
        listGUi.addButton(parseInt(2 + "" + index, 10), (w * 3 )+ 2, 20 * index, w - 3, 20, "Delete")
    })
}

const listGUi = new Gui()
listGUi.registerDraw(drawListGui)

listGUi.registerActionPerformed(button => {
    if (dlgButtons[button]) return;
    dontSpamDlg(() => {
        let str = button.toString()
        if (str.startsWith("1")) {
            let id = parseInt(str.substring(1, str.length))
            let cr = current.keybinds[id]
            txts.checked = cr.clientSide
            txts[1] = cr.name
            txts[2] = cr.command
            txts.edit = true
            txts.editID = id
            newBind.open()
        } else if (str.startsWith("2")) {
            let id = parseInt(str.substring(1, str.length))
            delid = id
            delGui.open()
        }
    }, button)
})

const delGui = new Gui()
delGui.registerDraw(delGUiDraw)
function delGUiDraw() {
    drawBackground()
    Renderer.drawStringWithShadow("&4&lAre you sure?", 200, 10)
    delGui.addButton(5, 90, 40, 300, 20, "Yes, I am sure")
    delGui.addButton(7, 90, 80 , 300, 20, "No, take me back")
}

delGui.registerActionPerformed(button => {
    if (button === 5 && buttons[5] === false) dontSpam(() => {
        deleteCustom(delid)
        delGui.close()
        Essential.getNotifications().push("&6SkyBlockKeybinds", `&cDeleted Keybind`, 10)
        ChatTriggers.loadCT()
    }, 5)
    if (button === 7 && buttons[7] === false) dontSpam(() => {
        listGUi.open()
    }, 7)
})
export default customBind

//export { renderTrigger}