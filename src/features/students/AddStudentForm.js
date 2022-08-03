import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { HexColorPicker } from "react-colorful";

import { MDBCardBody, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import {
  toggleDifficultyColorPicker,
  setDifficultyColor,
  toggleFunColorPicker,
  setFunColor,
} from "../ui/uiSlice";

const AddStudentForm = (props) => {
  const { value, setValue, onSubmit } = props;
  const dispatch = useDispatch();

  const isFunColorPickerOpen = useSelector(
    (state) => state.ui.isFunColorPickerOpen
  );
  const isDifficultyColorPickerOpen = useSelector(
    (state) => state.ui.isDifficultyColorPickerOpen
  );
  const colorDifficulty = useSelector((state) => state.ui.colorDifficulty);
  const colorFun = useSelector((state) => state.ui.colorFun);
  console.log(
    isFunColorPickerOpen,
    isDifficultyColorPickerOpen,
    colorFun,
    colorDifficulty
  );

  const onClickDifficultySwatch = () => {
    console.log("Clicked on DifficultySwatch");
    dispatch(toggleDifficultyColorPicker());
  };

  const onClickFunSwatch = () => {
    console.log("Clicked on FunSwatch");
    dispatch(toggleFunColorPicker());
  };

  const onChangeDifficultyColor = (e) => {
    console.log("difficulty Value", e);
    dispatch(setDifficultyColor(e));
    //dispatch(toggleDifficultyColorPicker());
  };
  const onChangeFunColor = (e) => {
    console.log("fun Value", e);
    dispatch(setFunColor(e));
    //dispatch(toggleFunColorPicker());
  };

  const onCloseDifficultyColor = () => {
    dispatch(toggleDifficultyColorPicker());
  };

  const onCloseFunColor = () => {
    dispatch(toggleFunColorPicker());
  };

  return (
    <MDBCardBody>
      <form onSubmit={onSubmit}>
        <MDBRow>
          <MDBCol>
            <MDBInput
              type="text"
              className="mb-4"
              label="First Name"
              value={value.firstName}
              key="firstName"
              id="firstName"
              onChange={(e) =>
                setValue({ ...value, firstName: e.target.value })
              }
              required
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              type="text"
              className="mb-4"
              label="Last Name"
              value={value.lastName}
              key="lastName"
              id="lastName"
              onChange={(e) => setValue({ ...value, lastName: e.target.value })}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              type="text"
              className="mb-4"
              label="phone"
              value={value.phone}
              key="phone"
              id="phone"
              onChange={(e) => setValue({ ...value, phone: e.target.value })}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              type="email"
              className="mb-4"
              label="email address"
              value={value.email}
              key="email"
              id="email"
              onChange={(e) => setValue({ ...value, email: e.target.value })}
            />
          </MDBCol>
        </MDBRow>
        <hr />
        <h5>Personal Graph Colors</h5>
        <MDBRow>
          <MDBCol>
            {" "}
            <div className="picker">
              Difficulty
              <div
                className="swatch"
                style={{ backgroundColor: colorDifficulty }}
                onClick={() => {
                  onClickDifficultySwatch();
                }}
              />
              {isDifficultyColorPickerOpen && (
                <div className="popover">
                  <HexColorPicker
                    color={colorDifficulty}
                    onChange={(x) => onChangeDifficultyColor(x)}
                  />
                  <button
                    type="button"
                    class="btn"
                    aria-label="Close"
                    onClick={() => onCloseDifficultyColor()}>
                    Select
                  </button>
                </div>
              )}
            </div>
          </MDBCol>
          <MDBCol>
            <div className="picker">
              Fun
              <div
                className="swatch"
                style={{ backgroundColor: colorFun }}
                onClick={() => onClickFunSwatch()}
              />
              {isFunColorPickerOpen && (
                <div className="popover">
                  <HexColorPicker
                    color={colorFun}
                    onChange={(x) => onChangeFunColor(x)}
                  />
                  <button
                    type="button"
                    class="btn"
                    aria-label="Close"
                    onClick={() => onCloseFunColor()}>
                    Select
                  </button>
                </div>
              )}
            </div>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBCardBody>
  );
};

export default AddStudentForm;
