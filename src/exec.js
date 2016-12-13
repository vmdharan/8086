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
		
		debugStatusRegister();
		
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

