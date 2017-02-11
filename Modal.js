(function(root, factory) {
	
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	}
	else if (typeof exports === 'object') {
		module.exports = factory();
	}
	else {
		root.Modal = factory(root.Modal);
	}
}(this, function() {

	/*
		Styles for various components
	*/
	const componentStyles = {
		overlay: {
			position: 'fixed',
			backgroundColor: 'black',
			opacity: '0.3',
			top: '0',
			left: '0',
			right: '0',
			bottom: '0',
			zIndex: '500',
			display: 'none',
			cursor: 'pointer',
		},
		modal: {
			position: 'fixed',
			width: '50%',
			backgroundColor: 'white',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			zIndex: '1000',
			boxShadow: '0px 1px 27px 14px rgba(0,0,0,0.35)',
			boxSizing: 'border-box',
			padding: '30px',
			display: 'none',
			borderRadius: '5px',
		},
		content: {
			marginBottom: '20px',
		},
		closeButton: {
			width: '90px',
			border: '1px solid black',
			cursor: 'pointer',
			textAlign: 'center',
			padding: '10px 0',
			marginLeft: 'auto',
			marginRight: 'auto',
			borderRadius: '5px',
		}
	};

	/*
		Private Function

		Take the styles attribute from a DOM Element and apply the styles
		in the newStyles object to it.

		Parameters:

			oldStyles - a 'style' object from a DOM Element

			newStyles - an Object of styles to apply to the given DOM Element

		NOTE:
			Mutates the supplied "oldStyles" object
	*/
	function mergeStyles(oldStyles, newStyles) {
		for (var style in newStyles) {
		  oldStyles[style] = newStyles[style];
		}
	}

	/*
		Private Function
	
		Attach event listeners to parts of the Modal.
		
		NOTE: Need to use .call() to include the Modal's "this" object

	*/
	function attachListeners() {
		const hide = this.hide.bind(this);
		this.overlay.addEventListener('click', hide);
		this.closeButton.addEventListener('click', hide);
	}

	/*
		Private Function
	
		Create a new DOM element using  the supplied data

		Parameters:

			tag - String, tye type of HTML tag to create

			Optional:

				id: String, an Id to attach to the element

				styles: Object, a hash of object styles to apply to the element

		Returns:
			The new DOM element
	*/
	function create({ tag, id, styles }) {
		const element = document.createElement(tag);
		if (id) { element.id = id; }
		if (styles) { mergeStyles(element.style, styles); }

		return element;
	};

	/*
		The Main Modal object
	*/
	function Modal() {
		this._init();
	}

	/*
		Initializes the Modal, creates the DOM elements,
		and attaches the event listeners
	*/
	Modal.prototype._init = function() {
		this.message = 'DEFAULT MESSAGE';
		this.modalId = 'modal-element';
		this.overlayId = 'overlay-element';
		this.cancelId = 'modal-cancel-element';
		this.contentId = 'modal-content-id';
		this.closeId = 'modal-close-button-element';

		this.overlay = create({
			tag: 'div',
			id: this.overlayId,
			styles: componentStyles.overlay,
		});

		document.body.insertAdjacentElement('beforeend', this.overlay);

		this.modal = create({
			tag: 'div',
			id: this.modalId,
			styles: componentStyles.modal,
		});

		document.body.insertAdjacentElement('beforeend', this.modal);

		this.modalContent = create({
			tag: 'div',
			id: this.modalContentId,
			styles: componentStyles.content,
		});

		this.modal.insertAdjacentElement('beforeend', this.modalContent);

		this.closeButton = create({
			tag: 'div',
			id: this.closeId,
			styles: componentStyles.closeButton,
		});

		this.closeButton.innerHTML = 'Close';

		this.modal.insertAdjacentElement('beforeend', this.closeButton);

		attachListeners.call(this);
	};

	/*
		Reveals the Modal with the provided message

		Parameters:

			message - String, a message to show. If not provided,
				uses default message
	*/
	Modal.prototype.show = function(message) {
		this.overlay.style.display = 'block'; 
		this.modal.style.display = 'block'; 
		this.modalContent.innerHTML = message || this.message;
	};

	/*
		Hides the modal
	*/
	Modal.prototype.hide = function() {
		this.overlay.style.display = 'none'; 
		this.modal.style.display = 'none'; 
	};

	/*
		Export the Modal object. Create it before exporting so
		that multiple Modals will not be created.
	*/
	window.Modal = new Modal();
}));