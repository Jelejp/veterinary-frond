import React from 'react'
import CarruselBanner from './CarruselBanner'
import Banner from './Banner'

const MainLanding = () => {
    return (
        <div>
            <div className="">
                <CarruselBanner />
            </div>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-wrap items-start">
                    <div className="w-full  pr-4">
                        <div className="flex flex-col gap-7">
                            <div className="text-center">
                                <h2 className="text-5xl">Are you giving your pet what he really needs...?</h2>
                            </div>
                            <div className='flex flex-wrap justify-between'>
                                <div className="lg:w-1/3 pl-10 flex flex-col gap-3 mt-7">
                                    <p className="text-gray-800 pl-20">

                                        In addition to those fundamental aspects, you could emphasize the importance of proper nutrition, regular veterinary check-ups for preventive care, timely vaccinations to ensure health, and effective stress management during veterinary consultations and surgeries.
                                    </p>
                                </div>
                                <div className="w-full md:w-1/2 lg:w-1/2 mt-4 md:mt-0 text-center">
                                    <div className="flex justify-between gap-12">
                                        <div className="flex flex-col items-center">
                                            <img src="/assets/huellita.png" alt="icono-Huellita" className="w-21 h-21 object-cover rounded-full mb-2 bg-[#FAE7D5]" />
                                            <h3>Veterinary</h3>
                                            <p className="text-sm text-center">Regular vet check-ups detect health issues early and keep your dog in optimal condition.</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <img src="/assets/social.png" alt="icono-Bathing" className="w-21 h-21 object-cover rounded-full bg-[#FAE7D5] mb-2" />
                                            <h3>Bathing</h3>
                                            <p className="text-sm text-center">Regular baths improve your dog's appearance and enhance their health and comfort.</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <img src="/assets/rutina.png" alt="icono-Rutina" className="w-21 h-21 object-cover rounded-full mb-2 bg-[#FAE7D5]" />
                                            <h3>Exercise</h3>
                                            <p className="text-sm text-center">Daily walks are essential for your pet's physical and mental well-being.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Banner banner="/assets/carrusel5.png" />
            </div>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-wrap items-start">
                    <div className="w-full  pr-4">
                        <div className="flex flex-col gap-7">
                            <div className="text-center">
                                <h2 className="text-5xl">About VetNova and our services for you and your pet</h2>
                            </div>
                            <div className='flex flex-wrap justify-between'>
                                <div className="lg:w-1/3 pl-10 flex flex-col gap-3 mt-7">
                                    <p className="text-gray-800 pl-20">
                                        VetNova is a trusted veterinarian offering bathing, hair cutting and medical consultation services. All services are provided in shifts to ensure personalized service without waiting.
                                    </p>
                                </div>
                                <div className="w-full md:w-1/2 lg:w-1/2 mt-4 md:mt-0 text-center">
                                    <div className="flex justify-between gap-12">
                                        <div className="flex flex-col items-center">
                                            <img src="/assets/turnos.png" alt="icono-turnos" className="w-21 h-21 object-cover rounded-full mb-2 bg-[#FAE7D5]" />
                                            <h3>Shifts</h3>
                                            <p className="text-sm text-center">Schedule your appointment and give your pet the care it deserves!</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <img src="/assets/haircut.png" alt="icono-Bathing" className="w-21 h-21 object-cover rounded-full bg-[#FAE7D5] mb-2" />
                                            <h3>HairCut's</h3>
                                            <p className="text-sm text-center">We offer professional haircuts to keep your pet comfortable and well-groomed.</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <img src="/assets/maps.png" alt="icono-Rutina" className="w-21 h-21 object-cover rounded-full mb-2 bg-[#FAE7D5]" />
                                            <h3>Find Us</h3>
                                            <p className="text-sm text-center">We are located in Buenos Aires, Capital Federal, in Paraguay 1919, Recoleta.</p>
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
