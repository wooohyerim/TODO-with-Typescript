import React, { useState } from "react";

interface Props {
  onClickAdd: (text: string) => void;
}

const Editor = (props: Props) => {
  const [text, setText] = useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onClickButton = () => {
    props.onClickAdd(text);
    setText("");
  };

  return (
    <div className="flex flex-row justify-between w-full gap-4 ">
      <input
        type="text"
        value={text}
        onChange={onChangeInput}
        className="w-full p-2 border-2 rounded-[8px] outline-none border-gray"
      />
      <button
        className="w-[90px] p-4 text-white border-2 rounded-lg bg-sky-900"
        onClick={onClickButton}
      >
        추가
      </button>
    </div>
  );
};

export default Editor;
