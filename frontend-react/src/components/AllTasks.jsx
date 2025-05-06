import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        setTasks(response.data);
      } catch (err) {
        console.error('Erro ao buscar tarefas:', err);
        setErro('Não foi possível carregar as tarefas.');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Minhas Tarefas</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTasks;