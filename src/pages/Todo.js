import { useQuery } from "react-query";
import { Row, Col, Form } from "react-bootstrap";

export default function Todo({ match }) {
  const { isLoading, error, data } = useQuery(["myTo", match.params.id], () =>
    fetch("http://localhost:8080/todo/" + match.params.id).then((res) =>
      res.json()
    )
  );

  if (isLoading) return "Loading...";
  if (error) return "An error occurred " + error.message;
  return (
    <Row>
      <Col>
        <h2>{data.text}</h2>
        <p>{data.dateCreated}</p>
        <Form.Check value={data.complete} />
      </Col>
    </Row>
  );
}
