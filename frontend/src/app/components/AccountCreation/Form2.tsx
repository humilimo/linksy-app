import React from 'react';

interface FormStep2Props {
    formData: {
      password: string;
      passConfirmation: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePrev: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    error2: string;
  }

const Form2: React.FC<FormStep2Props> = ({ formData, handleChange, handlePrev, handleSubmit, error2}) => {
    return (
        <div> 
            <div className='bg-white px-10 py-10 rounded-3xl border-2 border-gray-200'>
                <h1 className='text-5xl font-semibold'>Linksy | Sign Up</h1>
                <p className='font-medium text-lg text-gray-500 mt-4'>Create a password of at least 8 characters</p>
                <div className='mt-8'>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>Password</label>
                    <input
                        name='password'
                        id='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Your password'
                        type="password"/>
                    </div>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>Confirm your password</label>
                    <input
                        name='passConfirmation'
                        id='passConfirmation'
                        value={formData.passConfirmation}
                        onChange={handleChange}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Your password'
                        type="password"/>
                    </div>
                    {error2 && (
                        <p className='text-red-500 text-sm mt-2'>{error2}</p>
                    )}
                    <div className='mt-8 flex space-x-4'>
                        <button 
                            className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl border-2 border-blue-500 text-blue-500 text-lg font-bold w-1/2'
                            onClick={handlePrev}> 
                            Back
                        </button>
                        <button 
                            className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold w-1/2'
                            onClick={handleSubmit}> 
                            Sign Up
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

export default Form2;