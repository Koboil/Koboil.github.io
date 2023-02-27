/**
 * Tic-Tac-Toe
 */

export default class TicTacToe {
	constructor({ node }) {
		this.node = node;
		this.buttons = this.node.querySelectorAll('[data-tic-tac-toe-button]');

		this.board = [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		];

		this.buttons.forEach((button, index) => {
			button.addEventListener('click', this.onClick.bind(this, index));
		});
	}

	onClick(index) {
		// console.log('XY :::', Math.floor(index / 3), index % 3);
		this.board[Math.floor(index / 3)][index % 3] = 'X';

		console.log(this.board);
	}
}
