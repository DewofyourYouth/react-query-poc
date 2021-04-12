import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import axios from "axios";

const defaultValues = {
  text: "",
  complete: false,
};

export default function TodoForm({
  initialValues = defaultValues,
  clearOnSubmit,
}) {
  const [values, setValues] = useState(initialValues);
  const mut = useMutation((newTodo) => axios.post("/todo", newTodo));

  const setValue = (field, value) =>
    setValues((old) => ({ ...old, [field]: value }));

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <Form onSubmit={() => mut.mutate({ ...values })}>
      <Form.Group controlId="todoText">
        <Form.Label>Text</Form.Label>
        <Form.Control
          type="text"
          value={values.text}
          onChange={(e) => setValue("text", e.target.value)}
        />
        <Form.Text className="text-muted">Type a task here</Form.Text>
      </Form.Group>
      <Form.Group controlId="todoComplete">
        <Form.Check
          type="checkbox"
          label="done!"
          value={values.complete}
          onChange={(e) => setValue("complete", e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        SUBMIT
      </Button>
    </Form>
  );
}
