import logo from './logo.svg'
import './App.css'
import sty from './Allstyle.module.css'
import { ProgressBar } from 'react-loader-spinner'
import Items from './components/ItemsList'
import { Component } from 'react'
const URL =
	'https://pixabay.com/api/?q=cat&page=1&key=46222803-e5f023d1346374de5c3b0f821&image_type=photo&orientation=horizontal&per_page=12'
let page = 1
let add = 1
class App extends Component {
	state = {
		hiden: false,
		upd: '',
		listImage: [],
		photourl: '',
	}

	findPhoto = (inf) => {
		const findurl = `https://pixabay.com/api/?q=${inf}&page=1&key=46222803-e5f023d1346374de5c3b0f821&image_type=photo&orientation=horizontal&per_page=12`
		fetch(findurl)
			.then((data) => data.json())
			.then((data) => this.setState({ listImage: data }))
			.catch((error) => console.error(error))
	}

	openBigphoto = (e) => {
		this.setState({ hiden: true, photourl: e })
		console.log(e)
	}
	closeModal = () => {
		this.setState({ hiden: false })
		console.log(123)
	}

	loadMore = (inf) => {
		page += add
		console.log(page)
		const loadmore = `https://pixabay.com/api/?q=${inf}&page=${page}&key=46222803-e5f023d1346374de5c3b0f821&image_type=photo&orientation=horizontal&per_page=12`
		fetch(loadmore)
			.then((data) => data.json())
			.then((data) =>
				data.hits.map((e) => {
					// console.log(e)

					// console.log(data.targer)
					return this.state.listImage.hits.push(e)
					// console.log(e)
				})
			)
			.catch((error) => console.error(error))
		console.log(this.state.listImage.hits)
		// document.getElementById("listPhoto").innerHTML += data
		this.setState({ upd: 'awd' })
	}
	componentDidMount() {
		fetch(URL)
			.then((data) => data.json())
			.then((data) => this.setState({ listImage: data }))
			.catch((error) => console.error(error))

		console.log(this.state.listImage)
		// this.setState({upd:"awd"})
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				this.closeModal()
			}
			if (e.key === 'Enter') {
				page = 1
				this.findPhoto(document.getElementById('namefind').value)
			}
		})
	}
	render() {
		const { listImage, upd, hiden, photourl } = this.state
		console.log(listImage)
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
					{listImage.hits ? (
						listImage.hits.map((data) => {
							// console.log(data.targer)
							return (
								<li
									onClick={(e) => this.openBigphoto(e.target.src)}
									key={data.id}
								>
									<img
										className={sty.img}
										src={data.largeImageURL}
										alt={data.tags}
									/>
									{/* <p>{data.id}</p> */}
								</li>
							)
						})
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
					{/* <Items className={sty.item} info={this.state.listImage}></Items> */}
				</ul>
				<div className={sty.loadMor}>
					<button
						onClick={() =>
							this.loadMore(document.getElementById('namefind').value)
						}
						className={sty.button}
					>
						<span>Load More</span>
					</button>
				</div>

				{hiden && (
					<div onClick={() => this.closeModal()} className={sty.modalBackdrop}>
						<div className={sty.modal}>
							<img className={sty.modalImg} src={photourl} alt="" />
						</div>
					</div>
				)}
			</>
		)
	}
}

export default App
