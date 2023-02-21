import React, { Component } from "react";
import { Fonts } from "../constants/styles";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
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
  componentDidMount = async () => {
    const { getFollowers } = this.context;
    await getFollowers(this.props.params.email).then((followers) => {
      this.setState({ followers: followers });
    });
  };
  render() {
    const { followers } = this.state;
    return (
      <>
        <p style={Fonts.largeDark}>Followers</p>
        {followers.map((follower, index) => (
          <Row key={index}>
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
              <Button>Follow</Button>
            </Col>
          </Row>
        ))}
      </>
    );
  }
}
export default withParams(Followers);
