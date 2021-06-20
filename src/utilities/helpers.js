const URL_BASE = 'https://pokeapi.co/api/v2/pokemon'

export const fetchData = async (url) => {
	return await fetch(URL_BASE + url)
		.then(res => res.json())
}
