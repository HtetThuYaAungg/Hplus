import React, { useImperativeHandle, useRef, useState } from "react";

const Input = ({ toDo, setToDo, updateData, setUpdateData }) => {
  const inputText = useRef();
  const [newList, setNewList] = useState("");

  const cancelUpdate = () => {
    setUpdateData("");
  };

  const changeTodo = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  const updateTodo = () => {
    let filter = [...toDo].filter((todo) => todo.id !== updateData.id);
    let update = [updateData, ...filter];
    setToDo(update);
    setUpdateData("");
  };

  const showAlert = () => {
    if (newList) {
      alert(inputText.current.value + ' ကိုထည့်မယ်');
      let newEntry1 = { id: Date.now(), title: newList, status: false };
      setToDo([...toDo, newEntry1]);
      setNewList("");
    } else {
      alert("အကြောင်းရာထည့်ပါ။");
    }
  };

  return (
    <>
      {updateData ? (
        <div className="row">
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              value={updateData && updateData.title}
              onChange={(e) => changeTodo(e)}
            ></input>
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn  btn-success"
              onClick={updateTodo}
            >
              ပြင်မယ်
            </button>
            &nbsp;
            <button type="button" className="btn  btn-warning" onClick={cancelUpdate}>
              မပြင်တော့ဘူး
            </button>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-7">
            <input
              ref={inputText}
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-auto">
            <button onClick={showAlert} className="btn btn-primary">
              ထည့်မယ်
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Input;
