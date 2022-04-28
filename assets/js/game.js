// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less
var fightOrSkip = function () {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    promptFight = promptFight.toLowerCase();
    if (promptFight == "" || promptFight == null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    if (promptFight === "skip") {
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    }
    if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        return true;
        shop();
    }
    return false;
};

var fight = function(enemy) {
    while(enemy.health > 0 && playerInfo.health > 0) {
        if (fightOrSkip()) {
            break;
        }
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max( 0, enemy.health - damage);
        console.log(
            playerInfo.name  + " attacked " +  enemy.name + " . " + enemy.name + " now has " + enemy.health + " health remaining. "
        );
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max( 0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " +  playerInfo.name + " . " + playerInfo.name + " now has  " + playerInfo.health + " health remaining. "
        );

        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died! ");
            playerInfo.money = playerInfo.money + 20;
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health remaining. ");
        } console.log(enemy.name + " attacked " +  playerInfo.name  + " . " + playerInfo.name + " now has " + playerInfo.health + " health remaining. ");
            if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died! ");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health remaining. ");
        }
    }
};

var startGame = function() {
    playerInfo.reset();
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            playerInfo.health = 100;
            playerInfo.attack = 10;
            playerInfo.money = 10;
            window.alert("Welcome to Robot Gladiators! Round "+ (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm) {
                shop();
                }
            }
        }
    }
};

var endGame = function () {
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE'");
        switch (shopOptionPrompt) {
            case "refill":
            case "REFILL":
                playerInfo.refillHealth();
                break;
            case "upgrade":
            case "UPGRADE":
                playerInfo.upgradeAttack();
                break;
            case "leave":
            case "LEAVE":
                window.alert("Leaving the store.");
                break;
            default:
                window.alert("You did not pick a valid option. Try again.");
                shop();
                break;
        }
};

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max-min + 1) + min);
    return value;
};

var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    { name: "Roborto", attack: randomNumber(10, 14) },
    { name: "Amy Android", attack: randomNumber(10, 14) },
    {name: "Robo Trumble", attack: randomNumber(10, 14) },

];

startGame();
endGame();


