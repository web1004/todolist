import './App.css';
import { useState, useRef, useReducer } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "청소하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "과제하기",
    date: new Date().getTime(),
  },
];

function reducer(){

}

function App() {
  //const [todos, setTodos] = useState(mockData);
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3); //mockData와 겹치치 않는 값으로

  const onCreate = (content) => {
    // 새로운 아이템을 객체형태로 만들어줌
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    }

    setTodos([newTodo, ...todos]);
  };

  const onUpdate = (targetId) => {
    //todos State의 값들 중에
    //targetId와 일치하는 id를 갖는 todo아이템의 isDone 변경

    //인수:todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열을 전달
    setTodos(
      todos.map((todo)=>
        todo.id === targetId
        ? { ...todo, isDone: !todo.isDone }
        : todo
      )
    );
  };

  const onDelete = (targetId) => {
    //인수:todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    setTodos(todos.filter((todo) => todo.id !== targetId)); //삭제대상이 아닌 요소들만 필터링
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate}/>
      <List 
        todos={todos} 
        onUpdate={onUpdate} 
        onDelete={onDelete}
      />
    </div>
  );
}

export default App;
