import React from 'react'
import ReactDOM  from 'react-dom'

import Home from './components/HomeScreen/Home'
import './App.css'

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
  }
export default function App() {
    
    return (
        <div className='app-container' >
       <Home />
      
        </div>
    )
}

ReactDOM.render(<App/>,document.getElementById('app'))