const dryBulb = document.getElementById('dry-bulb-temp');
const wetBulb = document.getElementById('wet-bulb-temp');

const submit = document.querySelector('.submit');
const reset = document.querySelector('.reset');
const unit = document.querySelector('.unit');

const display = document.querySelector('.rel-hum-display')
let tempUnit = 'C';

function relHumidityCalculator(dt, wt) {

    const N = 0.6687451584;
    let ed = 6.112 * Math.exp((17.502 * dt)/(240.97 + dt));
    let ew = 6.112 * Math.exp((17.502 * wt)/(240.97 + wt));

    let relHumidity = (ew - N * (1 + 0.00115 * wt)*(dt - wt))/ed;

    let reHumPercent = relHumidity * 100;
    let roundedRelHum = Number(reHumPercent.toPrecision(4));
    return roundedRelHum;
}



submit.addEventListener('click', (e) => {

    // e.preventDefault();
    let dTemp = parseFloat(dryBulb.value);
    let wTemp = parseFloat(wetBulb.value);

    if (tempUnit === 'F') {
        dTemp = (dTemp - 32) * 5 / 9;
        wTemp = (wTemp - 32) * 5 / 9;
    }

    if (isNaN(dTemp) || isNaN(wTemp)) {
        // alert('Please enter valid temperatures.');
        dTemp = 0;
        wTemp = 0;
    }
    // console.log(dTemp);
    const result = relHumidityCalculator(dTemp, wTemp);
    display.innerHTML = `${result}%`;
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        submit.click();
    }
})
reset.addEventListener('click', ()=> {
    dryBulb.value = '';
    wetBulb.value = '';
    display.innerHTML = '';
    return;
})

unit.addEventListener('click', () => {
    
    if (unit.dataset.u === 'C') {
        tempUnit = 'F';
        unit.dataset.u = 'F';
        unit.innerHTML = `&deg;F`;
    } else {
        tempUnit = 'C';
        unit.dataset.u = 'C';
        unit.innerHTML = `&deg;C`;
    }
})