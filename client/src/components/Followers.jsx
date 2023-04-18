import React, { useEffect, useState, useContext } from "react";
import { Fonts } from "../constants/styles";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Image, Row } from "react-bootstrap";
import LoadingSpinner from "../utils/LoadingSpinner";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

function Followers(props) {
  const { getFollowers, follow, unfollow, clicked } = useContext(UserContext);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const refreshData = async () => {
      await getFollowers(props.params.email).then((followers) => {
        setFollowers(followers);
        console.log(followers);
      });
    };

    refreshData();
  }, [clicked]);

  return (
    <>
      <p style={Fonts.largeDarkBold}>Followers</p>
      {followers.length !== 0 ? (
        followers.map((follower, index) => (
          <Row key={index}>
            <Col sm={1}>
              <Link to={"/" + follower.email}>
                <Image
                  src={follower.photo}
                  style={{ width: "50px", borderRadius: "25px" }}
                />
              </Link>
            </Col>
            <Col sm={6}>
              {/* <Link to={"/" + follower.email}> */}
              <a href={"/" + follower.email}>
                <p style={{ margin: "0" }}>{follower.name}</p>
                <p style={Fonts.smallGray}>{follower.bio}</p>
              </a>
              {/* </Link> */}
            </Col>
            <Col>
              <AuthContext.Consumer>
                {(context) =>
                  context.user.email === follower.email ? (
                    "it's you"
                  ) : (
                    <>
                      {follower.isFollowing ? (
                        <Button onClick={() => unfollow(follower.email)}>
                          Unfollow
                        </Button>
                      ) : (
                        <Button onClick={() => follow(follower.email)}>
                          Follow
                        </Button>
                      )}
                    </>
                  )
                }
              </AuthContext.Consumer>
            </Col>
          </Row>
        ))
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default withParams(Followers);
