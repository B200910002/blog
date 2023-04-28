import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Col, Row, Image } from "react-bootstrap";
import { StoryContext } from "../../context/StoryContext";
import { Fonts } from "../../constants/styles";

export default function Comment(props) {
  const { comment, getComments, selectStory } = useContext(StoryContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  //   const [photo, setPhoto] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    await comment(selectStory._id, text);
  };

  useEffect(() => {
    const refreshData = async () => {
      const com = await getComments(selectStory._id);
      setComments(com.data);
    };
    if (selectStory._id) refreshData();
  }, [getComments, selectStory._id]);

  return (
    <Form onSubmit={handleSubmit}>
      <p style={Fonts.normalDarkBold}>Chat 
      {/* {comments.length} */}
      </p>
      <hr style={{ marginBottom: 0 }} />
      <Row>
        <Col style={{ overflowY: "scroll", height: "250px" }}>
          {comments.map((comment, index) => (
            <div key={index} className="border border-secondary rounded m-2 col-9">

              <Row className="border-bottom bg-light rounded-top m-0 pt-2">
                <Col sm={3}>
                  <a href={comment.user.email}>
                    <Image
                      src={comment.user.photo}
                      style={{ width: "50px", borderRadius: "25px" }}
                    />
                  </a>
                </Col>
                <Col sm={9}>
                  <a href={comment.user.email}>
                    <p style={{ margin: "0" }}>{comment.user.name}</p>
                  </a>{" "}
                  <p style={Fonts.smallGray}>
                    {"·"}
                    {new Date(comment.date).toUTCString()}
                  </p>
                </Col>
                <Col></Col>
              </Row>
              <div className="container">
                <p>{comment.text}</p>
              </div>
              {/* <Row className="border-top bg-light rounded-bottom m-0 p-2">
                <Col>Replys</Col>
              </Row> */}
            </div>
          ))}
        </Col>
      </Row>
      <hr style={{ marginTop: 0 }} />
      <Row>
        <Col sm={8}>
          <Form.Control
            type="text"
            name="text"
            placeholder="add comment"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </Col>
        <Col sm={4}>
          <Button variant="primary" type="submit">
            Comment
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
