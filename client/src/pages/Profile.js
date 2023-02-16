import React, { Component } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { Fonts } from "../constants/styles";
import { AuthContext } from "../context/AuthContext";
import ChangePassword from "../components/ChangePassword";
import EditProfile from "../components/EditProfile";

export default class Profile extends Component {
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
    await getUser().then((data) => {
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
    const { user, follow } = this.context;
    const { status, name, photo, bio, email, followers, following } =
      this.state;
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
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
                    <p>followers: {followers.length}</p>
                  </Col>
                  <Col>
                    <p>following: {following.length}</p>
                  </Col>
                </Row>
                <p style={Fonts.smallDark}>bio: {bio}</p>
                <p style={Fonts.smallDark}>email: {email}</p>
                <Button onClick={() => this.setState({ editModalShow: true })}>
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
                    <p>followers: {followers.length}</p>
                  </Col>
                  <Col>
                    <p>following: {following.length}</p>
                  </Col>
                </Row>
                <p style={Fonts.smallDark}>bio: {bio}</p>
                <p style={Fonts.smallDark}>email: {email}</p>
                <Button onClick={() => follow(email)}>Follow</Button>
              </>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
