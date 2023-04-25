import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { StoryContext } from "../../context/StoryContext";
import { Fonts } from "../../constants/styles";
import { Row, Col } from "react-bootstrap";
import Comment from "./Comment";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function ViewStory() {
  const { getStories, email, name } = useContext(UserContext);
  const { like, deleteStory } = useContext(StoryContext);
  const [stories, setStories] = useState([]);
  const [selectStory, setSelectStory] = useState({});
  const [commentModalShow, setCommentModalShow] = useState(false);
  let commentModalClose = () => setCommentModalShow(false);
  useEffect(() => {
    const refreshData = async () => {
      await getStories(email).then((data) => {
        setStories(data);
      });
    };
    refreshData();
  }, [getStories, email]);

  return (
    <div className="mt-3">
      <Comment
        show={commentModalShow}
        onHide={commentModalClose}
        story={selectStory}
      />
      <p style={Fonts.normalDarkBold}>{name}'s stories</p>
      {stories.map((story, index) => (
        <div
          key={index}
          className="container border border-secondary rounded mb-3 p-0"
        >
          <Row className="border-bottom bg-light rounded-top m-0 p-2">
            <Col sm={10}>
              <p style={Fonts.smallGray}>
                {"·"}
                {new Date(story.date).toUTCString()}
              </p>
            </Col>
            <Col sm={2}>
              <button className="btn btn-warning" onClick={() => {}}>
                <AiFillEdit />
              </button>{" "}
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteStory(story._id);
                }}
              >
                <AiFillDelete />
              </button>
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
                Comment
              </button>{" "}
              {story.comments.length}
            </Col>
            <Col>
              <button>Share </button> {123}
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}
