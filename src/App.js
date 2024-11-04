import React, {
	Component,
	useMemo,
	useState,
	useEffect,
	useCallback,
} from 'react'
import logo from './logo.svg'
import './App.css'
import sty from './Allstyle.module.css'
import { ProgressBar } from 'react-loader-spinner'
import Items from './components/ItemsList'

const URL =
	'https://pixabay.com/api/?q=cat&page=1&key=46222803-e5f023d1346374de5c3b0f821&image_type=photo&orientation=horizontal&per_page=12'
let page = 1
let add = 1

function App() {
	const [hiden, setHiden] = useState(false)
	const [listImage, setListImage] = useState([])
	const [photourl, setPhotourl] = useState('')


	const findPhoto = useCallback((inf) => {


		const findurl = `https://pixabay.com/api/?q=${inf}&page=1&key=46222803-e5f023d1346374de5c3b0f821&image_type=photo&orientation=horizontal&per_page=12`
		fetch(findurl)
			.then((data) => data.json())
			.then((data) => setListImage(data.hits))
			.catch((error) => console.error(error))

	}, [])

	const openBigphoto = useCallback((e) => {
		setHiden(true)

		setPhotourl(e)

		console.log(e)
	}, [])

	const closeModal = useCallback(() => {
		setHiden(false)
		console.log(123)

	}, [])

	const loadMore = useCallback((inf) => {
		page += add
		console.log(page)
		const loadmore = `https://pixabay.com/api/?q=${inf}&page=${page}&key=46222803-e5f023d1346374de5c3b0f821&image_type=photo&orientation=horizontal&per_page=12`
		fetch(loadmore)
			.then((data) => data.json())
			.then((data) => setListImage((prev) => [...prev, ...data.hits]))
			.catch((error) => console.error(error))
	}, [])

	useEffect(() => {
		
		fetch(URL)
			.then((data) => data.json())
			.then((data) => setListImage(data.hits))
			.catch((error) => console.error(error))
	}, [])

	useEffect(() => {
		const handleKeydown = (e) => {
			if (e.key === 'Escape') {

				closeModal()
			}


			if (e.key === 'Enter') {

				page = 1
				findPhoto(document.getElementById('namefind').value)
			}
		}
		document.addEventListener('keydown', handleKeydown)
		return () => {
			document.removeEventListener('keydown', handleKeydown)
		}
	}, [closeModal, findPhoto])


	const memoizedListImage = useMemo(() => listImage, [listImage])


	return (
		<>
			<div className={sty.seachBar}>
				<label>
					<input
						placeholder="Search images and photos"
						id="namefind"
						className={sty.seachInp3}
						type="text"
						required
					></input>
				</label>
			</div>


			<ul id="listPhoto" className={sty.list}>
				{memoizedListImage.length ? (
					memoizedListImage.map((data) => (
						<li onClick={(e) => openBigphoto(e.target.src)} key={data.id}>
							<img
								className={sty.img}
								src={data.largeImageURL}
								alt={data.tags}
							/>
						</li>
					))
				) : (
					<ProgressBar
						visible={true}
						height="200"
						width="200"
						color="#4fa94d"
						ariaLabel="progress-bar-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				)}
			</ul>
			
			<div className={sty.loadMor}>
				<button
					onClick={() => loadMore(document.getElementById('namefind').value)}
					className={sty.button}
				>
					<span>Load More</span>
				</button>
			</div>

			{hiden && (
				<div onClick={closeModal} className={sty.modalBackdrop}>
					<div className={sty.modal}>
						<img className={sty.modalImg} src={photourl} alt="" />
					</div>
				</div>
			)}
		</>
	)
}

export default App
