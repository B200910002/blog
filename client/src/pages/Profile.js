import React, { useContext, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Row, Col, Image, Button } from "react-bootstrap";
import { Fonts } from "../constants/styles";
import { UserContext, UserProvider } from "../context/UserContext";
import ChangePassword from "../components/ChangePassword";
import EditProfile from "../components/EditProfile";
import NoPage from "../pages/NoPage";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

function Profile(props) {
  return (
    <UserProvider>
      <ProfileConsumer params={props.params} />
    </UserProvider>
  );
}

function ProfileConsumer() {
  const {
    // getUser,
    status,
    isFollowing,
    name,
    photo,
    bio,
    email,
    followers,
    following,
    follow,
    unfollow,
  } = useContext(UserContext);
  const [editModalShow, setEditModalShow] = useState(false);
  const [changePassModalShow, setChangePassModalShow] = useState(false);
  let editModalClose = () => setEditModalShow(false);
  let changePassModalClose = () => setChangePassModalShow(false);

  return (
    <UserContext.Consumer>
      {(context) =>
        status ? (
          <div>
            <EditProfile
              show={editModalShow}
              onHide={editModalClose}
              photo={photo}
              name={name}
              bio={bio}
            />
            {status === 200 ? (
              <ChangePassword
                show={changePassModalShow}
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
                    <Button onClick={() => setEditModalShow(true)}>
                      Edit Profile
                    </Button>{" "}
                    <Button onClick={() => setChangePassModalShow(true)}>
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
                    {isFollowing ? (
                      <Button onClick={() => unfollow(email)}>Unfollow</Button>
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

export default withParams(Profile);
