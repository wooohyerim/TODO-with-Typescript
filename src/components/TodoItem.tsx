import React from "react";

import { Todo } from "../types";
import { useTodoDispatch } from "../App";

interface Props extends Todo {}

const TodoItem = (props: Props) => {
  const dispatch = useTodoDispatch();

  const onClickDelete = () => {
    dispatch.onClickDelete(props.id);
  };

  return (
    <div className="flex flex-row items-center px-4 pb-2 mb-3 border border-b-gray-400 ">
      <p className="w-full text-[24px] ">
        {props.id}. {props.content}
      </p>
      <button
        className="text-[24px] text-white bg-sky-900 px-2  hover:bg-sky-800  transition rounded-lg"
        onClick={onClickDelete}
      >
        X
      </button>
    </div>
  );
};

export default TodoItem;
