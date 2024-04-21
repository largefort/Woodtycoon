let wood = 0;
let factoryLevel = 1;
let factoryCost = 10;
let factoryProductionRate = 1000;

const woodCountElement = document.getElementById("wood-count");
const factoryLevelElement = document.getElementById("factory-level");
const buildFactoryButton = document.getElementById("build-factory-btn");
const upgradeSpeedButton = document.getElementById("upgrade-speed-btn");

// Function to update wood count display
function updateWoodCount() {
    woodCountElement.textContent = "Wood: " + wood;
}

// Function to update factory level display
function updateFactoryLevel() {
    factoryLevelElement.textContent = "Factory Level: " + factoryLevel;
}

// Function to handle building a factory
function buildFactory() {
    if (wood >= factoryCost) {
        wood -= factoryCost;
        factoryLevel++;
        factoryCost *= 2; // Increase the cost for the next factory
        updateWoodCount();
        updateFactoryLevel();
        // Update production rate
        updateProductionRate();
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
    } else {
        alert("Not enough wood to upgrade factory speed!");
    }
}

// Event listener for building factory button
buildFactoryButton.addEventListener("click", buildFactory);

// Event listener for upgrading factory speed button
upgradeSpeedButton.addEventListener("click", upgradeSpeed);

// Initial wood count and factory level update
updateWoodCount();
updateFactoryLevel();

// Initial production rate setup
let productionInterval = setInterval(produceWood, factoryProductionRate);
