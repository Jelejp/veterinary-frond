import React from 'react'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import MainLanding from '../components/MainLanding'

const Home = () => {
    return (
        <div>
            <div>
            <PublicNav/>
            </div>
            <div>
            <MainLanding/>
            </div>
            <div>
                <PublicFooter/>
            </div>
        </div>
        
    )
}

export default Home
