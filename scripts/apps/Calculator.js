/**
 * Calculator
 */

export default class Calculator {
	constructor({ node }) {
		this.node = node;

		this.screen = node.querySelector('[data-calculator-screen]');
		this.screenPrev = node.querySelector('[data-calculator-screen-prev]');

		this.reset = node.querySelector('[data-calculator-reset]');
		this.delete = node.querySelector('[data-calculator-delete]');
		this.equal = node.querySelector('[data-calculator-equal]');
		this.sign = node.querySelector('[data-calculator-sign]');
		this.operations = node.querySelectorAll('[data-calculator-operation]');
		this.numbers = node.querySelectorAll('[data-calculator-number]');

		this.str = '';

		// add mouse event listeners
		this.reset.addEventListener('click', this.onReset.bind(this));
		this.delete.addEventListener('click', this.onDelete.bind(this));
		this.equal.addEventListener('click', this.onEqual.bind(this));
		this.sign.addEventListener('click', this.addSign.bind(this));
		for (const operation of this.operations)
			operation.addEventListener('click', this.addOperation.bind(this));
		for (const number of this.numbers)
			number.addEventListener('click', this.addNumber.bind(this));
	}

	addOperation(e) {
		// don't allow adding operation on first click
		if (this.str.trim() === '') return;

		// don't allow adding operation after another
		if (
			this.str.slice(-1) == '+' ||
			this.str.slice(-1) == '-' ||
			this.str.slice(-1) == '*' ||
			this.str.slice(-1) == '/' ||
			this.str.slice(-1) == '%'
		)
			return;

		// add operation to screen string value
		this.str += e.target.getAttribute('data-calculator-operation');
		this.screen.value = this.str;
	}

	addNumber(e) {
		// clicked number
		const number = e.target.getAttribute('data-calculator-number');

		// don't allow zero & comma on first click
		if (this.str.trim() === '' && (number == '0' || number == '.')) {
			return;
		}

		// don't allow comma if is already added
		if (number == '.' && this.str.includes('.')) {
			return;
		}

		// add number to screen string value
		this.str += number;
		this.screen.value = this.str;
	}

	onEqual() {
		// don't allow if screen is empty
		if (this.str.trim() === '') return;

		// remove last character if it's operation
		if (
			this.str.slice(-1) == '+' ||
			this.str.slice(-1) == '-' ||
			this.str.slice(-1) == '*' ||
			this.str.slice(-1) == '/' ||
			this.str.slice(-1) == '%'
		)
			this.str = this.str.slice(0, -1);

		// set prev screen string value
		this.screenPrev.value = this.str;

		// evaluate & reset screen string value
		this.screen.value = eval(this.str);
		this.str = '';
	}

	addSign() {
		// remove minus sign
		if (this.str.charAt(0) == '-') {
			this.str = this.str.substring(1);
		}
		// add minus sign
		else {
			this.str = '-' + this.str;
		}

		this.screen.value = this.str;
	}

	onReset() {
		this.str = '';
		this.screen.value = '';
		this.screenPrev.value = '';
	}

	onDelete() {
		// don't allow if screen is empty
		if (this.str.trim() === '') return;

		// remove last character screen string value
		this.str = this.str.slice(0, -1);
		this.screen.value = this.str;
	}
}
