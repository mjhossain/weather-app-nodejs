// console.log('Client side app.js')


const form = document.querySelector('form');
const search = document.querySelector('#addr');

const forecast = document.querySelector('#forecast')

form.addEventListener('submit', (e) => {

    e.preventDefault()
    forecast.textContent = 'Loading...'
    let addr = search.value
    fetch(`/weather?address=${addr}`).then((response) => {
        if (response.error) {
            console.log(response.error)
        } else {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    forecast.textContent = `Its ${data.forecast} with a temperature of ${data.temperature} in ${data.location}`;
                }
            })
        }
    })
})