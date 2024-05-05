/// <reference types = "../../CTAutocomplete" />
/// <reference lib = "es2016" />

const createConditionally = (path, content) => {
    if (FileLib.exists(path)) return;
    FileLib.write(path, content)
}


export {createConditionally }