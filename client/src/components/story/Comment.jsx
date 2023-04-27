import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Col, Row, Image } from "react-bootstrap";
import { StoryContext } from "../../context/StoryContext";
import { Fonts } from "../../constants/styles";
// import { UserContext } from "../context/UserContext";

export default function Comment(props) {
  const { comment, getComments, deleteComment, click } =
    useContext(StoryContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  //   const [photo, setPhoto] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    await comment(props.story._id, text);
    click();
  };

  useEffect(() => {
    const refreshData = async () => {
      const com = await getComments(props.story._id);
      setComments(com.data);
    };
    if (props.story._id) refreshData();
  }, [getComments, props.story._id]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Comments {comments.length}
          </Modal.Title>
        </Modal.Header>
        <Row className="container">
          <Col style={{ overflowY: "scroll", height: "300px" }}>
            {comments.map((comment, index) => (
              <div key={index} className="border border-secondary rounded m-2">
                <Row className="border-bottom bg-light rounded-top m-0 pt-2">
                  <Col sm={1}>
                    <a href={comment.user.email}>
                      <Image
                        src={comment.user.photo}
                        style={{ width: "50px", borderRadius: "25px" }}
                      />
                    </a>
                  </Col>
                  <Col sm={6}>
                    <a
                      href={comment.user.email}>
                      <p
                        style={{ margin: "0" }}>{comment.user.name}</p>
                    </a>{" "}
                    <p style={Fonts.smallGray}>
                      {"·"}
                      {new Date(comment.date).toUTCString()}
                    </p>
                  </Col>
                  <Col>
                    <button
                      className="btn btn-light text-danger"
                      type="button"
                      onClick={() => {
                        deleteComment(props.story._id, comment._id);
                        click();
                      }}
                    >
                      delete
                    </button>
                  </Col>
                </Row>
                <div className="container">
                  <p>{comment.text}</p>
                </div>
                <Row className="border-top bg-light rounded-bottom m-0 p-2">
                </Row>
              </div>
            ))}
          </Col>
        </Row>

        <Modal.Footer>
          <Row style={{ width: "100%" }}>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="text"
                placeholder="add comment"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </Col>
            <Col sm={2}>
              <Button
                style={{ backgroundColor: "#1a8917", borderColor: "#1a8917" }}
                variant="secondary" type="submit" onClick={props.onHide}>
                Comment
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
