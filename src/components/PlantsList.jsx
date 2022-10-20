import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as LinkRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  deletePlantService,
  getAllPlantsService
} from '../services/plant.service'
import { Seo } from './layout/Seo'
import { Button, Link, Loading } from './Plant.styles'
import { Container } from './PlantsList.styles'

export default function PlantsList() {
  const { plants, loading, error } = useSelector((state) => state.plant)

  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    await deletePlantService(dispatch, id)
    getAllPlantsService(dispatch)

    !error &&
      Swal.fire('Plant deleted!', 'Plant deleted successfully!', 'success')
  }

  const handleUpdate = () => {
    Swal.fire({
      title: 'Update table?',
      text: 'Are you sure you want to update the table',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0f1141',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval
        Swal.fire({
          title: 'Loading..!',
          html: "Fetching your plants, don't worry.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          getAllPlantsService(dispatch)
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            // console.log('I was closed by the timer')
          }
        })

        // !error && Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

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
              .replace(/\w\S*/g, (w) =>
                w.replace(/^\w/, (c) => c.toUpperCase())
              )}
          </div>
        )
      }
    },
    {
      field: 'createdAt',
      headerName: 'Creation date',
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.createdAt.slice(8, 10)} -
            {params.row.createdAt.slice(5, 7)} -
            {params.row.createdAt.slice(0, 4)}
          </div>
        )
      }
    },
    {
      field: 'discoveredAt',
      headerName: 'Discovery date',
      width: 125,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.discoveredAt.slice(8, 10)} -
            {params.row.discoveredAt.slice(5, 7)} -
            {params.row.discoveredAt.slice(0, 4)}
          </div>
        )
      }
    },
    {
      field: 'benefits',
      headerName: 'Benefits',
      width: 250
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
      }
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
      }
    },
    {
      field: 'maximumHeight',
      headerName: 'Maximum height',
      width: 140
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
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        )
      }
    }
  ]

  useEffect(() => {
    getAllPlantsService(dispatch)
  }, [])

  return (
    <Container>
      <Seo title="Plants list" subtitle="Plant list from Warehouse Receipts" />

      <Link to="/plants/new">Create new plant</Link>

      <Button right="185px" onClick={handleUpdate}>
        Update list
      </Button>

      <div className="productList">
        {loading && <Loading />}

        {error ? (
          'Hubo un error'
        ) : (
          <DataGrid
            rows={plants}
            disableSelectionOnClick
            columns={columns}
            pageSize={50}
            checkboxSelection
            showColumnRightBorder={true}
            getRowId={(row) => row._id}
            loading={loading}
            rowsPerPageOptions={[50]}
          />
        )}
      </div>
    </Container>
  )
}
