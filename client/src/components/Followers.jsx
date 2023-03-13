import React, { Component } from "react";
import { Fonts } from "../constants/styles";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Image, Row } from "react-bootstrap";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = { followers: [] };
  }
  static contextType = UserContext;
  componentDidMount = () => {
    this.refreshData();
  };
  // componentDidUpdate = () => {
  //   this.refreshData();
  // };
  refreshData = async () => {
    const { getFollowers } = this.context;
    await getFollowers(this.props.params.email).then((followers) => {
      this.setState({ followers: followers });
    });
  };
  render() {
    const { followers } = this.state;
    const { follow, unfollow } = this.context;
    return (
      <>
        <p style={Fonts.largeDarkBold}>Followers</p>
        {followers.map((follower, index) => (
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
                <p style={{ margin: "0" }}>{follower.name}</p>
                <p style={Fonts.smallGray}>{follower.bio}</p>
              </Link>
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
        ))}
      </>
    );
  }
}
export default withParams(Followers);
