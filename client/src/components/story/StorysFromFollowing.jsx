import React, { useContext, useState } from "react";
import { StoryContext } from "../../context/StoryContext";
import { Fonts } from "../../constants/styles";
import { Image, Row, Col } from "react-bootstrap";
import Comment from "./Comment";

export default function StoryFromFollowing() {
  const { stories, like, selectStory, setSelectStory } =
    useContext(StoryContext);
  const [commentModalShow, setCommentModalShow] = useState(false);
  let commentModalClose = () => setCommentModalShow(false);

  return (
    <div className="mt-3">
      <Comment
        show={commentModalShow}
        onHide={commentModalClose}
        story={selectStory}
      />
      {stories.map((story, index) => (
        <div
          key={index}
          className="container border border-secondary rounded mb-3 p-0"
        >
          <Row className="border-bottom bg-light rounded-top m-0 p-2">
            <Col sm={1}>
              <a href={story.user.email}>
                <Image
                  src={story.user.photo}
                  style={{ width: "50px", borderRadius: "25px" }}
                />
              </a>
            </Col>
            <Col sm={7}>
              <a href={story.user.email}>{story.user.name}</a>
              <p style={Fonts.smallGray}>
                {"·"}
                {new Date(story.date).toUTCString()}
              </p>
            </Col>
          </Row>

          <div className="container">
            <p style={Fonts.normalDarkBold}>{story.title}</p>
            <p>{story.contents[0].texts[0]}</p>
          </div>

          <Row className="border-top bg-light rounded-bottom m-0 p-2">
            <Col>
              <button onClick={() => like(story._id)}>Like</button>{" "}
              {story.likes.length}
            </Col>
            <Col>
              <button
                onClick={() => {
                  setCommentModalShow(true);
                  setSelectStory(story);
                }}
              >
                Comments
              </button>{" "}
              {story.comments.length}
            </Col>
            <Col>
              <button>Shares </button> {123}
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}
