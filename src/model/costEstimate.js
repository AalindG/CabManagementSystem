import costEstimate from '../seeder/cost.json'  assert {type: 'json'}

function estimateCost(source, destination) {
  const costObject = costEstimate.find(({ cities }) => {
    return cities.includes(source) && cities.includes(destination)
  })

  const { distance, tolls } = costObject

  const costForDistance = distance * 10
  const costForTolls = (tolls * 50)
  const gst = 5
  const total = (costForDistance + costForTolls) * (1 + (gst / 100))

  return {
    distance,
    costForDistance,
    tolls,
    costForTolls,
    gst,
    total
  }

}

export {
  estimateCost
}
