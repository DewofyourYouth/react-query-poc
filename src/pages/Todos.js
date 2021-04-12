import { Col, Row, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import QueryTable from "../components/QueryTable";
import TodoForm from "../components/TodoForm";

export default function Todos() {
  const { isLoading, error, data } = useQuery("todosData", () =>
    fetch("http://localhost:8080/todos").then((res) => res.json())
  );

  if (isLoading) return "Loading...";
  if (error) return "An error occurred " + error.message;
  return (
    <>
      <Row>
        <Col>
          <h2 className="pt-3 mb-3">Todos:</h2>
          <hr />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>_id</th>
                <th>text</th>
                <th>complete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((x, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{x._id}</td>
                  <td>{x.text}</td>
                  <td>{x.complete ? "🗹" : "☐"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Create New Todo:</h3>
          <hr />
          <TodoForm clearOnSubmit />
        </Col>
      </Row>
    </>
  );
}
