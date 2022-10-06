import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { productRows } from "../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { Seo } from "./layout/Seo";

export default function ProducstList() {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Plant name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Creation date",
      width: 120,
    },
    {
      field: "discoveredAt",
      headerName: "Discovery date",
      width: 125,
    },
    {
      field: "benefits",
      headerName: "Benefits",
      width: 250,
    },
    {
      field: "medicinal",
      headerName: "Is it medicinal?",
      width: 125,
    },
    {
      field: "flower",
      headerName: "Does it have a flower?",
      width: 175,
    },
    {
      field: "maxHeight",
      headerName: "Maximum height",
      width: 140,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlinedIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <Seo title="Products" subtitle="Products list from Warehouse Receipts" />

      <div className="productList">
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          checkboxSelection
          rowHeight={70}
          showColumnRightBorder={true}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 50px;
  width: 100%;
  /* height: 100vh; */
  margin: 50px 0;

  background-color: #fff;
  border-radius: 10px;

  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);

  .productList {
    flex: 4;
    height: 90vh;
  }

  .productListItem {
    display: flex;
    align-items: center;
  }

  .productListImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  .productListEdit {
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #3bb077;
    /* background-color: #60bf97; */
    color: white;
    cursor: pointer;
    margin-right: 20px;
  }

  .productListDelete {
    color: red;
    /* color: #b03337; */
    color: #f00;
    cursor: pointer;
  }

  .MuiDataGrid-columnHeader {
    color: #fff;
    background-color: #0f1141;
    /* background-color: #0f1141da; */
  }

  .MuiDataGrid-booleanCell,
  .MuiDataGrid-menuIcon,
  .MuiDataGrid-menuIconButton,
  .MuiDataGrid-sortIcon {
    color: #fff;
    background-color: #7679c9da;
    border-radius: 10px;
  }

  .MuiDataGrid-row:hover {
    /* background-color: #000000b1; */
    :hover {
      background-color: #0000005d;
      background-color: #0f1141da;
      background-color: #0f114195;
    }
  }
`;
