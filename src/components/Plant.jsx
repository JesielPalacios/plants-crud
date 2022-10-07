import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getPlantService } from '../services/plant.service'
import {
  Button,
  Container,
  Link,
  LoadingWrapper,
  Spinner,
} from './Plant.styles'
import { Seo } from './layout/Seo'

export default function Plant() {
  let navigate = useNavigate()
  const { plantId } = useParams()
  const dispatch = useDispatch()
  const { plant, loading, error } = useSelector((state) => state.plant)

  useEffect(() => {
    getPlantService(dispatch, plantId)
    console.log('plant', plant)
  }, [])

  return (
    <Container>
      <Seo
        title={
          plant.name
          // .trim()
          // .toLowerCase()
          // .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
        }
        subtitle="Plant profile"
      />

      <Link to="/plants">Go to plants</Link>
      <Button>Delete plant</Button>

      {loading && (
        <LoadingWrapper>
          <Spinner>
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </Spinner>
        </LoadingWrapper>
      )}

      <div className="scroll">
        {error && 'Hubo un error'}

        {!(loading && error) && (
          <>
            <div className="top">
              <div className="left">
                <h1 className="title">Information</h1>
                <div className="item">
                  <img
                    // src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    // src="https://via.placeholder.com/520x460"
                    src="https://www.elmueble.com/medio/2019/01/22/plantas-medicinales-valeriana_6340d15a_543x543.jpg"
                    alt={'Plant image or avatar ' + plant.name}
                    className="itemImg"
                  />
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
                    <div className="detailItem">
                      <span className="itemKey">Discovered at:</span>
                      <span className="itemValue">
                        {plant.discoveredAt && (
                          <div>
                            {plant.discoveredAt.slice(8, 10)} -
                            {plant.discoveredAt.slice(5, 7)} -
                            {plant.discoveredAt.slice(0, 4)}
                          </div>
                        )}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Is the plant medicinal?: </span>
                      <span className="itemValue">{plant.medicinal}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">
                        Does the plant have a floor?:
                      </span>
                      <span className="itemValue">{plant.flower}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="left">
                <div
                  className="editButton"
                  onClick={() => navigate('/plant/' + plantId + '/editar')}
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

            <div className="right"></div>
          </>
        )}
      </div>
    </Container>
  )
}
