import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getPlantService,
  deletePlantService,
  getAllPlantsService
} from '../services/plant.service'
import { Button, Container, Link, Loading } from './Plant.styles'
import { Seo } from './layout/Seo'
import Swal from 'sweetalert2'

export default function Plant() {
  let navigate = useNavigate()
  const { plantId } = useParams()
  const dispatch = useDispatch()
  const { plant, loading, error } = useSelector((state) => state.plant)

  function handleDelete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePlantService(dispatch, id)
        getAllPlantsService(dispatch)

        !(loading && error) &&
          Swal.fire(
            'Plant deleted!',
            'Plant has been deleted successfully!',
            'success'
          )

        navigate('/plants')
      }
    })
  }

  useEffect(() => {
    getPlantService(dispatch, plantId)
  }, [])

  return (
    <Container>
      <Seo
        title={
          plant.name &&
          plant.name
            .trim()
            .toLowerCase()
            .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
        }
        subtitle="Plant profile"
      />

      <Button onClick={() => handleDelete(plantId)}>Delete this plant</Button>
      <Link to="/plants">Go to plants</Link>

      {loading && <Loading />}

      {error && 'Something went wrong'}

      {!(loading && error) && (
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              {plant.plantImage ? (
                <img
                  crossorigin="anonymous"
                  crossOrigin="anonymous"
                  // src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  // src="https://via.placeholder.com/520x460"
                  // src="https://www.elmueble.com/medio/2019/01/22/plantas-medicinales-valeriana_6340d15a_543x543.jpg"
                  src={'http://localhost:3001' + plant.plantImage}
                  alt={'Plant image or avatar ' + plant.name}
                  className="itemImg"
                />
              ) : (
                <img
                  // src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  // src="https://via.placeholder.com/520x460"
                  // src="https://www.elmueble.com/medio/2019/01/22/plantas-medicinales-valeriana_6340d15a_543x543.jpg"
                  src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  alt={'Plant image or avatar ' + plant.name}
                  className="itemImg"
                />
              )}

              <div className="details">
                <h1 className="itemTitle">
                  {plant.name &&
                    plant.name
                      .trim()
                      .toLowerCase()
                      .replace(/\w\S*/g, (w) =>
                        w.replace(/^\w/, (c) => c.toUpperCase())
                      )}
                </h1>
                {plant.discoveredAt && (
                  <div className="detailItem">
                    <span className="itemKey">Discovered at:</span>
                    <span className="itemValue">
                      {plant.discoveredAt.slice(8, 10)} -{' '}
                      {plant.discoveredAt.slice(5, 7)} -{' '}
                      {plant.discoveredAt.slice(0, 4)}
                    </span>
                  </div>
                )}
                <div className="detailItem">
                  <span className="itemKey">Is the plant medicinal?: </span>
                  <span className="itemValue">{plant.medicinal}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Does the plant have a floor?:</span>
                  <span className="itemValue">{plant.flower}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="left">
            <div
              className="editButton"
              onClick={() => navigate('/plant/' + plantId + '/edit')}
            >
              Edit the information about the plant
            </div>
            <h1 className="title">Details</h1>
            <div className="item">
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Benefits:</span>
                  <span className="itemValue">{plant.benefits}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Maximum height:</span>
                  <span className="itemValue">{plant.maximumHeight}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Model (category):</span>
                  <span className="itemValue">{plant.model}</span>
                </div>
                {plant.weight && (
                  <div className="detailItem">
                    <span className="itemKey">Weight:</span>
                    <span className="itemValue">{plant.weight}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}
