import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import QueryTable from "../components/QueryTable";

export default function TestDatAlignAPI() {
  const { isLoading, error, data } = useQuery("test2Data", () =>
    fetch("https://api-dev.datalign.net/api/").then((res) => res.json())
  );
  if (isLoading) return "Loading...";
  if (error) return "An error occurred " + error.message;
  return (
    <Row>
      <Col>
        <QueryTable
          columns={["Name", "Message"]}
          values={[{ name: "Test DatAlign API", message: data.message }]}
        />
      </Col>
    </Row>
  );
}
