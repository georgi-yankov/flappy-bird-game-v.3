(function() {

    const game = document.getElementById("game");
    const block = document.getElementById("block");
    const hole = document.getElementById("hole");
    const character = document.getElementById("character");
    const scoresValue = document.getElementById("scores-value");
    const levelValue = document.getElementById("level-value");
    let jumpingStep = 4;
    let isJumping = false;
    let scores = 0;
    let level = 0;

    function setHole() {
        let randomNumber = Math.floor(Math.random() * (game.scrollHeight - hole.scrollHeight + 1));
        hole.style.top = randomNumber + 'px';
    }

    function gravity() {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        const gravityStep = 2;

        // Gravity exist if no jump
        if(!isJumping) {
            character.style.top = characterTop + gravityStep + 'px';
        }
    }

    function jump(e) {
        const keyCode = e.keyCode;
        // If "Space" or "ArrowUp" key pressed
        if (keyCode === 32 || keyCode === 38) {
            isJumping = true;            
            let jumpCount = 0;

            let jumpInterval = setInterval(function () {
                let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

                if (jumpCount < 15) {
                    character.style.top = characterTop - jumpingStep + "px";
                }

                // if jumpCount >= 15 && jumpCount <= 20
                // pause for the character, it stays at the top for a while

                if (jumpCount > 20) {
                    clearInterval(jumpInterval);
                    isJumping = false;
                    jumpCount = 0;
                }

                jumpCount++;
            }, 10);
        }
    }

    function updateScores() {
        const holeHeight = parseInt(window.getComputedStyle(hole).getPropertyValue("height"));

        scores++;
        scoresValue.innerHTML = scores;

        if(scores > 0 && !(scores % 5)) {
            level++;
            levelValue.innerHTML = level;
            hole.style.height = holeHeight - 15 + 'px';
        }
    }

    function gameOver() {        
        const gameHeight = parseInt(window.getComputedStyle(game).getPropertyValue("height"));
        const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        const characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        const characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue("width"));
        const characterHeight = parseInt(window.getComputedStyle(character).getPropertyValue("height"));
        const holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
        const holeLeft = parseInt(window.getComputedStyle(hole).getPropertyValue("left"));
        const holeWidth = parseInt(window.getComputedStyle(hole).getPropertyValue("width"));
        const holeHeight = parseInt(window.getComputedStyle(hole).getPropertyValue("height"));

        // Check for top strike
        if(characterTop + jumpingStep <= 0) {
           return true;
        }

        // Check for bottom strike
        if(characterTop >= (gameHeight - characterHeight)) {
           return true;
        }

        // Check for block strike
        if (
            (holeLeft <= characterLeft + characterWidth && holeLeft + holeWidth >= characterLeft) &&
            (characterTop <= holeTop || characterTop >= holeTop + holeHeight)
            ) {
            return true;
        }

    }

    function resetGame() {
        block.style.animation = "none";
        hole.style.animation = "none";

        alert("Game Over");

        isJumping = false;
        scores = 0;
        level = 0;
        scoresValue.innerHTML = scores;
        levelValue.innerHTML = level;

        setHole();

        character.style.top = 250 + "px";
        hole.style.height = 200 + 'px';
        block.style.animation = "block 2s infinite linear";   
        hole.style.animation = "hole 2s infinite linear";
    }

    setInterval(() => {
        gameOver() ? resetGame() : gravity();
    }, 10);

    hole.addEventListener("animationiteration", () => {
        setHole();
        updateScores();
    });

    document.addEventListener("keydown", jump);

})();