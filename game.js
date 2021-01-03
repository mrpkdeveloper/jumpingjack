//basic game configuration
let config = {
  type: Phaser.Auto,
  scale: {
    mode: Phaser.Scale.FIT,
    width: 1000,
    height: 550,
  },
  backgroundColor: "blue",
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
