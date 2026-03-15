
# Basic CPU Brainstorm & Roadmap

## Initial thoughts

The initial thoughts on this project is to have a very simple CPU design, which would only have a few instructions: Read, Write, Add, Jump.

With this four instructions the following could be created:
- Multiplication, substracter and division functions
- With those more compelx mathematical expressions could be created.

With these basics simple simulations could be done, such as Sand simulations. 

The base design would be a really simple one, with the following components only:
- Memory
- Instruction decoder
- Instruction counter register (PC)
- Register bank
- Adder module

With those, a really sturdy & basic module could be made. Enabling the setup for future optimizations.

### Elements

A more accurate description fo all the elements.

#### Register bank

To have plenty of space, I think it will make sense to have 64 (2^6) 8 bit signed integers registers.
To have a same-size instruction set, I have decided that from those 64, 4 will be reserved for outputs (can be used, but at least one of them will for sure be used from add outputs).

#### Memory

The memory, it would make sense for it to be quite big, so maybe having 256 (2^8) spaces of 8bit signed integers is enough for now.

### Instruction Register

Another 256 (2^8) will be reserved for Instructions.

### Instructions

The initial instruction set would be:
- NOP (nop: 00b) [2b]
- Add [a] [b] [to] (add: 01b | a: register [6b] | b: register [6b] | to: specific outputs 4 registers [2b]) [16b | 2B]
- Read [from] [to] (read: 10b | from: memory [8b] | to: register [6b]) [16b | 2B]
- Write [from] [to] (write: 11b | from: register [6b] | to: memory [8b]) [16b | 2B]


## Future work

Once the initial thoughts are implemented, here are some future work that could be done.

### Screen
Some space of the disk could be reserved for a small "screen" (for example of 16x16, initially), which would show only grayscale values, reading values from the disk from 0-255 (signed 8 bit int ¿?) or more.

#### Mouse & periferics
with that made, a mouse could be emulated, storing the mouse position in a reserved disk address. That could be moved with some kind of "arrows" (irl) and be moved in the screen, letting the user make things such as placing sand grains.

### In-web "IDE"

A in-web instruction editor could be implemented, having validators and "compilers" (not compiling, but checking format)