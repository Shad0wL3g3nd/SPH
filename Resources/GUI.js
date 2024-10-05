//Version
SPHVersion = 

// Framework functions
const modGUI = {
  GUI: {
    menus: [],
  },
  getMenu(menu) {
    return document.getElementById(menu.id)
  },
  createMenu(title, id, position, top, left) {
    const menu = {
      title,
      id,
      position,
      top,
      left,
      elements: [], // Store all elements in this array
    };
  
    modGUI.GUI.menus.push(menu);
  
    return menu;
  },

  addButton(menu, label, callback) {
    const button = {
      type: 'button', // Indicate the element type
      label,
      callback,
    };
  
    menu.elements.push(button);
  },
  
  addSlider(menu, label, min, max, value, onChange) {
    const slider = {
      type: 'slider', // Indicate the element type
      label,
      min,
      max,
      value,
      onChange,
    };
  
    menu.elements.push(slider);
  },
  
  addText(menu, content) {
    const text = {
      type: 'text', // Indicate the element type
      content,
    };
  
    menu.elements.push(text);
  },
  createLiveOverlay(headerText) {
    const SPH_GUI_BACKGROUND_BLUR = document.createElement('div');
    SPH_GUI_BACKGROUND_BLUR.id = 'SPH_GUI_BACKGROUND_BLUR';
    SPH_GUI_BACKGROUND_BLUR.style.position = 'fixed';
    SPH_GUI_BACKGROUND_BLUR.style.top = '0';
    SPH_GUI_BACKGROUND_BLUR.style.left = '0';
    SPH_GUI_BACKGROUND_BLUR.style.width = '100%';
    SPH_GUI_BACKGROUND_BLUR.style.height = '100%';
    SPH_GUI_BACKGROUND_BLUR.style.backgroundColor = 'rgb(39 38 38 / 70%)';
    SPH_GUI_BACKGROUND_BLUR.style.zIndex = '9998';
    SPH_GUI_BACKGROUND_BLUR.style.backdropFilter = 'blur(5px)';
    
    const header = document.createElement('div');
    header.id = 'overlayHeader';
    header.style.color = 'white';
    header.style.textAlign = 'center';
    header.style.padding = '10px';
    header.style.fontWeight = 'bold';
    header.style.fontSize = '30px';
    header.textContent = headerText;
    SPH_GUI_BACKGROUND_BLUR.appendChild(header);
    document.body.appendChild(SPH_GUI_BACKGROUND_BLUR);
    return SPH_GUI_BACKGROUND_BLUR
  },

  render() {
  modGUI.GUI.menus.forEach(menu => {
    const menuContainer = document.createElement('div');
    menuContainer.id = menu.id;
    menuContainer.style.position = menu.position;
    menuContainer.style.top = menu.top;
    menuContainer.style.left = menu.left;
    menuContainer.style.padding = '20px';
    menuContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    menuContainer.style.color = '#fff';
    menuContainer.style.fontSize = '15px';
    menuContainer.style.zIndex = '9999';
    menuContainer.style.borderRadius = '10px';
    menuContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.3)';
    menuContainer.style.width = '300px';

    const menuHeader = document.createElement('div');
    menuHeader.id = `${menu.id}header`;
    menuHeader.style.fontWeight = 'bold';
    menuHeader.style.textAlign = 'center';
    menuHeader.style.fontSize = '25px';
    menuHeader.style.cursor = 'move';
    menuHeader.style.padding = '5px';
    menuHeader.textContent = menu.title;
    menuContainer.appendChild(menuHeader);

    menu.elements.forEach(element => {
      const elemContainer = document.createElement('div');
      // Customize container styling here based on element type
      elemContainer.style.marginBottom = '10px';

      if (element.type === 'button') {
        // Render button
        const buttonElem = document.createElement('div');
        // Customize button styling here
        buttonElem.className = 'modMenuItem';
        buttonElem.style.cursor = 'pointer';
        buttonElem.style.padding = '10px';
        buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        buttonElem.style.borderRadius = '5px';
        buttonElem.style.transition = 'background-color 0.3s ease';
        buttonElem.textContent = element.label;

        buttonElem.addEventListener('mouseenter', () => {
          buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });

        buttonElem.addEventListener('mouseleave', () => {
          buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });

        buttonElem.addEventListener('click', element.callback);

        elemContainer.appendChild(buttonElem);
      } else if (element.type === 'slider') {
        // Render slider
        const sliderHeader = document.createElement('div');
        // Customize slider header styling here
        sliderHeader.style.cursor = 'move';
        sliderHeader.style.padding = '5px';
        sliderHeader.textContent = element.label;
        elemContainer.appendChild(sliderHeader);

        const sliderInput = document.createElement('input');
        // Customize slider input styling here
        sliderInput.type = 'range';
        sliderInput.min = element.min;
        sliderInput.max = element.max;
        sliderInput.value = element.value;

        const sliderValueSpan = document.createElement('span');
        sliderValueSpan.textContent = element.value;
        sliderValueSpan.style.float = 'right';

        sliderInput.style.width = '100%';
        sliderInput.style.height = '20px';
        sliderInput.style.padding = '0';
        sliderInput.style.margin = '0';
        sliderInput.style.appearance = 'none';
        sliderInput.style.background = 'transparent';
        sliderInput.style.border = 'none';
        sliderInput.style.cursor = 'pointer';
        sliderInput.style.borderRadius = '5px';
        sliderInput.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        sliderInput.style.transition = 'background-color 0.3s ease';

        sliderInput.addEventListener('input', () => {
          element.onChange(sliderInput.value);
          sliderValueSpan.textContent = sliderInput.value;
        });

        elemContainer.appendChild(sliderInput);
        sliderHeader.appendChild(sliderValueSpan);
      } else if (element.type === 'text') {
        // Render text
        const textElem = document.createElement('div');
        // Customize text styling here
        textElem.className = 'modTextItem';
        textElem.style.padding = '5px';
        textElem.style.backgroundColor = 'rgba(115 115 115 / 10%)';
        textElem.style.borderRadius = '5px';
        textElem.textContent = element.content;
        elemContainer.appendChild(textElem);
      }

      menuContainer.appendChild(elemContainer);
    });

    document.body.appendChild(menuContainer);
    modGUI.dragElement(menuContainer);
  });
},

  dragElement(elmnt) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const header = elmnt.querySelector(`#${elmnt.id}header`);
    if (header) {
      header.style.cursor = 'move';
      header.onmousedown = dragMouseDown;
    } else {
      elmnt.style.cursor = 'move';
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
      elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  },
};




// Create main menu w/ buttons





//Make the GUI with the labels and size.
const mainMenu = modGUI.createMenu('GUI Beta ' + SPHVersion, 'SPH_GUI_TOGGLEABLES', 'absolute', '20px', '20px');

modGUI.addText(mainMenu, 'Version ' + SPHVersion + ' of the GUI part of Shadow\'s Privacy Hub, or the S.P.H.');
modGUI.addButton(mainMenu, 'Combat(Tools)', () => alert('Coming Soon!') );
modGUI.addButton(mainMenu, 'Visual(Stuff you see)', () => alert('Coming Soon!') );
modGUI.addButton(mainMenu, 'Movement(En/De-Crypter)', () => open('http://cryptii.com','targetname','height=500,width=500') );
modGUI.addButton(mainMenu, 'Player(Thing for you)', () => alert('Coming Soon!') );
modGUI.addButton(mainMenu, 'World(Site)', () => alert('Coming Soon!') );
modGUI.addButton(mainMenu, 'Misc.(Misc. Items)', () => alert('Coming Soon!') );
modGUI.addButton(mainMenu, 'GUI(Credits)', () => alert('This was created by TheAnonymousXI with help from Shad0wL3g3nd.') );
modGUI.addButton(mainMenu, 'Ghost', () => fetch('https://raw.githubusercontent.com/Shad0wL3g3nd/SPH/main/Resources/BrowserPopUp.js')  .then(response => response.text())  .then(data => {    eval(data);  }) );
modGUI.addButton(mainMenu, 'Help', () => alert('If some of the features aren\'t working, try opening an \'about:blank\' tab and test them. This is because some of the websites block the ability to inject and/or blocks the fetch ability.') );

/*

Note:
You can always replace any 's with "s or add a '\' in front of any 's.
If you add a new module, try to switch them out.

Add text box:
modGUI.addText(mainMenu, 'Your Text Here');

Add a button:
modGUI.addButton(mainMenu, 'Your button name here', () => Your code here. );

Add a slider:
modGUI.addSlider(
  mainMenu,
  'Your slider name here.',
  min, max start,
  value => console.log(`Slider 1 value: ${value}`)
);
*/




// Create overlay
let overlay = modGUI.createLiveOverlay('RSHIFT to toggle')

window.addEventListener('keydown', (event) => {
  if (event.code == 'ShiftRight') {
      if (
        modGUI.getMenu(mainMenu).style.display === 'none' &&
        overlay.style.display === 'none'
      ) {
        modGUI.getMenu(mainMenu).style.display = 'block';
        overlay.style.display = 'block';
        document.exitPointerLock();
      } else {
        modGUI.getMenu(mainMenu).style.display = 'none';
        overlay.style.display = 'none';
      }
  }
});

// Call render to display the GUI
modGUI.render();
modGUI.getMenu(mainMenu).style.display = 'none';
overlay.style.display = 'none';
alert('S.P.H. Injected');
