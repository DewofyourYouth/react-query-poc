import { Col, Row, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import TodoForm from "../components/TodoForm";
import { useHistory, Link } from "react-router-dom";
import { TodoCheck } from "../components/TodoCheck";

export default function Todos() {
  const { isLoading, error, data } = useQuery("todosData", () =>
    fetch("http://localhost:8080/todos").then((res) => res.json())
  );
  const history = useHistory();
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
                <th>Date / Time Created</th>
                <th>To Do</th>
                <th>Complete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((x, i) => (
                <tr key={x._id}>
                  <td>{i + 1}</td>
                  <td>
                    {new Date(x.dateCreated).toLocaleDateString()}{" "}
                    {new Date(x.dateCreated).toLocaleTimeString()}
                  </td>
                  <td>
                    <Link to={"/todo/" + x._id}>{x.text}</Link>
                  </td>
                  <td>
                    <TodoCheck todo={x} />
                  </td>
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
