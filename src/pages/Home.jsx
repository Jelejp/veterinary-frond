import React from 'react'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import MainLanding from '../components/MainLanding'
import Chatbot from '../chatbot'

const Home = () => {
    return (
        <div>
            <div>
            <PublicNav/>
            </div>
            <div>
            <MainLanding/>
            <Chatbot/>
            </div>
            <div>
                <PublicFooter/>
            </div>
        </div>
    )
}

export default Home
