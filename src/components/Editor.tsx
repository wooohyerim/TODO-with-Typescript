import React, { useContext, useState } from "react";
import { TodoDispatchContext, useTodoDispatch } from "../App";

interface Props {}

const Editor = (props: Props) => {
  const [text, setText] = useState("");

  const dispatch = useTodoDispatch();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onClickButton = () => {
    dispatch.onClickAdd(text);
    setText("");
  };

  return (
    <div className="flex flex-row justify-between w-full gap-4 ">
      <input
        type="text"
        value={text}
        onChange={onChangeInput}
        className="w-full p-3 border-2 rounded-[8px] outline-none border-gray text-[18px]"
      />
      <button
        className="w-[90px] p-4 text-white text-[20px] border-2 rounded-lg bg-sky-900 hover:bg-sky-800  transition"
        onClick={onClickButton}
      >
        추가
      </button>
    </div>
  );
};

export default Editor;
