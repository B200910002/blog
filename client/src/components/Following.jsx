import React, { useContext, useEffect, useState } from "react";
import { Fonts } from "../constants/styles";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Image, Row } from "react-bootstrap";
import LoadingSpinner from "../utils/LoadingSpinner";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

function Following(props) {
  const { getFollowing, follow, unfollow, clicked } = useContext(UserContext);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const refreshData = async () => {
      await getFollowing(props.params.email).then((following) => {
        setFollowing(following);
        console.log(following);
      });
    };

    refreshData();
  }, [getFollowing, clicked, props.params.email]);

  return (
    <>
      <p style={Fonts.largeDarkBold}>Following</p>
      {following.length !== 0 ? (
        following.map((follower, index) => (
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
                    "its you"
                  ) : (
                    <>
                      {follower.isFollowing ? (
                        <Button 
                        className="btn btn-danger"
                        onClick={() => unfollow(follower.email)}>
                          Unfollow
                        </Button>
                      ) : (
                        <Button 
                        className="btn btn-primary"
                        onClick={() => follow(follower.email)}>
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

export default withParams(Following);
