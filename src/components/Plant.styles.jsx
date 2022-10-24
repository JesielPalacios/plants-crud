'react-redux'
import { Link as LinkRouter } from 'react-router-dom'
import styled, { css } from 'styled-components'

export function Loading() {
  return (
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
  )
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  /* margin: 50px 0; */
  transform: translateY(120px);

  /* background-color: #fff; */
  /* border-radius: 10px; */
  /* -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47); */
  /* box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); */

  .top {
    /* padding: 20px; */
    /* padding: 0 0 0 60px; */
    display: flex;
    gap: 20px;
    /* align-items: stretch; */
    /* flex-grow: 1; */
    /* flex-wrap: nowrap; */

    .left {
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;

      flex: 1;
      -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
      box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
      padding: 20px;
      position: relative;

      .editButton {
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
        font-size: 12px;
        color: #7451f8;
        background-color: #7551f818;
        cursor: pointer;
        border-radius: 0px 0px 0px 5px;
      }

      .item {
        display: flex;
        gap: 20px;

        .itemImg {
          width: 200px;
          height: 200px;
          border-radius: 10px;
          object-fit: cover;
        }

        .details {
          flex: 1;
          /*  */
          /*  */
          .itemTitle {
            margin-bottom: 10px;
            color: #555;

            display: block;
            font-size: 2em;
            /* margin-block-start: 0.67em; */
            /* margin-block-start: 0.27em; */
            /* margin-block-end: 0.67em; */
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;

            padding-bottom: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.25);
          }

          .detailItem {
            margin-bottom: 10px;
            font-size: 14px;

            .itemKey {
              font-weight: bold;
              color: gray;
              margin-right: 5px;
            }

            .itemValue {
              font-weight: 300;
            }
          }
        }
      }
    }

    .right {
      flex: 2;
    }
  }

  .bottom {
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    padding: 20px;
    margin: 10px 20px;
  }

  .title {
    font-size: 16px;
    color: lightgray;
    margin-bottom: 20px;
  }
`

export const Link = styled(LinkRouter)`
  position: absolute;
  top: ${({ top }) => (top ? top : '-55px')};
  right: ${({ right }) => (right ? right : '0')};
  text-decoration: none;

  border: none;
  // height: 100%;
  margin: 0px;
  border-radius: 0.5rem;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border: 1px solid #0f1141;
  background: none;
  // color: #f5a800;
  cursor: pointer;
  transition: all 500ms ease 0s;
  color: #000;
  font-size: 15px;

  :hover {
    background-color: #0f1141;
    color: #ffffff;
  }

  ${(props) =>
    props.fixed &&
    css`
       {
        position: fixed;
        background: #fff;
        border-radius: 60px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        /* left: 0; */
        /* margin: 0 auto; */
        /* max-width: 400px; */
        /* padding: 5px; */
        position: fixed;
        /* right: 0; */
        /* top: -20px; */
        transform: scale(0.5);
        z-index: 1;
      }
    `}
`

export const Button = styled.button`
  position: absolute;
  top: ${({ top }) => (top ? top : '-55px')};
  right: ${({ right }) => (right ? right : '145px')};

  border: none;
  // height: 100%;
  margin: 0px;
  border-radius: 0.5rem;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border: 1px solid #0f1141;
  /* background: #f5f5f5; */
  /* background: #eeeeee; */
  background: none;
  // color: #f5a800;
  cursor: pointer;
  transition: all 500ms ease 0s;
  font-size: 15px;

  :hover {
    background-color: #0f1141;
    color: #ffffff;
  }
`

export const LoadingWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

// const Loading = styled.span`
//   color: #000;
//   padding: 0.5em;
//   font-size: 2em;
// `

export const Spinner = styled.div`
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
