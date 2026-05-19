# Programming 수업 소스 코드 🫡
## 02_counter
vanilla HTML, JavaScript
## React 시작 🤔
```shell
npm create vite@latest .
```
### CounterApp 😆
- useState()
- onClick={() => set함수((state변수) => state변수 + 1)}
- onClick={함수이름}
### TodoListApp 🌸
- React Component 분리
- for -> htmlFor, class -> className
- props
- `<input id={id} value={} />`, `<label htmlFor={id} />`
- onChange
- 구조 분해 할당, `...스프레드연산자`
- `<form onSubmit={}></form>`
- `map()`: RU
- `filter()`: D
- `<TodoItem key{} />`
- `const handleEvent =  (event) => {}`
- `{조건식 ? 참 : 거짓}`
- `{조건식 && 참}`, `{!조건식 && 거짓}`
- onKeyDown
- LocalStorage, `useEffect()`
- `style={{}}`
- HomeApp: state 값을 변경하여 그에 맞는 컴포넌트를 표시하자
- `npm install react-router-dom`
- ```javascript
  <BrowserRouter>
    <Routes>
      <Route path="/" element={} />
    </Routes>
  </BrowserRouter>
  ```
- ```javascript
  <Link to="/"></Link>
  ```
- `useNavigate()`
- 3209윤시웅