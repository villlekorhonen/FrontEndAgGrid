import React, { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function TodoList() {
  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  };

  const addTodo = () => {
    setTodos([...todos, todo]);
    
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
    setTodos(todos.filter((todo, index) =>
    index != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
        alert('Selesct row first');
    }
  };



  const columns =[
    {headerName: 'Description', field : "description", sortable: true, filter: true },
    {headerName: 'Date', field : "date", sortable: true, filter: true},
    {headerName: 'Priority', field : "priority", sortable: true, filter: true, 
    cellStyle: params => params.value === "high" ? {color: 'red', fontWeight: 'bold'} : {color: 'black'}
}
    ];

  return (
    <div>
        <h1>TodoList</h1>
      <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
      <input type="text" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/>
      <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/>
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>

      <div className='ag-theme-material'
      style={{height: '700px', width: '100%', margin: 'auto'}}>
        <AgGridReact
            ref={gridRef}
            onGridReady={params => gridRef.current = params.api }
            rowSelection='single'
            columnDefs={columns}
            rowData={todos}>

            </AgGridReact>
            
      
      </div>
    
       
    </div>
  );
};

export default TodoList;