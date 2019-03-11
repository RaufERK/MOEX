function myApp() {
    console.log('RUNNN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    var lastValue = 0;

    async function fetchAsync() {
        let response = await fetch('https://iss.moex.com/iss/engines/currency/markets/selt/securities/USD000UTSTOM.json');
        let data = await response.json();
        return data;
    }


    var timerId = setInterval(function () {
        fetchAsync()
            .then(data => {
                let newValue = data['marketdata']['data'][0][8];
                // newValue += Math.random();
                newValue = newValue.toFixed(4);

                let target = document.getElementById('quotes');
                console.log(newValue + '   ' + lastValue);
                if (newValue > lastValue) {                    
                    target.style.color = 'LightGreen';
                }
                else if (newValue < lastValue) {                    
                    target.style.color = 'red';
                }
                else {                    
                    target.style.color = 'white';
                }
                lastValue = newValue;
                target.innerText = 'USDRUB : '+ newValue;
            })
            .catch(reason => console.log(reason.message))
    }, 1000);
}


