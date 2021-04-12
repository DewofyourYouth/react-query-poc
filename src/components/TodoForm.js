import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const defaultValues = {
  text: "",
  complete: false,
};

export default function TodoForm({
  onSubmit,
  initialValues = defaultValues,
  submitText,
  clearOnSubmit,
}) {
  const [values, setValues] = useState(initialValues);

  const setValue = (field, value) =>
    setValues((old) => ({ ...old, [field]: value }));
  const handleSubmit = (e) => {
    if (clearOnSubmit) {
      setValues(defaultValues);
    }
    e.preventDefault();
    onSubmit(values);
  };

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <Form onSubmit={handleSubmit}>
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
        Submit
      </Button>
    </Form>
  );
}
