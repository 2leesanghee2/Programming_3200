// https://programming-3200.ssep4u.workers.dev/
import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import "./todolist.css"
import Button from "./components/Button.jsx"
import Checkbox from "./components/Checkbox.jsx"
import TodoItemEmpty from "./components/TodoItemEmpty.jsx"
import TodoHeader from "./components/TodoHeader.jsx"
import TodoAdder from "./components/TodoAdder.jsx"
import TodoItem from "./components/TodoItem.jsx"
import TodoList from "./components/TodoList.jsx"

function playSound(filename) {
  const audio = new Audio(`/${filename}`)
  audio.play().catch(() => {})
}

function fireConfetti() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
  })
}

function Ceremony({ onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.45)',
      zIndex: 1000,
    }}>
        <h2 style={{ color: '#fff', margin: '12px 0 8px' }}>완료!</h2>
        <p style={{ color: '#fff', marginBottom: '20px' }}>할 일을 해냈어요!</p>
        <button
          onClick={onClose}
          style={{
            padding: '8px 24px', fontSize: '1rem',
            borderRadius: '8px', border: 'none',
            background: '#4caf50', color: '#fff', cursor: 'pointer',
          }}
        >확인</button>
      </div>
  )
}

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
  const [showCeremony, setShowCeremony] = useState(false); // 세러머니 표시 여부

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
    const todo = todos.find((t) => t.id === id)
    if (todo && !todo.isCompleted) {
      playSound('success.mp3')
      fireConfetti()          // 폭죽 애니메이션
      setShowCeremony(true)   // 세러머니 오버레이 표시
    }

    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )
  }
  function deleteTodo(id) {
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
      {showCeremony && <Ceremony onClose={() => setShowCeremony(false)} />}
      <TodoHeader />
      <TodoAdder addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>
    </div>
  )
}

export default TodoListApp