import axios from "axios";
import { useMutation, queryCache } from "react-query";

export default function useCreateTodo() {
  return useMutation(
    (values) =>
      axios
        .post("http://localhost:8080/todo", values)
        .then((response) => response.data),
    {
      onMutate: (newTodo) => {
        const oldTodos = queryCache.getQueryData("todosData");

        if (queryCache.getQueryData("todosData")) {
          queryCache.setQueryData("todosData", (old) => [...old, newTodo]);
        }
        return () => queryCache.setQueryData("todosData", oldTodos);
      },
      onError: (error, _newTodo, rollback) => {
        console.error(error);
        if (rollback) rollback();
      },
    }
  );
}
