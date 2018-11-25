export default class KeybordControl {
  constructor (controlledObject, optionObj) {
    this.controlledObject = controlledObject;
    this.optionObj = optionObj;
    document.addEventListener('keyup', (event)=>this.keybordControl(event));
  }
  keybordControl(event) {
    const key = event.keyCode;
    if(this.optionObj[key]) this.optionObj[key].apply(this.controlledObject);
    }
  }