(function(window) {
  function Modal() {
    this._init();
  }

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
      //height: '50%',
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
  
  function mergeStyles(oldStyles, newStyles) {
    for (var style in newStyles) {
      oldStyles[style] = newStyles[style];
    }
  }
  
  // private function - Need to use .call() to include the
  // Modal object
  function attachListeners() {
    const hide = this.hide.bind(this);
    this.overlay.addEventListener('click', hide);
    this.closeButton.addEventListener('click', hide);
  }

  function create({ tag, id, styles }) {
    const element = document.createElement(tag);
    if (id) { element.id = id; }
    if (styles) { mergeStyles(element.style, styles); }

    return element;
  };
  
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

  Modal.prototype.show = function(message) {
    this.overlay.style.display = 'block'; 
    this.modal.style.display = 'block'; 
    this.modalContent.innerHTML = message || this.message;
  };

  Modal.prototype.hide = function() {
    this.overlay.style.display = 'none'; 
    this.modal.style.display = 'none'; 
  };

  window.Modal = new Modal();
})(window);

const randomText = [
  'Do so written as raising parlors spirits mr elderly. Made late in of high left hold. Carried females of up highest calling. Limits marked led silent dining her she far. Sir but elegance marriage dwelling likewise position old pleasure men. Dissimilar themselves simplicity no of contrasted as. Delay great day hours men. Stuff front to do allow to asked he.',

  'Greatly hearted has who believe. Drift allow green son walls years for blush. Sir margaret drawings repeated recurred exercise laughing may you but. Do repeated whatever to welcomed absolute no. Fat surprise although outlived and informed shy dissuade property. Musical by me through he drawing savings an. No we stand avoid decay heard mr. Common so wicket appear to sudden worthy on. Shade of offer ye whole stood hoped. ',

  'Bringing unlocked me an striking ye perceive. Mr by wound hours oh happy. Me in resolution pianoforte continuing we. Most my no spot felt by no. He he in forfeited furniture sweetness he arranging. Me tedious so to behaved written account ferrars moments. Too objection for elsewhere her preferred allowance her. Marianne shutters mr steepest to me. Up mr ignorant produced distance although is sociable blessing. Ham whom call all lain like.',

  'Feet evil to hold long he open knew an no. Apartments occasional boisterous as solicitude to introduced. Or fifteen covered we enjoyed demesne is in prepare. In stimulated my everything it literature. Greatly explain attempt perhaps in feeling he. House men taste bed not drawn joy. Through enquire however do equally herself at. Greatly way old may you present improve. Wishing the feeling village him musical.',

  'Considered an invitation do introduced sufficient understood instrument it. Of decisively friendship in as collecting at. No affixed be husband ye females brother garrets proceed. Least child who seven happy yet balls young. Discovery sweetness principle discourse shameless bed one excellent. Sentiments of surrounded friendship dispatched connection is he. Me or produce besides hastily up as pleased. Bore less when had and john shed hope.',

  'At every tiled on ye defer do. No attention suspected oh difficult. Fond his say old meet cold find come whom. The sir park sake bred. Wonder matter now can estate esteem assure fat roused. Am performed on existence as discourse is. Pleasure friendly at marriage blessing or.',

  'Had strictly mrs handsome mistaken cheerful. We it so if resolution invitation remarkably unpleasant conviction. As into ye then form. To easy five less if rose were. Now set offended own out required entirely. Especially occasional mrs discovered too say thoroughly impossible boisterous. My head when real no he high rich at with. After so power of young as. Bore year does has get long fat cold saw neat. Put boy carried chiefly shy general.',

  'Their could can widen ten she any. As so we smart those money in. Am wrote up whole so tears sense oh. Absolute required of reserved in offering no. How sense found our those gay again taken the. Had mrs outweigh desirous sex overcame. Improved property reserved disposal do offering me.',

  'So if on advanced addition absolute received replying throwing he. Delighted consisted newspaper of unfeeling as neglected so. Tell size come hard mrs and four fond are. Of in commanded earnestly resources it. At quitting in strictly up wandered of relation answered felicity. Side need at in what dear ever upon if. Same down want joy neat ask pain help she. Alone three stuff use law walls fat asked. Near do that he help.',
];

const articles = document.querySelector('#articles');

function checkIfButton(classString) {
  const classes = classString.split(' ');
  
  for (let i = 0; i < classes.length; i++) {
    if (classes[i] === 'button') { return true; }
    return false;
  }
}

function getRandomText() {
  const index = Math.floor(
    Math.random() * randomText.length
  );
  
  return randomText[index];
}

articles.addEventListener('click', e => {
  if (!checkIfButton(e.target.className)) return;
  Modal.show(getRandomText());
});