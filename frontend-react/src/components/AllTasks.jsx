import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllTasks(){
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'Pessoal',
    date: ''
  });

  const [isUpdating, setIsUpdating] = useState(false); // booleano fica true quando está atualizando ou criando
  const [currentTaskId, setCurrentTaskId] = useState(null); // id da tarefa que está sendo atualizada

  useEffect(()=>{
    fetchTasks();
  }, []);

  // Função para buscar tarefas
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error);
    }
  };

  // Criar/Atualizar tarefa
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(isUpdating){
        await axios.put(`http://localhost:3000/tasks${currentTaskId}`,form);
        setIsUpdating(false);
        setCurrentTaskId(null);
      }else{
        await axios.post('http://localhost:3000/tasks', form);
        setForm({title: '', description: '', type: 'Pessoal', date:''});
        fetchTasks();
      }
    } catch (error) {
      console.error('Erro ao criar ou atualizar tarefa:', error);
    }    
  };

  //Função para deletar tarefa
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  // Função preencher formulário em edição de tarefa
  const handleUpdateClick = (task) =>{
    setForm({
      title: task.title,
      description: task.description,
      type: task.type,
      date: task.date ? task.date.split('T')[0] : '',
    });
    setIsUpdating(true);
    setCurrentTaskId(task.id)
  };

  return(
    <div>
      <h2>Minhas Tarefas</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Título'
          value={form.title} 
          onChange={(e) => setForm({...form, title: e.target.value})} 
          required
        />
        <input 
          type="text"
          placeholder='Descrição'
          value={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}  
        />
        <select 
          value={form.type}
          onChange={(e) => setForm({...form, type: e.target.value})}
          required>
            <option value="Pessoal">Pessoal</option>
            <option value="Profissional">Profissional</option>
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <button type='submit'>
          {isUpdating ? 'Atualizar tarefa': 'Criar tarefa'}
        </button>
      </form>

    {tasks.length === 0 ? (
        <p class="no-tasks-message">Nenhuma tarefa encontrada.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} >
              <strong>{task.title}</strong> - {task.description}<br />
              <em>{task.type}</em> - {task.date ? new Date(task.date).toLocaleDateString() : 'Sem data'}<br />
              <button onClick={() => handleUpdateClick(task)}>Atualizar</button>
              <button onClick={() => deleteTask(task.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      )}

    </div>
  )

}