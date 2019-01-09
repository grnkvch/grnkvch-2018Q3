const CharacterConfig = {
  player: {
    modelSize: { x: 80, y: 110 },
    model: {
      leftLeg: { x: 0, y: 0 }, // x, y - relative limbs initial position
      rightLeg: { x: 0, y: 0 },
      body: { x: 0, y: 0 },
      leftHand: { x: 0, y: 0 },
      rightHand: { x: 0, y: 0 },
      head: { x: 0, y: 0 },
    },
    state: {
      posX: 50,
      posY: 170,
      facingDirection: 1, // 1 - character facing right, -1 - character facing left;
      drawOrder: { // Limbs draw order, from bottom to top ;
        leftLeg: 1,
        rightLeg: 2,
        body: 3,
        leftHand: 4,
        rightHand: 5,
        head: 6,
      },
      health: 100,
      level: 1,
      standBy: true,
      // limbsPos:{} - this section will be appear in stateObj after character creation,
      // and contains objects like limb:{x: Number,y: Number},
      // x, y - relative limbs initial position
    },
    sounds: {
      hitAttack: true,
      kickAttack: true,
      step: true,
      shamandance: true,
    },
    actions: {
      standByAnimation() {
        const breathInc = 0.05;
        let breathDir = 1;
        const breathMax = 1.1;
        this.actions.standByAnimation = () => {
          this.state.limbsPos.body.y += breathDir * breathInc;
          this.state.limbsPos.leftHand.y += breathDir * breathInc * 0.8;
          this.state.limbsPos.rightHand.y += breathDir * breathInc * 0.8;
          this.state.limbsPos.head.y += breathDir * breathInc * 0.5;
          if (this.state.limbsPos.body.y < -breathMax || this.state.limbsPos.body.y > breathMax) {
            breathDir *= -1;
          }
        };
      },
      step() {
        let currentfarme = 0;
        const dx = 80;
        const dy = 110;
        let dtSum = 0;
        this.actions.step = () => {
          const arr = [[0 * dx, 1 * dy], [1 * dx, 1 * dy]];
          if (dtSum > 0.15) {
            this.state.drawOrder.rightHand = 1;
            const keys = Object.keys(this.state.limbsPos);
            keys.forEach((key) => {
              this.state.limbsPos[key].x = arr[currentfarme][0];
              this.state.limbsPos[key].y = arr[currentfarme][1];
            });
            this.sounds.step.volume = 0.12;
            this.sounds.step.play();
            if (currentfarme < arr.length - 1) currentfarme += 1;
            else currentfarme = 0;
            dtSum = 0;
          }
          dtSum += this.timing.dt;
        };
      },
      hit() {
        let currentfarme = 0;
        const dx = 80;
        const dy = 110;
        let del = 0;
        this.actions.hit = () => {
          const frames = [[4 * dx, 1 * dy], [5 * dx, 1 * dy], [0 * dx, 0 * dy]];
          const keys = Object.keys(this.state.limbsPos);
          if (currentfarme > frames.length - 1) {
            this.state.drawOrder.rightHand = 5;
            currentfarme = 0;
            this.sounds.hitAttack.volume = 0.12;
            this.sounds.hitAttack.play();
            return true;
          }
          if (del > 0.3) {
            this.state.drawOrder.rightHand = 1;
            keys.forEach((key) => {
              this.state.limbsPos[key].x = frames[currentfarme][0];
              this.state.limbsPos[key].y = frames[currentfarme][1];
            });
            currentfarme += 1;
            del = 0;
          }
          del += this.timing.dt;
        };
      },
      kick() {
        let currentfarme = 0;
        const dx = 80;
        const dy = 110;
        let del = 0;
        this.actions.kick = () => {
          const frames = [[5 * dx, 2 * dy], [6 * dx, 1 * dy], [0 * dx, 0 * dy]];
          const keys = Object.keys(this.state.limbsPos);
          if (currentfarme > frames.length - 1) {
            this.state.drawOrder.rightHand = 5;
            currentfarme = 0;
            this.sounds.kickAttack.volume = 0.12;
            this.sounds.kickAttack.play();
            return true;
          }
          if (del > 0.3) {
            this.state.drawOrder.rightHand = 1;
            keys.forEach((key) => {
              this.state.limbsPos[key].x = frames[currentfarme][0];
              this.state.limbsPos[key].y = frames[currentfarme][1];
            });
            currentfarme += 1;
            del = 0;
          }
          del += this.timing.dt;
        };
      },
      shamanDance() {
        let currentfarme = 0;
        const dx = 80;
        const dy = 110;
        let del = 0;
        this.actions.shamanDance = () => {
          const frames = [
            [3 * dx, 2 * dy],
            [0 * dx, 0 * dy],
            [3 * dx, 2 * dy],
            [0 * dx, 0 * dy],
            [1 * dx, 0 * dy],
            [0 * dx, 0 * dy],
            [1 * dx, 0 * dy],
            [0 * dx, 0 * dy],
          ];
          const keys = Object.keys(this.state.limbsPos);
          if (currentfarme > frames.length - 1) {
            this.state.drawOrder.rightHand = 5;
            currentfarme = 0;
            return true;
          }
          if (del > 0.3) {
            this.state.drawOrder.rightHand = 1;
            if (currentfarme % 2 === 0) this.state.facingDirection *= -1;
            keys.forEach((key) => {
              this.state.limbsPos[key].x = frames[currentfarme][0];
              this.state.limbsPos[key].y = frames[currentfarme][1];
            });
            currentfarme += 1;
            del = 0;
          }
          del += this.timing.dt;
        };
      },
      move() {
        let dir = 1;
        const speed = 95;
        this.actions.move = (targetPos) => {
          if (Math.abs(this.state.posX - targetPos) >= 2) {
            if (dir !== (targetPos - this.state.posX) / Math.abs(targetPos - this.state.posX)) {
              dir *= -1;
              this.state.facingDirection = dir;
            }
            this.state.posX += Math.round(speed * this.timing.dt * dir);
          } else {
            return true;
          }
        };
      },
      takeDmg() {
        let currentfarme = 0;
        const dx = 80;
        const dy = 110;
        let del = 1;
        this.actions.takeDmg = () => {
          const frames = [[4 * dx, 0 * dy], [0 * dx, 0 * dy]];
          const keys = Object.keys(this.state.limbsPos);
          if (currentfarme > frames.length - 1) {
            this.state.drawOrder.rightHand = 5;
            currentfarme = 0;
            del = 1;
            return true;
          }
          if (del > 0.2) {
            this.state.drawOrder.rightHand = 1;
            keys.forEach((key) => {
              this.state.limbsPos[key].x = frames[currentfarme][0];
              this.state.limbsPos[key].y = frames[currentfarme][1];
            });
            currentfarme += 1;
            del = 0;
          }
          del += this.timing.dt;
        };
      },
      lose() {
        const dx = 80;
        const dy = 110;
        let done = false;
        this.actions.lose = () => {
          if (!done) {
            const keys = Object.keys(this.state.limbsPos);
            keys.forEach((key) => {
              this.state.limbsPos[key].x = 3 * dx;
              this.state.limbsPos[key].y = 0 * dy;
              if (key === 'head') {
                this.state.limbsPos[key].x = 2 * dx;
                this.state.limbsPos[key].y = -13;
              }
            });
            done = true;
            return true;
          }
        };
      },
      win() {
        let currentfarme = 0;
        const dx = 80;
        const dy = 110;
        let del = 0;
        this.actions.win = () => {
          const frames = [[7 * dx, 0 * dy], [8 * dx, 0.1 * dy]];
          const keys = Object.keys(this.state.limbsPos);
          if (currentfarme > frames.length - 1) {
            currentfarme = 0;
            return true;
          }
          if (del > 0.3) {
            keys.forEach((key) => {
              this.state.limbsPos[key].x = frames[currentfarme][0];
              this.state.limbsPos[key].y = frames[currentfarme][1];
            });
            currentfarme += 1;
            del = 0;
          }
          del += this.timing.dt;
        };
      },
    },
    abilities: {
      hitAttack() {
        let gener = null;
        this.abilities.hitAttack = (enemyChar) => {
          const that = this;
          if (!gener) {
            function* generateSequence() {
              that.save();
              const dist = enemyChar.state.posX - (enemyChar.modelSize.x - 15) * that.state.facingDirection;
              const startPos = that.state.posX;
              while (!that.actions.move(dist)) {
                that.actions.step();
                yield;
              }
              while (!that.actions.hit()) {
                yield;
              }
              enemyChar.state.currHealth -= 50;
              while (!enemyChar.actions.takeDmg()) {
                yield;
              }
              while (!that.actions.move(startPos)) {
                that.actions.step();
                yield;
              }
              that.restore();
            }
            gener = generateSequence();
          } else if (gener.next().done) {
            gener = null;
            return true;
          }
        };
        this.abilities.hitAttack.caption = 'HIT';
      },
      kickAttack() {
        let gener = null;
        this.abilities.kickAttack = (enemyChar) => {
          const that = this;
          if (!gener) {
            function* generateSequence() {
              that.save();
              const dist = enemyChar.state.posX - (enemyChar.modelSize.x - 15) * that.state.facingDirection;
              const startPos = that.state.posX;
              while (!that.actions.move(dist)) {
                that.actions.step();
                yield;
              }
              while (!that.actions.kick()) {
                yield;
              }
              enemyChar.state.currHealth -= 50;
              while (!enemyChar.actions.takeDmg()) {
                yield;
              }
              while (!that.actions.move(startPos)) {
                that.actions.step();
                yield;
              }
              that.restore();
            }
            gener = generateSequence();
          } else if (gener.next().done) {
              gener = null;
              return true;
            }
        };
        this.abilities.kickAttack.caption = 'KICK';
      },
      heal() {
        let gener = null;
        this.abilities.heal = () => {
          const that = this;
          if (!gener) {
            function* generateSequence() {
              that.save();
              that.sounds.shamandance.volume = 0.12;
              that.sounds.shamandance.play();
              while (!that.actions.shamanDance()) {
                yield;
              }
              that.sounds.shamandance.pause();
              that.restore();
              that.state.currHealth += 25;
              if (that.state.currHealth > that.state.health) that.state.currHealth = that.state.health;
            }
            gener = generateSequence();
          } else if (gener.next().done) {
              gener = null;
              return true;
            }
        };
        this.abilities.heal.caption = 'HEAL';
      },
    },
  },
  enemy: {
    modelSize: { x: 80, y: 110 },
    model: {
      leftLeg: { x: 0, y: 0 }, // x, y - relative limbs initial position
      rightLeg: { x: 0, y: 0 },
      body: { x: 0, y: 0 },
      leftHand: { x: 0, y: 0 },
      rightHand: { x: 0, y: 0 },
      head: { x: 0, y: 0 },
    },
    state: {
      posX: 710,
      posY: 170,
      facingDirection: -1, // 1 - character facing right, -1 - character facing left;
      drawOrder: { // Limbs draw order, from bottom to top ;
        leftLeg: 1,
        rightLeg: 2,
        body: 3,
        leftHand: 4,
        rightHand: 5,
        head: 6,
      },
      health: 100,
      level: 1,
      standBy: true,
      // limbsPos:{} - this section will be appear in stateObj after character creation,
      // and contains objects like limb:{x: Number,y: Number},
      // x, y - relative limbs initial position
    },
    sounds: {
      hitAttack: true,
      kickAttack: true,
      step: true,
    },
    actions: {
      standByAnimation() {
        const breathInc = 0.05;
        let breathDir = 1;
        const breathMax = 1.1;
        this.actions.standByAnimation = () => {
          this.state.limbsPos.body.y += breathDir * breathInc;
          this.state.limbsPos.leftHand.y += breathDir * breathInc * 0.8;
          this.state.limbsPos.rightHand.y += breathDir * breathInc * 0.8;
          this.state.limbsPos.head.y += breathDir * breathInc * 0.5;
          if (this.state.limbsPos.body.y < -breathMax || this.state.limbsPos.body.y > breathMax) {
            breathDir *= -1;
          }
        };
      },
      step() {
        let currentfarme = 0;
        const dx = 80;
        const dy = 110;
        let dtSum = 0;
        this.actions.step = () => {
          const arr = [[0 * dx, 1 * dy], [1 * dx, 1 * dy]];
          if (dtSum > 0.15) {
            this.state.drawOrder.rightHand = 1;
            const keys = Object.keys(this.state.limbsPos);
            keys.forEach((key) => {
              this.state.limbsPos[key].x = arr[currentfarme][0];
              this.state.limbsPos[key].y = arr[currentfarme][1];
            });
            this.sounds.step.volume = 0.12;
            this.sounds.step.play();
            if (currentfarme < arr.length - 1) currentfarme += 1;
            else currentfarme = 0;
            dtSum = 0;
          }
          dtSum += this.timing.dt;
        };
      },
      hit() {
        let currentfarme = 0;
        const dx = 80;
        const dy = 110;
        let del = 0;
        this.actions.hit = () => {
          const frames = [[4 * dx, 1 * dy], [5 * dx, 1 * dy], [0 * dx, 0 * dy]];
          const keys = Object.keys(this.state.limbsPos);
          if (currentfarme > frames.length - 1) {
            this.state.drawOrder.rightHand = 5;
            currentfarme = 0;
            this.sounds.hitAttack.volume = 0.12;
            this.sounds.hitAttack.play();
            return true;
          }
          if (del > 0.3) {
            this.state.drawOrder.rightHand = 1;
            keys.forEach((key) => {
              this.state.limbsPos[key].x = frames[currentfarme][0];
              this.state.limbsPos[key].y = frames[currentfarme][1];
            });
            currentfarme += 1;
            del = 0;
          }
          del += this.timing.dt;
        };
      },
      kick() {
        let currentfarme = 0;
        const dx = 80;
        const dy = 110;
        let del = 0;
        this.actions.kick = () => {
          const frames = [[5 * dx, 2 * dy], [6 * dx, 1 * dy], [0 * dx, 0 * dy]];
          const keys = Object.keys(this.state.limbsPos);
          if (currentfarme > frames.length - 1) {
            this.state.drawOrder.rightHand = 5;
            currentfarme = 0;
            this.sounds.kickAttack.volume = 0.12;
            this.sounds.kickAttack.play();
            return true;
          }
          if (del > 0.3) {
            this.state.drawOrder.rightHand = 1;
            keys.forEach((key) => {
              this.state.limbsPos[key].x = frames[currentfarme][0];
              this.state.limbsPos[key].y = frames[currentfarme][1];
            });
            currentfarme += 1;
            del = 0;
          }
          del += this.timing.dt;
        };
      },
      shamanDance() {
        let currentfarme = 0;
        const dx = 80;
        const dy = 110;
        let del = 0;
        this.actions.shamanDance = () => {
          const frames = [
            [3 * dx, 2 * dy],
            [0 * dx, 0 * dy],
            [3 * dx, 2 * dy],
            [0 * dx, 0 * dy],
            [1 * dx, 0 * dy],
            [0 * dx, 0 * dy],
            [1 * dx, 0 * dy],
            [0 * dx, 0 * dy],
          ];
          const keys = Object.keys(this.state.limbsPos);
          if (currentfarme > frames.length - 1) {
            this.state.drawOrder.rightHand = 5;
            currentfarme = 0;
            return true;
          }
          if (del > 0.3) {
            this.state.drawOrder.rightHand = 1;
            if (currentfarme % 2 === 0) this.state.facingDirection *= -1;
            keys.forEach((key) => {
              this.state.limbsPos[key].x = frames[currentfarme][0];
              this.state.limbsPos[key].y = frames[currentfarme][1];
            });
            currentfarme += 1;
            del = 0;
          }
          del += this.timing.dt;
        };
      },
      move() {
        let dir = 1;
        const speed = 95;
        this.actions.move = (targetPos) => {
          if (Math.abs(this.state.posX - targetPos) >= 2) {
            if (dir !== (targetPos - this.state.posX) / Math.abs(targetPos - this.state.posX)) {
              dir *= -1;
              this.state.facingDirection = dir;
            }
            this.state.posX += Math.round(speed * this.timing.dt * dir);
          } else {
            return true;
          }
        };
      },
      takeDmg() {
        let currentfarme = 0;
        const dx = 80;
        const dy = 110;
        let del = 1;
        this.actions.takeDmg = () => {
          const frames = [[4 * dx, 0 * dy], [0 * dx, 0 * dy]];
          const keys = Object.keys(this.state.limbsPos);
          if (currentfarme > frames.length - 1) {
            this.state.drawOrder.rightHand = 5;
            currentfarme = 0;
            del = 1;
            return true;
          }
          if (del > 0.2) {
            this.state.drawOrder.rightHand = 1;
            keys.forEach((key) => {
              this.state.limbsPos[key].x = frames[currentfarme][0];
              this.state.limbsPos[key].y = frames[currentfarme][1];
            });
            currentfarme += 1;
            del = 0;
          }
          del += this.timing.dt;
        };
      },
      lose() {
        const dx = 80;
        const dy = 110;
        let done = false;
        this.actions.lose = () => {
          if (!done) {
            const keys = Object.keys(this.state.limbsPos);
            keys.forEach((key) => {
              this.state.limbsPos[key].x = 3 * dx;
              this.state.limbsPos[key].y = 0 * dy;
              if (key === 'head') {
                this.state.limbsPos[key].x = 2 * dx;
                this.state.limbsPos[key].y = -13;
              }
            });
            done = true;
            return true;
          }
        };
      },
      win() {
        let currentfarme = 0;
        const dx = 80;
        const dy = 110;
        let del = 0;
        this.actions.win = () => {
          const frames = [[7 * dx, 0 * dy], [8 * dx, 0.1 * dy]];
          const keys = Object.keys(this.state.limbsPos);
          if (currentfarme > frames.length - 1) {
            currentfarme = 0;
            return true;
          }
          if (del > 0.3) {
            keys.forEach((key) => {
              this.state.limbsPos[key].x = frames[currentfarme][0];
              this.state.limbsPos[key].y = frames[currentfarme][1];
            });
            currentfarme += 1;
            del = 0;
          }
          del += this.timing.dt;
        };
      },
    },
    abilities: {
      hitAttack() {
        let gener = null;
        this.abilities.hitAttack = (enemyChar) => {
          const that = this;
          if (!gener) {
            function* generateSequence() {
              that.save();
              const dist = enemyChar.state.posX - (enemyChar.modelSize.x - 15) * that.state.facingDirection;
              const startPos = that.state.posX;
              while (!that.actions.move(dist)) {
                that.actions.step();
                yield;
              }
              while (!that.actions.hit()) {
                yield;
              }
              enemyChar.state.currHealth -= 50;
              while (!enemyChar.actions.takeDmg()) {
                yield;
              }
              while (!that.actions.move(startPos)) {
                that.actions.step();
                yield;
              }
              that.restore();
            }
            gener = generateSequence();
          } else if (gener.next().done) {
            gener = null;
            return true;
          }
        };
        this.abilities.hitAttack.caption = 'HIT';
      },
      kickAttack() {
        let gener = null;
        this.abilities.kickAttack = (enemyChar) => {
          const that = this;
          if (!gener) {
            function* generateSequence() {
              that.save();
              const dist = enemyChar.state.posX - (enemyChar.modelSize.x - 15) * that.state.facingDirection;
              const startPos = that.state.posX;
              while (!that.actions.move(dist)) {
                that.actions.step();
                yield;
              }
              while (!that.actions.kick()) {
                yield;
              }
              enemyChar.state.currHealth -= 50;
              while (!enemyChar.actions.takeDmg()) {
                yield;
              }
              while (!that.actions.move(startPos)) {
                that.actions.step();
                yield;
              }
              that.restore();
            }
            gener = generateSequence();
          } else if (gener.next().done) {
              gener = null;
              return true;
            }
        };
        this.abilities.kickAttack.caption = 'KICK';
      },
    },
  },
};
export default CharacterConfig;
