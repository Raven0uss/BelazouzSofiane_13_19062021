import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { profileUpdateHTTP } from "../api";
import { updateProfile } from "../redux/actions/user";

const Mask = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 50%;
  background-color: #f0f0f0;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  @media (max-width: 550px) {
    width: 95%;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateProfile: async (payload) => {
      dispatch(updateProfile(payload));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    data: state.user.data,
  };
};

let EditNameModal = ({ setEditModal, token, data, onUpdateProfile }) => {
  const [firstName, setFirstName] = React.useState(data.firstName);
  const [lastName, setLastName] = React.useState(data.lastName);

  const updateProfileAction = async () => {
    const response = await profileUpdateHTTP({
      token,
      firstName,
      lastName,
    });
    if (!response || response.status !== 200) {
      alert("An error occured with the server.");
    } else {
      onUpdateProfile({ firstName, lastName });
    }
    setEditModal(false);
  };

  const savedDisabled = () =>
    firstName.length === 0 ||
    lastName.length === 0 ||
    (lastName === data.lastName && firstName === data.firstName);

  return (
    <Mask>
      <Modal>
        <div className="input-wrapper">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Last Name</label>
          <input
            id="lastName"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <ButtonsWrapper>
          <button
            className="cancel-button"
            onClick={() => {
              setEditModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className={`edit-button ${
              savedDisabled() ? "button-disabled" : ""
            }`}
            onClick={() => {
              updateProfileAction();
            }}
            disabled={savedDisabled()}
          >
            Save modifications
          </button>
        </ButtonsWrapper>
      </Modal>
    </Mask>
  );
};

EditNameModal = connect(mapStateToProps, mapDispatchToProps)(EditNameModal);

export default EditNameModal;
