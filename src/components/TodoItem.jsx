import { useState } from 'react'
import Checkbox from "./Checkbox.jsx"
import Button from "./Button.jsx"

export default function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
    const [isEditing, setIsEditing] = useState(false);  //수정중인지 아닌지
    const [editText, setEditText] = useState(todo.text);    //수정중인 text
    function handleEditClick() {
        if (!isEditing) {   //edit 시작
            setIsEditing(true);
            setEditText(todo.text);
        } else {            //edit 끝
            const trimmedText = editText.trim();
            //빈칸이 아니고, 이전 text가 아닐때만 editTodo()
            if (trimmedText !== "" && trimmedText !== todo.text) {
                editTodo(todo.id, trimmedText);
            }
            setIsEditing(false);
        }
    }
    return (
        // todo.isCompleted가 true 면 " todo__item--complete", false ""
        <li className={`todo__item${todo.isCompleted ? " todo__item--complete" : ""}`}>
            {!isEditing &&
                <Checkbox
                    id={todo.id}
                    checked={todo.isCompleted}
                    onChange={() => toggleTodo(todo.id)}
                >{todo.text}</Checkbox>
            }
            {isEditing &&
                <input
                    type="text"
                    className="todo__input--edit"
                    value={editText}
                    onChange={(event) => setEditText(event.target.value)}
                    //enter 치면, handleEditClick 호출하자
                    onKeyDown={(event) => { if (event.key === "Enter") handleEditClick() }}
                    autoFocus
                />
            }
            <Button
                className="todo__button todo__button--edit"
                onClick={handleEditClick}
            >{isEditing ? "💾" : "🤺"}</Button>
            <Button
                className="todo__button todo__button--delete"
                onClick={() => deleteTodo(todo.id)}
            >🗑️</Button>
        </li>
    )
}