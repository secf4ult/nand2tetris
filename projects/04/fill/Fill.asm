// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// initials
    @i
    M = 0 // i = 0

    @8192
    D = A
    @n
    M = D // n = 8192

// Scan the Keyboard for any input
(KEYSCAN)
    @KBD
    D = M
    @lastkey
    D = D - M
    @KEYSCAN
    D;JEQ // do nothing
    @BLACKINI
    D;JGT // blackens the screen
    @WHITEINI
    D;JLT // whitens the screen

(BLACKINI)
    @KBD
    D = M
    @lastkey
    M = D // remember the lastkey

    @i
    M = 0 // reset the i
(BLACK)
    @i
    D = M
    @n
    D = D - M
    @KEYSCAN
    D;JEQ // i >= n goto KEYSCAN again

    @SCREEN
    D = A
    @i
    A = D + M
    M = -1
    @i
    M = M + 1 // i++

    @BLACK
    0;JMP

(WHITEINI)
    @KBD
    D = M
    @lastkey
    M = D // remember the lastkey
    
    @i
    M = 0 // reset the i
(WHITE)
    @i
    D = M
    @n
    D = D - M
    @KEYSCAN
    D;JEQ // i >= n goto KEYSCAN again

    @SCREEN
    D = A
    @i
    A = D + M
    M = 0
    @i
    M = M + 1 // i++

    @WHITE
    0;JMP