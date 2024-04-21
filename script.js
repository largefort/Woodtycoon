let wood = 0;
let factoryLevel = 1;
let factoryCost = 10;
let factoryProductionRate = 1000;

const woodCountElement = document.getElementById("wood-count");
const factoryLevelElement = document.getElementById("factory-level");
const buildFactoryButton = document.getElementById("build-factory-btn");
const upgradeSpeedButton = document.getElementById("upgrade-speed-btn");
const tutorialOverlay = document.getElementById("tutorial-overlay");
const closeTutorialButton = document.getElementById("close-tutorial-btn");
const jafetsTipsButton = document.getElementById("jafets-tips-btn");
const jafetsTipsModal = document.getElementById("jafets-tips-modal");
const generateTipButton = document.getElementById("generate-tip-btn");
const tipTextElement = document.getElementById("tip-text");

// Function to update wood count display
function updateWoodCount() {
    woodCountElement.textContent = "Wood: " + wood;
}

// Function to update factory level display
function updateFactoryLevel() {
    factoryLevelElement.textContent = "Factory Level: " + factoryLevel;
}

// Function to update build factory button cost display
function updateFactoryCost() {
    buildFactoryButton.textContent = "Build Factory (Cost: " + factoryCost + ")";
}

// Function to handle building a factory
function buildFactory() {
    if (wood >= factoryCost) {
        wood -= factoryCost;
        factoryLevel++;
        factoryCost = Math.ceil(factoryCost * 1.15); // Increase cost by 15%
        updateWoodCount();
        updateFactoryLevel();
        updateFactoryCost();
        updateProductionRate();
        saveGameState(); // Save game state after building factory
    } else {
        alert("Not enough wood to build a factory!");
    }
}

// Function to update production rate based on factory level
function updateProductionRate() {
    factoryProductionRate = 1000 / factoryLevel;
    clearInterval(productionInterval);
    productionInterval = setInterval(produceWood, factoryProductionRate);
}

// Function to produce wood based on factory level
function produceWood() {
    wood += factoryLevel;
    updateWoodCount();
}

// Function to handle upgrading factory speed
function upgradeSpeed() {
    if (wood >= 50) {
        wood -= 50;
        factoryProductionRate /= 1.1; // Increase production rate by 10%
        updateWoodCount();
        updateProductionRate();
        saveGameState(); // Save game state after upgrading speed
    } else {
        alert("Not enough wood to upgrade factory speed!");
    }
}

// Function to save game state to localStorage
function saveGameState() {
    const gameState = {
        wood: wood,
        factoryLevel: factoryLevel,
        factoryCost: factoryCost,
        factoryProductionRate: factoryProductionRate
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
}

// Function to load game state from localStorage
function loadGameState() {
    const savedGameState = localStorage.getItem("gameState");
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        wood = gameState.wood;
        factoryLevel = gameState.factoryLevel;
        factoryCost = gameState.factoryCost;
        factoryProductionRate = gameState.factoryProductionRate;
        updateWoodCount();
        updateFactoryLevel();
        updateFactoryCost();
        updateProductionRate();
    }
}

// Function to show tutorial overlay
function showTutorial() {
    tutorialOverlay.style.display = "flex";
}

// Function to close tutorial overlay
function closeTutorial() {
    tutorialOverlay.style.display = "none";
}

// Function to show Jafet's tips modal
function showJafetsTipsModal() {
    jafetsTipsModal.style.display = "block";
}

// Function to close Jafet's tips modal
function closeJafetsTipsModal() {
    jafetsTipsModal.style.display = "none";
}

// Function to generate a random tip
function generateRandomTip() {
    const tips = [
        "Don't forget to upgrade your factory speed to increase wood production!",
        "Save up wood to build more factories and expand your lumber empire!",
        "Keep an eye on your wood count and make sure you're always producing efficiently!",
        "Use your wood wisely - it's the key to success in this game!",
        "Explore different strategies to maximize your wood production and become a tycoon!"
    ];
    const randomIndex = Math.floor(Math.random() * tips.length);
    tipTextElement.textContent = tips[randomIndex];
}

// Event listeners
buildFactoryButton.addEventListener("click", buildFactory);
upgradeSpeedButton.addEventListener("click", upgradeSpeed);
buildFactoryButton.addEventListener("click", showTutorial);
closeTutorialButton.addEventListener("click", closeTutorial);
jafetsTipsButton.addEventListener("click", showJafetsTipsModal);
generateTipButton.addEventListener("click", generateRandomTip);
jafetsTipsModal.getElementsByClassName("close")[0].addEventListener("click", closeJafetsTipsModal);

// Call loadGameState() when the page is loaded
window.addEventListener("load", loadGameState);

// Initial wood count, factory level, and factory cost update
updateWoodCount();
updateFactoryLevel();
updateFactoryCost();

// Initial production rate setup
let productionInterval = setInterval(produceWood, factoryProductionRate);

// Show tutorial on page load
showTutorial();
