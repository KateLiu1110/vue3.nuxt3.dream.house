import houses from '../../data/houses.json'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { region, type } = query

  let filteredHouses = houses

  if (region && region !== '全部') {
    filteredHouses = filteredHouses.filter(h => h.region === region)
  }

  if (type && type !== '全部') {
    filteredHouses = filteredHouses.filter(h => h.type === type)
  }

  return {
    success: true,
    data: filteredHouses,
  }
})
