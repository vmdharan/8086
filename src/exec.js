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

// Main program loop
function run8086() {
	
	// Fetch-Decode-Execute cycle
	while(true) {
		
		debugRegisters();
		
		console.log('[LOG] Increasing IP by 1');
		rIP = 0x0001;
		
		console.log('[LOG] Set the memory index 96 to have value 0x32.')
		ram8086[96] = 0x32;
		
		console.log('[LOG] Show memory index 96 in rAX and 97 in rBX.')
		rAX = ram8086[96];
		rBX = ram8086[97];
		
		debugRegisters();
		break;
	}
}

// Display the state of all registers for debugging.
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

