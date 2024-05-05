/// <reference types = "../../CTAutocomplete" />
/// <reference lib = "es2015" />

const File = Java.type("java.io.File")
const createConditionally = (path, content) => {
    if (FileLib.exists(path)) return;
    FileLib.write(path, content)
}


export {createConditionally }