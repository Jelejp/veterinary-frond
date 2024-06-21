import React from 'react'
import CarruselBanner from './CarruselBanner'

const MainLanding = () => {
    return (
        <div>
            <div className="">
                <CarruselBanner />
            </div>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex flex-wrap items-start">
                    <div className="w-full  pr-4">
                        <div className="flex flex-col gap-7">
                            <div className="text-center">
                                <h2 className="text-5xl">¿Are you giving your pet what he really needs?</h2>
                            </div>
                            <div className='flex flex-wrap justify-between'> 
                            <div className="lg:w-1/3 pl-10 flex flex-col gap-3 mt-7">
                                <p className="text-gray-800">
                                    Hygiene, walking, and medical care are fundamental to your pet's quality of life.
                                </p>
                                <div>
                                    <a href="#" className="btn btn-info btn-lg btn-xxl">
                                        <i>"Search Services"</i>
                                    </a>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/2 mt-4 md:mt-0 text-center">
                                <div className="flex justify-between gap-12">
                                    <div className="flex flex-col items-center">
                                        <img src="src/assets/huellita.png" alt="icono-Huellita" className="w-20 h-20 object-cover rounded-full mb-2 bg-[#FAE7D5]" />
                                        <h3>Veterinary</h3>
                                        <p className="text-sm text-center">Regular vet check-ups detect health issues early and keep your dog in optimal condition.</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img src="src/assets/social.png" alt="icono-Bathing" className="w-20 h-20 object-cover rounded-full bg-[#FAE7D5] mb-2" />
                                        <h3>Bathing</h3>
                                        <p className="text-sm text-center">Regular baths improve your dog's appearance and enhance their health and comfort.</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img src="src/assets/rutina.png" alt="icono-Rutina" className="w-20 h-20 object-cover rounded-full mb-2 bg-[#FAE7D5]" />
                                        <h3>Exercise</h3>
                                        <p className="text-sm text-center">Daily walks are essential for your dog's physical and mental well-being, contributing to their happiness and quality of life.</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLanding
