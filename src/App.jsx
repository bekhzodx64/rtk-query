import { useState } from 'react'
import {
	useGetGoodsQuery,
	useAddProductMutation,
	useDeleteProductMutation,
} from './redux'

const App = () => {
	const [count, setCount] = useState('')
	const [newProduct, setNewProduct] = useState('')

	const { data = [], isLoading } = useGetGoodsQuery(count)
	const [addProduct, { isError }] = useAddProductMutation()
	const [deleteProduct] = useDeleteProductMutation()

	const onSubmit = async (e) => {
		e.preventDefault()
		if (newProduct) {
			await addProduct({ name: newProduct }).unwrap()
			setNewProduct('')
		}
	}

	const handleDeleteProduct = async (id) => {
		await deleteProduct(id).unwrap()
	}

	if (isLoading) {
		return (
			<div className='fixed inset-0 bg-white flex justify-center items-center'>
				Loading...
			</div>
		)
	}

	return (
		<div className='container min-h-screen py-5 space-y-3'>
			<div className='flex justify-center'>
				<form onSubmit={onSubmit}>
					<input
						className='border py-2 px-5 bg-gray-50 placeholder:italic outline-none border-transparent border-r-0 focus:border-orange-400 focus:border-r-0'
						placeholder='Name of product'
						type='text'
						value={newProduct}
						onChange={(e) => setNewProduct(e.target.value)}
					/>
					<button
						className='py-2 px-5 bg-orange-400 text-white border border-orange-400'
						type='submit'
					>
						Add
					</button>
				</form>
			</div>
			<div className='flex space-x-2 mx-auto w-full max-w-xs justify-center items-center'>
				<p>How many items u want to see ?</p>
				<select
					className='outline-none select-none'
					value={count}
					onChange={(e) => setCount(e.target.value)}
				>
					<option value=''>all</option>
					<option value='2'>2</option>
					<option value='15'>15</option>
					<option value='25'>25</option>
					<option value='35'>35</option>
					<option value='50'>50</option>
				</select>
			</div>
			<ul className='space-y-3 w-full max-w-xs mx-auto'>
				{data?.map((item) => (
					<li
						className='border shadow py-2 px-5 flex items-center justify-between select-none'
						key={item.id}
					>
						<span>{item.name}</span>
						<span
							className='text-2xl text-red-500 cursor-pointer'
							onClick={() => handleDeleteProduct(item.id)}
						>
							×
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
