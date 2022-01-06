import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sixteenDays.scoped.css'


function SixteenDays(props) {
    const input = props.input;
    const [data, setData] = useState({})
    const URL ='0cda2cf1ee7443c69b5cd14b5515ee51'
    useEffect(() => {
        if (input != null) {
            axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${input}&key=${URL}`)
                .then(response => {
                    let temp = []
                    let icon = []
                    let datetime = []
                    let des = []

                    for (const res of response.data.data) {
                        icon.push(res.weather.icon)
                        temp.push(res.temp)
                        datetime.push(res.datetime)
                        des.push(res.weather.description)

                    }
                    setData({
                        icon_code: icon,
                        temp: temp,
                        datetime: datetime,
                        isReady: true,
                        description: des
                    })

                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [input])

    // console.log('data isready is ',data.temp.length())
    return (
        <React.Fragment>

            {data.isReady &&
                data.icon_code.map((x, index) =>
                        <div className='container-wrapper'>
                            <div className='container flex' key={index}>
                                <div className='container-one '>
                                    <h3>{new Date(data.datetime[index]).toLocaleString('en-us', { weekday: 'long' })},
                                        {new Date(data.datetime[index]).getDate()}
                                        {new Date(data.datetime[index]).toLocaleString('default', { month: 'short' })}
                                    </h3>
                                    <p>{data.description[index]}, {data.temp[index]}</p>

                                </div>
                                <div className='container-two '>

                                    <img src={`https://www.weatherbit.io/static/img/icons/${data.icon_code[index]}.png`}
                                    />

                                </div>

                            </div>
                            <hr />
                        </div>
                
                )

            }

        </React.Fragment>
    )
}

export default SixteenDays
