class Header {
	constructor({ node }) {
		this.node = node;

		this.activity = this.node.querySelector('[data-header-activity]');
		this.time = this.node.querySelector('[data-header-time]');
		this.settings = this.node.querySelector('[data-header-settings]');
		this.battery = this.node.querySelector('[data-header-battery]');

		this.isBatteryCharging = false;
		this.batteryLevel = '100%';

		this.init();
		this.initBattery();
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

	initBattery() {
		navigator.getBattery().then((battery) => {
			// default values
			this.isBatteryCharging = battery.charging;
			this.batteryLevel = `${battery.level * 100}%`;
			this.showBattery();

			// is battery charging event
			battery.addEventListener('chargingchange', () => {
				batteryIsCharging = battery.charging;
				this.showBattery();
			});

			// is battery level changes event
			battery.addEventListener('levelchange', () => {
				this.batteryLevel = `${battery.level * 100}%`;
				this.showBattery();
			});
		});
	}

	showBattery() {
		this.battery.textContent = this.isBatteryCharging + ' ' + this.batteryLevel;
	}
}

export default Header;
