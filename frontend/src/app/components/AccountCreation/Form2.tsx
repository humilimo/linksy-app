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
                <h1 className='text-5xl font-semibold'>Linksy</h1>
                <h3 className='text-2xl font-semibold mt-3'>Cadastro</h3>
                <p className='font-medium text-lg text-gray-500 mt-4'>Crie uma senha de até 8 caracteres</p>
                <div className='mt-8'>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>Senha</label>
                    <input
                        name='password'
                        id='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Sua senha'
                        type="password"
                        data-cy={"sign-up-password"}/>
                    </div>
                    <div className='pb-5'>
                    <label className='text-lg font-medium'>Confirme sua senha</label>
                    <input
                        name='passConfirmation'
                        id='passConfirmation'
                        value={formData.passConfirmation}
                        onChange={handleChange}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Confirmação da senha'
                        type="password"
                        data-cy={"sign-up-passConfirmation"}/>
                    </div>
                    {error2 && (
                        <p
                            className='text-red-500 text-sm mt-2'
                            data-cy={`sign-up-error-${error2 == "Sua senha tem menos de 8 caracteres" ? ('2'): ('3')}`} >
                            
                            {error2}
                        </p>
                    )}
                    <div className='mt-8 flex space-x-4'>
                        <button 
                            className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl border-2 border-blue-500 text-blue-500 text-lg font-bold w-1/2'
                            onClick={handlePrev}> 
                            Voltar
                        </button>
                        <button 
                            className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold w-1/2'
                            onClick={handleSubmit}
                            data-cy={"sign-up-button"}> 
                            Cadastrar
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

export default Form2;