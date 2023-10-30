import React, { useEffect, useState } from "react";
import * as Phaser from "phaser";

const CloudCatcherGame = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: "99%",
      height: 1000,
      //   backgroundColor: "#2d2d2d",
      //   backgroundColor: "#000042",
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image("red", "/logo192.png");
      this.load.image("blue", "/logo512.png");
      this.load.atlas("robot", "/robo.png", "/robo.json");
      this.load.image("sky", "/deepblue.png");
      this.load.image("ball", "/ball-tlb.png");
      //   game.load.image("cloud", "path_to_your_cloud_image.png");
      //   game.load.image("cloudCatcher", "path_to_your_cloud_catcher_image.png");
      //  load.audio("catchSound", "path_to_catch_sound.mp3");
      //  load.audio("missSound", "path_to_miss_sound.mp3");
    }

    function create() {
      //   this.add.image(400, 600, "red").setScale(1.25).setOrigin(0.5, 1);

      this.add.image(0, 0, "sky").setOrigin(0);
      this.group = this.add.group({ key: "ball", frameQuantity: 128 });

      this.input.on(
        "pointermove",
        function (pointer) {
          this.x = pointer.x;
          this.y = pointer.y;
        },
        this
      );

      //   const clouds = game.physics.add.group();
      //   const cloudCatcher = game.physics.add.image(
      //     game.config.width / 2,
      //     game.config.height - 50,
      //     "cloudCatcher"
      //   );
      //   cloudCatcher.setCollideWorldBounds(true);
      //   game.sound.add("catchSound");
      //   game.sound.add("missSound");
      //   game.physics.add.overlap(clouds, cloudCatcher, (cloud, catcher) => {
      //     const number = cloud.getData("number");
      //     if (number % 2 === 0) {
      //       game.sound.play("catchSound");
      //       setScore((prevScore) => prevScore + 1);
      //     } else {
      //       game.sound.play("missSound");
      //       setScore((prevScore) => Math.max(0, prevScore - 1));
      //     }
      //     cloud.destroy();
      //   });
      //   game.time.addEvent({
      //     delay: 2000,
      //     loop: true,
      //     callback: () => {
      //       const x = Phaser.Math.RND.between(0, game.config.width);
      //       const y = 0;
      //       const cloud = game.physics.add.image(x, y, "cloud");
      //       //   clouds.add(cloud);
      //       const cloudNumber = Phaser.Math.RND.between(1, 100);
      //       cloud.setData("number", cloudNumber);
      //       cloud.setVelocity(0, 100);
      //     },
      //   });
    }

    function update(time, delta) {
      this.move += delta;
      if (this.move > 6) {
        Phaser.Actions.ShiftPosition(this.group.getChildren(), this.x, this.y);
        this.move = 0;
      }
      //   const cursorKeys = this.input.keyboard.createCursorKeys();
      //   if (cursorKeys.left.isDown) {
      //     this.cloudCatcher.setVelocityX(-200);
      //   } else if (cursorKeys.right.isDown) {
      //     this.cloudCatcher.setVelocityX(200);
      //   } else {
      //     this.cloudCatcher.setVelocityX(0);
      //   }
    }
  }, []);

  return (
    <div id="game-container">
      <h1>Odd and Even Numbers Cloud Catcher</h1>
      <div id="score">Score: {score}</div>
    </div>
  );
};

export default CloudCatcherGame;
