// Hack Assembler
// Translate Hack computer machine code

// unpacks each instruction into its underlying fields
function Parse (code) {
    this.code = code
}

Parse.prototype.comp = function () {
    try {
        if (this.code.includes('=')) {
            // the .asm row is ended with \r, so exclude \r
            return this.code.match(/=([^;\r]{1,3})/)[1]
        } else {
            return this.code.match(/[^;\r]{1,3}/)[0]
        }
    } catch (e) {
        return "null"
    }
} // return comp part

Parse.prototype.dest = function () {
    try{
        return this.code.match(/^([AMD]{1,3})=/)[1]
    } catch (e) {
        return "null"
    }
} // return dest part

Parse.prototype.jump = function () {
    try {
        return this.code.match(/;([^/s]{3})/)[1]
    } catch (e) {
        return "null"
    }
} // return jump part

Parse.prototype.hasMoreCommands = function () {
    
} //return false if finished

Parse.prototype.advance = function () {

} // get the next command

Parse.prototype.command = function () {
    // type of current command(A-command, C-command, or Label)
    if (this.code.startsWith("@")) { // A-command starts with @
        return { type: 'A' }
    } else if (this.code.startsWith('\(')){ // C-command
        return { type: 'SYMBOL' }
    } else {
        return { type: 'C'}
    }
}

// translates each field into its corresponding binary value
function Code() {
    // convert to comp bit code
}

Code.prototype.comp = function (string) {
    let code

    switch (string) {
        case "0":   code = "0101010"; break;
        case "1":   code = "0111111"; break;
        case "-1":  code = "0111010"; break;
        case "D":   code = "0001100"; break;
        case "A":   code = "0110000"; break;
        case "!D":  code = "0001101"; break;
        case "!A":  code = "0110001"; break;
        case "-D":  code = "0001111"; break;
        case "-A":  code = "0110011"; break;
        case "D+1": code = "0011111"; break;
        case "A+1": code = "0110111"; break;
        case "D-1": code = "0001110"; break;
        case "A-1": code = "0110010"; break;
        case "D+A": code = "0000010"; break;
        case "D-A": code = "0010011"; break;
        case "A-D": code = "0000111"; break;
        case "D&A": code = "0000000"; break;
        case "D|A": code = "0010101"; break;
        case "M":   code = "1110000"; break;
        case "!M":  code = "1110001"; break;
        case "-M":  code = "1110011"; break;
        case "M+1": code = "1110111"; break;
        case "M-1": code = "1110010"; break;
        case "D+M": code = "1000010"; break;
        case "D-M": code = "1010011"; break;
        case "M-D": code = "1000111"; break;
        case "D&M": code = "1000000"; break;
        case "D|M": code = "1010101"; break;
    }

    return code
}

Code.prototype.dest = function (string) {
    let code

    switch (string) {
        case "null": code = "000"; break;
        case "M":    code = "001"; break;
        case "D":    code = "010"; break;
        case "MD":   code = "011"; break;
        case "A":    code = "100"; break;
        case "AM":   code = "101"; break;
        case "AD":   code = "110"; break;
        case "AMD":  code = "111"; break;
    }

    return code
}

Code.prototype.jump = function (string) {
    let code

    switch (string) {
        case "null": code = "000"; break;
        case "JGT":  code = "001"; break;
        case "JEQ":  code = "010"; break;
        case "JGE":  code = "011"; break;
        case "JLT":  code = "100"; break;
        case "JNE":  code = "101"; break;
        case "JLE":  code = "110"; break;
        case "JMP":  code = "111"; break;
    }

    return code
}

// Manages the symbol table
function SymbolTable () {
    // add the default table
    let table = {}
}

// Synchronously read file
let fs = require('fs')
let readSource = 'D:/nand2tetris/projects/06/max/MaxL.asm'
// let filepath = process.argv[2]

// initializes the I/O files and write the data
let writeSource = 'D:/nand2tetris/projects/06/max/MaxL.hack'
let writeData = ''

// for first pass, filter comment lines and space, LABELs remained
let file = fs.readFileSync(readSource, 'utf8').split('\n').filter(function (val) {
    // filter out the comments and empty line
    return val.search(/^\/\/|^\s*$/)
})

// first pass

// for second pass, filter LABEL out
let secondPass = fs.readFileSync(readSource, 'utf8').split('\n').filter(function (val) {
    // filter out the comments and empty line
    return val.search(/^\/\/|^\s*|^\($/)
})

// second pass
file.forEach(function (val, index) {
    let parser = new Parse(val)
    let code = new Code()

    if ( parser.command().type === 'C' ) { // for C-command
        let c = parser.comp() // 'M+1'
        let d = parser.dest() // 'D'
        let j = parser.jump(); // 'JGT'

        let cc = code.comp(c); // '1110111'
        let dd = code.dest(d); // '010'
        let jj = code.jump(j); // '001'

        
        writeData += '111' + cc + dd + jj + '\n'
    } else if ( parser.command().type === 'A' ) { // for A-command
        // translate the decimal to binary
        let a = parseInt(parser.code.slice(1), 10).toString(2)
        
        // 补0
        let len = a.length
        if (len < 16) {
            for (let i = 0; i < 16 - len; i++) {
                a = '0' + a
            }
        }

        writeData += a + '\n'
    } else { // for LABEL
        
    }
})

fs.writeFileSync(writeSource, writeData, {'encoding':'utf8'})
