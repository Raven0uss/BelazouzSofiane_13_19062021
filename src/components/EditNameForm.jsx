import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { profileUpdateHTTP } from "../api";
import { updateProfile } from "../redux/actions/user";

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const Button = styled.button`
  width: 100px;
  margin: 3px;
`;

const Input = styled.input`
  padding: 10px 10px;
  margin: 3px;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: grey;
  color: #2c3e50;
  font-weight: bold;
  font-size: 18px;
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

let EditNameForm = ({ setEditName, token, data, onUpdateProfile }) => {
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
    setEditName(false);
  };

  const savedDisabled = () =>
    firstName.length === 0 ||
    lastName.length === 0 ||
    (lastName === data.lastName && firstName === data.firstName);

  return (
    <>
      <Input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <Input
        id="lastName"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <ButtonsWrapper>
        <Button
          className={`edit-button ${savedDisabled() ? "button-disabled" : ""}`}
          onClick={() => {
            updateProfileAction();
          }}
          disabled={savedDisabled()}
        >
          Save
        </Button>
        <Button
          className="cancel-button"
          onClick={() => {
            setEditName(false);
          }}
        >
          Cancel
        </Button>
      </ButtonsWrapper>
    </>
  );
};

EditNameForm = connect(mapStateToProps, mapDispatchToProps)(EditNameForm);

export default EditNameForm;
