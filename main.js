(function(window) {
  function Modal() {
    this.message = 'DEFAULT MESSAGE';
    this._init();
  }

  Modal.prototype._init = function() {
    this.modalId = 'modal-element';
    this.overlayId = 'overlay-element';
    this.modal = document.getElementById(this.modalId);
    this.overlay = document.getElementById(this.overlayId);

    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.id = this.overlayId;
      document.body.insertAdjacentElement('beforeend', this.overlay);
      this.overlay.style.display = 'none';
    }

    if (!this.modal) {
      this.modal = document.createElement('div');
      this.modal.id = this.id;
      document.body.insertAdjacentElement('beforeend', this.modal);
      this.modal.style.display = 'none';
    }

    this.applyStyles();
  };

  Modal.prototype.applyStyles = function() {
    var visibleStyles = {
      overlay: {
        position: 'fixed',
        backgroundColor: 'black',
        opacity: '0.6',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '500',
      },
      modal: {
        position: 'fixed',
        width: '50%',
        height: '50%',
        backgroundColor: 'white',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
      },
    };

    this.merge(
      this.modal.style,
      visibleStyles.modal
    );

    this.merge(
      this.overlay.style,
      visibleStyles.overlay
    );
  };

  Modal.prototype.show = function(message) {
    this.overlay.style.display = 'block'; 
    this.modal.style.display = 'block'; 
    this.modal.innerHTML = message || this.message;

    setTimeout(this.hide.bind(this), 2000);
  };

  Modal.prototype.hide = function() {
    this.overlay.style.display = 'none'; 
    this.modal.style.display = 'none'; 
  };

  Modal.prototype.merge = function(obj1, obj2) {
    for (var attr in obj2) {
      obj1[attr] = obj2[attr];
    }
  };

  /*
  Modal.prototype.merge = function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  }
  */

  window.Modal = new Modal();
})(window);

var button = document.querySelector('.button');

button.addEventListener('click', e => { 
  Modal.show('The article message');
});