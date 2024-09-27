import logo from './logo.svg'
import './App.css'
import sty from './Allstyle.module.css'
import Items from './components/ItemsList'
import { Component } from 'react'
const URL =
	'https://pixabay.com/api/?q=cat&page=1&key=46222803-e5f023d1346374de5c3b0f821&image_type=photo&orientation=horizontal&per_page=12'

class App extends Component {
	state = {
		hiden: false,
		upd: '',
		listImage: [],
    photourl: ""
	}

	findPhoto = (inf) => {
		const findurl = `https://pixabay.com/api/?q=${inf}&page=1&key=46222803-e5f023d1346374de5c3b0f821&image_type=photo&orientation=horizontal&per_page=12`
		fetch(findurl)
			.then((data) => data.json())
			.then((data) => this.setState({ listImage: data }))
			.catch((error) => console.error(error))
	}

  openBigphoto = (e) => {
this.setState({hiden:true, photourl: e})
console.log(e)
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
				this.setState({ hiden: false })
			}
		})
	}
	render() {
		const { listImage, upd, hiden , photourl} = this.state
		console.log(listImage)
		return (
			<>
				<div className={sty.seachBar}>
					<button
						className={sty.seachBtn}
						onClick={() =>
							this.findPhoto(document.getElementById('namefind').value)
						}
						type="button"
					>
						<span>Search</span>
					</button>

					<input
						className={sty.seachInp}
						id="namefind"
						type="text"
						placeholder="Search images and photos"
					/>
				</div>

				<ul className={sty.list}>
					{listImage.hits
						? listImage.hits.map((data) => {
								// console.log(data.targer)
								return (
									<li onClick={(e) => this.openBigphoto(e.target.src)} key={data.id}>
										<img
											className={sty.img}
											src={data.largeImageURL}
											alt={data.tags}
										/>
										{/* <p>{data.id}</p> */}
									</li>
								)
						  })
						: null}
					{/* <Items className={sty.item} info={this.state.listImage}></Items> */}
				</ul>

				{hiden && (
					<div className={sty.modalBackdrop}>
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
