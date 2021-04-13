import { Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useUpdateTodo from "../hooks/useUpdateTodo";

export function TodoCheck({ todo }) {
  const queryClient = useQueryClient();
  const mut = useMutation(
    (updateTodo) => axios.patch(`/todo/${todo._id}`, updateTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todosData");
      },
    }
  );
  return (
    <Form.Check
      checked={todo.complete}
      onClick={(e) =>
        mut.mutate({ text: todo.text, complete: e.target.checked })
      }
    />
  );
}
