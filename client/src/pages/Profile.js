import React, { Component } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { Row, Col, Image, Button } from "react-bootstrap";
import { Fonts } from "../constants/styles";
import { UserContext, UserProvider } from "../context/UserContext";
import ChangePassword from "../components/ChangePassword";
import EditProfile from "../components/EditProfile";
import NoPage from "../pages/NoPage";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <UserProvider>
        <ProfileConsumer params={this.props.params} />
      </UserProvider>
    );
  }
}

class ProfileConsumer extends Component {
  constructor(props) {
    super(props);
    this.state = { editModalShow: false, changePassModalShow: false };
  }
  static contextType = UserContext;

  componentDidMount = async () => {
    const { getUser } = this.context;
    await getUser(this.props.params.email);
  };

  componentDidUpdate = async () => {
    const { getUser } = this.context;
    await getUser(this.props.params.email);
  };

  render() {
    const { follow, unfollow } = this.context;
    const {
      status,
      isFollowing,
      name,
      photo,
      bio,
      email,
      followers,
      following,
    } = this.context;
    let editModalClose = () => this.setState({ editModalShow: false });
    let changePassModalClose = () =>
      this.setState({ changePassModalShow: false });
    return (
      <UserContext.Consumer>
        {(context) =>
          status ? (
            <div>
              <EditProfile
                show={this.state.editModalShow}
                onHide={editModalClose}
                photo={photo}
                name={name}
                bio={bio}
              />
              {status === 200 ? (
                <ChangePassword
                  show={this.state.changePassModalShow}
                  onHide={changePassModalClose}
                />
              ) : (
                <></>
              )}
              <Row>
                <Col sm={8} style={{ overflowY: "scroll" }}>
                  <Outlet />
                </Col>
                <Col sm={4}>
                  {status === 200 ? (
                    <>
                      <Image
                        src={photo}
                        width="100px"
                        style={{ borderRadius: "50px" }}
                      />
                      <p style={Fonts.normalDarkBold}>{name}</p>
                      <Row>
                        <Col>
                          {/* <Link to="followers"> */}
                          <a href={"/" + email + "/followers"}>
                            followers: {followers.length}
                          </a>
                          {/* </Link> */}
                        </Col>
                        <Col>
                          {/* <Link to="following"> */}
                          <a href={"/" + email + "/following"}>
                            following: {following.length}
                          </a>
                          {/* </Link> */}
                        </Col>
                      </Row>
                      <p style={Fonts.smallDark}>bio: {bio}</p>
                      <p style={Fonts.smallDark}>email: {email}</p>
                      <Button
                        onClick={() => this.setState({ editModalShow: true })}
                      >
                        Edit Profile
                      </Button>{" "}
                      <Button
                        onClick={() =>
                          this.setState({ changePassModalShow: true })
                        }
                      >
                        Change Password
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
                      {isFollowing ? (
                        <Button onClick={() => unfollow(email)}>
                          Unfollow
                        </Button>
                      ) : (
                        <Button onClick={() => follow(email)}>Follow</Button>
                      )}
                    </>
                  )}
                </Col>
              </Row>
            </div>
          ) : (
            <NoPage />
          )
        }
      </UserContext.Consumer>
    );
  }
}

export default withParams(Profile);
