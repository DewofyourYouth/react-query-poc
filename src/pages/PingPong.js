import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import QueryTable from "../components/QueryTable";

export default function PingPong() {
  const { isLoading, error, data } = useQuery("pingPongData", () =>
    fetch("http://localhost:8080/ping").then((res) => res.json())
  );
  if (isLoading) return "Loading...";
  if (error) return "An error occurred " + error.message;
  return (
    <Row>
      <Col>
        <QueryTable
          columns={["Name", "Message", "Times"]}
          values={[
            {
              name: "Ping Pong Test",
              message: "🏓 " + data.message,
              times: data.pongerTimes,
            },
          ]}
        />
      </Col>
    </Row>
  );
}
