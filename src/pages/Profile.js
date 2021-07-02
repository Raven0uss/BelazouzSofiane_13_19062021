import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { profileHTTP } from "../api";
import { setProfile } from "../redux/actions/user";

const mapDispatchToProps = (dispatch) => {
  return {
    onSetProfile: async (payload) => {
      dispatch(setProfile(payload));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuth,
    token: state.user.token,
    data: state.user.data,
  };
};

let Profile = ({ isAuth, token, data, onSetProfile }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const getProfileData = async () => {
      const response = await profileHTTP({ token });
      try {
        const userData = {
          firstName: response.body.firstName,
          lastName: response.body.lastName,
          email: response.body.email,
          id: response.body.id,
        };
        onSetProfile(userData);
        setLoading(!response);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    if (token === null) {
      setLoading(false);
    } else getProfileData();
  }, [token, onSetProfile]);

  if (loading) return null;
  if (!isAuth || token === null || error) return <Redirect to="/sign-in" />;

  console.log(data);
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {data.firstName} {data.lastName}
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;
