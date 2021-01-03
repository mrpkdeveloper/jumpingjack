//basic game configuration
let config = {
  type: Phaser.Auto,
  scale: {
    mode: Phaser.Scale.FIT,
    width: 1000,
    height: 440,
  },
  backgroundColor: "#A7E0FD",
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 1000,
      },
      //   debug: true,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let game = new Phaser.Game(config);
let player_config = {
  VelocityX: 200,
  VelocityY: 600,
};

function preload() {
  this.load.image("ground", "assets/topground.png");
  this.load.image("apple", "assets/apple.png");
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}
function create() {
  W = game.config.width;
  H = game.config.height;
  // the below line create image and repet in entire W
  let ground = this.add.tileSprite(0, H - 120, W, 120, "ground");
  ground.setOrigin(0, 0);

  //this for making global
  this.player = this.physics.add.sprite(100, 100, "dude", 4);
  //   let apple = this.add.sprite(200, 100, "apple");
  let apple = this.physics.add.group({
    key: "apple",
    repeat: 8,
    setScale: { x: 0.2, y: 0.2 },
    setXY: { x: 100, y: 0, stepX: 100 },
  });

  let platform = this.physics.add.staticGroup();
  platform.create(800, 200, "ground").setScale(2, 0.5).refreshBody();
  platform.create(200, 100, "ground").setScale(2, 0.5).refreshBody();
  platform.create(500, 250, "ground").setScale(1, 0.5).refreshBody();
  platform.add(ground);

  //other parameter is static or not
  //   this.physics.add.existing(ground, true);
  //   ground.body.allowGravity = false;
  //   ground.body.immovable = true;

  //collision detection between ground and player
  //   this.physics.add.collider(ground, this.player);
  this.physics.add.collider(platform, apple);
  this.physics.add.collider(platform, this.player);
  this.physics.add.overlap(this.player, apple, eatapple, null, this);

  //adding bounce
  this.player.setBounce(0.3);
  this.player.setCollideWorldBounds(true);
  //foar each fruit object adding bounce
  apple.children.iterate(function (f) {
    f.setBounce(Phaser.Math.FloatBetween(0.4, 0.7));
  });

  //keyboard
  this.move = this.input.keyboard.createCursorKeys();

  //animations
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    framerate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 9 }),
    framerate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "center",
    frames: this.anims.generateFrameNumbers("dude", { start: 4, end: 4 }),
    framerate: 10,
  });

  //create camera
  this.cameras.main.setBounds(0, 0, W, H);
  this.physics.world.setBounds(0, 0, W, H);

  this.cameras.main.startFollow(this.player, true, true);
  this.cameras.main.setZoom(1.1);
}

function update() {
  if (this.move.left.isDown) {
    this.player.setVelocityX(-player_config.VelocityX);
    this.player.anims.play("left", true);
  } else if (this.move.right.isDown) {
    this.player.setVelocityX(player_config.VelocityX);
    this.player.anims.play("right", true);
  } else {
    this.player.setVelocityX(0);
    this.player.anims.play("center", true);
  }

  //jumping
  if (this.move.up.isDown && this.player.body.touching.down) {
    this.player.setVelocityY(-player_config.VelocityY);
  }
}

function eatapple(player, apple) {
  apple.disableBody(true, true);
}
