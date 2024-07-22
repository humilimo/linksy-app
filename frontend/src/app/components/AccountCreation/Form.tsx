import React from 'react';

export default function Form(){

    return (
        <div> 
            <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>
                <h1 className='text-5xl font-semibold'>Cadastre-se</h1>
                <p className='font-medium text-lg text-gray-500 mt-4'>Por favor, insira seus dados abaixo para criar uma conta</p>
                <div className='mt-8'>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>Nome</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Digite seu nome'/>
                    </div>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>Usuário</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Digite seu usuário'/>
                    </div>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>E-mail</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Digite seu e-mail'/>
                    </div>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>Senha</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Digite sua senha'
                        type="password"
                        />
                    </div>
                    <div className='mt-8 flex flex-col gap-y-4'>
                        <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold'> Registrar</button>
                    </div>
                    <div className='mt-8 flex justify-center items-center'>
                        <p className='font-medium text-base'>Já tem uma conta?</p>
                        <button className='hover:underline text-blue-500 text-base font-medium ml-2'>Entre aqui</button>
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

// export default Form;