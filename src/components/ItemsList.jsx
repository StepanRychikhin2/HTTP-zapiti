import sty from '../Allstyle.module.css'

function Items({ info }) {
	// console.log(info)
	return (
		<>
			{info.hits
				? info.hits.map((data) => {
						// console.log(data.targer)
						return (
							<li onClick={(e) => console.log(e.target.src)} key={data.id}>
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
		</>
	)
}
export default Items

