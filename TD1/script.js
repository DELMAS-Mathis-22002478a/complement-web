
const dataArray = generateRandomData(20, -10, 40);


const dataContainer = document.getElementById('data-container');
const temperatureHistory = document.getElementById('temperature-history');
const messageContainer = document.getElementById('message-container');
const dataValueElement = document.getElementById('data-value');

function displayDataWithDelay(index) {
    setTimeout(() => {
        const value = dataArray[index];

        const listItem = document.createElement('li');

        dataValueElement.innerHTML = `<span class="temperature">${value} °C</span>`;


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

        listItem.innerHTML = `${value} °C`;
        temperatureHistory.appendChild(listItem);
    }, index * 2000);
}


displayDataWithDelay(0);

for (let i = 1; i < dataArray.length; i++) {
    displayDataWithDelay(i);
}

function generateRandomData(length, min, max) {
    const randomData = [];
    for (let i = 0; i < length; i++) {
        const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
        randomData.push(randomValue);
    }
    return randomData;
}


function showMessage(message) {
    messageContainer.textContent = message;
}

function clearMessage() {
    messageContainer.textContent = '';
}
