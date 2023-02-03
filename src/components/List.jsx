import React from "react";

const List = ({ todo, deleteTodo, updateCheck, setUpdateData }) => {
  const status = todo.status ? "text-decoration-line-through" : "";

  return (
    <>
      <li className="list-group-item slide-down">
        <div className="d-flex justify-content-between align-items-center">
          <input
            onChange={() => updateCheck(todo.id)}
            type="checkbox"
            checked={todo.status}
            className="form-check-input me-2"
          />
          <span className={`${status} fw-bold`}>{todo.title}</span>
          <div className="">
            {todo.status ? null : (
              <button
                onClick={() =>
                  setUpdateData({
                    id: todo.id,
                    title: todo.title,
                    status: todo.status ? true : false,
                  })
                }
                className="btn btn-sm btn-warning me-2"
              >
                ပြင်မယ်
              </button>
            )}

            <button
              className="btn btn-sm btn-danger "
              onClick={() => deleteTodo(todo.id)}
            >
              ဖျက်မယ်
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default List;
