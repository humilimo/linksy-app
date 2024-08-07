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
            <div className='bg-white px-10 py-10 rounded-3xl shadow-lg'>
                <h1 className='text-5xl font-semibold'>Linksy</h1>
                <h3 className='text-2xl font-semibold mt-3'>Cadastro</h3>
                <p className='font-medium text-lg text-gray-500 mt-3'>Digite seus dados para se cadastrar</p>
                <div className='mt-8'>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>Nome</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Seu nome'
                        data-cy={"sign-up-name"} />
                    </div>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>Usuário</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        value={formData.username}
                        onChange={handleChange}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Seu usuário'
                        data-cy={"sign-up-username"} />
                    </div>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>E-mail</label>
                        <input
                            type='text'
                            name='email'
                            id='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder='Seu e-mail'
                            data-cy={"sign-up-email"} />
                    </div>
                    {error1 && (
                        <p 
                            className='text-red-500 text-sm mt-2'
                            data-cy={"sign-up-error-1"}>
                            {error1}
                        </p>
                    )}
                    <div className='mt-8 flex flex-col gap-y-4'>
                        <button 
                            className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold'
                            onClick={handleNext}
                            data-cy={"sign-up-next-button"}> 
                            Próximo
                        </button>
                    </div>
                    <div className='mt-8 flex justify-center items-center'>
                        <p className='font-medium text-base'>Já tem uma conta?</p>
                        <button className='hover:underline text-blue-500 text-base font-medium ml-2'>Entre aqui!</button>
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