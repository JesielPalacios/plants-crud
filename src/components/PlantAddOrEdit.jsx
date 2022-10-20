import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import SaveIcon from '@mui/icons-material/Save'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Select from 'react-select'
import { useForm } from 'react-hook-form'

import { resetPlant } from '../core/redux/plantSlice'
import {
  createPlantService,
  getPlantPhotoService,
  getPlantService
} from '../services/plant.service'
import { Link, Loading } from './Plant.styles'
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
  const [benefits, setBenefits] = useState(
    'Mejora la concentración, dentro de la fitoterapia, el ginkgo o Ginkgo biloba, es una de las plantas curativas más conocidas. Se trata de una de las plantas medicinales más antiguas en Asia. Se cree que esta planta curativa es el árbol más antiguo que queda sobre la tierra. Sus hojas, en forma de abanico, son muy características. En cuanto a sus beneficios, esta planta cuenta propiedades antioxidantes que contribuyen a mejorar la concentración y la memoria. '
  )
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
  console.log(
    'useSelector((state) => state.plant)',
    useSelector((state) => state.plant)
  )

  const validateAndSend = () => {
    if (
      name != null &&
      discoveredAt != null &&
      benefits != null &&
      medicinal != null &&
      flower != null &&
      maximumHeight != null &&
      model != null
    ) {
      if (plantPhoto != null) {
        if (
          !(
            plantPhoto.name.endsWith('.png') ||
            plantPhoto.name.endsWith('.jpg') ||
            plantPhoto.name.endsWith('.jpeg')
          )
        ) {
          Swal.fire({
            title: '<strong>Error de archivo</strong>',
            icon: 'error',
            html: 'This type of file cannot be accepted, choose an image of the indicated type!',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: 'Accept',
            confirmButtonAriaLabel: 'Accept'
          })
        }
      }

      createPlantService(
        dispatch,
        {
          name: name,
          discoveredAt: discoveredAt,
          benefits: benefits,
          medicinal: medicinal,
          flower: flower,
          maximumHeight: maximumHeight,
          model: model,
          weight: weight,
          plantPhoto
        },
        title,
        plantId
      ).then((id) => navigate('/plant/' + id))
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
        cancelButtonAriaLabel: 'Cancel'
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Swal.fire({
    //   title: 'Do you want to save the changes?',
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonColor: '#0f1141',
    //   confirmButtonText: 'Save',
    //   denyButtonText: `Don't save`
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
    //       }
    //     }).then((result) => {
    //       validateAndSend()

    //       if (result.dismiss === Swal.DismissReason.timer) {
    //         // console.log('I was closed by the timer')
    //       }
    //     })
    //   } else if (result.isDenied) {
    //     Swal.fire('Changes are not saved', '', 'info')
    //   }
    // })

    createPlantService(
      dispatch,
      {
        name: name,
        discoveredAt: discoveredAt,
        benefits: benefits,
        medicinal: medicinal,
        flower: flower,
        maximumHeight: maximumHeight,
        model: model,
        weight: weight,
        plantPhoto
      },
      title,
      plantId
    )
  }

  const yesOrNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]

  const modelCategoryOptions = [
    { value: 'Medicinal', label: 'Medicinal' },
    { value: 'Edible (even raw)', label: 'Edible (even raw)' },
    {
      value: 'Requires preparation to be edible',
      label: 'Requires preparation to be edible'
    },
    { value: 'Poisonous', label: 'Poisonous' },
    { value: 'Non eatable', label: 'Non eatable' },
    { value: 'Ornament', label: 'Ornament' }
  ]

  const customStyles = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: 'flex',
      width: '100%',
      border: 'none',
      borderBottom: '1px solid gray',
      fontSize: '14px',
      cursor: 'pointer'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'
      const cursor = 'pointer'

      return { ...provided, opacity, transition, cursor }
    }
  }

  function convertToTimestamp(date) {
    if (date) {
      let splitDate = date.split('-')
      let newDate = new Date(
        splitDate[0],
        splitDate[1] - 1,
        splitDate[2].slice(0, 2)
      )
      console.log(newDate.getTime())
      return newDate
    }
  }

  function fortmatDate(date) {
    if (date) {
      let splitDate = date.split('-')
      return splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2].slice(0, 2)
    }
  }

  useEffect(() => {
    // title === 'Create new plant' &&
    //   dispatch(resetPlant()) &&
    //   plantId &&
    //   navigate('/plant/' + plantId)
    async function calls() {
      await getPlantService(dispatch, plantId)
      // getPlantPhotoService(dispatch, plantId)
    }

    title === 'Create new plant' && dispatch(resetPlant())
    title === 'Edit plant' && calls()
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
                  .replace(/\w\S*/g, (w) =>
                    w.replace(/^\w/, (c) => c.toUpperCase())
                  ) +
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

      <div className="newContainer">
        {loading && <Loading />}

        {error && 'Something went wrong'}

        {!loading && plant && (
          <div className="bottom">
            <div className="left">
              {plant.plantImage ? (
                <img
                  crossorigin="anonymous"
                  crossOrigin="anonymous"
                  src={
                    plantPhoto
                      ? URL.createObjectURL(plantPhoto)
                      : // plantPhoto
                      plant.plantImage
                      ? 'http://localhost:3001' + plant.plantImage
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=""
                />
              ) : (
                <img
                  src={
                    plantPhoto
                      ? URL.createObjectURL(plantPhoto)
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=""
                />
              )}

              {console.log('plant.plantImage', plant.plantImage)}
            </div>
            <div className="right">
              <form onSubmit={handleSubmit}>
                <div className="formInput">
                  <label htmlFor="plantPhoto" className="button">
                    Click here to choose the image:{' '}
                    <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="plantPhoto"
                    style={{ display: 'none' }}
                    onChange={(e) => setPlantPhoto(e.target.files[0])}
                  />
                </div>

                <FormItem id="name" title="Name" important={true}>
                  <input
                    type="text"
                    id="name"
                    placeholder="Plant name goes here"
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={
                      title === 'Edit plant'
                        ? plant.name &&
                          plant.name[0].toUpperCase() +
                            plant.name.slice(1).toLowerCase()
                        : ''
                    }
                  />
                </FormItem>

                <FormItem
                  id="discoveredAt"
                  title="Discovery date"
                  important={true}
                >
                  <input
                    type="date"
                    id="discoveredAt"
                    placeholder="Plant discovery date goes here"
                    onChange={(e) => setDiscoveredAt(e.target.value)}
                    defaultValue={
                      title === 'Edit plant'
                        ? fortmatDate(plant.discoveredAt)
                        : ''
                    }
                  />
                </FormItem>

                <FormItem id="benefits" title="Benefits" important={true}>
                  <textarea
                    id="benefits"
                    placeholder="Benefits plant description goes here"
                    onChange={(e) => setBenefits(e.target.value)}
                    defaultValue={title === 'Edit plant' ? plant.benefits : ''}
                  />
                </FormItem>

                <FormItem
                  id="medicinal"
                  title="Is the plant medicinal?"
                  important={true}
                >
                  <Select
                    id="medicinal"
                    options={yesOrNoOptions}
                    placeholder={'Click here to select'}
                    isClearable={true}
                    hideSelectedOptions={true}
                    isSearchable={false}
                    styles={customStyles}
                    onChange={setFlower}
                    defaultValue={
                      title === 'Edit plant'
                        ? {
                            value: plant.medicinal,
                            label: plant.medicinal
                          }
                        : ''
                    }
                  />
                </FormItem>

                <FormItem
                  id="flower"
                  title="Does the plant have a flower?"
                  important={true}
                >
                  <Select
                    id="flower"
                    options={yesOrNoOptions}
                    placeholder={'Click here to select'}
                    isClearable={true}
                    hideSelectedOptions={true}
                    isSearchable={false}
                    styles={customStyles}
                    onChange={setFlower}
                    defaultValue={
                      title === 'Edit plant'
                        ? {
                            value: plant.flower,
                            label: plant.flower
                          }
                        : ''
                    }
                  />
                </FormItem>

                <FormItem
                  id="maximumHeight"
                  title="Maximum height"
                  important={true}
                >
                  <input
                    type="number"
                    id="maximumHeight"
                    placeholder="Maximum plant height goes here"
                    onChange={(e) => setMaximumHeight(e.target.value)}
                    defaultValue={
                      title === 'Edit plant' ? plant.maximumHeight : ''
                    }
                  />
                </FormItem>

                <FormItem id="model" title="Model (category)" important={true}>
                  <Select
                    id="model"
                    options={modelCategoryOptions}
                    placeholder={'Click here to select'}
                    isClearable={true}
                    hideSelectedOptions={true}
                    isSearchable={false}
                    styles={customStyles}
                    onChange={setModel}
                    defaultValue={
                      title === 'Edit plant'
                        ? {
                            value: plant.model,
                            label: plant.model
                          }
                        : ''
                    }
                  />
                </FormItem>

                <FormItem id="weight" title="Weight">
                  <input
                    type="number"
                    id="weight"
                    placeholder="Plant weight height goes here"
                    onChange={(e) => setWeight(e.target.value)}
                    defaultValue={title === 'Edit plant' ? plant.weight : ''}
                  />
                </FormItem>

                <button>
                  Save plant <SaveIcon className="icon" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

function FormItem({ children, id, title, important }) {
  return (
    <div className="formInput">
      <label htmlFor={id}>
        {title}

        {important && (
          <span>
            *<sup>Required</sup>
          </span>
        )}
      </label>

      {children}
    </div>
  )
}
