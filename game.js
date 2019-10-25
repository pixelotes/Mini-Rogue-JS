    var worldScale = 1
    var width = 1920;
    var height = 1080;
	var mouseWheel = 0;
    var gameWorld, cardGroup, cardGroup2, cardGroup3, tokenGroup;    
	var cardSizeW = 180;
	var cardSizeH = 300;
	var pos = [[350,300],[550,120], [550, 440], [750, 300], [950, 120], [950, 440], [1150, 300], [50, 100], [50, 420]];
	var card01, card02, card03, card04, card05, card06, card07, card08, card09;
	var timer;
	var allowMouse = true;
	var allowFlip = true;
	var allowRand = true;

    
    var game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

    function preload() {

        game.load.image('background', 'assets/bg_tile.jpg');
        game.load.image('card001', 'assets/cards/Event.jpg');
        game.load.image('card002', 'assets/cards/Merchant.jpg');
        game.load.image('card003', 'assets/cards/Monster.jpg');
        game.load.image('card004', 'assets/cards/Resting.jpg');
        game.load.image('card005', 'assets/cards/Trap.jpg');
        game.load.image('card006', 'assets/cards/Treasure.jpg');
        game.load.image('card007', 'assets/cards/BossMonster.jpg');
        game.load.image('card008', 'assets/cards/Dungeon.jpg');
        game.load.image('card009', 'assets/cards/CharStatsOld.jpg');
        game.load.image('cardbg001', 'assets/cards/CardBack.jpg');
        game.load.image('cardbg002', 'assets/cards/CardBackTitle.jpg');
        game.load.image('token_r', 'assets/tokens/token_red.png');
        game.load.image('token_b', 'assets/tokens/token_black.png');
        game.load.image('token_y', 'assets/tokens/token_yellow.png');
        game.load.image('token_g', 'assets/tokens/token_green.png');
        game.load.image('token_bl', 'assets/tokens/token_blue.png');
        game.load.image('token_w', 'assets/tokens/token_white.png');

    }
	
	function shuffle(a) {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}
	
    function create() {
		timer = game.time.create(false);
		game.input.mouse.mouseWheelCallback = mouseWheel;
		
        var bg = game.add.tileSprite(0,0,width,height,'background');

        cardGroup = game.add.group();
		//gameWorld.add(cardGroup);
        cardGroup2 = game.add.group();
		//gameWorld.add(cardGroup2);
        cardGroup3 = game.add.group();
		//gameWorld.add(cardGroup3);
        tokenGroup = game.add.group();

        //  Now let's create some random sprites and enable them all for drag and 'bring to top'

        card01 = createCard('card001', 'cardbg001', cardSizeW, cardSizeH, pos[0][0], pos[0][1], cardGroup, false, true, false, true);
        card02 = createCard('card002', 'cardbg001', cardSizeW, cardSizeH, pos[1][0], pos[1][1], cardGroup, false, true, false, true);
        card03 = createCard('card003', 'cardbg001', cardSizeW, cardSizeH, pos[2][0], pos[2][1], cardGroup, false, true, false, true);
        card04 = createCard('card004', 'cardbg001', cardSizeW, cardSizeH, pos[3][0], pos[3][1], cardGroup, false, true, false, true);
        card05 = createCard('card005', 'cardbg001', cardSizeW, cardSizeH, pos[4][0], pos[4][1], cardGroup, false, true, false, true);
        card06 = createCard('card006', 'cardbg001', cardSizeW, cardSizeH, pos[5][0], pos[5][1], cardGroup, false, true, false, true);
        card07 = createCard('card007', 'cardbg001', cardSizeW, cardSizeH, pos[6][0], pos[6][1], cardGroup2, false, true, false, true);
        card08 = createCard('card008', 'cardbg002', cardSizeW, cardSizeH, pos[7][0], pos[7][1], cardGroup3, false, false, false, false);
        card09 = createCard('card009', 'cardbg002', cardSizeW, cardSizeH, pos[8][0], pos[8][1], cardGroup3, false, false, false, false);

        card09.token01 = createToken('token_w', 78, 78, 653, 220);
        card09.addChild(card09.token01);
        card09.token02 = createToken('token_y', 78, 78, 553, 710);
        card09.addChild(card09.token02);
        card09.token03 = createToken('token_r', 78, 78, 373, 546);
        card09.addChild(card09.token03);
        card09.token04 = createToken('token_g', 78, 78, 192, 462);
        card09.addChild(card09.token04);
        
        card08.token01 = createToken('token_w', 78, 78, 630, 958);
        card08.addChild(card08.token01);
        card08.token02 = createToken('token_b', 78, 78, 58, 405);
        card08.addChild(card08.token02);
    }
	
	function update() {
		    // zoom
		if ((game.input.keyboard.isDown(Phaser.Keyboard.Q))) {
			mouseWheel = 0;
			worldScale += 0.025;
		}

		else if ((game.input.keyboard.isDown(Phaser.Keyboard.A))) {
			mouseWheel = 0;
			worldScale -= 0.025;
		}
		
		else if ((game.input.keyboard.isDown(Phaser.Keyboard.R))) {

			if (allowRand === true) {
				allowRand = false;
				randomizeCards();
				game.time.events.add(250, invertRand, this);
			}
		}
		
		else if ((game.input.keyboard.isDown(Phaser.Keyboard.F))) {
			if (allowFlip === true) {
				allowFlip = false;
				flipCards();
				game.time.events.add(250, invertFlip, this);
			}

		}
		
		else if ((game.input.keyboard.isDown(Phaser.Keyboard.U))) {
			if (allowFlip === true) {
				allowFlip = false;
				unflipAll();
				game.time.events.add(250, invertFlip, this);
			}

		}
		
		/*if ((game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP)) {
			game.input.mouse.mouseWheelCallback = null;
				game.input.onUp.addOnce(function() {worldScale += 0.100;})
			
		}
		
		else if ((game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_DOWN)) {
			mouseWheel = 0;
			worldScale -= 0.001;
		}*/
    
		// set a minimum and maximum scale value
		worldScale = Phaser.Math.clamp(worldScale, 0.25, 2);
    
		// set our world scale as needed
		//gameWorld.scale.set(worldScale);
		cardGroup.scale.set(worldScale);
		cardGroup2.scale.set(worldScale);
		cardGroup3.scale.set(worldScale);
		tokenGroup.scale.set(worldScale);
		
		if (game.input.activePointer.isDown) {	
			if (game.origDragPoint) {		
				// move the camera by the amount the mouse has moved since last update		
				game.camera.x += game.origDragPoint.x - game.input.activePointer.position.x;		
				game.camera.y += game.origDragPoint.y - game.input.activePointer.position.y;	
			}	
		// set new drag origin to current position	
		game.origDragPoint = game.input.activePointer.position.clone();
		}
		else {	game.origDragPoint = null;}
	}

    function render() {
        //game.debug.inputInfo(32, 32);
    }
    
    function createToken(front, w, h, posX, posY) {
        var tempToken = game.add.sprite(posX, posY, front);
        tempToken.width=w;
        tempToken.height=h;
        tempToken.inputEnabled = true;
	    tempToken.input.enableDrag(true);
        return tempToken;
    }    
	
	function randomizeCards() {
		var posTemp = [[card01.x, card01.y],[card02.x, card02.y],[card03.x, card03.y],[card04.x, card04.y],[card05.x, card05.y],[card06.x, card06.y]];
		posTemp = shuffle(posTemp);
		card01.x = posTemp[0][0];
		card01.y = posTemp[0][1];
		card02.x = posTemp[1][0];
		card02.y = posTemp[1][1];
		card03.x = posTemp[2][0];
		card03.y = posTemp[2][1];
		card04.x = posTemp[3][0];
		card04.y = posTemp[3][1];
		card05.x = posTemp[4][0];
		card05.y = posTemp[4][1];
		card06.x = posTemp[5][0];	
		card06.y = posTemp[5][1];
	}
	
	function unflipAll() {
		unflipIndividualCard(card01);
		unflipIndividualCard(card02);
		unflipIndividualCard(card03);
		unflipIndividualCard(card04);
		unflipIndividualCard(card05);
		unflipIndividualCard(card06);
		unflipIndividualCard(card07);
	}
	
	function unflipIndividualCard(card) {
          card. flipped = false;
		  card.loadTexture(card.backImage);
	}
	
	function flipCards () {
		flipIndividualCard(card01);
		flipIndividualCard(card02);
		flipIndividualCard(card03);
		flipIndividualCard(card04);
		flipIndividualCard(card05);
		flipIndividualCard(card06);
		flipIndividualCard(card07);
	}
	
	function flipIndividualCard(card) {
		if(card.flippable) {
                if (card.flipped==true) {
                    card.loadTexture(card.frontImage);
                    card.flipped = false;
                } else {
                    card.loadTexture(card.backImage);
                    card.flipped = true;
                }
            }
	}
        
    function createCard(front, back, w, h, posX, posY, group, draggableValue, flippableValue, rotableValue, isFlipped) {
        var tempSprite = game.add.sprite(posX, posY, back);
        if (!isFlipped) tempSprite.loadTexture(front);
        tempSprite.pid = Math.floor((Math.random() * 100000) + 1);
        tempSprite.flipped = isFlipped;
        tempSprite.width=w;
        tempSprite.height=h;
        tempSprite.inputEnabled = true;
        tempSprite.frontImage = front;
        tempSprite.backImage = back;
        tempSprite.flippable = flippableValue;
        tempSprite.rotable = rotableValue;
        tempSprite.draggable = draggableValue;
        if(tempSprite.draggable) tempSprite.input.enableDrag(false, true);
        game.input.onTap.add(function(pointer, isDoubleClick) {  
            if(isDoubleClick) {    
               //flipCard(tempSprite, tempSprite.pid);          
            }
        })
        //if(isDoubleClick){}
        //tempSprite.events.onInputDown.add(flipCard, this);
        tempSprite.events.onInputDown.add(flipCard, this);
       group.add(tempSprite);
       return tempSprite;
    }
    
	function flipMouse () {
		allowMouse = false;

	}
	
	function invertFlip() {
		allowFlip = true;
	}
	
	function invertRand() {
		allowRand = true;
	}
	
	function zoomIn () {
		worldScale += 0.001;
	}
                             
    function flipCard (card, pointer) {
         if (pointer.msSinceLastClick < game.input.doubleTapRate) {
            if(card.flippable) {
                if (card.flipped==true) {
                    card.loadTexture(card.frontImage);
                    card.flipped = false;
                } else {
                    card.loadTexture(card.backImage);
                    card.flipped = true;
                }
            }
         }
	}