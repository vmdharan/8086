/*
 * assembler.js
 * Convert 8086 assembly to machine code.
 */

var asm = '8086 assembler';
console.log(asm);

var charIndex = 0;

fs = require('fs');

asm8086();



function asm8086() {
	this.srcFile = './data/8086test.dat';
	this.data = fs.readFileSync(this.srcFile, 'utf8');
	
	readData(this.data);
}

function readData(data) {
	var opcode;

	while(charIndex < data.length) {
		opcode = readWord(data);
		
		console.log(opcode);
	}
}

function readWord(data) {
	var opcode = '';
	
	for(var i = charIndex; i < data.length; i++) {
		if(data[i] == '\n') {
			break;
		}
		else if(data[i] == '\r') {
			continue;
		}
		else {
			opcode += data[i];
		}
	}
	
	charIndex = (i+1);
	
	return opcode;
}