const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(grid) {
    this._grid = grid;
    this._playerPosition = [0, 0];
  }

  get playerPosition() {
    return this._playerPosition;
  }

  print() {
    for (let i = 0; i < this._grid.length; i += 1) {
      console.log(this._grid[i].join(''));
    }
  }

  getInput() {
    const prompt = require('prompt-sync')();
    const way = prompt('Which way to go? ');
    console.log(`Going ${way}`);
    return way;
  }

  movePlayer(step) {
    if (step === 'r') {
      this._playerPosition[0] += 1;
    } else if (step === 'l') {
      this._playerPosition[0] -= 1;
    } else if (step === 'd') {
      this._playerPosition[1] += 1;
    } else if (step === 'u') {
      this._playerPosition[1] -= 1;
    }
    return this._playerPosition;
  }

  checkPosition() {
    const x = this._playerPosition[0];
    const y = this._playerPosition[1];
    if (
      x < 0 ||
      x > this._grid[0].length - 1 ||
      y < 0 ||
      y > this._grid.length - 1
    ) {
      this.print();
      console.log('Out of bounds. You Lose!');
    } else {
      const position = this._grid[y][x];
      if (position === hat) {
        this._grid[y][x] = 'X';
        this.print();
        console.log('You found the hat. You win!');
      } else if (position === hole) {
        this._grid[y][x] = 'X';
        this.print();
        console.log('You fell into a hole. You lose!');
      } else {
        this._grid[y][x] = pathCharacter;
        this.playGame();
      }
    }
  }

  static generateField(x, y) {
    const field = [];
    for (let i = 0; i < y; i += 1) {
      const row = [];
      for (let j = 0; j < x; j += 1) {
        const rand = Math.floor(Math.random() * 4);
        if (rand === 0) {
          row.push('O');
        } else {
          row.push('░');
        }
      }
      field.push(row);
    }
    const rndX = 1 + Math.floor(Math.random() * x - 1);
    const rndY = 1 + Math.floor(Math.random() * y - 1);
    field[0].splice(0, 1, pathCharacter);
    field[rndY].splice(rndX, 1, hat);
    return field;
  }

  playGame() {
    this.print();
    const lastStep = this.getInput();
    this.movePlayer(lastStep);
    this.checkPosition();
  }
}

// const myField = new Field([
//   ['*', '░', '░', 'O', '░'],
//   ['░', 'O', '░', '░', '░'],
//   ['O', 'O', '░', 'O', '░'],
//   ['░', '^', 'O', 'O', '░'],
//   ['░', '░', '░', '░', '░']
// ]);

// myField.playGame()

const rndField = new Field(Field.generateField(8, 8));
rndField.playGame();
