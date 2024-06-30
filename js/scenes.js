const JUMP_FORCE = 800;



scene('game', () => {
    

    add([
        rect(width(), 48),
        pos(0, height() - 48),
        outline(4),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
    ])
    const bean = add([
        sprite("bean"),
        pos(80, 40),
        area(),
        body(),
    ])
    // .jump() when "space" key is pressed
    onKeyPress("space", () => {
        if (bean.isGrounded()) {
            bean.jump(JUMP_FORCE)
        }
    })
    //Colisão com "tree"
    bean.onCollide('tree', () => {
        addKaboom(bean.pos)
        go("lose", score);
    })
    loop(rand(1, 2.5), () => {
        add([
            rect(48, rand(30, 64)),
            area(),
            outline(4),
            pos(width(), height() - 48),
            anchor("botleft"),
            color(255, 180, 255),
            move(LEFT, 480),
            offscreen({ destroy: true }),
            "tree",
            { passed: false },
        ]);
    });
    // keep track of score
    let score = 0;

    const scoreLabel = add([
        text(score),
        pos(24, 24),
    ]);

    onUpdate("tree", (p) => {
		// check if bean passed the pipe
		if (p.pos.x + p.width <= bean.pos.x && p.passed === false) {
			score++
		    scoreLabel.text = score
			p.passed = true
		}
	})
    
})

//
//
// Scene Lose
// 
//

scene("lose", (score) => {
    add([
        text("Game Over"),
        pos(620, 220),
        anchor("center"),
    ])
    add([
        text("Pontuação:" + score, { size: 18 }),
        pos(620, 250),
        anchor("center"),
    ])
    onKeyPress('space', () => {
        go('game')
    })
})
//
//
// Scene Start
// 
//
scene("start", () => {
    add([
        text("Chrome Dino"),
        pos(620, 220),
        anchor("center"),
    ])
    add([
        text("Presione espaço", { size: 18 }),
        pos(620, 250),
        anchor("center"),
    ])
    onKeyPress('space', () => {
        go('game')
    })
})

go("start")