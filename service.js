window.addEventListener('DOMContentLoaded', () => {

    const boxInfo = document.querySelector('.box-info');

    const inputt = document.querySelector('.search-input'),
        buttonn = document.querySelector('.search-button'),
        loader = document.querySelector('.loader');

    let newDiv = document.createElement('div');
    newDiv.classList.add('main-section')
    boxInfo.append(newDiv)

    function giveInfo(city) {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=e9a06e680c21430da81200620223101&q=${city}&aqi=yes`)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            getInfo(data);
            loader.style.display ='none'
        })
        .catch(err => alert('Check the Data'))

    }

    function getInfo(info){
        
        const { country,name,localtime } = info.location;
        const { feelslike_c,wind_kph,temp_c} = info.current;
        const { icon,text} = info.current.condition;
        const { maxtemp_c,mintemp_c} = info.forecast.forecastday[0].day;

        //00:00
        const temp0 = info.forecast.forecastday[0].hour[0].temp_c; 
        const iconHour0 = info.forecast.forecastday[0].hour[0].condition.icon;

        //04:00
        const temp4 = info.forecast.forecastday[0].hour[3].temp_c; 
        const iconHour4 = info.forecast.forecastday[0].hour[3].condition.icon;

        //08:00
        const temp8 = info.forecast.forecastday[0].hour[7].temp_c; 
        const iconHour8 = info.forecast.forecastday[0].hour[7].condition.icon;

        //12:00
        const temp12 = info.forecast.forecastday[0].hour[11].temp_c; 
        const iconHour12 = info.forecast.forecastday[0].hour[11].condition.icon;

        //16:00
        const temp16 = info.forecast.forecastday[0].hour[15].temp_c; 
        const iconHour16 = info.forecast.forecastday[0].hour[15].condition.icon;

        //20:00
        const temp20 = info.forecast.forecastday[0].hour[19].temp_c; 
        const iconHour20 = info.forecast.forecastday[0].hour[19].condition.icon;

        // Time
        let timeArr = localtime.split(' ');
        let hourTime = timeArr[1].split(':')

        if(hourTime[0] >= 20 || hourTime[0] <= 8){
            boxInfo.classList.remove('day');
            boxInfo.classList.add('night')
        }else{
            boxInfo.classList.remove('night');
            boxInfo.classList.add('day')
        }

        //getData

        
        newDiv.style.display = 'block'
        
        newDiv.innerHTML = `
                <div class="current row align-items-center between">
                <div class="col-7 col-md-8 column">
                    <p class="city-name">${name}</p>
                    <p class="country">${country}</p>
                    <img src="https://${icon}" alt="" class="icon">
                    <p class="condition">${text}</p>
                    <p class='now-time'>Time: ${timeArr[1]}</p>
                </div>
                <div class="col-5 col-md-4 column">
                    <h1 class="current-degree">${Math.round(temp_c)}°C</h1>
                    <p class="max-min"><span class="max-degree">${Math.round(maxtemp_c)}°C</span> / <span class="min-degree">${Math.round(mintemp_c)}°C</span></p>
                    <p class="feelslike">Feels like: ${Math.round(feelslike_c)}°C</p>
                    <p class="wind">Wind speed: ${Math.round(wind_kph)}kph</p>
                </div>
            </div>

            <div class="hourly row">
                <div class="now col-4 col-md-2 all">
                    <div class="time">00:00</div>
                    <img src="https://${iconHour0}" alt="" class="image">
                    <div class="temp">${ Math.round(temp0)}°C</div>
                </div>
                <div class="first col-4 col-md-2 all">
                    <div class="time">04:00</div>
                    <img src="https://${iconHour4}" alt="" class="image">
                    <div class="temp">${ Math.round(temp4)}°C</div>
                </div>
                <div class="second col-4 col-md-2 all">
                    <div class="time">08:00</div>
                    <img src="https://${iconHour8}" alt="" class="image">
                    <div class="temp">${ Math.round(temp8)}°C</div>
                </div>
                <div class="third col-4 col-md-2 all">
                    <div class="time">12:00</div>
                    <img src="https://${iconHour12}" alt="" class="image">
                    <div class="temp">${ Math.round(temp12)}°C</div>
                </div>
                <div class="fourth col-4 col-md-2 all">
                    <div class="time">16:00</div>
                    <img src="https://${iconHour16}" alt="" class="image">
                    <div class="temp">${ Math.round(temp16)}°C</div>
                </div>
                <div class="fifth col-4 col-md-2 all">
                    <div class="time">20:00</div>
                    <img src="https://${iconHour20}" alt="" class="image">
                    <div class="temp">${ Math.round(temp20)}°C</div>
                </div>
            </div>
        `
    }

    buttonn.addEventListener('click',(e)=>{
        e.preventDefault()
        let valuee = inputt.value
        

        if(valuee.length == 0){
            alert('Enter the name of the city')
        }else{
            loader.style.display ='flex'
            newDiv.style.display ='none'
            giveInfo(valuee)
        }

       
    })


})
