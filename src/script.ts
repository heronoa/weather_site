const c = (e)=> document.querySelector(e);
const cs = (e)=> document.querySelectorAll(e);

c('.busca').addEventListener('submit', async (event: any)=>{
    event.preventDefault();

    let input = (c('#searchInput') as HTMLInputElement).value;

    if (input !== '') {
        //Loading
        showWarning('Loading...');
        //Internal Requisition
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e343fb683adb68e3711bc7412564068e&units=metric&lang=pt_br`;
        let results = await fetch(url);
        let json = await results.json();
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temperature: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo();
        }

    }

});

function showInfo(json) {
    clearInfo();
    showWarning("");
    
    // Fill the info from the API to my results
    c('.titulo').innerHTML = `${json.name}, ${json.country}`;
    c('.tempInfo').innerHTML = `${json.temperature} <sup>ºC</sup>`;
    c('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    c('.temp img').setAttribute = `"http://openweathermap.org/img/wn/${json.tempIcon}@2x.png"`;
    c('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    //Display Result
    (c('.resultado') as HTMLDivElement).style.display="block";

}

function clearInfo() {
    (c('.resultado') as HTMLDivElement).style.display="none";
}

function showWarning(msg: string) {
    clearInfo();
    c('.aviso').innerHTML = msg;
}
