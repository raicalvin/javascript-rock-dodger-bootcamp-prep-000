/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)
  
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    
    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    
    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (false /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */) {
      return true
    }
    
    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge || rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge || rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true;
    }
    
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
    console.log(rock.style.top)
    GAME.appendChild(rock);

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     if (checkCollision(rock)) {
       endGame();
     }

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     
    rock.style.top = `${parseInt(rock.style.top, 10) + 1}px`;
    
    if (parseInt(rock.style.top, 10) >= 0) {
        window.requestAnimationFrame(moveRock);
    }

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  }

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock);

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)
  console.log(ROCKS);

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  remove();
  clearInterval();
}

function remove() {
  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS.pop();
  }
}

function clearInterval() {}

function moveDodger(e) {
  // implement me! DOOONNNEEE
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   if (e.which == LEFT_ARROW) {
     e.stopPropagation();
     e.preventDefault();
     moveDodgerLeft();
   } else if (e.which == RIGHT_ARROW) {
     e.stopPropagation();
     e.preventDefault();
     moveDodgerRight();
   }
}

function moveDodgerLeft() {
  // implement me! DOOONNNEEE
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
    function step() {
      if (parseInt(DODGER.style.left, 10) != 0) {
        DODGER.style.left = `${parseInt(DODGER.style.left, 10) - 4}px`;
      }
    }
    window.requestAnimationFrame(step);
}

function moveDodgerRight() {
  // implement me! DOOONNNEEE
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
    
    function step() {
      if (parseInt(DODGER.style.left) != 360) {
        DODGER.style.left = `${parseInt(DODGER.style.left, 10) + 4}px`;
      }
    }
    
    window.requestAnimationFrame(step);

}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'
  
  createRock(100);

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
