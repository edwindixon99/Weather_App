

// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=0b104378f4050528fb54062500335403

// const h1 = document.getElementById("h1");
// h1.textContent = "sldjflajfsd";



function displayHome() {
    const content = document.getElementById("h1");
    console.log(document)
    console.log(content);
    content.innerHTML = ""
    // content.appendChild(mainPage());
}

// const getdetails = async function(query) {
//     // const img = document.querySelector('img');
//     const weatherJson = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${query}&APPID=0b104378f4050528fb54062500335403`, {mode: 'cors'})
//     console.log(weatherJson);
//     const weather = await weatherJson.json()
//     console.log(weather);
//     console.log(weather.weather[0].description)
//     console.log(weather.main)
//     console.log(weather.main.temp)
//     console.log(weather.main.temp_min)
//     console.log(weather.main.temp_max)
//     console.log(weather.sys.sunset)
//     // const change = await 
// }


// getdetails('london')

var app = new Vue({
    el: '#app',
    data: {
        query: 'Christchurch',
        location: '',
        locationImgs: [],
        description: '',
        descriptionImg: '',
        temp: '',
        temp_min: '',
        temp_max: '',
        sunset: '',
        error: ''


    },


    methods: {
         async getdetails() {
            try {
                const weatherJson = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${this.query}&APPID=0b104378f4050528fb54062500335403`, {mode: 'cors'})
                console.log(weatherJson);
                const weather = await weatherJson.json()
                console.log(weather);
                this.location = weather.name
                this.description = weather.weather[0].description;
                
                this.temp = weather.main.temp;
                this.temp_min = weather.main.temp_min
                this.temp_max = weather.main.temp_max
                this.sunset = weather.sys.sunset
                this.setImages()
                this.reset()
            } catch (error) {
                this.error = error
            }
        },
        reset : function() {
            this.query = ''
            this.error = ''
        },
        async getlocationImages() {
            this.locationImgs = [];
            for (let i=0; i<12; i++) {
                try {
                    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=541OEcCxCuoK1F80mZD59fBgHN8ppeZn&s=${this.location}`, {mode: 'cors'})
                    const imgJson = await response.json();
                    console.log(await imgJson.data.images.original.url)
                    this.locationImgs.push(await imgJson.data.images.original.url);
                } catch (error) {
                    this.locationImgs.push('https://cdn.mos.cms.futurecdn.net/yCPyoZDQBBcXikqxkeW2jJ-1200-80.jpg')
                }
                console.log(this.locationImgs)
            }
            
        },
        async setImages() {

            this.getlocationImages();


            try {
                console.log(`https://api.giphy.com/v1/gifs/translate?api_key=541OEcCxCuoK1F80mZD59fBgHN8ppeZn&s=${this.description.replace(/\s/g, '+')}`)
                const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=541OEcCxCuoK1F80mZD59fBgHN8ppeZn&s=${this.description.replace(/\s/g, '_')}`, {mode: 'cors'})
                const imgJson = await response.json();
                this.descriptionImg = await imgJson.data.images.original.url;
            } catch (error) {
                this.descriptionImg = 'https://cdn.mos.cms.futurecdn.net/yCPyoZDQBBcXikqxkeW2jJ-1200-80.jpg'
            }
            console.log(this.descriptionImg)
            
            
        }
    },
    beforeMount(){
        this.getdetails()
     },
    
  })