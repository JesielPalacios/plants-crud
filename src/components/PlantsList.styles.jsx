import styled from 'styled-components'

export const Container = styled.div`
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

  .cellWithStatus {
    padding: 5px;
    border-radius: 5px;

    &.Yes {
      background-color: rgba(0, 128, 0, 0.05);
      color: green;
    }
    &.Not {
      background-color: rgba(255, 0, 0, 0.05);
      color: crimson;
    }
  }
`
