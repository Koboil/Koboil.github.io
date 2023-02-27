class Header {
	constructor({ node }) {
		this.node = node;

		this.time = this.node.querySelector('[data-header-time]');
		this.battery = this.node.querySelector('[data-header-battery]');
		this.latency = this.node.querySelector('[data-header-latency]');

		this.isBatteryCharging = false;
		this.batteryLevel = '100%';

		this.initBattery();
		this.initLatency();
		window.setInterval(() => {
			this.initTime();
		}, 1000);
	}

	initTime() {
		const time = new Intl.DateTimeFormat('fr-FR', {
			dateStyle: 'full',
			timeStyle: 'long',
			timeZone: 'Europe/Paris',
		}).format(new Date());

		this.time.textContent = time;
	}

	initLatency() {
		const startTime = new Date().getTime();
		fetch('https://jsonplaceholder.typicode.com/').then(() => {
			const endTime = new Date().getTime();
			const latency = endTime - startTime;
			this.latency.textContent = `${latency}/ms`;
		});
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
