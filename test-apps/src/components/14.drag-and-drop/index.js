import { useEffect, useState } from "react";
import "./draganddrop.css";

function DragAndDropFeature() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ todos, setTodos ] = useState([]);

    async function fetchListOfTodos(params) {
        try {
            setIsLoading(true);
            const apiResponse = await fetch('https://dummyjson.com/todos?limit=10&skip=0');
            const result = await apiResponse.json();
            if (result && result.todos && result.todos.length > 0) {
                // console.log('Fetched Todos: ', result.todos);
                setIsLoading(false);
                const updatedTodos = result.todos.map(todoItem => ({
                    ...todoItem,
                    status: todoItem.completed === true ? 'completed' : 'wip'
                }));
                setTodos(updatedTodos);
            }
            else {
                throw new Error('No Todos Found.')
            }
        }
        catch(e) {
            console.error('Error fetching todos: ', e);
            setIsLoading(false);
            setTodos([]);
        }
    }

    useEffect(() => {
        fetchListOfTodos();
    }, []);

    function onDragStart(e, id) {
        e.dataTransfer.setData('id', id);
    }

    function onDrop(event, status) {
        const id = event.dataTransfer.getData('id');
        const updatedTodos = todos.map(todoItem => {
            if (todoItem.id.toString() === id) {
                todoItem.status = status;
                todoItem.completed = !todoItem.completed;
            }
            return todoItem;
        });
        setTodos(updatedTodos);
    }

    function renderTodos() {
        const todoListToRender = {
            wip: [],
            completed: []
        };

        todos.forEach(todoItem => {
            todoListToRender[todoItem.status].push(
                <div
                    key={todoItem.id}
                    draggable
                    className="todo-card"
                    onDragStart={(event) => onDragStart(event, todoItem.id)}
                >
                    {todoItem.todo}
                </div>
            );
        });

        return todoListToRender;
    }

    if (isLoading) return <h1>Loading Todos. Please wait!</h1>;

    return (
        <div className="drag-and-drop-container">
            <h1>Drag And Drop</h1>
            <div className="drag-and-drop-board">
                <div
                    onDrop={(event) => onDrop(event, 'wip')}
                    onDragOver={(event) => event.preventDefault()}
                    className="work-in-progress"
                >
                    <h3>In Progess</h3>
                    <div className="todo-list-wrapper">
                        {renderTodos().wip}
                    </div>
                </div>
                <div
                    onDrop={(event) => onDrop(event, 'completed')}
                    onDragOver={(event) => event.preventDefault()}
                    className="completed"
                >
                    <h3>Completed</h3>
                    <div className="todo-list-wrapper">
                        {renderTodos().completed}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DragAndDropFeature;