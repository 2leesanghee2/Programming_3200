// https://programming-3200.ssep4u.workers.dev/
import { useState, useEffect } from 'react'
import "./todolist.css"
import Button from "./components/Button.jsx"
import Checkbox from "./components/Checkbox.jsx"
import TodoItemEmpty from "./components/TodoItemEmpty.jsx"
import TodoHeader from "./components/TodoHeader.jsx"
import TodoAdder from "./components/TodoAdder.jsx"
import TodoItem from "./components/TodoItem.jsx"
import TodoList from "./components/TodoList.jsx"

class Todo {
  constructor(id, text, isCompleted) {
    this.id = id;
    this.text = text;
    this.isCompleted = isCompleted;
  }
}
const TODOS_STORAGE_KEY = "todos";  //LocalStorage 용 key

function TodoListApp() {
  const initTodos = () => {
    //localStorage에서 가져오자
    const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
    //값이 없으면 []
    //값이 있으면 todos의 초기값 대입하자
    return (!savedTodos) ? [] : JSON.parse(savedTodos); //string -> JSON 객체 또는 리스트
  }
  const [todos, setTodos] = useState(initTodos);
  //todos 변경 시, LocalStorage에 todos 저장하자
  useEffect(() => {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos)); //JSON 객체 또는 리스트 -> string
  }, [todos]);


  function addTodo(text) {
    //이전 todos에 newTodo 만들어서 추가하자 -> 그것을 setTodos() 하자
    setTodos((todos) => [
      ...todos,     //todos에 있는 item을 다 꺼내서 새로운 리스트에 하나씩 넣자
      new Todo(
        Date.now(), //id: 고유 ID 시간을 이용. == new Date().getTime()
        text,       //text: 할 일 내용
        false       //isCompleted: 할 일의 완료 여부. 초기값은 false
      )
    ]);
  }
  function toggleTodo(id) {
    setTodos((todos) =>
      // todos에서 하나씩 꺼내서, todo, 꺼낸 todo의 id와 id 가 같다면,
      // 새 객체 만들어서 todo 값 복사, 속성 수정
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )
  }
  function deleteTodo(id) {
    // todos를 하나씩 꺼내어 todo, todo.id === id
    setTodos((todos) =>
      todos.filter((todo) => todo.id !== id)
    )
  }
  function editTodo(id, newText) {
    //todos 하나씩 꺼내어 todo. id가 같으면 text: newText
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    )
  }
  return (
    <div className="todo">
      <TodoHeader />
      <TodoAdder addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>
    </div>
  )
}

export default TodoListApp