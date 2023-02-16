import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Fonts } from "../constants/styles";
import { HomeContext, HomeProvider } from "../context/HomeContext";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HomeProvider>
        <HomeConsumer />
      </HomeProvider>
    );
  }
}

class HomeConsumer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static contextType = HomeContext;
  render() {
    const { grade } = this.context;
    return (
      <HomeContext.Consumer>
        {(context) => (
          <>
            <section><p style={Fonts.largeDark}>Home</p></section>
            {/* <section>
              <p style={Fonts.largeDark}>Grades</p>
              <Table className="mt-4" bordered size="sm">
                <thead style={Fonts.smallDark}>
                  <tr>
                    <td>#</td>
                    <td>Lesson code</td>
                    <td>Lesson name</td>
                    <td>Credit</td>
                    <td>70</td>
                    <td>30</td>
                    <td>Total</td>
                    <td>Letter</td>
                  </tr>
                </thead>
                <tbody style={Fonts.smallDark}>
                  {grade.map((lesson, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{lesson.lesson_code}</td>
                      <td>{lesson.lesson_name}</td>
                      <td>{lesson.lesson_credit}</td>
                      <td>{lesson.seventy_grade}</td>
                      <td>{lesson.thirty_exam_grade}</td>
                      <td>{lesson.total_grade}</td>
                      <td>{lesson.letter_grade}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </section> */}
          </>
        )}
      </HomeContext.Consumer>
    );
  }
}
