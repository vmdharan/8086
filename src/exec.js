var cpu = '8086 test';

console.log(cpu);

/*
 * Registers
 */

// General purpose registers
var rAX = 0x0000;
var rBX = 0x0000;
var rCX = 0x0000;
var rDX = 0x0000;

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

// Program counter
var rPC = 0x0000;		// Instruction pointer

// Status register
var rST = 0x0000;



// Run program
run8086();


// Main program loop
function run8086() {
	
	// Fetch-Decode-Execute cycle
	while(true) {
		
		debugRegisters();
		
		rPC = 0x0001;
		
		debugRegisters();
		break;
	}
}

// Debugging
function debugRegisters() {
	console.log('--------------------');
	console.log('General purpose registers');
	console.log('rAX: 0x' + ('0000' + rAX.toString(16)).slice(-4));
	console.log('rBX: 0x' + ('0000' + rBX.toString(16)).slice(-4));
	console.log('rCX: 0x' + ('0000' + rCX.toString(16)).slice(-4));
	console.log('rDX: 0x' + ('0000' + rDX.toString(16)).slice(-4));
	console.log('--------------------');

	console.log('Index registers');
	console.log('rSI: 0x' + ('0000' + rSI.toString(16)).slice(-4));
	console.log('rDI: 0x' + ('0000' + rDI.toString(16)).slice(-4));
	console.log('rBP: 0x' + ('0000' + rBP.toString(16)).slice(-4));
	console.log('rSP: 0x' + ('0000' + rSP.toString(16)).slice(-4));
	console.log('--------------------');

	console.log('Segment registers');
	console.log('rCS: 0x' + ('0000' + rCS.toString(16)).slice(-4));
	console.log('rDS: 0x' + ('0000' + rDS.toString(16)).slice(-4));
	console.log('rES: 0x' + ('0000' + rES.toString(16)).slice(-4));
	console.log('rSS: 0x' + ('0000' + rSS.toString(16)).slice(-4));
	console.log('--------------------');

	console.log('Program counter');
	console.log('rPC: 0x' + ('0000' + rPC.toString(16)).slice(-4));
	console.log('--------------------');

	console.log('Status register');
	console.log('rST: 0x' + ('0000' + rST.toString(16)).slice(-4));
	console.log('--------------------');
}

