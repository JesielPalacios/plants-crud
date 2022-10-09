import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { productRows } from '../dummyData'
import { Link as LinkRouter} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Seo } from './layout/Seo'
import { getAllPlantsService } from '../services/plant.service'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from './PlantsList.styles'
import { Link, Loading } from './Plant.styles'

export default function PlantsList() {
  // const [data, setData] = useState([])
  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id))
  // }

  const columns = [
    {
      field: 'name',
      headerName: 'Plant name',
      width: 179,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              // src="https://via.placeholder.com/520x460"
              src="https://www.elmueble.com/medio/2019/01/22/plantas-medicinales-valeriana_6340d15a_543x543.jpg"
              alt="plant avatar image"
            />
            {params.row.name
              .trim()
              .toLowerCase()
              .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
          </div>
        )
      },
    },
    {
      field: 'createdAt',
      headerName: 'Creation date',
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.createdAt.slice(8, 10)} -{params.row.createdAt.slice(5, 7)} -{params.row.createdAt.slice(0, 4)}
          </div>
        )
      },
    },
    {
      field: 'discoveredAt',
      headerName: 'Discovery date',
      width: 125,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.discoveredAt.slice(8, 10)} -{params.row.discoveredAt.slice(5, 7)} -{params.row.discoveredAt.slice(0, 4)}
          </div>
        )
      },
    },
    {
      field: 'benefits',
      headerName: 'Benefits',
      width: 250,
    },
    {
      field: 'medicinal',
      headerName: 'Is it medicinal?',
      width: 125,
      renderCell: (params) => {
        return <div className={`cellWithStatus ${params.row.medicinal}`}>{params.row.medicinal}</div>
      },
    },
    {
      field: 'flower',
      headerName: 'Does it have a flower?',
      width: 175,
      renderCell: (params) => {
        return <div className={`cellWithStatus ${params.row.flower}`}>{params.row.flower}</div>
      },
    },
    {
      field: 'maximumHeight',
      headerName: 'Maximum height',
      width: 140,
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <LinkRouter to={'/plant/' + params.row._id}>
              <button className="productListEdit">Edit</button>
            </LinkRouter>
            <DeleteOutlinedIcon
              className="productListDelete"
              // onClick={() => handleDelete(params.row.id)}
            />
          </>
        )
      },
    },
  ]

  const { plants, loading, error } = useSelector((state) => state.plant)
  const dispatch = useDispatch()

  useEffect(() => {
    getAllPlantsService(dispatch)
  }, [])

  return (
    <Container>
      <Seo title="Plants list" subtitle="Plant list from Warehouse Receipts" />

      <Link to="/plants/new">Create new plant</Link>

      <div className="productList">
        {loading && <Loading />}

        {error ? (
          'Hubo un error'
        ) : (
          <DataGrid
            rows={plants}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            checkboxSelection
            rowHeight={70}
            showColumnRightBorder={true}
            getRowId={(row) => row._id}
            loading={loading}
            rowsPerPageOptions={[10]}
          />
        )}
      </div>
    </Container>
  )
}
