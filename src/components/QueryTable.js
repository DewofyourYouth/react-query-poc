import { Table } from "react-bootstrap";

export default function QueryTable({ columns, values }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map((name, i) => (
            <th key={i}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {values.map((value, i) => (
          <tr key={i}>
            {Object.values(value).map((v, j) => (
              <td key={j}>{v}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
