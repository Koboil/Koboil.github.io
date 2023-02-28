import Auth from './layouts/Auth.js';
import Header from './layouts/Header.js';
import Window from './components/Window.js';
import Calculator from './apps/Calculator.js';
import TicTacToe from './apps/TicTacToe.js';
import Settings from './apps/Settings.js';
import Timer from './apps/Timer.js';
import Countdown from './apps/Countdown.js';

(function () {
	/**
	 * Auth
	 */

	const auth = new Auth({
		node: document.querySelector('[data-auth]'),
	});

	/**
	 * Header
	 */

	const header = new Header({
		node: document.querySelector('[data-header]'),
	});

	/**
	 * Calculator
	 */

	const calculator = new Calculator({
		node: document.querySelector('[data-calculator]'),
	});

	const calculatorWindow = new Window({
		node: document.querySelector("[data-window='calculator']"),
		width: 500,
		height: 400,
		resetCallback: function () {
			calculator.onReset();
		},
	});

	/**
	 * Tic-Tac-Toe
	 */

	const ticTacToe = new TicTacToe({
		node: document.querySelector('[data-tic-tac-toe]'),
	});

	const ticTacToeWindow = new Window({
		node: document.querySelector("[data-window='tic-tac-toe']"),
		width: 500,
		height: 400,
		resetCallback: function () {
			ticTacToe.onReset();
		},
	});

	/**
	 * Settings
	 */

	const settings = new Settings({
		node: document.querySelector('[data-settings]'),
		header,
	});

	const settingsWindow = new Window({
		node: document.querySelector("[data-window='settings']"),
		width: 500,
		height: 400,
		resetCallback: function () {},
	});

	/**
	 * Timer
	 */

	const timer = new Timer({
		node: document.querySelector('[data-timer]'),
	});

	const timerWindow = new Window({
		node: document.querySelector("[data-window='timer']"),
		width: 250,
		height: 150,
		resetCallback: function () {
			timer.onReset();
		},
	});

	/**
	 * Countdown
	 */

	const countdown = new Countdown({
		node: document.querySelector('[data-countdown]'),
	});

	const countdownWindow = new Window({
		node: document.querySelector("[data-window='countdown']"),
		width: 250,
		height: 300,
		resetCallback: function () {
			countdown.onReset();
		},
	});
})();
