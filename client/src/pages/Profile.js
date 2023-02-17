import React, { Component } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { Row, Col, Image, Button } from "react-bootstrap";
import { Fonts } from "../constants/styles";
import { AuthContext } from "../context/AuthContext";
import ChangePassword from "../components/ChangePassword";
import EditProfile from "../components/EditProfile";
import NoPage from "../pages/NoPage";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      name: "",
      photo: "",
      bio: "",
      email: "",
      followers: [],
      following: [],
      editModalShow: false,
    };
  }
  static contextType = AuthContext;
  componentDidMount = () => {
    this.refreshData();
  };
  componentDidUpdate = () => {
    this.refreshData();
  };

  refreshData = async () => {
    const { getUser } = this.context;
    await getUser(this.props.params.email).then((data) => {
      this.setState({
        status: data.status,
        name: data.user.name,
        photo: data.user.photo,
        bio: data.user.bio,
        email: data.user.email,
        followers: data.user.followers,
        following: data.user.following,
      });
    });
  };

  render() {
    const { user, follow, unfollow } = this.context;
    const { status, name, photo, bio, email, followers, following } =
      this.state;
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <>
        {status ? (
          <div>
            <EditProfile
              show={this.state.editModalShow}
              onHide={editModalClose}
              photo={photo}
              name={name}
              bio={bio}
            />
            <Row>
              <Col sm={9}>
                {user.email === email && status === 200 ? (
                  <div style={{ width: "300px" }}>
                    <p style={Fonts.normalDark}>Change password</p>
                    <ChangePassword />
                  </div>
                ) : (
                  <></>
                )}
                <Outlet />
              </Col>
              <Col sm={3}>
                {user.email === email && status === 200 ? (
                  <>
                    <Image
                      src={photo}
                      width="100px"
                      style={{ borderRadius: "50px" }}
                    />
                    <p style={Fonts.normalDarkBold}>{name}</p>
                    <Row>
                      <Col>
                        <Link to="followers">
                          followers: {followers.length}
                        </Link>
                      </Col>
                      <Col>
                        <Link to="following">
                          following: {following.length}
                        </Link>
                      </Col>
                    </Row>
                    <p style={Fonts.smallDark}>bio: {bio}</p>
                    <p style={Fonts.smallDark}>email: {email}</p>
                    <Button
                      onClick={() => this.setState({ editModalShow: true })}
                    >
                      Edit Profile
                    </Button>
                  </>
                ) : (
                  <>
                    <Image
                      src={photo}
                      width="100px"
                      style={{ borderRadius: "50px" }}
                    />
                    <p style={Fonts.normalDarkBold}>{name}</p>
                    <Row>
                      <Col>
                        <Link to="followers">
                          followers: {followers.length}
                        </Link>
                      </Col>
                      <Col>
                        <Link to="following">
                          following: {following.length}
                        </Link>
                      </Col>
                    </Row>
                    <p style={Fonts.smallDark}>bio: {bio}</p>
                    <p style={Fonts.smallDark}>email: {email}</p>
                    <Button onClick={() => follow(email)}>Follow</Button>{" "}
                    <Button onClick={() => unfollow(email)}>Unfollow</Button>
                  </>
                )}
              </Col>
            </Row>
          </div>
        ) : (
          <NoPage />
        )}
      </>
    );
  }
}

// class ProfileConsumer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       status: 0,
//       name: "",
//       photo: "",
//       bio: "",
//       email: "",
//       followers: [],
//       following: [],
//       editModalShow: false,
//     };
//   }
//   render() {
//     return <></>;
//   }
// }

export default withParams(Profile);
