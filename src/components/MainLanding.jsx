import React from 'react';
import CarruselBanner from './CarruselBanner';
import Banner from './Banner';

const MainLanding = () => {
	return (
		<div className="">
			<div className="mb-12">
				<CarruselBanner />
			</div>

			<div className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-medium mb-8">
					Are you giving your pet what they really need?
				</h2>
				<p className="text-gray-800 text-xl md:text-4xl mb-8 px-4">
					In addition to those fundamental aspects, emphasize the importance of proper nutrition, regular veterinary check-ups, timely vaccinations, and effective stress management during veterinary consultations and surgeries.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-14">
					<div className="flex flex-col items-center mt-3 shadow-lg p-6 rounded-lg bg-white">
						<img src="/assets/huellita.png" alt="Veterinary" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mb-4 bg-[#FAE7D5]" />
						<h3 className="text-xl md:text-2xl font-semibold">Veterinary</h3>
						<p className="text-base md:text-lg text-center">
							Regular vet check-ups detect health issues early and keep your dog in optimal condition.
						</p>
					</div>
					<div className="flex flex-col items-center mt-3 shadow-lg p-6 rounded-lg bg-white">
						<img src="/assets/social.png" alt="Bathing" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full bg-[#FAE7D5] mb-4" />
						<h3 className="text-xl md:text-2xl font-semibold">Bathing</h3>
						<p className="text-base md:text-lg text-center">
							Regular baths improve your dog's appearance and enhance their health and comfort.
						</p>
					</div>
					<div className="flex flex-col items-center mt-3 shadow-lg p-6 rounded-lg bg-white">
						<img src="/assets/rutina.png" alt="Exercise" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mb-4 bg-[#FAE7D5]" />
						<h3 className="text-xl md:text-2xl font-semibold">Exercise</h3>
						<p className="text-base md:text-lg text-center">
							Daily walks are essential for your pet's physical and mental well-being.
						</p>
					</div>
				</div>
			</div>


			<div className="">
				<Banner banner="/assets/carrusel5.png" />
			</div>

			<section className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl mb-8">
					About VetNova and our services for you and your pet.
				</h2>
				<div className="flex flex-col items-center gap-12">
					<div className="text-center">
						<p className="text-gray-800 text-xl md:text-4xl px-4">
							VetNova is a trusted veterinarian offering bathing, hair cutting, and medical consultation services. All services are provided by appointment to ensure personalized service without waiting.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-14">
						<div className="flex flex-col items-center shadow-lg p-6 rounded-lg bg-white">
							<img src="./assets/turnos.png" alt="Shifts" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mb-4 bg-[#FAE7D5]" />
							<h3 className="text-xl md:text-2xl font-semibold">Shifts</h3>
							<p className="text-base md:text-lg text-center">
								Schedule your appointment and give your pet the care it deserves!
							</p>
						</div>
						<div className="flex flex-col items-center shadow-lg p-6 rounded-lg bg-white">
							<img src="/assets/haircut.png" alt="Haircuts" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full bg-[#FAE7D5] mb-4" />
							<h3 className="text-xl md:text-2xl font-semibold">Haircuts</h3>
							<p className="text-base md:text-lg text-center">
								We offer professional haircuts to keep your pet comfortable and well-groomed.
							</p>
						</div>
						<div className="flex flex-col items-center shadow-lg p-6 rounded-lg bg-white">
							<img src="/assets/maps.png" alt="Find Us" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mb-4 bg-[#FAE7D5]" />
							<h3 className="text-xl md:text-2xl font-semibold">Find Us</h3>
							<p className="text-base md:text-lg text-center">
								We are located in Buenos Aires, Capital Federal, at Paraguay 1919, Recoleta.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default MainLanding;