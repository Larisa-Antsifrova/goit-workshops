// 'Classic' app version

// Getting references to DOM elements
const refs = {
  controls: document.querySelector('#tabs-1 [data-controls]'),
  panes: document.querySelector('#tabs-1 [data-panes]'),
};

// Adding event listener on cotrols container to delegate clicks
refs.controls.addEventListener('click', onTabClick);

// Functions
// Function that handles clicks on controls
function onTabClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'A') {
    return;
  }

  const currentActiveControlItem = refs.controls.querySelector(
    '.controls__item--active',
  );

  if (currentActiveControlItem) {
    currentActiveControlItem.classList.remove('controls__item--active');

    const paneId = getPaneId(currentActiveControlItem);
    const pane = getPaneById(paneId);
    pane.classList.remove('pane--active');
  }

  const controlItem = event.target;
  controlItem.classList.add('controls__item--active');

  const paneId = getPaneId(controlItem);
  const pane = getPaneById(paneId);
  pane.classList.add('pane--active');
}

// Function to get pane id
function getPaneId(control) {
  return control.getAttribute('href').slice(1);
}

// Function to get pane reference by id
function getPaneById(id) {
  return refs.panes.querySelector(`#${id}`);
}
