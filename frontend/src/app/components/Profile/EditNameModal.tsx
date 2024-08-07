import { useState } from 'react';
import axiosAuthInstance from '../../../API/axiosAuthInstance';

function EditNameModal(props) {
	const [newName, setName] = useState<string | null>(null);

	const submitNewName = async (e) =>{
		e.preventDefault();
		if(newName) {
			await axiosAuthInstance
			.patch(
				`/user/${props.loggedId}/profile`,
				{name: newName}
			)
			.then(() => {
				props.setShowEditNameModal(false);
				props.setUserFlag(true);
			})
			.catch(error => {
				console.log(error);
			});
		}
	}

	return (
		<>
		<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
			<form onSubmit={submitNewName} className="relative w-auto my-6 mx-auto max-w-3xl">
				<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
					{/* HEADER */}
					<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
						<h3 className="text-3xl font-semibold">
							Insira o novo nome
						</h3>
					</div>
					{/* BODY */}
					<div className="relative p-6 flex-auto">
						{/* <p className="mb-1 text-blueGray-500 text-lg leading-relaxed text-center">
							Para confirmar a deleção do grupo, escreva abaixo <br /> o nome do grupo e clique em 'Deletar' 
						</p> */}
						<input
						name='name'
						id='name'
						onChange={(e)=>{setName(e.target.value)}}
						type="text"
						className='rounded shadow border border-gray-200 px-1 py-2 mt-3 w-full'
						data-cy={"edit-name"}/>
					</div>
					{/* FOOTER */}
					<div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
						<button className="bg-gray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" 
						onClick={() => {
							props.setShowEditNameModal(false); 
							setName(null);
						}}>
							Cancelar
						</button>
						<button
							className="bg-green-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="submit"
							data-cy={"confirm-name-button"}>
							Confirmar
						</button>
					</div>
				</div>
			</form>
		</div>
		<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
	</>
	);
}

export default EditNameModal;