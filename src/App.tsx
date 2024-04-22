import React, { useEffect, useRef, useState, useReducer } from "react";
import Editor from "./components/Editor";

import { Todo } from "./types";
import TodoItem from "./components/TodoItem";

type Action =
  | {
      type: "CREATE";
      data: {
        id: number;
        content: string;
      };
    }
  | { type: "DELETE"; id: number };

const reducer = (state: Todo[], action: Action) => {
  switch (action.type) {
    case "CREATE": {
      return [...state, action.data];
    }
    case "DELETE": {
      return state.filter((item) => item.id !== action.id);
    }
    default:
      return state;
  }
};

export const TodoStateContext = React.createContext<Todo[] | null>(null);

export const TodoDispatchContext = React.createContext<{
  onClickAdd: (text: string) => void;
  onClickDelete: (id: number) => void;
} | null>(null);

function App() {
  // const [todo, setTodo] = useState<Todo[]>([]);
  const [todo, dispatch] = useReducer(reducer, []);

  const idRef = useRef(1);

  const onClickAdd = (text: string) => {
    // setTodo([...todo, { id: idRef.current++, content: text }]);

    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        content: text,
      },
    });
  };

  const onClickDelete = (id: number) => {
    // setTodo(todo.filter((item) => item.id !== id));

    dispatch({
      type: "DELETE",
      id: id,
    });
  };

  useEffect(() => {
    console.log(todo);
  }, [todo]);

  return (
    <div className="flex flex-col items-center w-full gap-4 my-16 h-100vh ">
      <h1 className="text-[24px]">TODO</h1>
      <TodoStateContext.Provider value={todo}>
        <section className="flex flex-col gap-4 bg-slate-200 items-center w-[500px] min-h-[1000px] p-4 rounded-xl ">
          <Editor onClickAdd={onClickAdd} />
          <div className=" w-full min-h-[1000px]">
            {todo.map((list) => (
              <TodoItem key={list.id} {...list} onClickDelete={onClickDelete} />
            ))}
          </div>
        </section>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
