import React from "react";

import { Todo } from "../types";

interface Props extends Todo {
  onClickDelete: (id: number) => void;
}

const TodoItem = (props: Props) => {
  const onClickDelete = () => {
    props.onClickDelete(props.id);
  };

  return (
    <div className="flex flex-row justify-between px-4 pb-1 mb-3 border-2">
      <p className="w-full">
        {props.id}번 : {props.content}
      </p>
      <button className="text-[20px]" onClick={onClickDelete}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
