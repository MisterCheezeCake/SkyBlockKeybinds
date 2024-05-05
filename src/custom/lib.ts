// 1.8 Only
const Toolkit = Java.type("java.awt.Toolkit")
const DataFlavor = Java.type("java.awt.datatransfer.DataFlavor")
const StringSelection = Java.type("java.awt.datatransfer.StringSelection")

class CheezeGUI {
    static center = (width: number) => (Renderer.screen.getWidth() / 2) - width/2
    static centerText = (text: string) => (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth(text) / 2)
    static drawCenteredString = (text: string, y: number, shadow: boolean = true) => {
        if (shadow) Renderer.drawStringWithShadow(text, CheezeGUI.centerText(text), y)
        else Renderer.drawString(text, CheezeGUI.centerText(text), y)
    }
    static drawBorderedRect = (x: number, y: number, width: number, height: number, color: number, borderColor: number) => {
        Renderer.drawRect(borderColor, x, y, width, height)
        Renderer.drawRect(color, x + 1, y + 1, width - 2, height - 2)
    }
    static getHorizontalEdges = (width: number): [number, number] => {
        return [CheezeGUI.center(width), CheezeGUI.center(width) + width]
    }
    static between(n: number, a: number, b: number) {
        return n >= a && n <= b
    }
    static drawHighlightedText = (text, x: number, y: number, color: number, highlightColor: number) => {
        Renderer.drawRect(Renderer.color(0, 0, 255, 100), x, y, Renderer.getStringWidth(text), 9)
    }
    // 1.8 Only
    static drawBackground() {
        Tessellator.pushMatrix();
        Tessellator.translate(0, 0, -1);
        Renderer.drawRect(
            Renderer.color(0,0,0,180),
            0,
            0,
            Renderer.screen.getWidth(),
            Renderer.screen.getHeight()
        )
        Tessellator.popMatrix();
    }
}

class CheezeText {
    static allowedChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",  "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "{", "[", "}", "]", "|", "\\", "\"", "'", ":", ";", ",", "<", ".", ">", "/", "?", " "]
    // 1.8 Only
    static getClipboard = () =>Toolkit.getDefaultToolkit().getSystemClipboard().getData(DataFlavor.stringFlavor)
    static setClipboard = (text: string) => Toolkit.getDefaultToolkit().getSystemClipboard().setContents(new StringSelection(text), null)
  

    text: string
    cursorPos: number
    cursorInMotion: boolean
    cursorBlink: boolean
    constructor(setText: string = "") {
        this.text = setText
        this.cursorPos = setText.length
        register("step", () => {
            if (!this.cursorInMotion) this.cursorBlink = !this.cursorBlink
            else if (this.cursorInMotion) this.cursorBlink = true
        }).setFps(2)
    }
    moveCursor = (amount: number) => {
        if (this.cursorPos + amount < 0) return
        if (this.cursorPos + amount > this.text.length) return;
        this.cursorPos += amount
        this.cursorInMotion = true
        this.cursorBlink = true
        setTimeout(() => this.cursorInMotion = false, 1000)
    }
    setCursorPos = (pos: number) => {
        if (pos < 0) return
        if (pos > this.text.length) return
        this.cursorPos = pos
    }
    setText = (text: string) => {
        this.text = text
    }
    type(char: string) {
        this.text = this.text.slice(0, this.cursorPos) + char + this.text.slice(this.cursorPos)
        this.moveCursor(1)
    }
    backspace() {
        this.text = this.text.slice(0, this.cursorPos - 1) + this.text.slice(this.cursorPos)
        this.moveCursor(-1)
    }
    getTextWithCursor() {
        if (this.cursorBlink) return this.text.slice(0, this.cursorPos) + "§7|§r" + this.text.slice(this.cursorPos)
        else return this.text.slice(0, this.cursorPos) + this.text.slice(this.cursorPos)
    }
    getText(cursor = true) {
        if (cursor) return this.getTextWithCursor()
        else return this.text
    }
    bulkType(text: string) {
        this.text = this.text.slice(0, this.cursorPos) + text + this.text.slice(this.cursorPos)
        this.moveCursor(text.length)
    }
    
}


export { CheezeGUI, CheezeText }