import React, { Component } from "react";
import { Fonts } from "../constants/styles";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Image, Row } from "react-bootstrap";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Following extends Component {
  constructor(props) {
    super(props);
    this.state = { following: [], isFollowing: false };
  }
  static contextType = UserContext;
  componentDidMount = () => {
    this.refreshData();
  };
  // componentDidUpdate = (prevProps, prevState) => {
  //   this.refreshData();
  // };
  refreshData = () => {
    const { getFollowing } = this.context;
    getFollowing(this.props.params.email).then((following) => {
      this.setState({ following: following });
    });
  };
  render() {
    const { following } = this.state;
    const { follow, unfollow } = this.context;
    return (
      <>
        <p style={Fonts.largeDarkBold}>Following</p>
        {following.map((follower, index) => (
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
              <Link to={"/" + follower.email}>
              {/* <a href={"/"+follower.email}> */}
                <p style={{ margin: "0" }}>{follower.name}</p>
                <p style={Fonts.smallGray}>{follower.bio}</p>
              {/* </a> */}
              </Link>
            </Col>
            <Col>
              <AuthContext.Consumer>
                {(context) =>
                  context.user.email === follower.email ? (
                    "its you"
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
        ))}
      </>
    );
  }
}

export default withParams(Following);
