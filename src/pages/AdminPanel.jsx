import React from 'react'
import { useSelector } from 'react-redux';
import AuthLayout from '../layout/AuthLayout';
import NewServiceForm from '../components/NewServiceForm';
import EditServicePrice from '../components/EditServicePrice';
<<<<<<< HEAD
=======
import NewVeterinarian from '../components/NewVeterinarian';
import DeleteVeterinarian from '../components/DeleteVaterinarian';
>>>>>>> newdev


const AdminPanel = () => {

  const token = useSelector(store => store.authReducer.token);
  

  return (
    <>
      <AuthLayout>
        <main className="flex flex-wrap justify-center items-start gap-2 min-h-[90vh] p-4 mb-4" >
          <h1 className='text-5xl text-white font bold w-11/12 text-center bg-[#8BA8C4] py-4 rounded mt-10'  >Admin Panel</h1>
          <div className='w-11/12 lg:w-8/12 xl:w-4/12 2xl:2/12 flex flex-col justify-center items-center'>
<<<<<<< HEAD
            <h3 className='text-3xl text-white font-bold w-11/12 text-center bg-[#8BA8C4] py-1 rounded mt-14 mb-4' >Create a new Service</h3>
=======
            <h3 className='text-3xl text-white font-bold w-11/12 text-center bg-[#8BA8C4] py-1 rounded mt-14 mb-4' >Create a new service</h3>
>>>>>>> newdev
            <NewServiceForm />
          </div>

          <div className='w-11/12 lg:w-8/12 xl:w-4/12 2xl:2/12 flex flex-col justify-center items-center'>
<<<<<<< HEAD
            <h3 className='text-3xl text-white font-bold w-11/12 text-center bg-[#8BA8C4] py-1 rounded mt-14 mb-4' >Update Service Price</h3>
            <EditServicePrice />
          </div>

=======
            <h3 className='text-3xl text-white font-bold w-11/12 text-center bg-[#8BA8C4] py-1 rounded mt-14 mb-4' >Update service price</h3>
            <EditServicePrice />
          </div>
          <div className='w-11/12 lg:w-8/12 xl:w-4/12 2xl:2/12 flex flex-col justify-center items-center'>
            <h3 className='text-3xl text-white font-bold w-11/12 text-center bg-[#8BA8C4] py-1 rounded mt-14 mb-4' >Add new veterinarian</h3>
            <NewVeterinarian />
          </div>
          <div className='w-11/12 lg:w-8/12 xl:w-4/12 2xl:2/12 flex flex-col justify-center items-center'>
            <h3 className='text-3xl text-white font-bold w-11/12 text-center bg-[#8BA8C4] py-1 rounded mt-14 mb-4' >Delete a veterinarian</h3>
            <DeleteVeterinarian />
          </div>
>>>>>>> newdev
        </main>
      </AuthLayout>
    </>
  );
};

export default AdminPanel

// 
