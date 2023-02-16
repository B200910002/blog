import { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  console.log(param)

  const verifyEmailUrl = async () => {
    try {
      const url = `http://localhost:1000/api/v1/user/${param.id}/verify/${param.token}`;
      const { data } = await axios.get(url);
      console.log(data);
      setValidUrl(true);
    } catch (error) {
      console.log(error.response.data);
      setValidUrl(false);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <h1>Click to email verify</h1>
        <Button onClick={() => verifyEmailUrl()}>Verify</Button>
      </div>
    </Fragment>
  );
};

export default EmailVerify;
