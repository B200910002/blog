import React, { Component } from "react";
import { Fonts } from "../constants/styles";
import { UserContext } from "../context/UserContext";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Image, Row } from "react-bootstrap";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Following extends Component {
  constructor(props) {
    super(props);
    this.state = { following: [] };
  }
  static contextType = UserContext;
  componentDidMount = async () => {
    const { getFollowing } = this.context;
    await getFollowing(this.props.params.email).then((following) => {
      this.setState({ following: following });
    });
  };
  render() {
    const { following } = this.state;
    return (
      <>
        <p style={Fonts.largeDarkBold}>Following</p>
        {following.map((follower, index) => (
          <Link key={index} to={"/" + follower.email}>
            <Row>
              <Col sm={1}>
                <Image
                  src={follower.photo}
                  style={{ width: "50px", borderRadius: "25px" }}
                />
              </Col>
              <Col sm={6}>
                <p style={{ margin: "0" }}>{follower.name}</p>
                <p style={Fonts.smallGray}>{follower.bio}</p>
              </Col>
              <Col>
                <Button>Unfollow</Button>
              </Col>
            </Row>
          </Link>
        ))}
      </>
    );
  }
}

export default withParams(Following);
