// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

    @R0
    D = M
    @base
    M = D // base = RAM[0]

    @R1
    D = M
    @n
    M = D // n = RAM[1]

    @i
    M = 0 // i = 0

    @R2
    M = 0 // initial R2 = 0

(LOOP)
    @i
    D = M
    @n
    D = D - M
    @END
    D;JEQ // if i > n goto END

    @base
    D = M
    @R2
    M = M + D // sum = sum + base
    @i
    M = M + 1
    @LOOP
    0;JMP // goto LOOP

(END)
    @END
    0;JMP