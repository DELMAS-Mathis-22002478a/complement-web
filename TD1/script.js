// Étape 1: Création du tableau de données
const dataArray = generateRandomData(20, -10, 40);

// Étape 2: Récupération des éléments du DOM
const dataContainer = document.getElementById('data-container');
const temperatureHistory = document.getElementById('temperature-history');
const messageContainer = document.getElementById('message-container');
const dataValueElement = document.getElementById('data-value');

// Étape 3: Affichage des données avec un délai
function displayDataWithDelay(index) {
    setTimeout(() => {
        const value = dataArray[index];

        // Création d'un élément de liste pour chaque valeur de température
        const listItem = document.createElement('li');

        // Affichage de la température dans le paragraphe avec le symbole °C
        dataValueElement.innerHTML = `<span class="temperature">${value} °C</span>`;

        // Évaluation de la valeur et ajout/modification de la classe CSS
        if (value >= -10 && value < 0) {
            dataValueElement.className = 'blue-border';
            listItem.className = 'blue-border';
            showMessage("Brrrrrrr, un peu froid ce matin, mets ta cagoule !");
        } else if (value >= 0 && value < 20) {
            dataValueElement.className = 'green-border';
            listItem.className = 'green-border';
            clearMessage();
        } else if (value >= 20 && value < 30) {
            dataValueElement.className = 'orange-border';
            listItem.className = 'orange-border';
            clearMessage();
        } else if (value >= 30 && value <= 40) {
            dataValueElement.className = 'red-border';
            listItem.className = 'red-border';
            showMessage("Caliente ! Vamos a la playa, ho hoho hoho !!");
        }

        // Ajout de l'élément de liste à l'historique
        listItem.innerHTML = `${value} °C`;
        temperatureHistory.appendChild(listItem);

        // ARIA: Indiquer que l'élément a été mis à jour
        dataValueElement.setAttribute('aria-live', 'polite');
        dataValueElement.setAttribute('aria-atomic', 'true');

        // ARIA: Indiquer qu'un nouvel élément a été ajouté à l'historique
        temperatureHistory.setAttribute('aria-live', 'assertive');
    }, index * 2000);
}

// Affichage initial
displayDataWithDelay(0);

// Affichage successif des données
for (let i = 1; i < dataArray.length; i++) {
    displayDataWithDelay(i);
}

// Fonction pour générer un tableau de données aléatoires
function generateRandomData(length, min, max) {
    const randomData = [];
    for (let i = 0; i < length; i++) {
        const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
        randomData.push(randomValue);
    }
    return randomData;
}

// Fonction pour afficher un message au-dessus de la zone d'affichage
function showMessage(message) {
    messageContainer.textContent = message;
}

// Fonction pour effacer le message au-dessus de la zone d'affichage
function clearMessage() {
    messageContainer.textContent = '';
}

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('article');

    tabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.style.display = 'none');

    const selectedTab = document.getElementById(tabId);
    const selectedTabContent = document.getElementById(tabId + '-content');

    selectedTab.classList.add('active');
    selectedTabContent.style.display = 'block';

    if (tabId === 'current-tab') {
        temperatureSensor.displayCurrentValue();
    } else if (tabId === 'history-tab') {
        temperatureSensor.displayHistory();
    }
}

const temperatureSensor = new TemperatureSensor();


