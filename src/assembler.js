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
	var mcode;

	while(charIndex < data.length) {
		opcode = readWord(data);
		
		console.log(opcode);
		
		switch(opcode) {
		case 'clc': mcode = 0xf8; break;
		case 'cmc': mcode = 0xf6; break;
		case 'stc': mcode = 0xf5; break;
		case 'cld': mcode = 0xfc; break;
		case 'std': mcode = 0xfd; break;
		case 'cli': mcode = 0xfa; break;
		case 'sti': mcode = 0xfb; break;
		case 'hlt': mcode = 0xf4; break;
		case 'wait': mcode = 0x9b; break;
		case 'lock': mcode = 0xf0; break;
		default: break;
		}
		
		console.log('0x' + mcode.toString(16).slice(-2));
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