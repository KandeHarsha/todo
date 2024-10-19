"use client"

import { useEffect, useRef, useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import {addTodo, deleteTodo, editTodo, toggleTodoCompleted}  from "@/lib/features/todos/todosSlice"
import { RootState } from "@/lib/store";

export default function TodoPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLInputElement>(null);
  const todos = useSelector((state:RootState) => state.todoReducer.todos)
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<any>(null)
  const [editText, setEditText] = useState("")
  
  useEffect(() =>{
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos])

  useEffect(() => {
    if (editRef && editRef.current) {
      editRef.current.focus();
    }
  }, [editingId])

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const payload = {text: newTodo}
      dispatch(addTodo(payload))
      setNewTodo("")
    }
  }

  const handleDelete = (id: string) => {
    const payload = {id}
    dispatch(deleteTodo(payload))
  }

  const toggleComplete = (id: string) => {
    const payload = {id}
    dispatch(toggleTodoCompleted(payload))
  }

  const startEditing = (id: string, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const handleSaveEdit = () => {
    if (editingId !== null) {
      const payload = {
        id: editingId,
        text: editText
      }
      dispatch(editTodo(payload))
      setEditingId(null)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      if (document.activeElement === inputRef.current){
        handleAddTodo();
      }else if(document.activeElement === editRef.current) {
        handleSaveEdit();
      }
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <Input
          ref={inputRef}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow mr-2"
          onKeyDown={handleKeyDown} 
        />
        <Button onClick={handleAddTodo}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
      <div className="space-y-2">
        {todos.map((todo) => (
          <Card key={todo.id}>
            <CardContent className="p-4">
              {editingId === todo.id ? (
                <div className="flex items-center">
                  <Input
                    ref={editRef}
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow mr-2"
                    onKeyDown={handleKeyDown}
                  />
                  <Button onClick={handleSaveEdit} size="sm">
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleComplete(todo.id)}
                      id={`todo-${todo.id}`}
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`${
                        todo.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditing(todo.id, todo.text)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      className="text-red-500"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}