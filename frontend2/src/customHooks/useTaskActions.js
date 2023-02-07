import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodoAPI,
  toggleDoneAPI,
  toggleFinishTask,
} from "../redux/todoSlice";

const useTaskActions = () => {
  const dispatch = useDispatch();

  const removeTask = useCallback(
    function (id) {
      dispatch(deleteTodoAPI(id));
    },
    [dispatch]
  );

  const finishTask = useCallback(
    function (task) {
      if (task.id > 0 && task.id < 201) {
        dispatch(toggleDoneAPI(task));
      } else {
        dispatch(toggleFinishTask(task));
      }
    },
    [dispatch]
  );

  return [removeTask, finishTask];
};

export default useTaskActions;
