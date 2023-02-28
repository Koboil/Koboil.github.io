/**
 * Constants
 */

let zIndex = 1;

const WINDOW_DEFAULT_X = 100;
const WINDOW_DEFAULT_Y = 100;

const HEADER_HEIGHT = 30;
const FOOTER_HEIGHT = 70;

/**
 * Window
 */

export default class Window {
	constructor({ node, width, height, resetCallback }) {
		this.node = node;
		this.handle = node.querySelector('[data-window-handle]');
		this.trigger = document.querySelector(
			'#' + this.node.getAttribute('data-window-trigger'),
		);

		this.maximizeBtn = node.querySelector('[data-window-maximize]');
		this.minimizeBtn = node.querySelector('[data-window-minimize]');
		this.closeBtn = node.querySelector('[data-window-close]');

		this.isOpen = false;
		this.isDragging = false;
		this.isFullScreen = false;

		this.position = { x: 0, y: 0 };
		this.offset = { x: 0, y: 0 };

		this.size = { x: 0, y: 0 };

		// close window by default
		this.close();

		// set default values
		this.setPosition({ x: WINDOW_DEFAULT_X, y: WINDOW_DEFAULT_Y });
		this.setSize({ width, height });

		// add pointer events to window handle (for drag n drop)
		this.handle.addEventListener('pointerdown', this.onPointerDown.bind(this));
		this.handle.addEventListener('pointermove', this.onPointerMove.bind(this));
		this.handle.addEventListener('pointerup', this.onPointerUp.bind(this));

		// add mouse events to trigger button (to open / minimize window)
		this.trigger.addEventListener('click', this.onTriggerClick.bind(this));

		// add mouse events to controls buttons
		this.maximizeBtn.addEventListener('click', this.maximize.bind(this));
		this.minimizeBtn.addEventListener('click', this.minimize.bind(this));
		this.closeBtn.addEventListener(
			'click',
			this.close.bind(this, resetCallback),
		);

		// add mouse events to window handle (to maximize window)
		this.handle.addEventListener('dblclick', this.maximize.bind(this));

		// add pinter events to window node (to handle z-index)
		this.node.addEventListener('pointerdown', this.moveUp.bind(this));

		// add window resize event
		window.addEventListener('resize', this.onResizeWindow.bind(this));
	}

	setPosition({ x, y }) {
		this.position.x = x;
		this.position.y = y;
		this.node.style.left = this.position.x + 'px';
		this.node.style.top = this.position.y + 'px';
	}

	setSize({ width, height }) {
		this.size.width = width;
		this.size.height = height;
		this.node.style.width = this.size.width + 'px';
		this.node.style.height = this.size.height + 'px';
	}

	open() {
		this.isOpen = true;
		this.node.style.visibility = 'visible';

		this.moveUp();
	}

	close(resetCallback) {
		this.isOpen = false;
		this.node.style.visibility = 'hidden';

		// reset window position
		this.setPosition({ x: WINDOW_DEFAULT_X, y: WINDOW_DEFAULT_Y });

		// reset full screen
		if (this.isFullScreen) {
			this.isFullScreen = false;
			this.setSize({ ...this.size });
		}

		// reset window app state
		resetCallback && resetCallback();
	}

	minimize() {
		this.isOpen = false;
		this.node.style.visibility = 'hidden';
	}

	maximize() {
		if (this.isFullScreen) {
			this.isFullScreen = false;
			this.setPosition({ ...this.position });
			this.setSize({ ...this.size });
		} else {
			this.isFullScreen = true;
			// reset position without changing state (to keep last position)
			this.node.style.left = '0px';
			this.node.style.top = `${HEADER_HEIGHT}px`;
			// update size without changing state (to keep last size)
			this.node.style.width = window.innerWidth + 'px';
			this.node.style.height = `${
				window.innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT
			}px`;
		}
	}

	moveUp() {
		this.node.style.zIndex = zIndex;
		zIndex += 1;
	}

	onPointerDown(e) {
		// prevent dragging in full screen
		if (this.isFullScreen) return;

		// retarget all pointer events to `handle`
		e.target.setPointerCapture(e.pointerId);

		// get mouse offset
		const boundingRect = this.node.getBoundingClientRect();
		this.offset = {
			x: e.clientX - boundingRect.left,
			y: e.clientY - boundingRect.top,
		};

		// start dragging
		this.isDragging = true;
	}

	onPointerMove(e) {
		if (!this.isDragging) return;

		// move window
		this.setPosition({
			x: e.clientX - this.offset.x,
			y:
				e.clientY - this.offset.y <= HEADER_HEIGHT
					? HEADER_HEIGHT
					: e.clientY - this.offset.y,
		});
	}

	onPointerUp() {
		// stop dragging
		this.isDragging = false;
	}

	onTriggerClick() {
		if (this.isOpen) {
			this.minimize();
		} else {
			this.open();
		}
	}

	onResizeWindow() {
		if (this.isFullScreen) {
			this.node.style.width = window.innerWidth + 'px';
			this.node.style.height = `${
				window.innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT
			}px`;
		}
	}
}
