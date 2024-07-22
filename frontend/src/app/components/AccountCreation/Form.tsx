import React from 'react';

interface FormStep1Props {
    formData: {
      name: string;
      email: string;
      username: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNext: () => void;
    error1: String;
  }

const Form: React.FC<FormStep1Props> = ({formData, handleChange, handleNext, error1 }) => {
    return (
        <div> 
            <div className='bg-white px-10 py-10 rounded-3xl border-2 border-gray-200'>
                <h1 className='text-5xl font-semibold'>Linksy | Sign Up</h1>
                <p className='font-medium text-lg text-gray-500 mt-4'>Please, enter your data to sign up</p>
                <div className='mt-8'>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>Name</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Your name'/>
                    </div>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>Username</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        value={formData.username}
                        onChange={handleChange}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Your username'/>
                    </div>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>Email</label>
                        <input
                            type='text'
                            name='email'
                            id='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder='Your email'/>
                    </div>
                    {error1 && (
                        <p className='text-red-500 text-sm mt-2'>{error1}</p>
                    )}
                    <div className='mt-8 flex flex-col gap-y-4'>
                        <button 
                            className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold'
                            onClick={handleNext}> 
                            Next
                        </button>
                    </div>
                    <div className='mt-8 flex justify-center items-center'>
                        <p className='font-medium text-base'>Already have an account?</p>
                        <button className='hover:underline text-blue-500 text-base font-medium ml-2'>Sign in here!</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// const Form: React.FC = () => {
//   return (
//     <div>
//       hello form
//     </div>
//   );
// };

export default Form;