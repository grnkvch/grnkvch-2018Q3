export default class HUD {
  constructor(character, side) {
    this.charToDisplay = character;
    this.icon = character.model.head;
    this.side = 1;
    if (side === 'right') this.side = -1;
  }

  render(scale) {
    const sizeX = this.charToDisplay.modelSize.x;
    const sizeY = this.charToDisplay.modelSize.y;
    const canvas = document.createElement('canvas');
    canvas.width = (sizeX + 110) * scale;
    canvas.height = (sizeY + 50) * scale;
    const context = canvas.getContext('2d');
    context.scale(this.side * scale, scale);
    if (this.side < 0) context.translate(-(sizeX + 110), 0);
    const drawParamArr = [
      sizeX,
      sizeY,
      0, 0,
      sizeX,
      sizeY,
    ];
    const health = this.charToDisplay.state.currHealth / this.charToDisplay.state.health * 100;
    const healthBarPos = sizeX + 5;
    context.fillStyle = '#ff0000'; 
    context.strokeStyle = 'green';
    context.strokeRect(healthBarPos-1, 9, 102, 17);
    if (health>0) context.fillRect(healthBarPos, 10, health, 15);
    context.drawImage(this.icon, 0, 0, ...drawParamArr);
    return canvas;
  }
}
