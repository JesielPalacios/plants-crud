import axios from 'axios'
import {
  loading,
  error,
  getAllPlants,
  getPlant,
  resetFlags,
} from '../core/redux/plantSlice.js'

export async function getAllPlantsService(dispatch) {
  dispatch(loading())

  try {
    const res = await axios.get('http://localhost:3001/api/plants', {})

    dispatch(getAllPlants(res.data))
  } catch (err) {
    console.log('error', err)
    dispatch(error())
  }
}

export async function getPlantService(dispatch, id) {
  dispatch(loading())

  try {
    const res = await axios.get('http://localhost:3001/api/plant/' + id, {})

    dispatch(getPlant(res.data))
  } catch (err) {
    dispatch(getPlant({}))
    console.log('error', err)
    dispatch(error())
  }
}

export async function createPlantservice(dispatch, PlantData) {
  dispatch(loading())
  const formData = new FormData()
  formData.append('firstName', PlantData.firstName.value)
  formData.append('secondName', PlantData.secondName.value)
  formData.append('firstSurname', PlantData.firstSurname.value)
  formData.append('secondSurname', PlantData.secondSurname.value)
  formData.append('gender', PlantData.gender.value)
  formData.append(
    'typeCitizenshipNumberId',
    PlantData.typeCitizenshipNumberId.value
  )
  formData.append('citizenshipNumberId', PlantData.citizenshipNumberId.value)
  formData.append('academicProgram', PlantData.academicProgram.value)
  formData.append('studentCode', PlantData.studentCode.value)
  formData.append('semester', PlantData.semester.value)
  formData.append('email', PlantData.email.value)
  formData.append('cellPhoneNumber', PlantData.cellPhoneNumber.value)
  formData.append('address', PlantData.address.value)
  formData.append('dateOfBirth', PlantData.dateOfBirth.value)
  formData.append('birthCountry', PlantData.birthCountry.value)
  formData.append('birthDepartment', PlantData.birthDepartment.value)
  formData.append('birthCity', PlantData.birthCity.value)

  try {
    const res = await axios.post('http://localhost:3001/api/Plants', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    dispatch(resetFlags())
    // return res
    console.log('res', res)
  } catch (err) {
    dispatch(getPlant({}))
    console.log('error', err)
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
