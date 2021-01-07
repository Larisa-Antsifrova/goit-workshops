// Plugin version
class Tabs {
  constructor({ rootSelector }) {
    this._refs = this._getRefs(rootSelector);

    this._bindEvents();
  }
  _getRefs(root) {
    const refs = {};
    refs.controls = document.querySelector(`${root} [data-controls]`);
    refs.panes = document.querySelector(`${root} [data-panes]`);
    return refs;
  }

  _bindEvents() {
    this._refs.controls.addEventListener(
      'click',
      this._onControlsClick.bind(this),
    );
  }

  _onControlsClick(event) {
    console.log(this);
  }
}

const tabs1 = new Tabs({
  rootSelector: '#tabs-1',
});
console.log(tabs1);
