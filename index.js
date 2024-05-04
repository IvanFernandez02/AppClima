
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const aguaCaja = document.querySelector('.agua-caja');
const aguaDetalles = document.querySelector('.agua-detalles');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '6109fbb7706d8ff943197180debc4fcc';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                aguaCaja.style.display = 'none';
                aguaDetalles.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.agua-caja img');
            const temperatura = document.querySelector('.agua-caja .temperatura');
            const descripcion = document.querySelector('.agua-caja .descripcion');
            const humedad = document.querySelector('.agua-detalles .humedad span');
            const viento = document.querySelector('.agua-detalles .viento span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            descripcion.innerHTML = `${json.weather[0].description}`;
            humedad.innerHTML = `${json.main.humidity}%`;
            viento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            aguaCaja.style.display = '';
            aguaDetalles.style.display = '';
            aguaCaja.classList.add('fadeIn');
            aguaDetalles.classList.add('fadeIn');
            container.style.height = '590px';


        });


});