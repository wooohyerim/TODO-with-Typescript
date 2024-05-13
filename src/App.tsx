import React, {
  useEffect,
  useRef,
  useState,
  useReducer,
  useContext,
} from "react";
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
  let newState;
  switch (action.type) {
    case "CREATE": {
      newState = [...state, action.data];
      break;
    }
    case "DELETE": {
      newState = state.filter((item) => item.id !== action.id);
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("todos", JSON.stringify(newState));
  return newState;
};

export const TodoStateContext = React.createContext<Todo[] | null>(null);

export const TodoDispatchContext = React.createContext<{
  onClickAdd: (text: string) => void;
  onClickDelete: (id: number) => void;
} | null>(null);

export function useTodoDispatch() {
  const dispatch = useContext(TodoDispatchContext);
  if (!dispatch) throw new Error("TodoDispatchContext에 문제가 있다.");
  return dispatch;
}

function App() {
  // const [todo, setTodo] = useState<Todo[]>([]);
  const initialState: Todo[] = JSON.parse(
    localStorage.getItem("todos") || "[]"
  );
  const [todo, dispatch] = useReducer(reducer, initialState);

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
      <h1 className="text-[24px]">🌱 오늘 할 일</h1>
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider
          value={{
            onClickAdd,
            onClickDelete,
          }}
        >
          <section className="flex flex-col gap-4 bg-slate-200 items-center w-[700px] min-h-[1000px] p-4 rounded-xl ">
            <Editor />
            <div className=" w-full min-h-[1000px]">
              {todo.map((list) => (
                <TodoItem key={list.id} {...list} />
              ))}
            </div>
          </section>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
