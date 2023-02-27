class Header {
	constructor({ node }) {
		this.node = node;

		this.activity = this.node.querySelector('[data-header-activity]');
		this.time = this.node.querySelector('[data-header-time]');
		this.settings = this.node.querySelector('[data-header-settings]');

		this.init();
		window.setInterval(() => {
			this.initTime();
		}, 1000);
	}

	init() {
		this.activity.textContent = 'TEST';
		this.settings.textContent = 'TEST';
	}

	initTime() {
		const time = new Intl.DateTimeFormat('fr-FR', {
			dateStyle: 'full',
			timeStyle: 'long',
			timeZone: 'Europe/Paris',
		}).format(new Date());
		this.time.textContent = time;
	}
}

export default Header;
