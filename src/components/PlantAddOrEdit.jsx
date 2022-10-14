import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import SaveIcon from '@mui/icons-material/Save'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Select from 'react-select'

import { resetPlant } from '../core/redux/plantSlice'
import { createPlantService, getPlantService } from '../services/plant.service'
import { Link } from './Plant.styles'
import { Container, plantInputs } from './PlantAddOrEdit.styles'
import { Seo } from './layout/Seo'

export default function PlantAddOrEdit({ title }) {
  // const [name, setName] = useState(null)
  // const [discoveredAt, setDiscoveredAt] = useState(null)
  // const [benefits, setBenefits] = useState(null)
  // const [medicinal, setMedicinal] = useState(null)
  // const [flower, setFlower] = useState(null)
  // const [maximumHeight, setMaximumHeight] = useState(null)
  // const [model, setModel] = useState(null)
  // const [weight, setWeight] = useState(null)
  // const [plantPhoto, setPlantPhoto] = useState(null)
  const [name, setName] = useState('Ginkgodsdcsdcsdc biloba')
  const [discoveredAt, setDiscoveredAt] = useState('2019-03-02')
  // ('04/03/1988')
  // ('2019-03-02T00:00:00.000Z')
  const [benefits, setBenefits] = useState('Mejora la concentración, dentro de la fitoterapia, el ginkgo o Ginkgo biloba, es una de las plantas curativas más conocidas. Se trata de una de las plantas medicinales más antiguas en Asia. Se cree que esta planta curativa es el árbol más antiguo que queda sobre la tierra. Sus hojas, en forma de abanico, son muy características. En cuanto a sus beneficios, esta planta cuenta propiedades antioxidantes que contribuyen a mejorar la concentración y la memoria. ')
  const [medicinal, setMedicinal] = useState('Yes')
  const [flower, setFlower] = useState('Yes')
  const [maximumHeight, setMaximumHeight] = useState(30.9)
  const [model, setModel] = useState('Medicinal')
  const [weight, setWeight] = useState(300.54)
  const [plantPhoto, setPlantPhoto] = useState(null)
  // ('https://via.placeholder.com/520x460')

  const navigate = useNavigate()
  const { plantId } = useParams()
  const dispatch = useDispatch()
  const { plant, loading, error } = useSelector((state) => state.plant)

  // const validateAndSend = () => {
  //   if (name != null && discoveredAt != null && benefits != null && medicinal != null && flower != null && maximumHeight != null && model != null) {
  //     if (plantPhoto != null) {
  //       if (!(plantPhoto.name.endsWith('.png') || plantPhoto.name.endsWith('.jpg') || plantPhoto.name.endsWith('.jpeg'))) {
  //         Swal.fire({
  //           title: '<strong>Error de archivo</strong>',
  //           icon: 'error',
  //           html: 'This type of file cannot be accepted, choose an image of the indicated type!',
  //           showCloseButton: true,
  //           showCancelButton: false,
  //           focusConfirm: false,
  //           confirmButtonText: 'Accept',
  //           confirmButtonAriaLabel: 'Accept'
  //         })
  //       }
  //     }

  //     createPlantService(dispatch, {
  //       name: name.value,
  //       discoveredAt: discoveredAt.value,
  //       benefits: benefits.value,
  //       medicinal: medicinal.value,
  //       flower: flower.value,
  //       maximumHeight: maximumHeight.value,
  //       model: model.value,
  //       weight: weight.value,
  //       plantPhoto
  //     }).then((id) => navigate('/plant/' + id))
  //   } else {
  //     Swal.fire({
  //       title: '<strong>Faltan datos</strong>',
  //       icon: 'error',
  //       html: 'Check the information provided!',
  //       showCloseButton: true,
  //       showCancelButton: true,
  //       focusConfirm: false,
  //       confirmButtonText: 'Try again',
  //       confirmButtonAriaLabel: 'Try again',
  //       cancelButtonText: 'Cancel',
  //       cancelButtonAriaLabel: 'Cancel'
  //     })
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Swal.fire({
    //   title: 'Do you want to save the changes?',
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonColor: '#0f1141',
    //   confirmButtonText: 'Save',
    //   denyButtonText: `Don't save`,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     let timerInterval
    //     Swal.fire({
    //       html: 'Saving..!',
    //       timer: 2000,
    //       timerProgressBar: true,
    //       didOpen: () => {
    //         Swal.showLoading()
    //         const b = Swal.getHtmlContainer().querySelector('b')
    //         timerInterval = setInterval(() => {
    //           b.textContent = Swal.getTimerLeft()
    //         }, 100)
    //       },
    //       willClose: () => {
    //         clearInterval(timerInterval)
    //       },
    //     }).then(async (result) => {
    //       await validateAndSend()
    //       if (result.dismiss === Swal.DismissReason.timer) {
    //         // console.log('I was closed by the timer')
    //       }
    //     })
    //   } else if (result.isDenied) {
    //     Swal.fire('Changes are not saved', '', 'info')
    //   }
    // })

    createPlantService(dispatch, {
      name: name,
      discoveredAt: discoveredAt,
      benefits: benefits,
      medicinal: medicinal,
      flower: flower,
      maximumHeight: maximumHeight,
      model: model,
      weight: weight,
      plantPhoto
    })
  }

  useEffect(() => {
    title === 'Create new plant' && dispatch(resetPlant()) && plantId && navigate('/plant/' + plantId)
    title === 'Edit plant' && getPlantService(dispatch, plantId)
  }, [])

  const options = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]
  const modelCategoryOptions = [
    { value: 'Medicinal', label: 'Medicinal' },
    { value: 'Edible (even raw)', label: 'Edible (even raw)' },
    { value: 'Requires preparation to be edible', label: 'Requires preparation to be edible' },
    { value: 'Poisonous', label: 'Poisonous' },
    { value: 'Non eatable', label: 'Non eatable' },
    { value: 'Ornament', label: 'Ornament' }
  ]

  const customStyles = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: 'flex',
      width: '100%',
      padding: '5px',
      border: 'none',
      borderBottom: '1px solid gray',
      fontSize: '14px',
      cursor: 'pointer'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'

      return { ...provided, opacity, transition }
    }
  }

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

              <div className="formInput">
                <label htmlFor="name">
                  Name
                  <span>
                    *<sup>Required</sup>
                  </span>
                </label>
                <input type="text" id="name" placeholder="Plant name goes here" />
              </div>

              <div className="formInput">
                <label htmlFor="discoveredAt">
                  Discovery date
                  <span>
                    *<sup>Required</sup>
                  </span>
                </label>
                <input type="date" id="discoveredAt" placeholder="Plant discovery date goes here" />
              </div>

              <div className="formInput">
                <label htmlFor="benefits">
                  Benefits
                  <span>
                    *<sup>Required</sup>
                  </span>
                </label>
                <textarea id="benefits" placeholder="Benefits plant description goes here" />
              </div>

              <div className="formInput">
                <label htmlFor="medicinal">
                  Is the plant medicinal?
                  <span>
                    *<sup>Required</sup>
                  </span>
                </label>
                <Select id="medicinal" options={options} placeholder={'Click here to select'} isClearable={true} hideSelectedOptions={true} isSearchable={false} styles={customStyles} />
              </div>

              <div className="formInput">
                <label htmlFor="flower">
                  Does the plant have a flower?
                  <span>
                    *<sup>Required</sup>
                  </span>
                </label>
                <Select id="flower" options={options} placeholder={'Click here to select'} isClearable={true} hideSelectedOptions={true} isSearchable={false} styles={customStyles} />
              </div>

              <div className="formInput">
                <label htmlFor="maximumHeight">
                  Maximum plant height
                  <span>
                    *<sup>Required</sup>
                  </span>
                </label>
                <input type="number" id="maximumHeight" placeholder="Maximum plant height goes here" />
              </div>

              <div className="formInput">
                <label htmlFor="flower">
                  Model (category)
                  <span>
                    *<sup>Required</sup>
                  </span>
                </label>
                <Select id="flower" options={modelCategoryOptions} placeholder={'Click here to select'} isClearable={true} hideSelectedOptions={true} isSearchable={false} styles={customStyles} />
              </div>

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
