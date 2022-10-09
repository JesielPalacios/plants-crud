import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import SaveIcon from '@mui/icons-material/Save'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useInputValue } from '../core/hooks/useInputValue'
import { resetPlant } from '../core/redux/plantSlice'
import { createPlantService, getPlantService } from '../services/plant.service'
import { Link } from './Plant.styles'
import { Container, plantInputs } from './PlantAddOrEdit.styles'
import { Seo } from './layout/Seo'

export default function PlantAddOrEdit({ title }) {
  // const name = useInputValue(null)
  // const discoveredAt = useInputValue(null)
  // const benefits = useInputValue(null)
  // const medicinal = useInputValue(null)
  // const flower = useInputValue(null)
  // const maximumHeight = useInputValue(null)
  // const model = useInputValue(null)
  // const weight = useInputValue(null)
  // const [plantPhoto, setPlantPhoto] = useState(null)

  const name = useInputValue('Ginkgo biloba')
  // const discoveredAt = useInputValue('04/03/1988')
  // const discoveredAt = useInputValue('2019-03-02T00:00:00.000Z')
  const discoveredAt = useInputValue('2019-03-02')
  const benefits = useInputValue('Mejora la concentración, dentro de la fitoterapia, el ginkgo o Ginkgo biloba, es una de las plantas curativas más conocidas. Se trata de una de las plantas medicinales más antiguas en Asia. Se cree que esta planta curativa es el árbol más antiguo que queda sobre la tierra. Sus hojas, en forma de abanico, son muy características. En cuanto a sus beneficios, esta planta cuenta propiedades antioxidantes que contribuyen a mejorar la concentración y la memoria. ')
  const medicinal = useInputValue('Yes')
  const flower = useInputValue('Yes')
  const maximumHeight = useInputValue(30.9)
  const model = useInputValue('Medicinal')
  const weight = useInputValue(300.54)
  const [plantPhoto, setPlantPhoto] = useState(null)
  // const [plantPhoto, setPlantPhoto] = useState('https://via.placeholder.com/520x460')

  const navigate = useNavigate()
  const { plantId } = useParams()
  const dispatch = useDispatch()
  const { plant, loading, error } = useSelector((state) => state.plant)

  let nameRef

  function referenceComparator(reference) {
    switch (reference) {
      case 'name':
        nameRef = name
        nameRef.value = plant.name
        break
      case 'discoveredAt':
        nameRef = discoveredAt
        nameRef.value = plant.discoveredAt
        // console.log('plant.discoveredAt', new Date(plant.discoveredAt))
        // console.log('parseInt(plant.discoveredAt, 0)', parseInt(plant.discoveredAt, 0))
        // console.log('parseInt(plant.discoveredAt)', parseInt(plant.discoveredAt))
        break
      case 'benefits':
        nameRef = benefits
        nameRef.value = plant.benefits
        break
      case 'medicinal':
        nameRef = medicinal
        nameRef.value = plant.medicinal
        break
      case 'flower':
        nameRef = flower
        nameRef.value = plant.flower
        break
      case 'maximumHeight':
        nameRef = maximumHeight
        nameRef.value = plant.maximumHeight
        break
      case 'model':
        nameRef = model
        nameRef.value = plant.model
        break
      case 'weight':
        nameRef = weight
        nameRef.value = plant.weight
        break
      case 'plantPhoto':
        nameRef = plantPhoto
        nameRef.value = plant.plantImage
        break
      default:
        nameRef = name
        nameRef.value = ''
        break
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (name != null && discoveredAt != null && benefits != null && medicinal != null && flower != null && maximumHeight != null && model != null) {
      if (plantPhoto != null) {
        if (!(plantPhoto.name.endsWith('.png') || plantPhoto.name.endsWith('.jpg') || plantPhoto.name.endsWith('.jpeg'))) {
          Swal.fire({
            title: '<strong>Error de archivo</strong>',
            icon: 'error',
            html: 'This type of file cannot be accepted, choose an image of the indicated type!',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: 'Accept',
            confirmButtonAriaLabel: 'Accept',
          })
        }
      }

      createPlantService(dispatch, {
        name: name.value,
        discoveredAt: discoveredAt.value,
        benefits: benefits.value,
        medicinal: medicinal.value,
        flower: flower.value,
        maximumHeight: maximumHeight.value,
        model: model.value,
        weight: weight.value,
        plantPhoto,
      })
    } else {
      Swal.fire({
        title: '<strong>Faltan datos</strong>',
        icon: 'error',
        html: 'Check the information provided!',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Try again',
        confirmButtonAriaLabel: 'Try again',
        cancelButtonText: 'Cancel',
        cancelButtonAriaLabel: 'Cancel',
      })
    }
  }

  useEffect(() => {
    title === 'Create new plant' && dispatch(resetPlant()) && plantId && navigate('/plant/' + plantId)
    title === 'Edit plant' && getPlantService(dispatch, plantId)
  }, [])

  return (
    <Container>
      <Seo
        title={
          title === 'Create new plant'
            ? 'New plant'
            : plant.name &&
              'Editing ' +
                plant.name
                  .trim()
                  .toLowerCase()
                  .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase())) +
                ' plant'
        }
        subtitle="New plant form"
      />

      {plantId && (
        <Link to={'/plant/' + plantId} right="145px">
          Go back to plant info
        </Link>
      )}
      <Link to="/plants">Go to plants</Link>

      <div className="newContainer scroll">
        <div className="bottom">
          <div className="left">
            <img
              src={
                plantPhoto
                  ? URL.createObjectURL(plantPhoto)
                  : // plantPhoto
                    'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="plantPhoto" className="button">
                  Click here to choose the image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="plantPhoto" onChange={(e) => setPlantPhoto(e.target.files[0])} style={{ display: 'none' }} />
              </div>

              {plantInputs.map((input, index) => {
                if (title === 'Create new plant') {
                  // input.value = ''
                } else {
                  referenceComparator(input.nameRef)
                }

                return (
                  <div className="formInput" key={index}>
                    <label htmlFor={input.label.split(' ').join('')}>
                      {input.label}
                      {input.important && (
                        <span>
                          *<sup>Required</sup>
                        </span>
                      )}
                    </label>
                    {input.type != 'textArea' && <input type={input.type} id={input.label.split(' ').join('')} placeholder={input.placeholder} {...nameRef} />}
                    {input.type == 'textArea' && <textarea type={input.type} id={input.label.split(' ').join('')} placeholder={input.placeholder} {...nameRef} />}
                  </div>
                )
              })}
              <button>
                Save plant <SaveIcon className="icon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  )
}
