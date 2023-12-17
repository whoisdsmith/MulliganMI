'use strict';

var obsidian = require('obsidian');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class FormattoEditorMenu {
    constructor(plugin) {
        this.plugin = plugin;
    }
    registerEditorMenus() {
        this.getEventsArr().forEach((item) => {
            this.plugin.registerEvent(item);
        });
    }
    getEventsArr() {
        return [
            this.plugin.app.workspace.on("editor-menu", (menu, editor) => {
                menu.addItem((item) => item
                    .setTitle("Format Document")
                    .setIcon("formatto-logo")
                    .onClick(() => {
                    this.plugin.utils.formatDocument(editor);
                }));
            }),
        ];
    }
}

class MainPluginSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.invalidNumberMessage = "Please enter a valid number.\nIt should be at least 0.";
        this.plugin = plugin;
    }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        const debounceMsg = obsidian.debounce((text, value) => {
            if (value !== "" &&
                (isNaN(parseInt(value)) || parseInt(value) < 0)) {
                new obsidian.Notice(text);
            }
        }, 1000, true);
        // Heading Gaps
        containerEl.createEl("h2", {
            text: "Heading gaps",
        });
        new obsidian.Setting(containerEl)
            .setName("Before top level headings")
            .setDesc("Decides gaps before highest level of headings.")
            .addText((text) => text
            .setPlaceholder("3")
            .setValue(this.plugin.settings.headingGaps.beforeTopLevelHeadings)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            if (value !== "" &&
                (isNaN(parseInt(value)) || parseInt(value) < 0)) {
                debounceMsg(this.invalidNumberMessage, value);
            }
            this.plugin.settings.headingGaps.beforeTopLevelHeadings =
                value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Before first sub heading")
            .setDesc("Decides the child heading gap right before a parent heading.")
            .addText((text) => text
            .setPlaceholder("1")
            .setValue(this.plugin.settings.headingGaps.beforeFirstSubHeading)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            if (value !== "" &&
                (isNaN(parseInt(value)) || parseInt(value) < 0)) {
                debounceMsg(this.invalidNumberMessage, value);
            }
            this.plugin.settings.headingGaps.beforeFirstSubHeading =
                value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Before sub headings")
            .setDesc("Decides gaps before headings that are not in the highest level.")
            .addText((text) => text
            .setPlaceholder("2")
            .setValue(this.plugin.settings.headingGaps.beforeSubHeadings)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            if (value !== "" &&
                (isNaN(parseInt(value)) || parseInt(value) < 0)) {
                debounceMsg(this.invalidNumberMessage, value);
            }
            this.plugin.settings.headingGaps.beforeSubHeadings =
                value;
            yield this.plugin.saveSettings();
        })));
        // Other Gaps
        containerEl.createEl("h2", {
            text: "Other gaps",
        });
        new obsidian.Setting(containerEl)
            .setName("After properties")
            .setDesc("Decides the gap after a YAML properties.")
            .addText((text) => text
            .setPlaceholder("2")
            .setValue(this.plugin.settings.otherGaps.afterProperties)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            if (value !== "" &&
                (isNaN(parseInt(value)) || parseInt(value) < 0)) {
                debounceMsg(this.invalidNumberMessage, value);
            }
            this.plugin.settings.otherGaps.afterProperties = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Before contents")
            .setDesc("Decides gaps before contents (ex: Text section right before headings).")
            .addText((text) => text
            .setPlaceholder("0")
            .setValue(this.plugin.settings.otherGaps.beforeContents)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            if (value !== "" &&
                (isNaN(parseInt(value)) || parseInt(value) < 0)) {
                debounceMsg(this.invalidNumberMessage, value);
            }
            this.plugin.settings.otherGaps.beforeContents = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Before contents after code blocks")
            .setDesc("Decides gaps before contents that are right after code blocks.")
            .addText((text) => text
            .setPlaceholder("1")
            .setValue(this.plugin.settings.otherGaps
            .beforeContentsAfterCodeBlocks)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            if (value !== "" &&
                (isNaN(parseInt(value)) || parseInt(value) < 0)) {
                debounceMsg(this.invalidNumberMessage, value);
            }
            this.plugin.settings.otherGaps.beforeContentsAfterCodeBlocks =
                value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Before code blocks")
            .setDesc("Decides gaps before code blocks.")
            .addText((text) => text
            .setPlaceholder("1")
            .setValue(this.plugin.settings.otherGaps.beforeCodeBlocks)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            if (value !== "" &&
                (isNaN(parseInt(value)) || parseInt(value) < 0)) {
                debounceMsg(this.invalidNumberMessage, value);
            }
            this.plugin.settings.otherGaps.beforeCodeBlocks = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Before code blocks after headings")
            .setDesc("Decides gaps before code blocks that are right after headings.")
            .addText((text) => text
            .setPlaceholder("0")
            .setValue(this.plugin.settings.otherGaps
            .beforeCodeBlocksAfterHeadings)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            if (value !== "" &&
                (isNaN(parseInt(value)) || parseInt(value) < 0)) {
                debounceMsg(this.invalidNumberMessage, value);
            }
            this.plugin.settings.otherGaps.beforeCodeBlocksAfterHeadings =
                value;
            yield this.plugin.saveSettings();
        })));
    }
}

// `Partial<Type>` is a TypeScript utility that returns a type with all properties of Type set to optional.
// It enables type checking while letting you only define the properties you want to provide defaults for.
// Source : https://docs.obsidian.md/Plugins/User+interface/Settings#Provide+default+values
const DEFAULT_HEADING_GAPS = {
    beforeTopLevelHeadings: "3",
    beforeFirstSubHeading: "1",
    beforeSubHeadings: "2",
};
const DEFAULT_OTHER_GAPS = {
    afterProperties: "2",
    beforeContents: "0",
    beforeContentsAfterCodeBlocks: "1",
    beforeCodeBlocks: "1",
    beforeCodeBlocksAfterHeadings: "0",
};
const DEFAULT_SETTINGS = {
    headingGaps: DEFAULT_HEADING_GAPS,
    otherGaps: DEFAULT_OTHER_GAPS,
};

let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); }
function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

/**
* @param {string} input
* @param {any} js_settings
* @returns {string}
*/
function format_document(input, js_settings) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.format_document(retptr, ptr0, len0, addHeapObject(js_settings));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_error_3d6aeaae3d9882eb = function(arg0, arg1) {
        console.error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
        const ret = getObject(arg0) in getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
        const ret = getObject(arg0) == getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = getObject(arg0);
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbg_String_389b54bd9d25375f = function(arg0, arg1) {
        const ret = String(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getwithrefkey_4a92a5eca60879b9 = function(arg0, arg1) {
        const ret = getObject(arg0)[getObject(arg1)];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_e7d53d51371448e2 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_buffer_a448f833075b71ba = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_8f67e318f15d7254 = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_2357bf09366ee480 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_1d25fa9e4ac21ce7 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_bced6f43aed8c1aa = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };

    return imports;
}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedFloat64Memory0 = null;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('formatto_wasm_bg.wasm', (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.src || new URL('main.js', document.baseURI).href)));
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

function _loadWasmModule (sync, filepath, src, imports) {
  function _instantiateOrCompile(source, imports, stream) {
    var instantiateFunc = stream ? WebAssembly.instantiateStreaming : WebAssembly.instantiate;
    var compileFunc = stream ? WebAssembly.compileStreaming : WebAssembly.compile;

    if (imports) {
      return instantiateFunc(source, imports)
    } else {
      return compileFunc(source)
    }
  }

  
var buf = null;
var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

if (filepath && isNode) {
  
var fs = require("fs");
var path = require("path");

return new Promise((resolve, reject) => {
  fs.readFile(path.resolve(__dirname, filepath), (error, buffer) => {
    if (error != null) {
      reject(error);
    } else {
      resolve(_instantiateOrCompile(buffer, imports, false));
    }
  });
});

} else if (filepath) {
  
return _instantiateOrCompile(fetch(filepath), imports, true);

}

if (isNode) {
  
buf = Buffer.from(src, 'base64');

} else {
  
var raw = globalThis.atob(src);
var rawLength = raw.length;
buf = new Uint8Array(new ArrayBuffer(rawLength));
for(var i = 0; i < rawLength; i++) {
   buf[i] = raw.charCodeAt(i);
}

}


  if(sync) {
    var mod = new WebAssembly.Module(buf);
    return imports ? new WebAssembly.Instance(mod, imports) : mod
  } else {
    return _instantiateOrCompile(buf, imports, false)
  }
}

function formatto_wasm(imports){return _loadWasmModule(0, null, 'AGFzbQEAAAABsQEYYAJ/fwF/YAJ/fwBgA39/fwF/YAF/AX9gA39/fwBgAX8AYAR/f39/AGAFf39/f38AYAR/f39/AX9gAAF/YAZ/f39/f38AYAV/f39/fwF/YAZ/f39/f38Bf2AAAGAHf39/f39/fwBgCX9/f39/f35+fgBgB39/f39/f38Bf2ADfn9/AX9gBX9/fn9/AGAEf35/fwBgBX9/fX9/AGAEf31/fwBgBX9/fH9/AGAEf3x/fwAC7QUXA3diZxxfX3diZ19lcnJvcl8zZDZhZWFhZTNkOTg4MmViAAEDd2JnGl9fd2JpbmRnZW5fb2JqZWN0X2Ryb3BfcmVmAAUDd2JnF19fd2JpbmRnZW5faXNfdW5kZWZpbmVkAAMDd2JnDV9fd2JpbmRnZW5faW4AAAN3YmcVX193YmluZGdlbl9zdHJpbmdfZ2V0AAEDd2JnFF9fd2JpbmRnZW5faXNfb2JqZWN0AAMDd2JnG19fd2JpbmRnZW5fb2JqZWN0X2Nsb25lX3JlZgADA3diZxlfX3diaW5kZ2VuX2pzdmFsX2xvb3NlX2VxAAADd2JnFl9fd2JpbmRnZW5fYm9vbGVhbl9nZXQAAwN3YmcVX193YmluZGdlbl9udW1iZXJfZ2V0AAEDd2JnHV9fd2JnX1N0cmluZ18zODliNTRiZDlkMjUzNzVmAAEDd2JnFF9fd2JpbmRnZW5fZXJyb3JfbmV3AAADd2JnFV9fd2JpbmRnZW5fc3RyaW5nX25ldwAAA3diZyRfX3diZ19nZXR3aXRocmVma2V5XzRhOTJhNWVjYTYwODc5YjkAAAN3YmctX193YmdfaW5zdGFuY2VvZl9BcnJheUJ1ZmZlcl9lN2Q1M2Q1MTM3MTQ0OGUyAAMDd2JnHV9fd2JnX2J1ZmZlcl9hNDQ4ZjgzMzA3NWI3MWJhAAMDd2JnGl9fd2JnX25ld184ZjY3ZTMxOGYxNWQ3MjU0AAMDd2JnGl9fd2JnX3NldF8yMzU3YmYwOTM2NmVlNDgwAAQDd2JnHV9fd2JnX2xlbmd0aF8xZDI1ZmE5ZTRhYzIxY2U3AAMDd2JnLF9fd2JnX2luc3RhbmNlb2ZfVWludDhBcnJheV9iY2VkNmY0M2FlZDhjMWFhAAMDd2JnF19fd2JpbmRnZW5fZGVidWdfc3RyaW5nAAEDd2JnEF9f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IAAgAjYCDCAAIAE2AggPC0Gs18AAIAA2AgBBpNfAAEGk18AAKAIAIAFqIgE2AgAgACABQQFyNgIEIABBqNfAACgCAEcNAEGg18AAQQA2AgBBqNfAAEEANgIACwvwBQMGfwF8AX4jAEGAAWsiAyQAAkAgACgCACIEQYEBEAcEQEEHIQVBACEADAELQQFBAiAEEAgiBUEBRhtBACAFGyIGQQJHBEBBACEAQQAhBQwBCyADQSBqIAQQCSADKAIgIQUgA0EQaiIHIAMrAyg5AwggByAFQQBHrTcDACADKQMQp0EBRgRAIAMrAxghCUEDIQVBACEADAELIANBCGogBBAEAn8CQCADKAIIIgZFDQAgAyAGIAMoAgwQZSADQdAAaiADKAIAIAMoAgQQkwEgAygCUEUNACADQThqIANB2ABqKAIAIgc2AgAgAyADKQJQIgo3AzAgCqchBEEFIQVBAQwBCyADQdwAaiEFIwBBEGsiBCQAAkACQCAAKAIAEBNFBEAgACgCABAODQEgBUEANgIADAILIARBBGogABBfIAVBCGogBEEMaigCADYCACAFIAQpAgQ3AgAMAQsgBCAAKAIAEBA2AgAgBEEEaiAEEF8gBUEIaiAEQQxqKAIANgIAIAUgBCkCBDcCACAEKAIAIgVBhAFJDQAgBRABCyAEQRBqJAACfyADKAJcIgZFBEAgA0H0AGpCATcCACADQQE2AmwgA0GwjcAANgJoIANBHDYCRCADIAA2AkAgAyADQUBrNgJwIANBMGoiACADQegAahAuQREhBSAADAELIANByABqIANB5ABqKAIANgIAIAMgAykCXDcDQEEGIQUgA0FAawshACAGQQBHIQggACgCACEEIAAoAgghByAGRQshACAHrb8hCQsgAyAJOQNwIAMgBDYCbCADIAY6AGkgAyAFOgBoIwBBMGsiBCQAIAQgAjYCBCAEIAE2AgAgBEEUakICNwIAIARBLGpBGjYCACAEQQI2AgwgBEGUjcAANgIIIARBGzYCJCAEIANB6ABqNgIgIAQgBEEgajYCECAEIAQ2AiggBEEIahBIIARBMGokACAIBEAgA0FAaxCKAQsgAARAIANBMGoQigELIANBgAFqJAAL6AMBCX8jAEEQayIGJAACQCABLQAlDQACQCABKAIQIgIgASgCDCIHSQ0AIAIgAUEIaigCAEsNACABQRhqIQkgAiAHayEDIAcgASgCBCIHaiEFA0AgASgCFCAJakEBay0AACEEAkACQAJAAn8gA0EITwRAIAZBCGogBCAFIAMQOSAGKAIMIQIgBigCCAwBC0EAIQJBACADRQ0AGgNAQQEgBCACIAVqLQAARg0BGiADIAJBAWoiAkcNAAsgAyECQQALQQFGBEAgASACIAEoAgxqQQFqIgI2AgwgASgCBCEDIAIgASgCFCIESSABKAIIIgogAklyDQMgBEEFTw0CIAMgAiAEayICaiAEIAkgBBCDAQ0BIAEoAgwhAiABKAIIIQogASgCBCEDDAMLIAEgASgCEDYCDAwECyABKAIcIQMgASABKAIMNgIcIAIgA2shAiADIAdqIQgMBAsgBEEEQZCBwAAQVAALIAEoAhAiBCACSQ0BIAIgA2ohBSAEIAJrIQMgBCAKTQ0ACwsgAS0AJQ0AIAFBAToAJQJAIAEtACQEQCABKAIgIQUgASgCHCEDDAELIAEoAiAiBSABKAIcIgNGDQELIAUgA2shAiABKAIEIANqIQgLIAAgAjYCBCAAIAg2AgAgBkEQaiQAC+gDAQl/IwBBEGsiBiQAAkAgAS0AJQ0AAkAgASgCECICIAEoAgwiB0kNACACIAFBCGooAgBLDQAgAUEYaiEJIAIgB2shAyAHIAEoAgQiB2ohBQNAIAEoAhQgCWpBAWstAAAhBAJAAkACQAJ/IANBCE8EQCAGQQhqIAQgBSADEDkgBigCDCECIAYoAggMAQtBACECQQAgA0UNABoDQEEBIAQgAiAFai0AAEYNARogAyACQQFqIgJHDQALIAMhAkEAC0EBRgRAIAEgAiABKAIMakEBaiICNgIMIAEoAgQhAyACIAEoAhQiBEkgASgCCCIKIAJJcg0DIARBBU8NAiADIAIgBGsiAmogBCAJIAQQgwENASABKAIMIQIgASgCCCEKIAEoAgQhAwwDCyABIAEoAhA2AgwMBAsgASgCHCEDIAEgASgCDDYCHCACIANrIQIgAyAHaiEIDAQLIARBBEGwhMAAEFQACyABKAIQIgQgAkkNASACIANqIQUgBCACayEDIAQgCk0NAAsLIAEtACUNACABQQE6ACUCQCABLQAkBEAgASgCICEFIAEoAhwhAwwBCyABKAIgIgUgASgCHCIDRg0BCyAFIANrIQIgASgCBCADaiEICyAAIAI2AgQgACAINgIAIAZBEGokAAvdAwEHfwJAAkAgAUGACkkEQCABQQV2IQUCQAJAIAAoAqABIgQEQCAEQQFrIQMgBEECdCAAakEEayECIAQgBWpBAnQgAGpBBGshBiAEQSlJIQcDQCAHRQ0CIAMgBWoiBEEoTw0DIAYgAigCADYCACAGQQRrIQYgAkEEayECIANBAWsiA0F/Rw0ACwsgAUEfcSEIIAFBIE8EQCAAQQBBASAFIAVBAU0bQQJ0EMoBGgsgACgCoAEgBWohAiAIRQRAIAAgAjYCoAEgAA8LIAJBAWsiB0EnSw0DIAIhBCAAIAdBAnRqKAIAIgZBACABayIDdiIBRQ0EIAJBJ00EQCAAIAJBAnRqIAE2AgAgAkEBaiEEDAULIAJBKEHAycAAEFMACyADQShBwMnAABBTAAsgBEEoQcDJwAAQUwALQerJwABBHUHAycAAEGoACyAHQShBwMnAABBTAAsCQCACIAVBAWoiB0sEQCADQR9xIQEgAkECdCAAakEIayEDA0AgAkECa0EoTw0CIANBBGogBiAIdCADKAIAIgYgAXZyNgIAIANBBGshAyAHIAJBAWsiAkkNAAsLIAAgBUECdGoiASABKAIAIAh0NgIAIAAgBDYCoAEgAA8LQX9BKEHAycAAEFMAC9wDAgp/AX4gAAJ/AkAgASgCFCIIIAVBAWsiDWoiByADTw0AQQEgASgCCCILayEOIAUgASgCECIPayEQIAEoAhwhCiABKQMAIREDQAJAAkAgESACIAdqMQAAiEIBg1AEQCABIAUgCGoiCDYCFCAGRQ0BDAILAkACQAJAAkACQCALIAsgCiAKIAtJGyAGGyIHIAVJBEAgBSAHayEMIAQgB2ohCSAHIAhqIQcDQCADIAdNDQUgCS0AACACIAdqLQAARwRAIAcgDmohCEEAIQcgBkUNAwwECyAJQQFqIQkgB0EBaiEHIAxBAWsiDA0ACwtBACAKIAYbIQwgCyEHA0AgByAMTQRAIAEgBSAIaiICNgIUIAZFBEAgAUEANgIcCyAAIAg2AgQgAEEIaiACNgIAQQEMCwsgB0EBayIHIAVPDQUgByAIaiIJIANPDQMgBCAHai0AACACIAlqLQAARg0ACyABIAggD2oiCDYCFCAQIQcgBg0BCyABIAc2AhwgByEKCyAIIA1qIgcgA0kNBQwGCyAJIANB4IDAABBTAAsgByADQfCAwAAQUwALIAcgBUHQgMAAEFMAC0EAIQogAUEANgIcCyAIIA1qIgcgA0kNAAsLIAEgAzYCFEEACzYCAAv1AgEDfwJAAkACQAJAAkACQCAHIAhWBEAgByAIfSAIWA0BAkAgBiAHIAZ9VCAHIAZCAYZ9IAhCAYZacUUEQCAGIAhWDQEMCAsgAiADSQ0DDAYLIAcgBiAIfSIGfSAGVg0GIAIgA0kNAyABIQsCQANAIAMgCUYNASAJQQFqIQkgC0EBayILIANqIgotAABBOUYNAAsgCiAKLQAAQQFqOgAAIAMgCWtBAWogA08NBSAKQQFqQTAgCUEBaxDKARoMBQsCf0ExIANFDQAaIAFBMToAAEEwIANBAUYNABogAUEBakEwIANBAWsQygEaQTALIQkgBEEBasEiBCAFwUwgAiADTXINBCABIANqIAk6AAAgA0EBaiEDDAQLIABBADYCAA8LIABBADYCAA8LIAMgAkGUr8AAEFQACyADIAJB9K7AABBUAAsgAiADTw0AIAMgAkGEr8AAEFQACyAAIAQ7AQggACADNgIEIAAgATYCAA8LIABBADYCAAuLAwEBfwJAIAIEQCABLQAAQTBNDQEgBUECOwEAAkACQAJAIAPBIgZBAEoEQCAFIAE2AgQgA0H//wNxIgMgAk8NASAFQQI7ARggBUECOwEMIAUgAzYCCCAFQSBqIAIgA2siAjYCACAFQRxqIAEgA2o2AgAgBUEUakEBNgIAIAVBEGpBwLDAADYCAEEDIQEgAiAETw0DIAQgAmshBAwCCyAFQQI7ARggBUEAOwEMIAVBAjYCCCAFQcGwwAA2AgQgBUEgaiACNgIAIAVBHGogATYCACAFQRBqQQAgBmsiAzYCAEEDIQEgAiAETw0CIAQgAmsiAiADTQ0CIAIgBmohBAwBCyAFQQA7AQwgBSACNgIIIAVBEGogAyACazYCACAERQRAQQIhAQwCCyAFQQI7ARggBUEgakEBNgIAIAVBHGpBwLDAADYCAAsgBUEAOwEkIAVBKGogBDYCAEEEIQELIAAgATYCBCAAIAU2AgAPC0H8rMAAQSFByK/AABBqAAtB2K/AAEEhQfyvwAAQagAL/QIBB38jAEEQayIEJAACQAJAAkACQAJAAkAgASgCBCICRQ0AIAEoAgAhBiACQQNxIQcCQCACQQRJBEBBACECDAELIAZBHGohAyACQXxxIQhBACECA0AgAygCACADQQhrKAIAIANBEGsoAgAgA0EYaygCACACampqaiECIANBIGohAyAIIAVBBGoiBUcNAAsLIAcEQCAFQQN0IAZqQQRqIQMDQCADKAIAIAJqIQIgA0EIaiEDIAdBAWsiBw0ACwsgAUEMaigCAARAIAJBAEgNASAGKAIERSACQRBJcQ0BIAJBAXQhAgsgAg0BC0EBIQNBACECDAELIAJBAEgNAUGt08AALQAAGiACQQEQoQEiA0UNAgsgBEEANgIIIAQgAjYCBCAEIAM2AgAgBEHMlsAAIAEQIUUNAkHol8AAQTMgBEEPakGcmMAAQcSYwAAQTwALEHAAC0EBIAIQwwEACyAAIAQpAgA3AgAgAEEIaiAEQQhqKAIANgIAIARBEGokAAvzAgEFf0EQQQgQlAEgAEsEQEEQQQgQlAEhAAtBCEEIEJQBIQNBFEEIEJQBIQJBEEEIEJQBIQQCQEEAQRBBCBCUAUECdGsiBUGAgHwgBCACIANqamtBd3FBA2siAyADIAVLGyAAayABTQ0AIABBECABQQRqQRBBCBCUAUEFayABSxtBCBCUASIDakEQQQgQlAFqQQRrEBciAkUNACACENABIQECQCAAQQFrIgQgAnFFBEAgASEADAELIAIgBGpBACAAa3EQ0AEhAkEQQQgQlAEhBCABEL4BIAIgAEEAIAIgAWsgBE0baiIAIAFrIgJrIQQgARCvAUUEQCAAIAQQeCABIAIQeCABIAIQJgwBCyABKAIAIQEgACAENgIEIAAgASACajYCAAsCQCAAEK8BDQAgABC+ASICQRBBCBCUASADak0NACAAIAMQzQEhASAAIAMQeCABIAIgA2siAxB4IAEgAxAmCyAAEM8BIQYgABCvARoLIAYL2QIBB39BASEJAkACQCACRQ0AIAEgAkEBdGohCiAAQYD+A3FBCHYhCyAAQf8BcSENA0AgAUECaiEMIAcgAS0AASICaiEIIAsgAS0AACIBRwRAIAEgC0sNAiAIIQcgDCIBIApGDQIMAQsCQAJAIAcgCE0EQCAEIAhJDQEgAyAHaiEBA0AgAkUNAyACQQFrIQIgAS0AACABQQFqIQEgDUcNAAtBACEJDAULIAcgCEGMvcAAEFUACyAIIARBjL3AABBUAAsgCCEHIAwiASAKRw0ACwsgBkUNACAFIAZqIQMgAEH//wNxIQEDQCAFQQFqIQACQCAFLQAAIgLAIgRBAE4EQCAAIQUMAQsgACADRwRAIAUtAAEgBEH/AHFBCHRyIQIgBUECaiEFDAELQZ2twABBK0H8vMAAEGoACyABIAJrIgFBAEgNASAJQQFzIQkgAyAFRw0ACwsgCUEBcQuJBAEFfyMAQRBrIgMkAAJAAn8CQCABQYABTwRAIANBADYCDCABQYAQSQ0BIAFBgIAESQRAIAMgAUE/cUGAAXI6AA4gAyABQQx2QeABcjoADCADIAFBBnZBP3FBgAFyOgANQQMMAwsgAyABQT9xQYABcjoADyADIAFBBnZBP3FBgAFyOgAOIAMgAUEMdkE/cUGAAXI6AA0gAyABQRJ2QQdxQfABcjoADEEEDAILIAAoAggiAiAAKAIERgRAIwBBIGsiBCQAAkACQCACQQFqIgJFDQBBCCAAKAIEIgZBAXQiBSACIAIgBUkbIgIgAkEITRsiBUF/c0EfdiECAkAgBkUEQCAEQQA2AhgMAQsgBCAGNgIcIARBATYCGCAEIAAoAgA2AhQLIARBCGogAiAFIARBFGoQRyAEKAIMIQIgBCgCCEUEQCAAIAU2AgQgACACNgIADAILIAJBgYCAgHhGDQEgAkUNACACIARBEGooAgAQwwEACxBwAAsgBEEgaiQAIAAoAgghAgsgACACQQFqNgIIIAAoAgAgAmogAToAAAwCCyADIAFBP3FBgAFyOgANIAMgAUEGdkHAAXI6AAxBAgshASABIAAoAgQgACgCCCICa0sEQCAAIAIgARBDIAAoAgghAgsgACgCACACaiADQQxqIAEQyQEaIAAgASACajYCCAsgA0EQaiQAQQALwAICBX8BfiMAQTBrIgUkAEEnIQMCQCAAQpDOAFQEQCAAIQgMAQsDQCAFQQlqIANqIgRBBGsgACAAQpDOAIAiCEKQzgB+faciBkH//wNxQeQAbiIHQQF0Qfy1wABqLwAAOwAAIARBAmsgBiAHQeQAbGtB//8DcUEBdEH8tcAAai8AADsAACADQQRrIQMgAEL/wdcvViAIIQANAAsLIAinIgRB4wBLBEAgA0ECayIDIAVBCWpqIAinIgQgBEH//wNxQeQAbiIEQeQAbGtB//8DcUEBdEH8tcAAai8AADsAAAsCQCAEQQpPBEAgA0ECayIDIAVBCWpqIARBAXRB/LXAAGovAAA7AAAMAQsgA0EBayIDIAVBCWpqIARBMGo6AAALIAIgAUGAmcAAQQAgBUEJaiADakEnIANrECAgBUEwaiQAC7gCAQN/IwBBgAFrIgQkAAJAAkACfwJAIAEoAhwiAkEQcUUEQCACQSBxDQEgADUCAEEBIAEQMgwCCyAAKAIAIQBBACECA0AgAiAEakH/AGpBMEHXACAAQQ9xIgNBCkkbIANqOgAAIAJBAWshAiAAQRBJIABBBHYhAEUNAAsgAkGAAWoiAEGAAUsNAiABQQFBz7XAAEECIAIgBGpBgAFqQQAgAmsQIAwBCyAAKAIAIQBBACECA0AgAiAEakH/AGpBMEE3IABBD3EiA0EKSRsgA2o6AAAgAkEBayECIABBEEkgAEEEdiEARQ0ACyACQYABaiIAQYABSw0CIAFBAUHPtcAAQQIgAiAEakGAAWpBACACaxAgCyAEQYABaiQADwsgAEGAAUHstcAAEFIACyAAQYABQey1wAAQUgALgQMCBH8BfiMAQRBrIgQkAAJ/IAJFBEBBASEDQQAMAQsCQAJAAkACQCACrSIHQiCIUARAAkAgB6ciBUUEQEEBIQMMAQsgBUEASA0CQa3TwAAtAAAaIAVBARChASIDRQ0DCyAEQQA2AgwgBCADNgIEIAQgBTYCCCAFRQRAIARBBGpBAEEBEEQgBCgCDCEGIAQoAgQhAwsgAyAGaiABQQEQyQEaIAZBAWohASACQQJPBEADQCABIANqIAMgARDJARogAUEBdCEBIAJBBEkgAkEBdiECRQ0ACwsgASAFRw0DDAQLIwBBMGsiACQAIABBETYCDCAAQYCXwAA2AgggAEEcakIBNwIAIABBATYCFCAAQZizwAA2AhAgAEHUADYCLCAAIABBKGo2AhggACAAQQhqNgIoIABBEGpB8JjAABBxAAsQcAALQQEgBRDDAQALIAEgA2ogAyAFIAFrEMkBGgsgBCgCCAshASAAIAU2AgggACABNgIEIAAgAzYCACAEQRBqJAAL1gQCBn8BfiMAQeAAayICJAACQCABKAIAIgNFBEAgAkEQakEkEFwgAigCFCEBIAIoAhBB5IHAAEEkEMkBIQMgAkEkNgJIIAIgATYCRCACIAM2AkAgAkEIaiACQUBrEGggACACKQMINwIADAELIAJBKGohBAJAAkAgASgCCCIBRQRAIARBADoAAQwBCwJAAkACQAJAAkAgAy0AAEEraw4DAAIBAgsgAUEBayIBRQ0CIANBAWohAwwBCyABQQFGDQELAkAgAUEJTwRAA0AgAUUNAiADLQAAQTBrIgZBCUsNAyAFrUIKfiIIQiCIpw0EIANBAWohAyABQQFrIQEgBiAIpyIHaiIFIAdPDQALIARBAjoAAQwECwNAIAMtAABBMGsiBkEJSw0CIANBAWohAyAGIAVBCmxqIQUgAUEBayIBDQALCyAEIAU2AgQgBEEAOgAADAMLIARBAToAAQwBCyAEQQI6AAEgBEEBOgAADAELIARBAToAAAsCQCACLQAoBEAgAiACLQApOgAzIAJBzABqQgE3AgAgAkEBNgJEIAJBiILAADYCQCACQQM2AlwgAiACQdgAajYCSCACIAJBM2o2AlggAkE0aiIBIAJBQGsiAxAuIAIoAjQgAigCPBAAIAEQigEgAkEgakHOABBcIAIoAiQhASACKAIgQZCCwABBzgAQyQEhBCACQc4ANgJIIAIgATYCRCACIAQ2AkAgAkEYaiADEGggAigCGCEBIAAgAigCHDYCBAwBCyAAIAIoAiw2AgRBACEBCyAAIAE2AgALIAJB4ABqJAALuwIBBX8gACgCGCEDAkACQCAAIAAoAgxGBEAgAEEUQRAgAEEUaiIBKAIAIgQbaigCACICDQFBACEBDAILIAAoAggiAiAAKAIMIgE2AgwgASACNgIIDAELIAEgAEEQaiAEGyEEA0AgBCEFIAIiAUEUaiICIAFBEGogAigCACICGyEEIAFBFEEQIAIbaigCACICDQALIAVBADYCAAsCQCADRQ0AAkAgACAAKAIcQQJ0QYDUwABqIgIoAgBHBEAgA0EQQRQgAygCECAARhtqIAE2AgAgAQ0BDAILIAIgATYCACABDQBBnNfAAEGc18AAKAIAQX4gACgCHHdxNgIADwsgASADNgIYIAAoAhAiAgRAIAEgAjYCECACIAE2AhgLIABBFGooAgAiAEUNACABQRRqIAA2AgAgACABNgIYCwu3AgEHfyMAQRBrIgIkAEEBIQcCQAJAIAEoAhQiBEEnIAFBGGooAgAoAhAiBREAAA0AIAIgACgCAEGBAhAfAkAgAi0AAEGAAUYEQCACQQhqIQZBgAEhAwNAAkAgA0GAAUcEQCACLQAKIgAgAi0AC08NBCACIABBAWo6AAogAEEKTw0GIAAgAmotAAAhAQwBC0EAIQMgBkEANgIAIAIoAgQhASACQgA3AwALIAQgASAFEQAARQ0ACwwCC0EKIAItAAoiASABQQpNGyEAIAItAAsiAyABIAEgA0kbIQYDQCABIAZGDQEgAiABQQFqIgM6AAogACABRg0DIAEgAmohCCADIQEgBCAILQAAIAURAABFDQALDAELIARBJyAFEQAAIQcLIAJBEGokACAHDwsgAEEKQZDJwAAQUwALogIBBH8gAEIANwIQIAACf0EAIAFBgAJJDQAaQR8gAUH///8HSw0AGiABQQYgAUEIdmciAmt2QQFxIAJBAXRrQT5qCyIDNgIcIANBAnRBgNTAAGohAgJAQZzXwAAoAgAiBEEBIAN0IgVxRQRAQZzXwAAgBCAFcjYCACACIAA2AgAMAQsgAigCACECIAMQjAEhAwJAAkAgAhC+ASABRgRAIAIhAwwBCyABIAN0IQQDQCACIARBHXZBBHFqQRBqIgUoAgAiA0UNAiAEQQF0IQQgAyICEL4BIAFHDQALCyADKAIIIgEgADYCDCADIAA2AgggACADNgIMIAAgATYCCCAAQQA2AhgPCyAFIAA2AgALIAAgAjYCGCAAIAA2AgggACAANgIMC6ACAQV/AkACQAJAAkAgAkEDakF8cSIEIAJGDQAgBCACayIEIAMgAyAESxsiBUUNAEEAIQQgAUH/AXEhB0EBIQYDQCACIARqLQAAIAdGDQQgBSAEQQFqIgRHDQALIAUgA0EIayIESw0CDAELIANBCGshBEEAIQULIAFB/wFxQYGChAhsIQYDQCACIAVqIgdBBGooAgAgBnMiCEGBgoQIayAIQX9zcSAHKAIAIAZzIgdBgYKECGsgB0F/c3FyQYCBgoR4cQ0BIAVBCGoiBSAETQ0ACwtBACEGIAMgBUcEQCABQf8BcSEBA0AgASACIAVqLQAARgRAIAUhBEEBIQYMAwsgAyAFQQFqIgVHDQALCyADIQQLIAAgBDYCBCAAIAY2AgALnwIBAn8jAEEQayICJAACQAJ/AkAgAUGAAU8EQCACQQA2AgwgAUGAEEkNASABQYCABEkEQCACIAFBP3FBgAFyOgAOIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADUEDDAMLIAIgAUE/cUGAAXI6AA8gAiABQQZ2QT9xQYABcjoADiACIAFBDHZBP3FBgAFyOgANIAIgAUESdkEHcUHwAXI6AAxBBAwCCyAAKAIIIgMgACgCBEYEfyAAIAMQYSAAKAIIBSADCyAAKAIAaiABOgAAIAAgACgCCEEBajYCCAwCCyACIAFBP3FBgAFyOgANIAIgAUEGdkHAAXI6AAxBAgshASAAIAJBDGoiACAAIAFqEGMLIAJBEGokAEEAC5ICAQF/IwBBEGsiAiQAIAAoAgAhAAJ/IAEoAgAgASgCCHIEQCACQQA2AgwgASACQQxqAn8CQAJAIABBgAFPBEAgAEGAEEkNASAAQYCABE8NAiACIABBP3FBgAFyOgAOIAIgAEEMdkHgAXI6AAwgAiAAQQZ2QT9xQYABcjoADUEDDAMLIAIgADoADEEBDAILIAIgAEE/cUGAAXI6AA0gAiAAQQZ2QcABcjoADEECDAELIAIgAEE/cUGAAXI6AA8gAiAAQRJ2QfABcjoADCACIABBBnZBP3FBgAFyOgAOIAIgAEEMdkE/cUGAAXI6AA1BBAsQGgwBCyABKAIUIAAgAUEYaigCACgCEBEAAAsgAkEQaiQAC10BDH9BiNXAACgCACICBEBBgNXAACEGA0AgAiIBKAIIIQIgASgCBCEDIAEoAgAhBCABKAIMGiABIQYgBUEBaiEFIAINAAsLQcDXwABB/x8gBSAFQf8fTRs2AgAgCAuUAgEEfyMAQRBrIgMkAAJAIAEoAggiAiABQQxqKAIARwRAIAFBFGohBANAIAEgAkEIajYCCCABIAEoAhAiBUEBajYCECADIAIoAgAgAigCBBB1NgIMAkAgBCADQQxqEKIBIgIQAkEBRgRAIAMoAgwgBCgCABADQQFHDQELAkAgASgCAEUNACABKAIEIgRBhAFJDQAgBBABCyABIAI2AgQgAUEBNgIAIABBADoAACAAQQFBAiAFQQFGG0EAIAUbOgABIAMoAgwiAEGEAUkNAyAAEAEMAwsgAkGEAU8EQCACEAELIAMoAgwiAkGEAU8EQCACEAELIAEoAggiAiABKAIMRw0ACwsgAEGABjsBAAsgA0EQaiQAC48CAQR/IwBBEGsiAyQAAkAgASgCCCICIAFBDGooAgBHBEAgAUEUaiEEA0AgASACQQhqNgIIIAEgASgCECIFQQFqNgIQIAMgAigCACACKAIEEHU2AgwCQCAEIANBDGoQogEiAhACQQFGBEAgAygCDCAEKAIAEANBAUcNAQsCQCABKAIARQ0AIAEoAgQiBEGEAUkNACAEEAELIAEgAjYCBCABQQE2AgAgAEEAOgAAIABBAyAFIAVBA08bOgABIAMoAgwiAEGDAU0NAyAAEAEMAwsgAkGEAU8EQCACEAELIAMoAgwiAkGEAU8EQCACEAELIAEoAggiAiABKAIMRw0ACwsgAEGACDsBAAsgA0EQaiQAC48CAQR/IwBBEGsiAyQAAkAgASgCCCICIAFBDGooAgBHBEAgAUEUaiEEA0AgASACQQhqNgIIIAEgASgCECIFQQFqNgIQIAMgAigCACACKAIEEHU2AgwCQCAEIANBDGoQogEiAhACQQFGBEAgAygCDCAEKAIAEANBAUcNAQsCQCABKAIARQ0AIAEoAgQiBEGEAUkNACAEEAELIAEgAjYCBCABQQE2AgAgAEEAOgAAIABBBSAFIAVBBU8bOgABIAMoAgwiAEGDAU0NAyAAEAEMAwsgAkGEAU8EQCACEAELIAMoAgwiAkGEAU8EQCACEAELIAEoAggiAiABKAIMRw0ACwsgAEGADDsBAAsgA0EQaiQAC/IBAgR/AX4jAEEwayICJAAgAUEEaiEEIAEoAgRFBEAgASgCACEDIAJBLGoiBUEANgIAIAJCATcCJCACQSRqQbCTwAAgAxAhGiACQSBqIAUoAgAiAzYCACACIAIpAiQiBjcDGCAEQQhqIAM2AgAgBCAGNwIACyACQRBqIgMgBEEIaigCADYCACABQQxqQQA2AgAgBCkCACEGIAFCATcCBEGt08AALQAAGiACIAY3AwhBDEEEEKEBIgFFBEBBBEEMEMMBAAsgASACKQMINwIAIAFBCGogAygCADYCACAAQeyUwAA2AgQgACABNgIAIAJBMGokAAvNAQACQAJAIAEEQCACQQBIDQECQAJAAn8gAygCBARAIANBCGooAgAiAUUEQCACRQRAQQEhAQwEC0Gt08AALQAAGiACQQEQoQEMAgsgAygCACABQQEgAhCVAQwBCyACRQRAQQEhAQwCC0Gt08AALQAAGiACQQEQoQELIgFFDQELIAAgATYCBCAAQQhqIAI2AgAgAEEANgIADwsgAEEBNgIEDAILIABBADYCBAwBCyAAQQA2AgQgAEEBNgIADwsgAEEIaiACNgIAIABBATYCAAuEAgECfyMAQSBrIgYkAEH808AAQfzTwAAoAgAiB0EBajYCAAJAAkAgB0EASA0AQcjXwAAtAAANAEHI18AAQQE6AABBxNfAAEHE18AAKAIAQQFqNgIAIAYgBToAHSAGIAQ6ABwgBiADNgIYIAYgAjYCFCAGQbSVwAA2AhAgBkGEk8AANgIMQezTwAAoAgAiAkEASA0AQezTwAAgAkEBajYCAEHs08AAQfTTwAAoAgAEfyAGIAAgASgCEBEBACAGIAYpAwA3AgxB9NPAACgCACAGQQxqQfjTwAAoAgAoAhQRAQBB7NPAACgCAEEBawUgAgs2AgBByNfAAEEAOgAAIAQNAQsACwALyQEBAn8jAEEgayIDJAACQAJAIAEgASACaiIBSw0AQQggACgCBCICQQF0IgQgASABIARJGyIBIAFBCE0bIgRBf3NBH3YhAQJAIAJFBEAgA0EANgIYDAELIAMgAjYCHCADQQE2AhggAyAAKAIANgIUCyADQQhqIAEgBCADQRRqEEcgAygCDCEBIAMoAghFBEAgACAENgIEIAAgATYCAAwCCyABQYGAgIB4Rg0BIAFFDQAgASADQRBqKAIAEMMBAAsQcAALIANBIGokAAvJAQECfyMAQSBrIgMkAAJAAkAgASABIAJqIgFLDQBBCCAAKAIEIgJBAXQiBCABIAEgBEkbIgEgAUEITRsiBEF/c0EfdiEBAkAgAkUEQCADQQA2AhgMAQsgAyACNgIcIANBATYCGCADIAAoAgA2AhQLIANBCGogASAEIANBFGoQQSADKAIMIQEgAygCCEUEQCAAIAQ2AgQgACABNgIADAILIAFBgYCAgHhGDQEgAUUNACABIANBEGooAgAQwwEACxBwAAsgA0EgaiQAC64BAQF/IwBB0ABrIgQkACAEIAI2AgQgBCABNgIAIARBCGoiAUGsicAAIAMQNCAEQRRqIgJBrInAAEEAEDQgBEEsakIDNwIAIARBzABqQQo2AgAgBEHEAGpBATYCACAEQQM2AiQgBEGwicAANgIgIARBCjYCPCAEIARBOGo2AiggBCACNgJIIAQgBDYCQCAEIAE2AjggACAEQSBqEC4gAhCKASABEIoBIARB0ABqJAALqwEBAX8gAAJ/AkACfwJAAkAgAQRAIAJBAEgNASADKAIEBEAgA0EIaigCACIEBEAgAygCACAEIAEgAhCVAQwFCwsgAkUNAkGt08AALQAAGiACIAEQoQEMAwsgAEEANgIEIABBCGogAjYCAAwDCyAAQQA2AgQMAgsgAQsiAwRAIAAgAzYCBCAAQQhqIAI2AgBBAAwCCyAAIAE2AgQgAEEIaiACNgIAC0EBCzYCAAuuAQEBfwJAAkAgAQRAIAJBAEgNAQJ/IAMoAgQEQAJAIANBCGooAgAiBEUEQAwBCyADKAIAIAQgASACEJUBDAILCyABIAJFDQAaQa3TwAAtAAAaIAIgARChAQsiAwRAIAAgAzYCBCAAQQhqIAI2AgAgAEEANgIADwsgACABNgIEIABBCGogAjYCAAwCCyAAQQA2AgQgAEEIaiACNgIADAELIABBADYCBAsgAEEBNgIAC70BAQR/IwBBIGsiASQAIABBDGooAgAhAgJAAkACQAJAAkAgACgCBA4CAAECCyACDQFB+IzAACECQQAhAAwCCyACDQAgACgCACICKAIEIQAgAigCACECDAELIAFBFGogABAuIAEoAhwhACABKAIUIQMMAQsgAUEIaiAAEFwgASgCDCEEIAEoAggiAyACIAAQyQEhAiABIAA2AhwgASAENgIYIAEgAjYCFAsgAyAAEAsgAUEUahCKASABQSBqJAALzAEBA38jAEEgayIEJAACf0EAIAIgA2oiAyACSQ0AGiABKAIEIQYgBEEUaiEFAkAgASgCBCICRQRAIAVBADYCBAwBCyAFIAI2AgggBUEBNgIEIAUgASgCADYCAAsgBEEIakEIIAZBAXQiAiADIAIgA0sbIgIgAkEITRsiBkF/c0EfdiAGIAUQRiAEQRBqKAIAIQMgBCgCDCICIAQoAggNABogASAGNgIEIAEgAjYCAEGBgICAeAshASAAIAM2AgQgACABNgIAIARBIGokAAvtAwEIfyMAQRBrIgUkACABKAIIIgIEQCAFQQhqIQggASgCACEHAkAgAkUNACACIAdqIQIDQCACIgZBAWsiAi0AACIDwCIEQQBIBEAgBEE/cQJ/IAZBAmsiAi0AACIDwCIEQUBOBEAgA0EfcQwBCyAEQT9xAn8gBkEDayICLQAAIgPAIgRBQE4EQCADQQ9xDAELIARBP3EgBkEEayICLQAAQQdxQQZ0cgtBBnRyC0EGdHIiA0GAgMQARg0CCwJAIANBIEYgA0EJa0EFSXINAAJAIANBgAFJDQACQAJAIANBCHYiBEEfTQRAIARFDQEgBEEWRw0DIANBgC1GDQQMAwsgBEEgRg0BIARBMEcNAiADQYDgAEYNAwwCCyADQf8BcUGD0cAAai0AAEEBcUUNAQwCCyADQf8BcUGD0cAAai0AAEECcQ0BCyAGIAdrIQkMAgsgAiAHRw0ACwsgCCAJNgIEIAggBzYCACAFKAIIIQIgBSAFKAIMIgYQXCAFKAIEIQMgBSgCACACIAYQyQEhByAAKAIIIgIgACgCBEYEQCAAIAIQYiAAKAIIIQILIAAoAgAgAkEEdGoiAiAGNgIMIAIgAzYCCCACIAc2AgQgAkEFNgIAIAFBADYCCCAAIAAoAghBAWo2AggLIAVBEGokAAufTwIafwF+IwBBQGoiEiQAIBJBGGogASACEGUgEkEgaiEVIBIoAhghGiASKAIcIhshBiMAQfABayIKJAAgCkH0AGohByMAQZACayICJAAgAiADNgIUAkACQAJAIAMQBUEBRwRAIAJBFGogAkHQAWpB6InAABAnIQEgB0EBNgIAIAcgATYCBCACKAIUIgFBhAFJDQEgARABDAELIAJBGGoiASADQfCGwABBAhByIAJBADYCMCACQQA2AlggAkHMAGohCSACQUBrIQ4gAkE0aiEPIAJB3ABqIRMgAkHQAWogARA9AkACQAJAIAItANABRQRAIAJBOGohCCACQdgBaiEFIAJB4ABqIQsDQAJAAkACQCACLQDRASIBQQNHBEACQAJAAkAgAQ4CAAIBCyACKAIwRQ0EQQEhA0Gri8AAQQsQWyEBIAdBATYCACAHIAE2AgQMCQsgAkEIaiACQRhqEG0MBAsgAigCWEUNAUEBIQNBtovAAEEJEFshASAHQQE2AgAgByABNgIEDAcLIAIoAjAiAUUhAyABBEAgAkHQAWogD0EkEMkBGiACKAJYRQRAQbaLwABBCRBaIQEgB0EBNgIAIAcgATYCBCACQdABahCRASACQdwBahCRASACQegBahCRAQwICyACKAJcIQEgB0EsaiALQTgQyQEaIAdBBGogD0EkEMkBGiAHQQA2AgAgB0EoaiABNgIADAgLQauLwABBCxBaIQEgB0EBNgIAIAcgATYCBAwGCyACKAIYIAJBADYCGARAIAJB0AFqIQMgAigCHCEEIwBBkAFrIgEkACABIAQ2AhQCQCAEEAVBAUcEQCABQRRqIAFBGGpB+InAABAnIQQgA0EBNgIAIAMgBDYCBCABKAIUIgNBhAFJDQEgAxABDAELIAFBGGoiDCAEQZCGwABBBRByIAFBADYCMCABQQA2AkAgAUEANgJQIAFBADYCYCABQQA2AnAgAUE0aiEEIAFBxABqIRAgAUHUAGohESABQeQAaiENIAFB9ABqIRQgAUGAAWogDBA/AkACfyABLQCAAUUEQANAAkACQAJAAkACQAJAIAEtAIEBIgxBBkcEQAJAAkACQAJAAkACQCAMDgUAAgMEBQELIAEoAjBFDQpBxIrAAEEPEFsMDgsgAUEIaiABQRhqEG0MCgsgASgCQEUNB0HTisAAQQ4QWwwMCyABKAJQRQ0FQeGKwABBHRBbDAsLIAEoAmBFDQNB/orAAEEQEFsMCgsgASgCcEUNAUGOi8AAQR0QWwwJCyADQThqIAEpAng3AgAgA0E0aiABKAJ0QQAgASgCcBs2AgAgA0EoaiABKAJkQQAgASgCYBs2AgAgA0EcaiABKAJUQQAgASgCUBs2AgAgA0EQaiABKAJEQQAgASgCQBs2AgAgAyABKAI0QQAgASgCMBs2AgQgA0EsaiABQegAaikCADcCACADQSBqIAFB2ABqKQIANwIAIANBFGogAUHIAGopAgA3AgAgA0EIaiABQThqKQIANwIAIANBADYCAAwJCyABKAIYIAFBADYCGARAIAFBgAFqIAEoAhwQTiABKAKEASIMIAEoAoABDQgaIAEpAogBIR4gASgCcARAIBQQkQELIAEgHjcCeCABIAw2AnQgAUEBNgJwDAULDBMLIAEoAhggAUEANgIYBEAgAUGAAWogASgCHBBOIAEoAoQBIgwgASgCgAENBxogASkCiAEhHiABKAJgBEAgDRCRAQsgASAeNwJoIAEgDDYCZCABQQE2AmAMBAsMEgsgASgCGCABQQA2AhgEQCABQYABaiABKAIcEE4gASgChAEiDCABKAKAAQ0GGiABKQKIASEeIAEoAlAEQCAREJEBCyABIB43AlggASAMNgJUIAFBATYCUAwDCwwRCyABKAIYIAFBADYCGARAIAFBgAFqIAEoAhwQTiABKAKEASIMIAEoAoABDQUaIAEpAogBIR4gASgCQARAIBAQkQELIAEgHjcCSCABIAw2AkQgAUEBNgJADAILDBALIAEoAhggAUEANgIYRQ0PIAFBgAFqIAEoAhwQTiABKAKEASIMIAEoAoABDQMaIAEpAogBIR4gASgCMARAIAQQkQELIAEgHjcCOCABIAw2AjQgAUEBNgIwCyABQYABaiABQRhqED8gAS0AgAFFDQALCyABKAKEAQshDCADQQE2AgAgAyAMNgIEIAEoAnAEQCAUEJEBCyABKAJgBEAgDRCRAQsgASgCUARAIBEQkQELIAEoAkAEQCAQEJEBCyABKAIwRQ0AIAQQkQELIAFBGGoQdAsgAUGQAWokACACKALUASEBIAIoAtABRQRAIAJBmAFqIAVBOBDJARogAigCWARAIBMQeQsgAiABNgJcIAJBATYCWCALIAJBmAFqQTgQyQEaDAMLQQEhAyAHQQE2AgAgByABNgIEDAYLDAgLIAIoAhggAkEANgIYRQ0HIAJB0AFqIQMgAigCHCEEIwBB8ABrIgEkACABIAQ2AhQCQCAEEAVBAUcEQCABQRRqIAFBGGpB2InAABAnIQQgA0EBNgIAIAMgBDYCBCABKAIUIgNBhAFJDQEgAxABDAELIAFBGGoiDSAEQfyEwABBAxByIAFBADYCMCABQQA2AkAgAUEANgJQIAFBNGohBCABQcQAaiEQIAFB1ABqIREgAUHgAGogDRA+AkACfyABLQBgRQRAA0ACQAJAAkACQCABLQBhIg1BBEcEQAJAAkACQAJAIA0OAwACAwELIAEoAjBFDQZBiIrAAEEWEFsMCgsgAUEIaiABQRhqEG0MBgsgASgCQEUNA0GeisAAQRUQWwwICyABKAJQRQ0BQbOKwABBERBbDAcLIANBADYCACADQSBqIAEpAlg3AgAgA0EcaiABKAJUQQAgASgCUBs2AgAgA0EQaiABKAJEQQAgASgCQBs2AgAgAyABKAI0QQAgASgCMBs2AgQgA0EUaiABQcgAaikCADcCACADQQhqIAFBOGopAgA3AgAMBwsgASgCGCABQQA2AhgEQCABQeAAaiABKAIcEE4gASgCZCINIAEoAmANBhogASkCaCEeIAEoAlAEQCAREJEBCyABIB43AlggASANNgJUIAFBATYCUAwDCwwPCyABKAIYIAFBADYCGARAIAFB4ABq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EEUgBUEMaiAFKAJgIgEgASAFKAJoahBjIAYQigEgBUHQAGoQigFBASEDQQAhAUEAIQgMAgsgBSACQRBqNgIgIAUoAkwhAiAPIAE2AgQLIA9BADYCACAPQQhqIAI2AgAgBUHQAGoQigEgBUEYahBZIAVBDGoQigEMAwsgAkEQaiECIA5BEGsiDg0ACyAHIQILIAUgAjYCICAFQRhqEFkgD0EIaiAFQRRqKAIANgIAIA8gBSkCDDcCAAsgBUHwAGokACAKKALkASIBRQRAIApB7AFqKAIADAILIAopAugBIR4gCkH0AGoQayAVIB43AgQgFSABNgIADAMLIApB7AFqKAIACyEAIAooAugBIQEgCkH0AGoiAhBrIAogADYC6AEgCiABNgLkASACIApB5AFqEFAMAwsgCkEAEFwgCikDACEeIBVBADYCCCAVIB43AgAgCkEUahBrCyAKQfABaiQADAILIAooAnghAUGt08AALQAAGkEEQQQQoQEiAEUEQEEEQQQQwwEACyAAIAE2AgAgCkEIaiIBQeiIwAA2AgQgASAANgIAIAogCikDCDcC5AEgCkH0AGogCkHkAWoQUAsgCigCdCAKKAJ8ELwBAAsgGwRAIBoQGAsgEkE4aiASQShqKAIANgIAIBIgEikDIDcDMCASQTBqIgEQXiASQRBqIgIgASgCCDYCBCACIAEoAgA2AgAgEkEIaiASKAIQIBIoAhQQowEgEigCDCEBIAAgEigCCDYCACAAIAE2AgQgEkFAayQAC5MBAQF/IwBBQGoiAiQAIAJCADcDOCACQThqIAAoAgAQFCACQRhqQgE3AgAgAiACKAI8IgA2AjQgAiAANgIwIAIgAigCODYCLCACQTQ2AiggAkECNgIQIAJB9JLAADYCDCACIAJBLGo2AiQgAiACQSRqNgIUIAEgAkEMahCaASACKAIwBEAgAigCLBAYCyACQUBrJAALjAECA38BfiMAQSBrIgIkACABQQRqIQMgASgCBEUEQCABKAIAIQEgAkEcaiIEQQA2AgAgAkIBNwIUIAJBFGpBsJPAACABECEaIAJBEGogBCgCACIBNgIAIAIgAikCFCIFNwMIIANBCGogATYCACADIAU3AgALIABB7JTAADYCBCAAIAM2AgAgAkEgaiQAC7cCAQR/IwBBEGsiAiQAIAIgATYCAAJAIAIoAgBBgQEQB0UEQCACQQRqIQQgAigCACEDIwBBMGsiASQAIAEgAzYCHCABQRBqIAMQBAJAAkAgASgCECIFRQ0AIAFBCGogBSABKAIUEGUgAUEgaiABKAIIIAEoAgwQkwEgASgCIEUNACAEIAEpAiA3AgAgBEEIaiABQShqKAIANgIADAELIAFBHGogAUEvakHIicAAECchAyAEQQA2AgAgBCADNgIEIAEoAhwhAwsgA0GEAU8EQCADEAELIAFBMGokACAAAn8gAigCBARAIAAgAikCBDcCBCAAQQxqIAJBDGooAgA2AgBBAAwBCyAAIAIoAgg2AgRBAQs2AgAMAQsgAEIANwIAIAIoAgAiAEGEAUkNACAAEAELIAJBEGokAAt/AQF/IwBBQGoiBSQAIAUgATYCDCAFIAA2AgggBSADNgIUIAUgAjYCECAFQSRqQgI3AgAgBUE8akHTADYCACAFQQI2AhwgBUGYtcAANgIYIAVB1AA2AjQgBSAFQTBqNgIgIAUgBUEQajYCOCAFIAVBCGo2AjAgBUEYaiAEEHEAC6sBAQJ/IwBBQGoiAiQAIAJBADYCFCACQgE3AgwgAkEYaiIDQQM6ACAgA0EgNgIQIANBADYCHCADIAJBDGo2AhQgA0EANgIIIANBADYCACADQRhqQZyHwAA2AgAgASgCACADIAEoAgQoAhARAABFBEAgACACKQIMNwIAIABBCGogAkEUaigCADYCACACQUBrJAAPC0G0h8AAQTcgAkE/akHsh8AAQciIwAAQTwALawEBfyMAQTBrIgIkACACQRhqIAAoAgAQCiACQRBqIAIoAhggAigCHBCjASACQQhqIAIoAhAgAigCFBBlIAJBJGoiACACKAIIIAIoAgwQkwEgAigCJCACKAIsIAEQxgEgABCKASACQTBqJAALbAEBfyMAQTBrIgMkACADIAA2AgAgAyABNgIEIANBFGpCAjcCACADQSxqQTU2AgAgA0ECNgIMIANB9LjAADYCCCADQTU2AiQgAyADQSBqNgIQIAMgA0EEajYCKCADIAM2AiAgA0EIaiACEHEAC2wBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQRRqQgI3AgAgA0EsakE1NgIAIANBAjYCDCADQeSzwAA2AgggA0E1NgIkIAMgA0EgajYCECADIAM2AiggAyADQQRqNgIgIANBCGogAhBxAAtsAQF/IwBBMGsiAyQAIAMgADYCACADIAE2AgQgA0EUakICNwIAIANBLGpBNTYCACADQQI2AgwgA0GUucAANgIIIANBNTYCJCADIANBIGo2AhAgAyADQQRqNgIoIAMgAzYCICADQQhqIAIQcQALbAEBfyMAQTBrIgMkACADIAA2AgAgAyABNgIEIANBFGpCAjcCACADQSxqQTU2AgAgA0ECNgIMIANByLnAADYCCCADQTU2AiQgAyADQSBqNgIQIAMgA0EEajYCKCADIAM2AiAgA0EIaiACEHEAC2kBAX8jAEEgayICJAACf0EBIAAgARAzDQAaIAJBFGpCADcCACACQQE2AgwgAkHYssAANgIIIAJBgJnAADYCEEEBIAEoAhQgAUEYaigCACACQQhqECENABogAEEEaiABEDMLIAJBIGokAAttAQJ/IAEoAgAhAwJAAkACQCABKAIIIgFFBEBBASECDAELIAFBAEgNAUGt08AALQAAGiABQQEQoQEiAkUNAgsgAiADIAEQyQEhAiAAIAE2AgggACABNgIEIAAgAjYCAA8LEHAAC0EBIAEQwwEAC2cAIwBBMGsiACQAQazTwAAtAAAEQCAAQRhqQgE3AgAgAEECNgIQIABB+JPAADYCDCAAQTU2AiggACABNgIsIAAgAEEkajYCFCAAIABBLGo2AiQgAEEMakGglMAAEHEACyAAQTBqJAALTgECfyAAKAIMIgIgACgCCCIBRwRAIAIgAWtBBHYhAiABQQRqIQEDQCABEIoBIAFBEGohASACQQFrIgINAAsLIAAoAgQEQCAAKAIAEBgLC18BAX8jAEEwayICJAAgAiABNgIMIAIgADYCCCACQRxqQgE3AgAgAkECNgIUIAJBrIPAADYCECACQQE2AiwgAiACQShqNgIYIAIgAkEIajYCKCACQRBqEEggAkEwaiQAC18BAX8jAEEwayICJAAgAiABNgIMIAIgADYCCCACQRxqQgE3AgAgAkECNgIUIAJB0IPAADYCECACQQE2AiwgAiACQShqNgIYIAIgAkEIajYCKCACQRBqEEggAkEwaiQAC08BAX8CQAJAAkAgAUUEQEEBIQIMAQsgAUEASA0BQa3TwAAtAAAaIAFBARChASICRQ0CCyAAIAE2AgQgACACNgIADwsQcAALQQEgARDDAQAL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IANBDGpCADcCACADQQE2AgQgA0GAmcAANgIIIAMgATYCHCADIAA2AhggAyADQRhqNgIAIAMgAhBxAAtBACAAEJEBIABBDGoQkQEgAEEYahCRASAAQSRqEJEBIABBMGoQkQEgAEE8ahCRASAAQcgAahCRASAAQdQAahCRAQs4AAJAIAFpQQFHQYCAgIB4IAFrIABJcg0AIAAEQEGt08AALQAAGiAAIAEQoQEiAUUNAQsgAQ8LAAs4AQF/IAEoAgAgAUEANgIABEAgASgCBCIBQYQBTwRAIAEQAQsgAEEANgIADwtB3oLAAEEVELwBAAs5AAJAAn8gAkGAgMQARwRAQQEgACACIAEoAhARAAANARoLIAMNAUEACw8LIAAgAyAEIAEoAgwRAgALnXcDFn4jfwF8IAEoAhxBAXEhGSAAKwMAITsCQAJAIAEoAggEQAJ/IAEhJCABQQxqKAIAIScjAEHwCGsiICQAIDu9IQMCQCA7IDtiBEBBAiEBDAELIANC/////////weDIgZCgICAgICAgAiEIANCAYZC/v///////w+DIANCNIinQf8PcSIAGyICQgGDIQVBAyEBAkACQAJAQQFBAkEEIANCgICAgICAgPj/AIMiB1AiGhsgB0KAgICAgICA+P8AURtBA0EEIBobIAZQG0ECaw4DAAECAwtBBCEBDAILIABBswhrIRggBVAhAUIBIQQMAQtCgICAgICAgCAgAkIBhiACQoCAgICAgIAIUSIBGyECQgJCASABGyEEQct3Qcx3IAEbIABqIRggBVAhAQsgICAYOwHoCCAgIAQ3A+AIICBCATcD2AggICACNwPQCCAgIAE6AOoIAkACfwJAAkACQAJAQQMgAUECa0H/AXEiACAAQQNPGyIABEBBw7DAAEHEsMAAIANCAFMiARtBw7DAAEGAmcAAIAEbIBkbISlBASEBIANCP4inIBlyIS0gAEECaw4CAgMBCyAgQQM2ApgIICBBxbDAADYClAggIEECOwGQCEEBIQFBgJnAACEpICBBkAhqDAQLICBBAzYCmAggIEHIsMAANgKUCCAgQQI7AZAIICBBkAhqDAMLQQIhASAgQQI7AZAIICdFDQEgIEGgCGogJzYCACAgQQA7AZwIICBBAjYCmAggIEHBsMAANgKUCCAgQZAIagwCC0F0QQUgGMEiAEEASBsgAGwi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AkACQAJAA0AgGEUNAUF/IBhBBGsiGCAdQbABamooAgAiACAYIB1BDGpqKAIAIgFHIAAgAUsbIgBFDQALIABB/wFxQQFGDQEMBQsgGiAYRXFFDQQgH0EBayIAICVPDQEgACAiai0AAEEBcUUNBAsgHyAlSw0CIB8gImohAUEAIRggIiEbAkADQCAYIB9GDQEgGEEBaiEYIBtBAWsiGyAfaiIALQAAQTlGDQALIAAgAC0AAEEBajoAACAfIBhrQQFqIB9PDQQgAEEBakEwIBhBAWsQygEaDAQLAn9BMSAfRQ0AGiAiQTE6AABBMCAfQQFGDQAaICJBAWpBMCAfQQFrEMoBGkEwCyEAIB5BAWohHiAzRQ0BDAMLIAAgJUHIn8AAEFMACyAfICVPDQEgASAAOgAAIB9BAWohHwwBCyAfICVB2J/AABBUAAsgHyAlSw0BCyAqIB47AQggKiAfNgIEICogIjYCACAdQcAGaiQADAULIB8gJUHon8AAEFQACyAYQShBwMnAABBUAAsgAUEoQcDJwAAQVAALQdDJwABBGkHAycAAEGoACyAgQcgIaiAgQZgIaigCADYCACAgICApApAINwPACAsgLiAgLgHICCIASARAICBBCGogICgCwAggICgCxAggACAnICBBkAhqEC0gICgCDCEBICAoAggMAwtBAiEBICBBAjsBkAggJ0UEQEEBIQEgIEEBNgKYCCAgQcuwwAA2ApQIICBBkAhqDAMLICBBoAhqICc2AgAgIEEAOwGcCCAgQQI2ApgIICBBwbDAADYClAggIEGQCGoMAgtBzLDAAEElQfSwwAAQagALQQEhASAgQQE2ApgIICBBy7DAADYClAggIEGQCGoLIQAgIEHMCGogATYCACAgIAA2AsgIICAgLTYCxAggICApNgLACCAkICBBwAhqECMgIEHwCGokAAwBCyAAQShBwMnAABBUAAsPCyABIwBBgAFrIiIkACA7vSECAkAgOyA7YgRAQQIhAAwBCyACQv////////8HgyIGQoCAgICAgIAIhCACQgGGQv7///////8PgyACQjSIp0H/D3EiARsiA0IBgyEFQQMhAAJAAkACQEEBQQJBBCACQoCAgICAgID4/wCDIgdQIhobIAdCgICAgICAgPj/AFEbQQNBBCAaGyAGUBtBAmsOAwABAgMLQQQhAAwCCyABQbMIayEtIAVQIQBCASEEDAELQoCAgICAgIAgIANCAYYgA0KAgICAgICACFEiABshA0ICQgEgABshBEHLd0HMdyAAGyABaiEtIAVQIQALICIgLTsBeCAiIAQ3A3AgIkIBNwNoICIgAzcDYCAiIAA6AHoCfwJAAkBBAyAAQQJrQf8BcSIAIABBA08bIgEEQEHDsMAAQcSwwAAgAkIAUyIAG0HDsMAAQYCZwAAgABsgGRshLUEBIQAgAkI/iKcgGXIhIwJAIAFBAmsOAgMAAgsgIkEgaiEcICJBD2ohHyMAQTBrIhokAAJAAkACfwJAAkACQAJAAkACQAJAAkAgIkHgAGoiACkDACICUEUEQCAAKQMIIgRQDQEgACkDECIDUA0CIAIgA3wiAyACVA0DIAIgBFQNBCADQoCAgICAgICAIFoNBSAaIAAvARgiADsBCCAaIAIgBH0iBDcDACAAIABBIGsgACADQoCAgIAQVCIBGyIZQRBrIBkgA0IghiADIAEbIgNCgICAgICAwABUIgEbIhlBCGsgGSADQhCGIAMgARsiA0KAgICAgICAgAFUIgEbIhlBBGsgGSADQgiGIAMgARsiA0KAgICAgICAgBBUIgEbIhlBAmsgGSADQgSGIAMgARsiA0KAgICAgICAgMAAVCIBGyADQgKGIAMgARsiBUIAWSIZayIBa8EiG0EASA0GIBpCfyAbrSIGiCIDIASDNwMQIAMgBFQNCiAaIAA7AQggGiACNwMAIBogAiADgzcDECACIANWDQpBoH8gAWvBQdAAbEGwpwVqQc4QbSIAQdEATw0HIABBBHQiAEG4oMAAaikDACIHQv////8PgyIDIAIgBkI/gyIChiIIQiCIIhF+IglCIIgiFSAHQiCIIgYgEX58IAYgCEL/////D4MiB34iCEIgiCIWfCELIAlC/////w+DIAMgB35CIIh8IAhC/////w+DfEKAgICACHxCIIghEkIBQQAgASAAQcCgwABqLwEAamtBP3GtIgmGIgdCAX0hDCADIAQgAoYiAkIgiCIEfiIIQv////8PgyADIAJC/////w+DIgJ+QiCIfCACIAZ+IgJC/////w+DfEKAgICACHxCIIghDyAEIAZ+IQQgAkIgiCECIAhCIIghCCAAQcKgwABqLwEAIQEgBiAFIBmthiIFQiCIIhN+IhQgAyATfiIK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wMnAABBqAAsgIkHYAGogIkEoaigCADYCACAiICIpAiA3A1ALICIgIigCUCAiKAJUICIvAVhBACAiQSBqEC0gIigCBCEAICIoAgAMAwsgIkEDNgIoICJBxbDAADYCJCAiQQI7ASBBASEAQYCZwAAhLSAiQSBqDAILICJBAzYCKCAiQciwwAA2AiQgIkECOwEgICJBIGoMAQsgIkECOwEgICJBATYCKCAiQcuwwAA2AiQgIkEgagshASAiQdwAaiAANgIAICIgATYCWCAiICM2AlQgIiAtNgJQICJB0ABqECMgIkGAAWokAA8LIBlBKEHAycAAEFQACyAZQShBwMnAABBTAAs/AQF/IwBBIGsiACQAIABBFGpCADcCACAAQQE2AgwgAEGUl8AANgIIIABBzJbAADYCECAAQQhqQZyXwAAQcQALyQIBAn8jAEEgayICJAAgAkEBOwEcIAIgATYCGCACIAA2AhQgAkGgs8AANgIQIAJBgJnAADYCDCMAQRBrIgEkAAJAIAJBDGoiACgCDCICBEAgACgCCCIDRQ0BIAEgAjYCDCABIAA2AgggASADNgIEIwBBEGsiACQAIAFBBGoiASgCACICQQxqKAIAIQMCQAJ/AkACQCACKAIEDgIAAQMLIAMNAkEAIQJBhJPAAAwBCyADDQEgAigCACIDKAIEIQIgAygCAAshAyAAIAI2AgQgACADNgIAIABBjJXAACABKAIEIgAoAgggASgCCCAALQAQIAAtABEQQgALIABBADYCBCAAIAI2AgAgAEGglcAAIAEoAgQiACgCCCABKAIIIAAtABAgAC0AERBCAAtBhJPAAEErQcyUwAAQagALQYSTwABBK0HclMAAEGoACzEAIAAgAjYCCCAAIAE2AhQgAEEANgIAIABBEGpBADYCACAAQQxqIAIgA0EDdGo2AgALLgACQCADaUEBR0GAgICAeCADayABSXJFBEAgACABIAMgAhCVASIADQELAAsgAAsyAQF/IAAoAhQiAUGEAU8EQCABEAELAkAgACgCAEUNACAAKAIEIgBBhAFJDQAgABABCwv5FwIYfwV+IwBBEGsiFCQAIBQgATYCDCAUIAA2AggCfyAUQQhqIQAjAEEwayIMJAACQEEAQbiNwAAoAgARAwAiEQRAIBEoAgANASARQX82AgAgACgCACEQIAAoAgQhEiMA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LQAEIgNBAEcgAi0ABUUNABpBASECIANFBEAgASgCACICLQAcQQRxRQRAIAEgAigCFEHJtcAAQQIgAigCGCgCDBECACIBOgAEIAEMAgsgAigCFEHItcAAQQEgAigCGCgCDBECACECCyABIAI6AAQgAgsgAEEQaiQACycAIAAgACgCBEEBcSABckECcjYCBCAAIAFqIgAgACgCBEEBcjYCBAsnACAAEJEBIABBDGoQkQEgAEEYahCRASAAQSRqEJEBIABBMGoQkQELIAEBfwJAIAAoAgQiAUUNACAAQQhqKAIARQ0AIAEQGAsLIwAgAiACKAIEQX5xNgIEIAAgAUEBcjYCBCAAIAFqIAE2AgALJQAgAEUEQEHMjsAAQTIQvAEACyAAIAIgAyAEIAUgASgCEBELAAsfAQJ+IAApAwAiAiACQj+HIgOFIAN9IAJCAFkgARAyCyMAIABFBEBBzI7AAEEyELwBAAsgACACIAMgBCABKAIQEQYACyMAIABFBEBBzI7AAEEyELwBAAsgACACIAMgBCABKAIQEQgACyMAIABFBEBBzI7AAEEyELwBAAsgACACIAMgBCABKAIQERMACyMAIABFBEBBzI7AAEEyELwBAAsgACACIAMgBCABKAIQERUACyMAIABFBEBBzI7AAEEyELwBAAsgACACIAMgBCABKAIQERcACxkBAX8gASADRgR/IAAgAiABEMgBRQUgBAsLHgAgACABQQNyNgIEIAAgAWoiACAAKAIEQQFyNgIECyQAIAEgAC0AAEECdCIAQZjTwABqKAIAIABBhNPAAGooAgAQGgshACAARQRAQcyOwABBMhC8AQALIAAgAiADIAEoAhARBAALIgAgAC0AAEUEQCABQZS4wABBBRAaDwsgAUGZuMAAQQQQGgsfACAARQRAQcyOwABBMhC8AQALIAAgAiABKAIQEQAAC6wDAgZ/AX5BsNPAACgCAAR/QbTTwAAFIwBBIGsiBSQAQaiNwAAhAQJ/QQAgAEUNABogACgCACEGIABBADYCAEEAIAZFDQAaIAAoAhAhAyAAKAIMIQIgACgCCCEBIAAoAgQhBCAAKAIUCyEGQbDTwAApAgAhB0G008AAIAQ2AgBBsNPAAEEBNgIAIAVBGGpBwNPAACkCADcDACAFQRBqIgBBuNPAACkCADcDAEHE08AAIAY2AgBBwNPA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BEAgASAAEC8MAQsgABAXCwsOACAAKAIAIAEoAgAQDQsQACAAIAI2AgQgACABNgIACxAAIAAoAgAgACgCBCABEBwLEQAgACgCACAAKAIEIAEQxgELIAAgAELk3seFkNCF3n03AwggAELB9/nozJOy0UE3AwALIQAgAELvuKOPoLfHliw3AwggAEKD98XGvpje66x/NwMACyEAIABCkL28l+OV96AyNwMIIABCg+W4qNm60bGrfzcDAAsTACAAQfyUwAA2AgQgACABNgIACw0AIAAtAARBAnFBAXYLIQAgAELeqYux/aDg7l43AwggAEK81Ii6hZXg6tgANwMACxAAIAAoAgAgACgCCCABEBwLEAAgASAAKAIAIAAoAgQQGgsKAEEAIABrIABxCwsAIAAtAARBA3FFCwwAIAAgAUEDcjYCBAsNACAAKAIAIAAoAgRqCw4AIAAoAgAaA0AMAAsACw0AIAA1AgBBASABEDILDQAgACkDAEEBIAEQMgsLACAAIwBqJAAjAAsOACABQZSFwABBEhCPAQsOACABQbiGwABBEBCPAQsOACABQYCHwABBGRCPAQsHACAAEIoBCw0AIABBlInAACABECELCwAgACgCACABEEwLCQAgACABEBUACw0AIABBsJPAACABECELCgAgACgCBEF4cQsKACAAKAIEQQFxCwoAIAAoAgxBAXELCgAgACgCDEEBdgsNACAAQcyWwAAgARAhCxkAIAAgAUHo08AAKAIAIgBBNiAAGxEBAAALiQQBBX8jAEEQayIDJAACQAJ/AkAgAUGAAU8EQCADQQA2AgwgAUGAEEkNASABQYCABEkEQCADIAFBP3FBgAFyOgAOIAMgAUEMdkHgAXI6AAwgAyABQQZ2QT9xQYABcjoADUEDDAMLIAMgAUE/cUGAAXI6AA8gAyABQQZ2QT9xQYABcjoADiADIAFBDHZBP3FBgAFyOgANIAMgAUESdkEHcUHwAXI6AAxBBAwCCyAAKAIIIgIgACgCBEYEQCMAQSBrIgQkAAJAAkAgAkEBaiICRQ0AQQggACgCBCIGQQF0IgUgAiACIAVJGyICIAJBCE0bIgVBf3NBH3YhAgJAIAZFBEAgBEEANgIYDAELIAQgBjYCHCAEQQE2AhggBCAAKAIANgIUCyAEQQhqIAIgBSAEQRRqEEEgBCgCDCECIAQoAghF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cmVGaXJzdFN1YkhlYWRpbmdiZWZvcmVTdWJIZWFkaW5nc0ACEAAWAAAAVgIQABUAAABrAhAAEQAAAHN0cnVjdCBIZWFkaW5nR2Fwc2FmdGVyUHJvcGVydGllc2JlZm9yZUNvbnRlbnRzYmVmb3JlQ29udGVudHNBZnRlckNvZGVCbG9ja3NiZWZvcmVDb2RlQmxvY2tzYmVmb3JlQ29kZUJsb2Nrc0FmdGVySGVhZGluZ3MAAACmAhAADwAAALUCEAAOAAAAwwIQAB0AAADgAhAAEAAAAPACEAAdAAAAc3RydWN0IE90aGVyR2Fwc01haW5QbHVnaW5TZXR0aW5nc2hlYWRpbmdHYXBzb3RoZXJHYXBzAABaAxAACwAAAGUDEAAJAAAAc3RydWN0IE1haW5QbHVnaW5TZXR0aW5ncwAAAAQAAAAMAAAABAAAAAUAAAAGAAAABwAAAGEgRGlzcGxheSBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB1bmV4cGVjdGVkbHkACAAAAAAAAAABAAAACQAAAC9ydXN0Yy9hMjgwNzdiMjhhMDJiOTI5ODViM2EzZmFlY2Y5MjgxMzE1NWYxZWExL2xpYnJhcnkvYWxsb2Mvc3JjL3N0cmluZy5ycwD8AxAASwAAAJwJAAAOAAAACwAAAAQAAAAEAAAADAAAAAsAAAAEAAAABAAAAA0AAAAMAAAAWAQQAA4AAAAPAAAAEAAAAA4AAAARAAAAEgAAAAwAAAAEAAAAEwAAABQAAAAHAAAACgAAAJQEEAAAAAAAlAQQAAAAAACUBBAAAAAAABUAAAAAAAAAAQAAABYAAAAVAAAAAAAAAAEAAAAXAAAAFQAAAAAAAAABAAAAGAAAABUAAAAAAAAAAQAAABkAAABiZWZvcmVUb3BMZXZlbEhlYWRpbmdzYmVmb3JlRmlyc3RTdWJIZWFkaW5nYmVmb3JlU3ViSGVhZGluZ3NhZnRlclByb3BlcnRpZXNiZWZvcmVDb250ZW50c2JlZm9yZUNvbnRlbnRzQWZ0ZXJDb2RlQmxvY2tzYmVmb3JlQ29kZUJsb2Nrc2JlZm9yZUNvZGVCbG9ja3NBZnRlckhlYWRpbmdzaGVhZGluZ0dhcHNvdGhlckdhcHNjYW5ub3QgYWNjZXNzIGEgVGhyZWFkIExvY2FsIFN0b3JhZ2UgdmFsdWUgZHVyaW5nIG9yIGFmdGVyIGRlc3RydWN0aW9uAAAAHQAAAAAAAAABAAAAHgAAAC9ydXN0Yy9hMjgwNzdiMjhhMDJiOTI5ODViM2EzZmFlY2Y5MjgxMzE1NWYxZWExL2xpYnJhcnkvc3RkL3NyYy90aHJlYWQvbG9jYWwucnMAGAYQAE8AAAD2AAAAGgAAAGludmFsaWQgdHlwZTogLCBleHBlY3RlZCAAAAB4BhAADgAAAIYGEAALAAAAAAAAAP//////////eAYQAAAAAAAfAAAAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvc2VyZGUtd2FzbS1iaW5kZ2VuLTAuNi4zL3NyYy9saWIucnMAAAC8BhAAZQAAADUAAAAOAAAARXJyb3IAAAAgAAAABAAAAAQAAAAhAAAAY2xvc3VyZSBpbnZva2VkIHJlY3Vyc2l2ZWx5IG9yIGFmdGVyIGJlaW5nIGRyb3BwZWQAAGEgc3RyaW5nYnl0ZSBhcnJheWJvb2xlYW4gYGCSBxAACQAAAJsHEAABAAAAaW50ZWdlciBgAAAArAcQAAkAAACbBxAAAQAAAGZsb2F0aW5nIHBvaW50IGDIBxAAEAAAAJsHEAABAAAAY2hhcmFjdGVyIGAA6AcQAAsAAACbBxAAAQAAAHN0cmluZyAABAgQAAcAAACIBxAACgAAAHVuaXQgdmFsdWUAABwIEAAKAAAAT3B0aW9uIHZhbHVlMAgQAAwAAABuZXd0eXBlIHN0cnVjdAAARAgQAA4AAABzZXF1ZW5jZVwIEAAIAAAAbWFwAGwIEAADAAAAZW51bXgIEAAEAAAAdW5pdCB2YXJpYW50hAgQAAwAAABuZXd0eXBlIHZhcmlhbnQAmAgQAA8AAAB0dXBsZSB2YXJpYW50AAAAsAgQAA0AAABzdHJ1Y3QgdmFyaWFudAAAyAgQAA4AAABUcmllZCB0byBzaHJpbmsgdG8gYSBsYXJnZXIgY2FwYWNpdHngCBAAJAAAAC9ydXN0Yy9hMjgwNzdiMjhhMDJiOTI5ODViM2EzZmFlY2Y5MjgxMzE1NWYxZWExL2xpYnJhcnkvYWxsb2Mvc3JjL3Jhd192ZWMucnMMCRAATAAAAK4B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', imports)}

class FormattoCommand {
    constructor(plugin) {
        this.plugin = plugin;
    }
    registerCommands() {
        this.getCommandsArr().forEach((item) => {
            this.plugin.addCommand(item);
        });
    }
    getCommandsArr() {
        return [
            {
                id: "formatto-logo",
                name: "Format Document",
                icon: "formatto-logo",
                editorCallback: (editor) => {
                    this.plugin.utils.formatDocument(editor);
                },
            },
        ];
    }
}

var formattoLogo = "<svg class=\"formatto__custom-icons\" viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect x=\"1.96533\" y=\"2\" width=\"6.65444\" height=\"2.5723\" rx=\"0.4\" />\n<rect x=\"1.96533\" y=\"6.31047\" width=\"12.0693\" height=\"3.44838\" rx=\"0.4\" />\n<rect x=\"1.96533\" y=\"11.483\" width=\"6.98996\" height=\"3.01966\" rx=\"0.4\" />\n<rect x=\"10.5863\" y=\"2\" width=\"3.44838\" height=\"6.03466\" rx=\"0.4\" />\n</svg>";

class CustomIcon {
    constructor() {
        this.icons = [{ name: "formatto-logo", svg: formattoLogo }];
        this.registerIcons = () => {
            this.icons.forEach(({ name: id, svg }) => {
                obsidian.addIcon(id, svg);
            });
        };
    }
}

class RibbonIcon {
    constructor(plugin) {
        this.registerRibbonIcons = () => {
            this.plugin.addRibbonIcon("formatto-logo", "Format Document", () => {
                var _a;
                const editor = (_a = this.plugin.app.workspace.activeEditor) === null || _a === void 0 ? void 0 : _a.editor;
                const activeView = this.plugin.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                if (!editor) {
                    new obsidian.Notice("Please make sure that the editor is open.");
                    return;
                }
                if (activeView.getMode() !== "source") {
                    new obsidian.Notice("You can only format in editing mode.");
                    return;
                }
                this.plugin.utils.formatDocument(editor);
            });
        };
        this.plugin = plugin;
    }
}

class FormattoUtil {
    constructor(plugin) {
        this.plugin = plugin;
    }
    formatDocument(editor) {
        const cursorPosition = editor.getCursor();
        const originalDocument = editor.getValue();
        let formattedDocument;
        try {
            formattedDocument = format_document(originalDocument, this.plugin.settings);
        }
        catch (error) {
            new obsidian.Notice(error);
        }
        if (formattedDocument === undefined)
            return;
        editor.setValue(formattedDocument);
        editor.setSelection(cursorPosition, cursorPosition);
        if (originalDocument == editor.getValue()) {
            new obsidian.Notice("Document is already formatted!");
        }
        else {
            new obsidian.Notice("Document Formatted!");
        }
    }
}

/** Entry Point. */
class FormattoPlugin extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.utils = new FormattoUtil(this);
        this.iconCreator = new CustomIcon();
        this.ribbonIcon = new RibbonIcon(this);
        this.eventsMenuCreator = new FormattoEditorMenu(this);
        this.commandCreator = new FormattoCommand(this);
    }
    /** Load and Save Settings */
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
    /** Runs whenever the user starts using the plugin in Obsidian. */
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            // Initialize WebAssembly
            yield (() => __awaiter(this, void 0, void 0, function* () {
                // @ts-expect-error: formatto_wasm should be called.
                yield __wbg_init(yield formatto_wasm());
            }))();
            this.addSettingTab(new MainPluginSettingTab(this.app, this));
            this.iconCreator.registerIcons();
            this.ribbonIcon.registerRibbonIcons();
            this.eventsMenuCreator.registerEditorMenus();
            this.commandCreator.registerCommands();
            console.log("Plugin Loaded: Formatto");
        });
    }
    /** Runs when the plugin is disabled. */
    onunload() {
        console.log("Plugin Unloaded: Formatto");
    }
}

module.exports = FormattoPlugin;
