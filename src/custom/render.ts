/// <reference types = "../../../CTAutocomplete" />
/// <reference lib = "es2015" />

export function between(n1, n2, x) {
    if (x >= n1 && x <= n2) return true
    else return false
}

export function drawBackground() {
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

export function  drawBorderedRect(colorMain: number, colorBorder: number, x: number, y: number, width: number, height: number) {
    
    Renderer.drawRect(colorBorder, x - 1, y, width, height)
    Renderer.drawRect(colorBorder, x + 1, y, width, height)
    Renderer.drawRect(colorBorder, x, y + 1, width, height)
    Renderer.drawRect(colorBorder, x, y - 1, width, height)
    Renderer.drawRect(colorMain, x, y, width, height)
}



export const allowedChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",  "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "{", "[", "}", "]", "|", "\\", "\"", "'", ":", ";", ",", "<", ".", ">", "/", "?", " "]
