import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const addTask = () => {
    if (!taskName || !dueDate) return;
    setTasks([...tasks, { taskName, taskDescription, dueDate, isCompleted }]);
    setTaskName("");
    setTaskDescription("");
    setDueDate(null);
    setIsCompleted(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <Card>
        <CardContent className="space-y-4 p-4">
          <Input
            placeholder="Nombre de la tarea"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <Textarea
            placeholder="Descripción de la tarea"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <Calendar 
            selected={dueDate} 
            onChange={setDueDate} 
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isCompleted}
              onCheckedChange={setIsCompleted}
            />
            <span>Completada</span>
          </div>
          <Button onClick={addTask}>Agregar Tarea</Button>
        </CardContent>
      </Card>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <h3 className="font-semibold">{task.taskName}</h3>
              <p>{task.taskDescription}</p>
              <p className="text-sm text-gray-500">Vence: {task.dueDate?.toLocaleDateString()}</p>
              <p className="text-sm">{task.isCompleted ? "✅ Completada" : "❌ Pendiente"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
