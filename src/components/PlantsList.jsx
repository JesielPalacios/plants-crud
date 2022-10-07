import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { productRows } from '../dummyData'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Seo } from './layout/Seo'
import { getAllPlantsService } from '../services/plant.service'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from './PlantsList.styles'

export default function PlantsList() {
  // const [data, setData] = useState([])
  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id))
  // }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Plant name',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              // src="https://via.placeholder.com/520x460"
              src="https://www.elmueble.com/medio/2019/01/22/plantas-medicinales-valeriana_6340d15a_543x543.jpg"
              alt="plant avatar"
            />
            {params.row.name}
          </div>
        )
      },
    },
    {
      field: 'createdAt',
      headerName: 'Creation date',
      width: 120,
    },
    {
      field: 'discoveredAt',
      headerName: 'Discovery date',
      width: 125,
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
        return (
          <div className={`cellWithStatus ${params.row.medicinal}`}>
            {params.row.medicinal}
          </div>
        )
      },
    },
    {
      field: 'flower',
      headerName: 'Does it have a flower?',
      width: 175,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.flower}`}>
            {params.row.flower}
          </div>
        )
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
            <Link to={'/plant/' + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
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
      <Seo title="Plants" subtitle="Plant list from Warehouse Receipts" />

      {loading && 'Loading...'}

      <div className="productList">
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
