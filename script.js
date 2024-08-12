let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [" Goblin Dirk"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: " Goblin Dirk", power: 5 },
  { name: " Faerie Dagger", power: 30 },
  { name: " War Hammer", power: 50 },
  { name: " Dragonforged Blade", power: 100 },
];
const monsters = [
  {
    name: "Gelatinous Ooze",
    level: 2,
    health: 15,
    description:
      "A pulsating blob of translucent slime oozes from the shadows. It moves with surprising speed for something so formless.",
  },
  {
    name: "Fanged Beast",
    level: 8,
    health: 60,
    description:
      "A hulking, quadrupedal creature with razor-sharp fangs and glowing red eyes, the fanged beast moves with surprising speed and agility. Its low growl sends shivers down your spine.",
  },
  {
    name: "Dragon",
    level: 20,
    health: 300,
    description:
      "A colossal, winged beast of immense power. Its scales shimmer in hues of gold and crimson, and its fiery breath can incinerate anything in its path. The dragon is a legendary creature, feared and revered in equal measure.",
  },
];
const locations = [
  {
    name: "Town Square",
    "button text": [
      "Visit The Blacksmith",
      "Explore the Caverns",
      "Challenge the Dragon",
    ],
    "button functions": [goStore, goCave, fightDragon],
    text: "You stand in the heart of the town square, a vibrant hub of activity. Vendors hawk their wares, and townsfolk chat animatedly. To the north, a dark cave mouth beckons, while a towering castle looms on the horizon.",
  },
  {
    name: "Blacksmith's Shop",
    "button text": [
      "Buy Health Potion (10 gold)",
      "Upgrade Weapon (30 gold)",
      "Return to Town Square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You step into the blacksmith's shop, the air thick with the scent of hot metal. Tools and weapons are scattered about, and the rhythmic clang of the blacksmith's hammer echoes through the room. A burly figure stands over an anvil, sparks flying as he works.",
  },
  {
    name: "Whispering Cave",
    "button text": [
      "Fight Gelatinous Ooze",
      "Fight Fanged Beast",
      "Return to Town Square",
    ],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the Whispering Cave. The air is thick with moisture and the sound of dripping water echoes from unseen depths. Strange, gurgling noises come from a passage ahead.",
  },
  {
    name: "Fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "Adrenaline surges through your veins as you face your opponent. The monster's eyes gleam with malice, its form a menacing silhouette against the dim light.",
  },
  {
    name: "Kill Monster",
    "button text": [
      "Return to Town Square",
      "Return to Town Square",
      "Return to Town Square",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: "The monster's lifeless body lies at your feet, a testament to your victory. A sense of accomplishment washes over you as you collect the spoils of war.",
  },
  {
    name: "Lose",
    "button text": ["Retry", "Retry", "Retry"],
    "button functions": [restart, restart, restart],
    text: "Darkness consumes you as your life fades to black. The taste of defeat is bitter.",
  },
  {
    name: "Win",
    "button text": ["Play Again", "Play Again", "Play Again"],
    "button functions": [restart, restart, restart],
    text: "Victory is yours! A surge of euphoria fills you as you bask in the glory of your triumph.",
  },
  {
    name: "Mysterious Chamber",
    "button text": ["Choose Two", "Choose Eight", "Leave"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You stumble upon a hidden chamber adorned with strange symbols. A peculiar energy fills the air. A cryptic voice whispers, 'Choose wisely, adventurer. Your fate hangs in the balance.' Two numbers appear before you: 2 and 8. Which do you select?",
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health potions.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a new weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon.";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  text.innerText = monsters[fighting].description;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = [" Goblin Dirk"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You chose " + guess + ". The random numbers are: \n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "*";
  }
  if (numbers.includes(guess)) {
    text.innerText += "\n\nCorrect! You've won 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "\n\nIncorrect! You've lost 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
