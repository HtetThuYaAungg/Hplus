import React, { useRef, useState, useEffect} from "react";
import Input from "./Input";
import List from "./List";
import todolist from "./../data";
import apiRequest from "./apiRequest";

const Todo = () => {

  const API_URL = 'http://localhost:3500/lists';
  const [toDo, setToDo] = useState([]);

  const [updateData, setUpdateData] = useState("");

  const [newList, setNewList] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const inputText = useRef();

  useEffect(() => {

    const fetchLists = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json();
        setToDo(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => fetchLists(), 2000);

  }, [])


  //deleted list
  const deleteTodo = async(id) => {
    console.log(id);
    if (confirm("ဖျက်မှာသေချာပြီလား")) {
      setToDo(toDo.filter((todo) => todo.id != id));

      const deleteOption = {
        method : 'DELETE'
      }
      const reqUrl = `${API_URL}/${id}`;
      const result = await apiRequest(reqUrl, deleteOption);
      if (result) setFetchError(result);
    }
  };

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

  const updateTodo = async(id) => {
    let filter1 = [...toDo].filter((todo) => todo.id !== updateData.id);
    let update = [updateData, ...filter1];
    setToDo(update);
    setUpdateData("");

    
    const updateOption = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: update[0].title })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOption);
    if (result) setFetchError(result);
    }

 

  //added list
  const showAlert = async() => {
    if (newList) {
      alert(inputText.current.value + " ကိုထည့်မယ်");
      let newEntry1 = { id: Date.now(), title: newList, status: false };
      setToDo([...toDo, newEntry1]);
      setNewList("");

    //   const id = toDo.length ? toDo[toDo.length - 1].id + 1 : 1;
    // const myNewItem = { id, title: newList,status: false  };
    // const listItems = [toDo, myNewItem];
    // setToDo(listItems);

      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry1)
      }
      const result = await apiRequest(API_URL, postOptions);
      if (result) setFetchError(result);

    } else {
      alert("အကြောင်းရာထည့်ပါ။");
    }
  };

  //checkbox selected
  const updateCheck = async(id) => {
    console.log(id);
    const checklistid =  toDo.map((todo) => {
      if (todo.id === id) {
        todo.status = !todo.status;
      }
      return todo;
    }) 
    
    setToDo( checklistid);
    const checkList = checklistid.filter((toDo) => toDo.id === id);
    const checkOption = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: checkList[0].status })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, checkOption);
    if (result) setFetchError(result);;
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
          newList={newList}
          setNewList={setNewList}
          cancelUpdate={cancelUpdate}
          changeTodo={changeTodo}
          updateTodo={updateTodo}
          showAlert={showAlert}
          inputText={inputText}
        />
        <hr />
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
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
