export default class Auth {
	constructor({ node }) {
		this.node = node;

		this.registerForm = this.node.querySelector('[data-auth-register]');
		this.loginForm = this.node.querySelector('[data-auth-login]');

		this.init();

		this.registerForm.addEventListener('submit', this.onRegister.bind(this));
		this.loginForm.addEventListener('submit', this.onLogin.bind(this));
	}

	init() {
		const username = window.localStorage.getItem('auth.username');
		const password = window.localStorage.getItem('auth.password');

		if (username && password) {
			this.registerForm.style.display = 'none';
			this.loginForm.style.display = 'flex';
		} else {
			this.registerForm.style.display = 'flex';
			this.loginForm.style.display = 'none';
		}
	}

	onRegister(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const username = formData.get('username');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirm-password');

		// form validation
		if (!username || username.trim() === '')
			return alert('Username is required');
		if (!password || password.trim() === '')
			return alert('Password is required');
		if (!confirmPassword || confirmPassword.trim() === '')
			return alert('Password confirm is required');
		if (password !== confirmPassword) return alert("Passwords doesn't match");

		// register user
		window.localStorage.setItem('auth.username', username);
		window.localStorage.setItem('auth.password', username);

		// hide register form and show login form
		this.registerForm.style.display = 'none';
		this.loginForm.style.display = 'flex';
	}

	onLogin(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const username = formData.get('username');
		const password = formData.get('password');

		// form validation
		if (!username || username.trim() === '')
			return alert('Username is required');
		if (!password || password.trim() === '')
			return alert('Password is required');

		// check credentials
		if (
			username !== window.localStorage.getItem('auth.username') ||
			password !== window.localStorage.getItem('auth.password')
		) {
			return alert('Incorrect credentials');
		}

		// hide auth layer
		this.node.style.display = 'none';
	}
}
