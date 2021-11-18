import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Home.scoped.css'
import Banner from '../banner/Banner'
import CurrentWeather from './CurrentWeather'
import SixteenDays from '../SixteenDays/sixteenDays'


<link rel="stylesheet"
    href=
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

export const MyContext = React.createContext()
function Home() {
    function convertTime(time) {
        let hours = time.slice(0, 2) //24hr fromat
        var AmOrPm = hours >= 12 ? 'pm' : 'am'
        hours = (hours % 12) || 12;//if first logic is true second will printed
        let minutes = time.slice(3, 5)//returns the minuts
        var finaltime = hours + ((minutes != '00') && (': ' + minutes)) + ' ' + AmOrPm
        return finaltime
    }
    const [result, setResult] = useState({})
    const [input, setInput] = useState()
    const [flag, setFlag] = useState('home')
    const [data, setData] = useState({})
    const pageOne = useRef(null)
    const pageTwo = useRef(null)
    console.log('current flag is', flag)
    useEffect(() => {
        if (input != null) {
            axios.get(`https://api.weatherbit.io/v2.0/current?city=${input}&key=4afa5d03f4cf4a8db3b9f1125ea48dff`)
                .then(response => {
                    const res = response.data.data[0]
                    setData({
                        icon_code: res.weather.icon,
                        temp: res.temp,
                        app_temp: res.app_temp,
                        wind_spd: res.wind_spd,
                        description: res.weather.description,
                        humidity: res.rh,
                        air_index: res.aqi,
                        sunrise: convertTime(res.sunrise),
                        sunset: res.sunset,
                        isDay: res.pod
                    })
                    console.log('iconcode is', data.icon_code)
                })
        }
    }, [input])

    let temp = []
    let localTime = []
    let windSpeed = []
    useEffect(() => {
        if (input != null) {
            axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?city=${input}&key=4afa5d03f4cf4a8db3b9f1125ea48dff&hours=12`)
                .then(response => {

                    for (const data of response.data.data) {
                        // console.log('temp is', data.temp)
                        temp.push(parseInt(data.temp))
                        localTime.push(convertTime(data.timestamp_local.slice(-8, -3)))
                        windSpeed.push(data.wind_spd)
                    }
                    console.log('inside Effect')
                    console.log('windspeed is', windSpeed)

                    setResult({
                        isReady: true,
                        temperature: temp,
                        time: localTime,
                        windSpeed: windSpeed

                    })
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [input])
    function handleSearch(e){
        e.preventDefault()
        console.log('e is',e)
        return setInput(e.target.elements[0].value)
    }
    // Swipe feature
  
    function showPageOne(){
        pageOne.current.style.transition = 'all .3s'
        pageTwo.current.style.transition = 'all .3s'
        pageOne.current.style.left = '0'
        pageTwo.current.style.left = '100%'
        pageTwo.current.style.display = 'block'
        setFlag('home')
    }
    function showPageTwo(){
        pageOne.current.style.transition = 'all .3s'
        pageTwo.current.style.transition = 'all .3s'
        pageOne.current.style.left = '-100%'
        pageTwo.current.style.left = '0'
        pageTwo.current.style.display = 'block'
        setFlag('current')
    }
    return (
        <React.Fragment>

            <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;" />
            <div className={data.isDay == 'n' ? 'nav-container night' : 'nav-container day'}>
                <div className='searchBar-container'>
                    <form
                        onSubmit={handleSearch}>
                        <input
                            className='search'
                            type='text'
                            placeholder='Cty Name' />
                        <input
                            type='submit'
                            className='icons8-search'

                        />
                    </form>
                </div>
                <div className='btn-container'>
                    <button className= {`btn ${flag=='home'?'home':''}`}
                        onClick={showPageOne}

                        type="button">
                        Today
                    </button>
                    <button className={`btn ${flag=='current'?'current':''}`}
                        onClick={showPageTwo}
                        type="button">
                        10 Days Forecast
                    </button>
                </div>

            </div>


            <MyContext.Provider value={[result, data]}>
            <div className='swipeContainer'>
                <div ref={pageOne}
                     className='page-one'
                     >
                        <Banner />
                        <CurrentWeather />
                    
                </div>
                    <div ref={pageTwo}
                    
                    className='page-two'>
                   
                   
                    
                        <SixteenDays input={input} />
                    
                    </div>
            </div>

            </MyContext.Provider>

        </React.Fragment>


    )
}

export default Home