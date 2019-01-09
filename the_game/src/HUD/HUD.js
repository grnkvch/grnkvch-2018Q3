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
    context.fillStyle = 'rgb(232,95,76)'; 
    context.strokeStyle = 'green';
    context.lineWidth = 2;
    context.strokeRect(healthBarPos-1, 9, 102, 17);
    if (health>0) context.fillRect(healthBarPos, 10, health, 15);
    context.drawImage(this.icon, 0, 0, ...drawParamArr);
    context.scale(this.side * 1, 1);
    context.fillStyle = 'rgb(212,75,56)';
    context.font = `${15}px Russo One`;
    context.fillText(this.charToDisplay.name, this.side > 0 ? 0 : this.side * (sizeX + 110), sizeY-10, sizeX + 110);
    return canvas;
  }
}
