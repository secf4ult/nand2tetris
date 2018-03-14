function Parser() {
    // Opens the input file/stream and gets ready to parse it
    //constructor(input)

    // Are there more commands in the input?
    function hasMoreCommands() {

        return boolean;
    }

    // Read the next command and makes it the current command
    // Called only if hasMoreCommands() is true
    // Initially there is no current command
    function advance() {

    }

    // Returns a constant representing the type of the current command.
    // C_ARITHMETIC is returned for all the arithmetic/logical commands
    function commandType() {
        let type = ['C_ARITHMETIC', 'C_PUSH', 'C_POP', 'C_LABEL',
        'C_GOTO', 'C_IF', 'C_FUNCTION', 'C_RETURN', 'C_CALL'];

        //return type;
    }

    // Returns the first argument of the current command.
    // In the case of C_ARITHMETIC, the command itself (add, sub, etc.) is returned.
    // Should not be called if the current command is C_RETURN.
    function arg1() {
        // return string
    }

    // Returns the second argument of the current command. 
    // Should be called only if the current command is C_PUSH, C_POP,
    // C_FUNCTION or C_CALL
    function arg2() {
        // return int
    }
}

function CodeWriter() {
    // Opens the output file/stream and gets ready to write into it.
    // constructor(outputfile)

    // Writes to the output file the assembly code that implements the given
    // arithmetic command
    function writeArithmetic(commandstring) {

    }

    // Writes to the output file the assembly code that implements the given commands,
    // where command is either C_PUSH or C_POP
    function writePushPop() { // arg command(C_PUSH or C_POP), segment(string), index(int)

    }

    // Closes the output file
    function close() {

    }
}

function Main(filePath) {

}