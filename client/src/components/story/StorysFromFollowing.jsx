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
            <div className="row">
              <Col className="col-2">
                <button
                  className="btn btn-primary"
                  onClick={() => like(story._id)}>
                  Like
                  {" " + story.likes.length}
                </button>
              </Col>
              <Col className="col-2">
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setCommentModalShow(true);
                    setSelectStory(story);
                  }}
                >
                  Comment
                  {" " + story.comments.length}
                </button>
              </Col>
              {/* <Col>
              <button
                className="btn btn-secondary"
              >Share
                {" " + 1}
              </button>
            </Col> */}
            </div>
          </Row>
        </div>
      ))}
    </div>
  );
}
