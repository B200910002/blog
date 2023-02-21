import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Fonts } from "../../constants/styles";
import { UserContext } from "../../context/UserContext";

class ViewStory extends Component {
  constructor(props) {
    super(props);
    this.state = { stories: [] };
  }
  static contextType = UserContext;
  componentDidMount = async () => {
    const { getStories, email } = this.context;
    await getStories(email).then((data) => {
      this.setState({ stories: data });
    });
  };
  render() {
    const { name } = this.context;
    const { stories } = this.state;
    return (
      <>
        <p style={Fonts.largeDarkBold}>{name}'s stories</p>
        {stories.map((story, index) => (
          <div key={index} style={{ backgroundColor: "#" }}>
            <p style={Fonts.normalDarkBold}>{story.title}</p>
            <p style={Fonts.smallGray}>{new Date(story.date).toUTCString()}</p>
            {story.contents.map((content, jndex) => (
              <div key={jndex}>
                <p style={Fonts.smallDarkBold}>{content.subTitle}</p>
                {content.texts.map((text, kndex) => (
                  <p key={kndex} style={Fonts.smallDark}>
                    {text}
                  </p>
                ))}
              </div>
            ))}
            <Row>
              <Col>Like {story.likes.length}</Col>
              <Col>Comment {story.comments.length}</Col>
              <Col>Share</Col>
            </Row>
            <hr />
          </div>
        ))}
      </>
    );
  }
}

export default ViewStory;
