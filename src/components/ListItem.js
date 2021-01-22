import React, { useState, useEffect } from "react";
import { useTodo } from "../TodoProvider";

function ListItem({ task, id }) {
    const [isEditing, setEditingMode] = useState(false);
    const [complete, setComplete] = useState(false);
    const [newValue, setNewValue] = useState(task);

    const { completeTodo, deleteTodo, updateTodo } = useTodo();

    const toggleComplete = () => {
        setComplete(!complete);
        completeTodo(id, complete);
    };

    const viewMode = (
        <div>
            <p
                className={complete ? "completed" : ""}
                onClick={() => {
                    toggleComplete();
                }}
            >
                {task}
            </p>{" "}
            <input
                type="button"
                value="Update"
                onClick={() => {
                    setEditingMode(true);
                    setNewValue(task);
                }}
            />{" "}
            <input
                type="button"
                value="Delete"
                onClick={() => {
                    deleteTodo(id);
                }}
            />
        </div>
    );

    const editMode = (
        <form
            onSubmit={function (e) {
                e.preventDefault();
                updateTodo(id, newValue);
                setEditingMode(false);
            }}
        >
            <input
                type="text"
                value={newValue}
                name="editedTodo"
                onChange={e => {
                    setNewValue(e.target.value);
                }}
            />
            <input type="submit" value="submit" />{" "}
            <input
                type="button"
                value="Cancel"
                onClick={() => {
                    setEditingMode(false);
                }}
            />
        </form>
    );

    return <li>{isEditing ? editMode : viewMode}</li>;
}

export default ListItem;
