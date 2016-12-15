// exec.js
// Entry point for the 8086 emulator.

// Display a simple message to test.
var cpu = '8086 test';
console.log(cpu);

/*
 * Registers
 * 4 x 16-bit general purpose registers (AX, BX, CX and DX), which are also 
 * accessible as 8 x 8-bit registers (AH-AL, BH-BL, CH-CL, DH-DL).
 * 4 x 16-bit index registers (SI, DI, BP and SP).
 * 4 x 16-bit segment registers (CS, DS, ES and SS).
 * 1 x 16-bit instruction pointer register.
 * 1 x 16-bit status / flags register.
 */

// General purpose registers
var rAX = 0x0000;		// Accumulator
var rBX = 0x0000;		// Base
var rCX = 0x0000;		// Count
var rDX = 0x0000;		// Data

// Index registers
var rSI = 0x0000;		// Source Index
var rDI = 0x0000;		// Destination Index
var rBP = 0x0000;		// Base Pointer
var rSP = 0x0000;		// Stack Pointer

// Segment registers
var rCS = 0x0000;		// Code Segment
var rDS = 0x0000;		// Data Segment
var rES = 0x0000;		// Extra Segment
var rSS = 0x0000;		// Stack Segment

//Instruction pointer
var rIP = 0x0000;

/*
 * Status register
 * 3 x Control flags (TF, DF and IF)
 * 6 x Status flags (OF, SF, ZF, AF, PF and CF)
 * TF - Trap
 * DF - Direction
 * IF - Interrupt enable
 * OF - Overflow
 * SF - Sign
 * ZF - Zero
 * AF - Auxiliary carry
 * PF - Parity
 * CF - Carry
 */
var rST = 0x0000;

/*
 * Memory
 * The 8086 can address up to 1MB of RAM.
 */
var I8086_MEMORY_SIZE = 0x100000;
var ram8086 = new Array(I8086_MEMORY_SIZE).fill(0xff);


// Run program
run8086();

// Fetch-Decode-Execute cycle
function run8086() {
	
	// Uncomment for testing.
	//runTest1();
	
	// Get the first instruction.
	var instruction = ram8086[rIP];
	
	while(true) {
		
		// Decode and execute the instruction.
		decode(instruction);
		
		// Fetch the next instruction from memory.
		instruction = ram8086[rIP];
	}
}

/*
 * Mod-Reg-RM
 */
function modRegRM(w) {
	var mod, reg, rm;
	var oper;
	
	// Get the byte containing mod-reg-rm.
	var mrr = ram8086[rIP+1];
	
	/*
	 * Mod - Displacement
	 * 00 - DISP = 0*, disp-low and disp-high are absent.
	 * 01 - DISP = disp-low sign-extended to 16 bits, disp-high is absent.
	 * 10 - DISP = disp-high : disp-low (16-bit displacement).
	 * 11 - r/m is treated as a "reg" field.
	 */
	mod = (mrr & 0xC0) >> 6;
	
	/*
	 * Reg field bit assignments
	 * Bits - 16bit (w=1) - 8bit (w=0)
	 * 000 - AX - AL
	 * 001 - CX - CL
	 * 010 - DX - DL
	 * 011 - BX - BL
	 * 100 - SP - AH
	 * 101 - BP - CH
	 * 110 - SI - DH
	 * 111 - DI - BH
	 */
	reg = (mrr & 0x38) >> 3;
	
	if (w == 1) {
		switch (reg) {
		case 0x00: oper = 'AX'; break;
		case 0x01: oper = 'CX'; break;
		case 0x02: oper = 'DX'; break;
		case 0x03: oper = 'BX'; break;
		case 0x04: oper = 'SP'; break;
		case 0x05: oper = 'BP'; break;
		case 0x06: oper = 'SI'; break;
		case 0x07: oper = 'DI'; break;
		default: break;
		}
	} else if (w == 0) {
		switch (reg) {
		case 0x00: oper = 'AL'; break;
		case 0x01: oper = 'CL'; break;
		case 0x02: oper = 'DL'; break;
		case 0x03: oper = 'BL'; break;
		case 0x04: oper = 'AH'; break;
		case 0x05: oper = 'CH'; break;
		case 0x06: oper = 'DH'; break;
		case 0x07: oper = 'BH'; break;
		default: break;
		}
	}
	
	/*
	 * r/m - Operand address
	 * 000 - (BX) + (SI) + DISP
	 * 001 - (BX) + (DI) + DISP
	 * 010 - (BP) + (SI) + DISP
	 * 011 - (BP) + (DI) + DISP
	 * 100 - (SI) + DISP
	 * 101 - (DI) + DISP
	 * 110 - (BP) + DISP*
	 * 111 - (BX) + DISP
	 */
	rm = (mrr & 0x07);
	
	/* If mod=00 and rm=110, then offset address is contained in 
	 * two additional bytes.
	 */
	switch (rm) {
	case 0x00: oper2 = 'BX + SI + DISP'; break;
	case 0x01: oper2 = 'BX + DI + DISP'; break;
	case 0x02: oper2 = 'BP + SI + DISP'; break;
	case 0x03: oper2 = 'BP + DI + DISP'; break;
	case 0x04: oper2 = 'SI + DISP'; break;
	case 0x05: oper2 = 'DI + DISP'; break;
	case 0x06: oper2 = 'BP + DISP'; break;
	case 0x07: oper2 = 'BX + DISP'; break;
	default: break;
	}
}

// Process the opcodes.
function decode(instruction) {
	
	switch (instruction) {
	
	/*
	 * Data Transfer
	 */
	
	// MOV - Move
	// Register/memory to/from register.
	case 0x88:
		break;
	case 0x89:
		break;
	case 0x8A:
		break;
	case 0x8B:
		break;

	// Immediate to register/memory.
	case 0xC6:
		break;
	case 0xC7:
		break;

	// Immediate to register.
	case 0xB0:
		break;
	case 0xB1:
		break;
	case 0xB2:
		break;
	case 0xB3:
		break;
	case 0xB4:
		break;
	case 0xB5:
		break;
	case 0xB6:
		break;
	case 0xB7:
		break;
	case 0xB8:
		break;
	case 0xB9:
		break;
	case 0xBA:
		break;
	case 0xBB:
		break;
	case 0xBC:
		break;
	case 0xBD:
		break;
	case 0xBE:
		break;
	case 0xBF:
		break;

	// Memory to accumulator.
	// Single byte
	case 0xA0:  
		break;
	// Two bytes
	case 0xA1: 
		break;

	// Accumulator to memory.
	case 0xA2:
		break;
	case 0xA3:
		break;

	// Register/memory to segment register.
	case 0x87:
		break;

	// Segment register to register/memory.
	case 0x8C:
		break;

	// PUSH - Push.
	// Register/memory.
	case 0xFF:
		break;

	// Register.
	case 0x50:
		break;
	case 0x51:
		break;
	case 0x52:
		break;
	case 0x53:
		break;
	case 0x54:
		break;
	case 0x55:
		break;
	case 0x56:
		break;
	case 0x57:
		break;

	// Segment register.
	case 0x06:
		break;
	case 0x07:
		break;
	case 0x16:
		break;
	case 0x17:
		break;

	// POP - Pop.
	// Register/memory.
	case 0x8F:
		break;

	// Register.
	case 0x58:
		break;
	case 0x59:
		break;
	case 0x5A:
		break;
	case 0x5B:
		break;
	case 0x5C:
		break;
	case 0x5D:
		break;
	case 0x5E:
		break;
	case 0x5F:
		break;

	// Segment register.
	//case 0x07:  break;
	case 0x0F:
		break;
	//case 0x17:  break;
	case 0x1F:
		break;

	// XCHNG - Exchange.
	// Register/memory with register.
	case 0x86:
		break;
	//case 0x87:  break;

	// Register with accumulator.

	// Special case when register is Accumulator - NOOP instruction
	case 0x90:
		break;

	case 0x91:
		break;
	case 0x92:
		break;
	case 0x93:
		break;
	case 0x94:
		break;
	case 0x95:
		break;
	case 0x96:
		break;
	case 0x97:
		break;

	// IN - Input to AL/AX from
	// Fixed port.
	case 0xE4:
		break;
	case 0xE5:
		break;

	// Variable port (DX).
	case 0xEC:
		break;
	case 0xED:
		break;

	// OUT - Output from AL/AX to
	// Fixed port.
	case 0xE6:
		break;
	case 0xE7:
		break;

	// Variable port (DX).
	case 0xEE:
		break;
	case 0xEF:
		break;

	// XLAT - Translate byte to AL.
	case 0xD7:
		break;

	// LEA - Load EA to register.
	case 0x8D:
		break;

	// LDS - Load pointer to DS.
	case 0xC5:
		break;

	// LES - Load pointer to ES.
	case 0xC4:
		break;

	// LAHF - Load AH with flags.
	case 0x9F:
		break;

	// SAHF - Store AH into flags.
	case 0x9E:
		break;

	// PUSHF - Push flags.
	case 0x9C:
		break;

	// POPF - Pop flags.
	case 0x9D:
		break;


	/*
	 * Arithmetic
	 */

	// ADD - Add
	// Register/memory with register to either.
	case 0x00:
		break;
	case 0x01:
		break;
	case 0x02:
		break;
	case 0x03:
		break;

	// Immediate to register/memory.
	case 0x80:
		break;
	case 0x81:
		break;
	case 0x82:
		break;
	case 0x83:
		break;

	// Immediate to accumulator.
	case 0x04:
		break;
	case 0x05:
		break;

	// ADC - Add with carry
	// Register/memory with register to either.
	case 0x10:
		break;
	case 0x11:
		break;
	case 0x12:
		break;
	case 0x13:
		break;

	// Immediate to register/memory.
	/*case 0x80:
		break;
	case 0x81:
		break;
	case 0x82:
		break;
	case 0x83:
		break;
	*/

	// Immediate to accumulator.
	case 0x14:
		break;
	case 0x15:
		break;

	// INC - Increment
	// Register/memory
	case 0xFE:
		break;
	/*case 0xFF:
		break;
	*/

	// Register
	case 0x40:
		break;
	case 0x41:
		break;
	case 0x42:
		break;
	case 0x43:
		break;
	case 0x44:
		break;
	case 0x45:
		break;
	case 0x46:
		break;
	case 0x47:
		break;

	// AAA - ASCII adjust for add
	case 0x37:
		break;

	// DAA - Decimal adjust for add
	case 0x27:
		break;

	// SUB - Subtract
	// Register/memory and register to either.
	case 0x28:
		break;
	case 0x29:
		break;
	case 0x2A:
		break;
	case 0x2B:
		break;

	// Immediate from register/memory.
	/*case 0x80:
		break;
	case 0x81:
		break;
	case 0x82:
		break;
	case 0x83:
		break;
	*/

	// Immediate from accumulator.
	case 0x2C:
		break;
	case 0x2D:
		break;

	// SBB - Subtract with borrow.
	// Register/memory and register to either.
	case 0x18:
		break;
	case 0x19:
		break;
	case 0x1A:
		break;
	case 0x1B:
		break;

	// Immediate from register/memory.
	/*case 0x80:
		break;
	case 0x81:
		break;
	case 0x82:
		break;
	case 0x83:
		break;
	*/

	// Immediate from accumulator
	case 0x1C:
		break;
	case 0x1D:
		break;

	// DEC - Decrement
	// Register/memory.
	/*case 0xFE:
		break;
	case 0xFF:
		break;
	*/

	// Register.
	case 0x48:
		break;
	case 0x49:
		break;
	case 0x4A:
		break;
	case 0x4B:
		break;
	case 0x4C:
		break;
	case 0x4D:
		break;
	case 0x4E:
		break;
	case 0x4F:
		break;

	// NEG - Change sign
	case 0xF6:
		break;
	case 0xF7:
		break;

	// CMP - Compare
	// Register/memory and register.
	case 0x38:
		break;
	case 0x39:
		break;
	case 0x3A:
		break;
	case 0x3B:
		break;

	// Immediate with register/memory.
	/*case 0x80:
		break;
	case 0x81:
		break;
	case 0x82:
		break;
	case 0x83:
		break;
	*/

	// Immediate with accumulator.
	case 0x3C:
		break;
	case 0x3D:
		break;

	// AAS - ASCII adjust for subtract.
	case 0x3F:
		break;

	// DAS - Decimal adjust for subtract.
	case 0x2F:
		break;

	// MUL - Multiply (unsigned)
	/*case 0xF6:
		break;
	case 0xF7:
		break;
	*/

	// IMUL - Integer multiply (signed)
	/*case 0xF6:
		break;
	case 0xF7:
		break;
	*/

	// AAM - ASCII adjust for multiply.
	case 0xD4:
		break;

	// DIV - Divide (unsigned)
	/*case 0xF6:
		break;
	case 0xF7:
		break;
	*/

	// IDIV - Integer divide (signed)
	/*case 0xF6:
		break;
	case 0xF7:
		break;
	*/

	// AAD - ASCII adjust for divide.
	case 0xD5:
		break;

	// CBW - Convert byte to word.
	case 0x98:
		break;

	// CWD - Convert word to double word.
	case 0x99:
		break;


	/*
	 * Logic
	 */

	// NOT - Invert
	/*case 0xF6:
		break;
	case 0xF7:
		break;
	*/

	// SHL/SAL - Shift logical/arithmetic left.
	case 0xD0:
		break;
	case 0xD1:
		break;
	case 0xD2:
		break;
	case 0xD3:
		break;

	// SHR - Shift logical right.
	/*case 0xD0:
		break;
	case 0xD1:
		break;
	case 0xD2:
		break;
	case 0xD3:
		break;
	*/

	// SAR - Shift arithmetic right.
	/*case 0xD0:
		break;
	case 0xD1:
		break;
	case 0xD2:
		break;
	case 0xD3:
		break;
	*/

	// ROL - Rotate left.
	/*case 0xD0:
		break;
	case 0xD1:
		break;
	case 0xD2:
		break;
	case 0xD3:
		break;
	*/

	// ROR - Rotate right.
	/*case 0xD0:
		break;
	case 0xD1:
		break;
	case 0xD2:
		break;
	case 0xD3:
		break;
	*/

	// RCL - Rotate through carry left.
	/*case 0xD0:
		break;
	case 0xD1:
		break;
	case 0xD2:
		break;
	case 0xD3:
		break;
	*/

	// RCR - Rotate through carry right.
	/*case 0xD0:
		break;
	case 0xD1:
		break;
	case 0xD2:
		break;
	case 0xD3:
		break;
	*/

	// AND - And.
	// Register/memory and register to either.
	case 0x20:
		break;
	case 0x21:
		break;
	case 0x22:
		break;
	case 0x23:
		break;

	// Immediate to register/memory.
	/*case 0x80:
		break;
	case 0x81:
		break;
	*/

	// Immediate to accumulator.
	case 0x24:
		break;
	case 0x25:
		break;

	// TEST - Add function to flags, no result.
	// Register/memory and register.
	case 0x84:
		break;
	case 0x85:
		break;

	// Immediate data and register/memory.
	/*case 0xF6:
		break;
	case 0xF7:
		break;
	*/

	// Immediate data and accumulator.
	case 0xA8:
		break;
	case 0xA9:
		break;

	// OR - Or.
	// Register/memory and register to either.
	case 0x08:
		break;
	case 0x09:
		break;
	case 0x0A:
		break;
	case 0x0B:
		break;

	// Immediate to register/memory.
	/*case 0x80:
		break;
	case 0x81:
		break;
	*/

	// Immediate to accumulator.
	case 0x0C:
		break;
	case 0x0D:
		break;

	// XOR - Exclusive or.
	// Register/memory and register to either.
	case 0x30:
		break;
	case 0x31:
		break;
	case 0x32:
		break;
	case 0x33:
		break;

	// Immediate to register/memory.
	/*case 0x80:
		break;
	case 0x81:
		break;
	*/

	// Immediate to accumulator.
	case 0x34:
		break;
	case 0x35:
		break;


	/*
	 * String manipulation
	 */

	// REP - Repeat.
	case 0xF2:
		break;
	case 0xF3:
		break;

	// MOVS - Move String.
	case 0xA4:
		break;
	case 0xA5:
		break;

	// CMPS - Compare String.
	case 0xA6:
		break;
	case 0xA7:
		break;

	// SCAS - Scan String.
	case 0xAE:
		break;
	case 0xAF:
		break;

	// LODS - Load String.
	case 0xAC:
		break;
	case 0xAD:
		break;

	// STOS - Store String.
	case 0xAA:
		break;
	case 0xAB:
		break;


	/*
	 * Control Transfer
	 */

	// CALL - Call.
	// Direct within segment.
	case 0xE8:
		break;

	// Indirect within segment.
	/*case 0xFF:
		break;
	*/

	// Direct intersegment.
	case 0x9A:
		break;

	// Indirect intersegment.
	/*case 0xFF:
		break;
	*/

	// JMP - Unconditional Jump.
	// Direct within segment.
	case 0xE9:
		break;

	// Direct within segment-short.
	case 0xEB:
		break;

	// Indirect within segment.
	/*case 0xFF:
		break;
	*/

	// Direct intersegment.
	case 0xEA:
		break;

	// Indirect intersegment.
	/*case 0xFF:
		break;
	*/

	// RET - Return from CALL.
	// Within segment.
	case 0xC3:
		break;

	// Within segment adding immediate to SP.
	case 0xC2:
		break;

	// Intersegment.
	case 0xCB:
		break;

	// Intersegment, adding immediate to SP.
	case 0xCA:
		break;

	// JE/JZ - Jump on equal/zero.
	case 0x74:
		break;

	// JL/JNGE - Jump on less/not greater or equal.
	case 0x7C:
		break;

	// JLE/JNG - Jump on less or equal/not greater.
	case 0x7E:
		break;

	// JB/JNAE - Jump on below/not above or equal.
	case 0x72:
		break;

	// JBE/JNA - Jump on below or equal/not above.
	case 0x76:
		break;

	// JP/JPE - Jump on parity/parity even.
	case 0x7A:
		break;

	// JO - Jump on overflow.
	case 0x70:
		break;

	// JS - Jump on sign.
	case 0x78:
		break;

	// JNE/JNZ - Jump on not equal/not zero.
	case 0x75:
		break;

	// JNL/JGE - Jump on not less/greater or equal.
	case 0x7D:
		break;

	// JNLE/JG - Jump on not less or equal/greater.
	case 0x7F:
		break;

	// JNB/JAE - Jump on not below/above or equal.
	case 0x73:
		break;

	// JNBE/JA - Jump on not below or equal/above.
	case 0x77:
		break;

	// JNP/JPO - Jump on not parity/parity odd.
	case 0x7B:
		break;

	// JNO - Jump on not overflow.
	case 0x71:
		break;

	// JNS - Jump on not sign.
	case 0x79:
		break;

	// LOOP - Loop CX times.
	case 0xE2:
		break;

	// LOOPZ/LOOPE - Loop while zero/equal.
	case 0xE1:
		break;

	// LOOPNZ/LOOPNE - Loop while not zero/not equal.
	case 0xE0:
		break;

	// JCXZ - Jump on CX zero.
	case 0xE3:
		break;

	// INT - Interrupt.
	// Type specified.
	case 0xCD:
		break;

	// Type 3.
	case 0xCC:
		break;

	// INTO - Interrupt on overflow.
	case 0xCE:
		break;

	// IRET - Interrupt return.
	case 0xCF:
		break;


	/*
	 * Processor Control
	 */

	//CLC - Clear carry
	case 0xF8:  setFlag('CF', 0);
		break;

	// CMC - Complement carry
	case 0xF5:
		break;

	// CLD - Clear direction
	case 0xFC:  setFlag('DF', 0);
		break;

	// CLI - Clear interrupt
	case 0xFA:  setFlag('IF', 0);
		break;

	// HLT - Halt
	case 0xF4:
		break;

	// LOCK - Bus lock prefix
	case 0xF0:
		break;

	// STC - Set carry
	case 0xF9:  setFlag('CF', 1);
		break;

	// NOP - No operation
	/*case 0x90:
		break;
	*/

	// STD - Set direction
	case 0xFD:  setFlag('DF', 1);
		break;

	// STI - Set Interrupt
	case 0xFB:  setFlag('IF', 1);
		break;

	// WAIT - Wait
	case 0x9B:
		break;

	// ESC - Escape (to external device)
	case 0xD8:
		break;
	case 0xD9:
		break;
	case 0xDA:
		break;
	case 0xDB:
		break;
	case 0xDC:
		break;
	case 0xDD:
		break;
	case 0xDE:
		break;
	case 0xDF:
		break;

	default:
		break;

	}
}

// Return the value of the flag provided as the parameter.
function getFlag(varFL) {
	var retVal = varFL;
	
	switch (varFL) {
	case 'OF': retVal = ((rST & 0x0800) >> 11); break;
	case 'DF': retVal = ((rST & 0x0400) >> 10); break;
	case 'IF': retVal = ((rST & 0x0200) >> 9); break;
	case 'TF': retVal = ((rST & 0x0100) >> 8); break;
	case 'SF': retVal = ((rST & 0x0080) >> 7); break;
	case 'ZF': retVal = ((rST & 0x0040) >> 6); break;
	case 'AF': retVal = ((rST & 0x0010) >> 4); break;
	case 'PF': retVal = ((rST & 0x0004) >> 2); break;
	case 'CF': retVal = (rST & 0x0001); break;
	default: retVal = (rST & 0x0000); break;
	}
	
	return retVal;
}

// Set the value of the flag provided as the parameter.
function setFlag(varFL, val) {
	// If this is a set operation, then perform a boolean OR operation 
	// with the status register 
	if(val == 1) {
		switch (varFL) {
		case 'OF': rST = rST | ((val << 11) & 0x0800); break;
		case 'DF': rST = rST | ((val << 10) & 0x0400); break;
		case 'IF': rST = rST | ((val << 9) & 0x0200); break;
		case 'TF': rST = rST | ((val << 8) & 0x0100); break;
		case 'SF': rST = rST | ((val << 7) & 0x0080); break;
		case 'ZF': rST = rST | ((val << 6) & 0x0040); break;
		case 'AF': rST = rST | ((val << 4) & 0x0010); break;
		case 'PF': rST = rST | ((val << 2) & 0x0004); break;
		case 'CF': rST = rST | (val & 0x0001); break;
		default: break;
		}
	}
	// If this is a reset operation, then zero out the flag.
	else {
		switch (varFL) {
		case 'OF': rST = rST & 0xa7ff; break;
		case 'DF': rST = rST & 0xfbff; break;
		case 'IF': rST = rST & 0xfdff; break;
		case 'TF': rST = rST & 0xfeff; break;
		case 'SF': rST = rST & 0xff7f; break;
		case 'ZF': rST = rST & 0xffbf; break;
		case 'AF': rST = rST & 0xffef; break;
		case 'PF': rST = rST & 0xfffb; break;
		case 'CF': rST = rST & 0xfffe; break;
		default: break;
		}
	}
}

function runTest1() {
	debugRegisters();
	
	console.log('[LOG] Increasing IP by 1');
	rIP = 0x0001;
	
	console.log('[LOG] Set the memory index 96 to have value 0x32.')
	ram8086[96] = 0x32;
	
	console.log('[LOG] Show memory index 96 in rAX and 97 in rBX.')
	rAX = ram8086[96];
	rBX = ram8086[97];
	
	debugRegisters();
	debugStatusRegister();
}

//Display the state of all registers for debugging.
function debugRegisters() {
	
	var rAX_str = 'rAX: 0x' + ('0000' + rAX.toString(16)).slice(-4);
	var rBX_str = 'rBX: 0x' + ('0000' + rBX.toString(16)).slice(-4);
	var rCX_str = 'rCX: 0x' + ('0000' + rCX.toString(16)).slice(-4);
	var rDX_str = 'rDX: 0x' + ('0000' + rDX.toString(16)).slice(-4);
	
	var rSI_str = 'rSI: 0x' + ('0000' + rSI.toString(16)).slice(-4);
	var rDI_str = 'rDI: 0x' + ('0000' + rDI.toString(16)).slice(-4);
	var rBP_str = 'rBP: 0x' + ('0000' + rBP.toString(16)).slice(-4);
	var rSP_str = 'rSP: 0x' + ('0000' + rSP.toString(16)).slice(-4);
	
	var rCS_str = 'rCS: 0x' + ('0000' + rCS.toString(16)).slice(-4);
	var rDS_str = 'rDS: 0x' + ('0000' + rDS.toString(16)).slice(-4);
	var rES_str = 'rES: 0x' + ('0000' + rES.toString(16)).slice(-4);
	var rSS_str = 'rSS: 0x' + ('0000' + rSS.toString(16)).slice(-4);
	
	var rIP_str = 'rIP: 0x' + ('0000' + rIP.toString(16)).slice(-4);
	var rST_str = 'rST: 0x' + ('0000' + rST.toString(16)).slice(-4);
	
	console.log('--------------------');
	console.log(rAX_str + ' ' + rBX_str + ' ' + rCX_str + ' ' + rDX_str);
	console.log(rSI_str + ' ' + rDI_str + ' ' + rBP_str + ' ' + rSP_str);
	console.log(rCS_str + ' ' + rDS_str + ' ' + rES_str + ' ' + rSS_str);
	console.log(rIP_str + ' ' + rST_str);
	console.log('--------------------');
}

// Test the status register.
function debugStatusRegister() {
	console.log('[LOG] Running tests on status register.')
	console.log('--------------------');
	
	console.log('[LOG] Set OF');
	setFlag('OF', 1);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Set DF');
	setFlag('DF', 1);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Set IF');
	setFlag('IF', 1);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Set TF');
	setFlag('TF', 1);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Set SF');
	setFlag('SF', 1);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Set ZF');
	setFlag('ZF', 1);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Set AF');
	setFlag('AF', 1);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Set PF');
	setFlag('PF', 1);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Set CF');
	setFlag('CF', 1);
	console.log(getStatusRegisterString());
	
	console.log('--------------------');
	
	console.log('[LOG] Reset OF');
	setFlag('OF', 0);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Reset DF');
	setFlag('DF', 0);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Reset IF');
	setFlag('IF', 0);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Reset TF');
	setFlag('TF', 0);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Reset SF');
	setFlag('SF', 0);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Reset ZF');
	setFlag('ZF', 0);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Reset AF');
	setFlag('AF', 0);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Reset PF');
	setFlag('PF', 0);
	console.log(getStatusRegisterString());
	
	console.log('[LOG] Reset CF');
	setFlag('CF', 0);
	console.log(getStatusRegisterString());

	console.log('--------------------');
}

function getStatusRegisterString() {
	return 'rST: 0x' + ('0000' + rST.toString(16)).slice(-4);
}

