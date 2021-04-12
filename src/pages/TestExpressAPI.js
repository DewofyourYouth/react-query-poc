import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import QueryTable from "../components/QueryTable";

export default function TestExpressAPI() {
  const { isLoading, error, data } = useQuery("testData", () =>
    fetch("http://localhost:8080/").then((res) => res.json())
  );
  if (isLoading) return "Loading...";
  if (error) return "An error occurred " + error.message;
  return (
    <Row>
      <Col>
        <QueryTable
          columns={["Name", "Message"]}
          values={[{ name: "Test Express API", message: data.message }]}
        />
      </Col>
    </Row>
  );
}
