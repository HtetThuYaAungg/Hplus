import React from "react";

const Input = ({ inputText,
                updateData,
                showAlert, 
                newList, 
                setNewList, 
                cancelUpdate, changeTodo, updateTodo }) => {
 

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
              onClick={()=>updateTodo(updateData.id)}
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
