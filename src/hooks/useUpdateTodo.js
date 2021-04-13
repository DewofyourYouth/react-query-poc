import React from "react";
import axios from "axios";
import { useMutation, queryCache } from "react-query";

export default function useUpdateTodo() {
  return useMutation(
    (id, todo) => axios.patch(`/todo/${id}`, todo).then((res) => res.data),
    {
      onSuccess: () => {
        queryCache.invalidateQueries("todosData");
      },
    }
  );
}
