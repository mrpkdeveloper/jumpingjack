//basic game configuration
let config = {
  type: Phaser.Auto,
  scale: {
    mode: Phaser.Scale.FIT,
    width: 600,
    height: 800,
  },
  backgroundColor: 0xff00cc,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let game = new Phaser.Game(config);

function preload() {}
function create() {}
function update() {}
