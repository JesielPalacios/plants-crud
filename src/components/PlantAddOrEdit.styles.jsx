import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  transform: translateY(120px);

  .newContainer {
    /* margin: 50px 0; */
    flex: 6;

    .top,
    .bottom {
      background-color: #fff;
      border-radius: 10px;

      -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
      box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
      /* padding: 10px; */
      /* margin: 20px; */
      /* margin: 0 20px 20px 20px; */
      /* margin: 10px 20px; */
      display: flex;
      /* overflow: hidden; */

      h1 {
        color: lightgray;
        font-size: 20px;
      }

      .left {
        padding-top: 30px;
        flex: 1;
        text-align: center;

        img {
          width: 300px;
          height: 300px;
          /* border-radius: 50%; */
          border-radius: 10px;
          object-fit: cover;
        }
      }

      .right {
        padding-top: 30px;
        padding-bottom: 30px;
        flex: 2;

        form {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: space-around;

          .formInput {
            width: 40%;

            label {
              display: flex;
              align-items: center;
              gap: 10px;
              cursor: pointer;

              .icon {
                cursor: pointer;
              }

              span {
                color: #f00;
              }

              sup {
                font-size: 10px;
              }
            }

            input,
            textarea {
              width: 100%;
              padding: 5px;
              border: none;
              border-bottom: 1px solid gray;
            }

            textarea {
              /* max-height: 75px; */
              /* max-width: 350px; */
              /* min-height: 55px; */
              /* min-width: 350px; */
              /* width: 322px; */
              /* height: 189px; */

              max-width: 100%;
              min-width: 100%;
              max-height: 200px;
              /* max-height: 80px; */
              min-height: 67.5%;
              /* min-height: 40%; */

              height: 42px;
              height: 37px;
              /* height: 59px; */
            }
          }

          button {
            /* width: 150px; */
            padding: 10px;
            border: none;
            color: white;
            font-weight: bold;
            cursor: pointer;
            margin-top: 10px;

            display: flex;
            align-items: center;
            gap: 5px;
            border-radius: 10px;

            transition: all 500ms ease 0s;
            /* background: none; */
            background-color: #fff;
            color: #000;
            border: 1px solid #0f1141;
            height: 50px;

            :hover {
              background-color: #0f1141;
              color: #ffffff;
            }
          }
        }
      }
    }
  }

  .button {
    /* position: absolute; */
    /* top: ${({ top }) => (top ? top : '-50px')}; */
    /* right: ${({ right }) => (right ? right : '5px')}; */

    border: none;
    // height: 100%;
    margin: 0px;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-weight: 600;
    border: 1px solid #0f1141;
    /* background: #f5f5f5; */
    /* background: #eeeeee; */
    // color: #f5a800;
    cursor: pointer;
    transition: all 500ms ease 0s;
    background: none;

    :hover {
      background-color: #0f1141;
      color: #ffffff;
    }
  }
`

export const plantInputs = [
  {
    nameRef: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Write here the the plant name.',
    important: true
  },
  {
    nameRef: 'discoveredAt',
    // label: 'Discovered at',
    label: 'Discovery date',
    type: 'date',
    placeholder: 'Write here the discovery date.',
    important: true
  },
  {
    nameRef: 'benefits',
    label: 'Benefits',
    type: 'textArea',
    placeholder: 'Write here the plant benefits.',
    important: true
  },
  {
    nameRef: 'medicinal',
    label: 'Is the plant medicinal?',
    type: 'text',
    placeholder: 'Click here to select.',
    important: true
  },
  {
    nameRef: 'flower',
    label: 'Does the plant have a flower?',
    type: 'text',
    placeholder: 'Click here to select.',
    important: true
  },
  {
    nameRef: 'maximumHeight',
    label: 'Maximum plant height.',
    type: 'number',
    placeholder: 'Write here the max height.',
    important: true
  },
  {
    nameRef: 'model',
    label: 'Model (category)',
    type: 'text',
    placeholder: 'Write here the model.',
    important: true
  },
  {
    nameRef: 'weight',
    label: 'Weight',
    type: 'number',
    placeholder: 'Write here the weight.'
  }
]
