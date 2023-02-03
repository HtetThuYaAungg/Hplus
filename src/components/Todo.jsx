import React, { useState } from "react";
import Input from "./Input";
import List from "./List";
import todolist from "./../data";

const Todo = () => {
  const [toDo, setToDo] = useState(todolist);

  const [updateData, setUpdateData] = useState("");

  const deleteTodo = (id) => {
    console.log(id);
    if (confirm("Are U sure to delete?")) {
      setToDo(toDo.filter((todo) => todo.id != id));
    }
  };

  const updateCheck = (id) => {
    console.log(id);
    setToDo(
      toDo.map((todo) => {
        if (todo.id === id) {
          todo.status = !todo.status;
        }
        return todo;
      })
    );
  };

  return (
    <>
      <div className="container p-3">
        <h1 className="p-2">ဘာလုပ်ချင်လဲ</h1>
        <Input
          toDo={toDo}
          setToDo={setToDo}
          updateData={updateData}
          setUpdateData={setUpdateData}
        />
        <hr />
        <ul className="list-group">
          {toDo.map((todo) => (
            <List
              todo={todo}
              key={todo.id}
              deleteTodo={deleteTodo}
              updateCheck={updateCheck}
              setUpdateData={setUpdateData}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
