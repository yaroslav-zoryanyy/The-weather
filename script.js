const APIKEY = 'e1d1e56f53d4af1f302a370a536843b4'

const $cardsBox = document.getElementById('cards-box')
const $locationForm = document.getElementById('location-form')
const $locationInput = document.getElementById('location-form-input')
let currentCard = null

async function getWeatherData(location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`)

    const data = await response.json()
    if (data['cod'] === 200){
        return data;
    }else return 0;
}

function getNewCard() {
    const $card = document.createElement('div')
    $card.classList.add('card')

    $card.innerHTML = `
                        <div class="card__inner">
                        <!-- Шапка -->
                        <div class="card__head">
                            <div class="card__head-left">
                                <div class="card__icon"></div>
                                <div class="card__head-left-title">
                                    <h3 class="card__title"></h3>
                                    <span class="card__desc"></span>
                                </div>
                            </div>
                            <div class="card__head-right card-param">
                                <svg class="card-param__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                    d="M15,16a3,3,0,1,1-3-3A3,3,0,0,1,15,16ZM16,5v5.262a7,7,0,1,1-8,0V5a4,4,0,0,1,8,0Zm-1.5,6.675a1,1,0,0,1-.5-.865V5a2,2,0,0,0-4,0v5.81a1,1,0,0,1-.5.865,5,5,0,1,0,5,0Z" />
                    </svg>

                                <span class="card-param-text">
                    <span class="card-param-value card-param-value_temp"></span>
                                <sup>o</sup>C
                                </span>
                            </div>
                        </div>

                        <!-- Футер -->
                        <div class="card__footer">
                            <div class="card__footer-left card-param">

                                <svg class="card-param-icon card-param-icon_footer" viewBox="0 0 800 800">
                    <path
                    d="M616.67,442h-550a31,31,0,1,0,0,62h550A85.67,85.67,0,1,1,531,589.67V573a31,31,0,0,0-62,0v16.67c0,81.42,66.24,147.66,147.67,147.66s147.66-66.24,147.66-147.66S698.09,442,616.67,442Z" />
                    <path
                    d="M66.67,404h550c81.42,0,147.66-66.24,147.66-147.67A148.21,148.21,0,0,0,616.67,108.67C535.24,108.67,469,174.91,469,256.33V273a31,31,0,0,0,62,0V256.33A85.52,85.52,0,1,1,616.67,342h-550a31,31,0,0,0,0,62Z" />
                    <path
                    d="M66.67,304H310.33A120.67,120.67,0,1,0,189.67,183.33V196a31,31,0,0,0,62,0V183.33A58.67,58.67,0,1,1,310.33,242H66.67a31,31,0,0,0,0,62Z" />
                    </svg>

                                <span class="card-param-text_footer">
                    <span class="card-param-value card-param-value_wind">
                    </span> м/c
                                </span>
                            </div>
                            <div class="card__footer-right card-param">
                                <svg class="card-param-icon card-param-icon_footer" viewBox="0 0 800 800">
                    <path
                    d="M88.63,228.84c1.68.66,41.45,16.31,69.62,24.26a298.1,298.1,0,0,0,81.65,11.31c60.5,0,115.67-17.65,169.55-34.88,71.53-22.89,139.1-44.5,215.47-23,25.1,7.08,63.21,22.07,63.7,22.27a31,31,0,0,0,22.76-57.68c-1.68-.66-41.46-16.31-69.63-24.26-94.31-26.61-174.07-1.1-251.2,23.57-71.53,22.89-139.1,44.5-215.47,23-25.14-7.09-63.32-22.12-63.71-22.27a31,31,0,0,0-22.74,57.68Z" />
                    <path
                    d="M711.37,371.16c-1.68-.66-41.45-16.31-69.62-24.26-94.31-26.61-174.07-1.1-251.2,23.57-71.53,22.89-139.11,44.5-215.47,23-25.14-7.09-63.33-22.12-63.71-22.27a31,31,0,1,0-22.74,57.68c1.68.66,41.45,16.31,69.62,24.26a298.1,298.1,0,0,0,81.65,11.31c60.51,0,115.67-17.65,169.54-34.88,71.54-22.89,139.12-44.5,215.48-23,25.1,7.08,63.22,22.08,63.71,22.27a31,31,0,0,0,22.74-57.68Z" />
                    <path
                    d="M711.37,571.16c-1.68-.66-41.45-16.31-69.62-24.26-94.31-26.61-174.07-1.1-251.2,23.57-71.53,22.89-139.1,44.5-215.47,23-25.14-7.09-63.33-22.12-63.71-22.27a31,31,0,1,0-22.74,57.68c1.68.66,41.45,16.31,69.62,24.26a298.1,298.1,0,0,0,81.65,11.31c60.51,0,115.67-17.65,169.54-34.88,71.54-22.89,139.12-44.5,215.48-23,25.1,7.08,63.22,22.08,63.71,22.27a31,31,0,0,0,22.74-57.68Z" />
                    </svg>

                                <span class="card-param-text_footer">
                    <span class="card-param-value card-param-value_humidity">
                    12
                    </span> %
                                </span>
                            </div>
                        </div>
                    </div>
    `

    return {
        $card,
        $icon: $card.querySelector(".card__icon"),
        $title: $card.querySelector('.card__title'),
        $temp: $card.querySelector('.card-param-value_temp'),
        $desc: $card.querySelector('.card__desc'),
        $wind: $card.querySelector('.card-param-value_wind'),
        $humidity: $card.querySelector('.card-param-value_humidity'),
    }
}

$locationForm.addEventListener('submit', function(event) {
    event.preventDefault()

    //const newCard = getNewCard()

    const location = $locationInput.value.trim()
    $locationInput.value = ''

    //$cardsBox.prepend(newCard.$card)

    setTimeout(async function() {
        
        const data = await getWeatherData(location)
        if (data === 0){
            newCard.$card.classList.add("not_found")

        }else{
            const newCard = getNewCard()
            $cardsBox.prepend(newCard.$card)
            newCard.$card.classList.add("loading")
            newCard.$icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`

            newCard.$title.textContent = data.name
            newCard.$desc.textContent = data.weather[0].description
            newCard.$temp.textContent = Math.ceil(data.main.temp)
            newCard.$wind.textContent = data.wind.speed
            newCard.$humidity.textContent = data.main.humidity

            //console.log(data);

            setTimeout(function() {
                // Смена стиля формы
                document.querySelector('.app__container').classList.add('app__container_top')

                // Смена фона
                document.body.style.backgroundImage = `url(img/bg/${data.weather[0].icon}.jpeg)`

                if (currentCard !== null) {
                    // currentCard.$card.classList.remove("full")
                    currentCard.$card.classList.add("glass")
                }
                currentCard = newCard

                newCard.$card.classList.remove("loading")
                newCard.$card.classList.add("full")
            }, 600)
        }

    }, 30)

})