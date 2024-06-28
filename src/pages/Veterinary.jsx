import React from 'react'
import AuthLayout from '../layout/AuthLayout'
import MainVeterinary from '../components/MainVeterinary'
import ChatbotAuth from '../ChatBotAuth'

const Veterinary = () => {
  return (
    <>
      <AuthLayout>
        <section>
          <MainVeterinary />
          <ChatbotAuth />
        </section>
      </AuthLayout>
    </>
  )
}

export default Veterinary
