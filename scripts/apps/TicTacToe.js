/**
 * Constants
 */

const FIRST_PLAYER = 'X';

/**
 * Tic-Tac-Toe
 */

export default class TicTacToe {
	constructor({ node }) {
		this.node = node;
		this.banner = this.node.querySelector('[data-tic-tac-toe-banner]');
		this.winnerHeading = this.node.querySelector('[data-tic-tac-toe-winner]');
		this.resetButton = this.node.querySelector('[data-tic-tac-toe-reset]');
		this.buttons = this.node.querySelectorAll('[data-tic-tac-toe-button]');

		this.winner = null;
		this.currentPlayer = FIRST_PLAYER;
		this.board = [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		];

		this.resetButton.addEventListener('click', this.onReset.bind(this));
		this.buttons.forEach((button) => {
			button.addEventListener('click', this.onButtonClick.bind(this));
		});
	}

	onButtonClick(e) {
		const clickedPosition = e.target.getAttribute('data-tic-tac-toe-button');
		const [x, y] = clickedPosition.split('.').map((v) => parseInt(v, 10));
		this.play({ x, y });
	}

	play({ x, y }) {
		if (!!this.board[x][y] || !!this.winner) return;

		this.board[x][y] = this.currentPlayer;
		for (const button of this.buttons) {
			if (button.getAttribute('data-tic-tac-toe-button') === `${x}.${y}`) {
				button.textContent = this.currentPlayer;
				break;
			}
		}
		this.checkWin();
		this.changePlayer();
	}

	changePlayer() {
		this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
	}

	checkWin() {
		// check horizontal
		for (let i = 0; i < this.board.length; i++) {
			if (
				!!this.board[i][0] &&
				this.board[i][0] === this.board[i][1] &&
				this.board[i][0] === this.board[i][2]
			) {
				this.winner = this.currentPlayer;
				this.showWinner();
			}
		}

		// check vertical
		for (let i = 0; i < this.board.length; i++) {
			if (
				!!this.board[0][i] &&
				this.board[0][i] === this.board[1][i] &&
				this.board[0][i] === this.board[2][i]
			) {
				this.winner = this.currentPlayer;
				this.showWinner();
			}
		}

		// check first diagonal
		if (
			!!this.board[0][0] &&
			this.board[0][0] === this.board[1][1] &&
			this.board[0][0] === this.board[2][2]
		) {
			this.winner = this.currentPlayer;
			this.showWinner();
		}

		// check second diagonal
		if (
			!!this.board[0][2] &&
			this.board[0][2] === this.board[1][1] &&
			this.board[0][2] === this.board[2][0]
		) {
			this.winner = this.currentPlayer;
			this.showWinner();
		}
		// check for tie
		let boardFilled = true;
		for (let i = 0; i < this.board.length; i++) {
			for (let j = 0; j < this.board[i].length; j++) {
				if (!this.board[i][j]) {
					boardFilled = false;
					break;
				}
			}
		}
		if (boardFilled && !this.winner) {
			this.winner = 'Nobody !';
			this.showWinner();
		}
	}

	showWinner() {
		this.winnerHeading.textContent = `Winner is : ${this.winner}`;
		this.banner.style.display = 'flex';
	}

	onReset() {
		// reset board
		this.board = [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		];

		// reset states
		this.winner = null;
		this.currentPlayer = FIRST_PLAYER;

		// reset view
		for (const button of this.buttons) {
			button.textContent = '';
		}
		this.banner.style.display = 'none';
	}
}
