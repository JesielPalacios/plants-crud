import axios from 'axios'
import { loading, error, getAllPlants, getPlant, resetFlags } from '../core/redux/plantSlice.js'

export async function getAllPlantsService(dispatch) {
  dispatch(loading())

  try {
    const res = await axios.get('http://localhost:3001/api/plants', {})

    dispatch(getAllPlants(res.data))
    // console.log('res', res.data)
  } catch (err) {
    // console.log('error', err)
    dispatch(error())
  }
}

export async function getPlantService(dispatch, id) {
  dispatch(loading())

  try {
    const res = await axios.get('http://localhost:3001/api/plant/' + id, {})

    dispatch(getPlant(res.data))
    // console.log('res', res.data)
  } catch (err) {
    dispatch(getPlant({}))
    // console.log('error', err)
    dispatch(error())
  }
}

export async function createPlantService(dispatch, PlantData) {
  dispatch(loading())
  const formData = new FormData()
  await formData.append('name', PlantData.name)
  await formData.append('discoveredAt', PlantData.discoveredAt)
  await formData.append('benefits', PlantData.benefits)
  await formData.append('medicinal', PlantData.medicinal)
  await formData.append('flower', PlantData.flower)
  await formData.append('maximumHeight', PlantData.maximumHeight)
  await formData.append('model', PlantData.model)
  await formData.append('weight', PlantData.weight)
  
  try {
    const res = await axios.post('http://localhost:3001/api/Plants', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    // console.log('res', res.data)
    dispatch(getPlant(res.data))
    // dispatch(resetFlags())

    return res.data._id
  } catch (err) {
    dispatch(getPlant({}))
    // console.log('error', err)
    dispatch(error())
  }
}

export async function deletePlantService(dispatch, id) {
  dispatch(loading())

  try {
    const res = await axios.delete('http://localhost:3001/api/plant/' + id, {})
    // console.log('res', res)
    dispatch(resetFlags())

  } catch (err) {
    dispatch(getPlant({}))
    // console.log('error', err)
    dispatch(error())
  }
}

// export async function getUserPhotoService(id) {
//   return await axios.get('http://localhost:3001/api/photo/' + id, {
//     headers: {
//       Authorization: token
//     }
//   })
// }
