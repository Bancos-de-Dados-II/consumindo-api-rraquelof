import Task from "../model/Task.js";

// CRIAR TAREFA
export const createTask = async (req, res) => {
    const { title, description, type, date } = req.body;
  
    try {
      const task = await Task.create({
        title,
        description,
        type,
        date: date ? new Date(date) : null,
      });
      return res.status(201).json(task);
    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
      return res.status(500).json({ message: 'Erro ao criar a tarefa', error: err.message });
    }
  };

// LISTAR TODAS AS TAREFAS
export const getAllTasks = async (req, res) => {
    try {
        const task = await Task.findAll();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar tarefas', error:error.message });
    }
};

// BUSCAR TAREFA ESPECÍFICA
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(res.params.id);
        if(!task){
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao encontrar tarefa', error });
    }
};

// ATUALIZAR TAREFA
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, type, date } = req.body;
  
    try {
      console.log(`Tentando atualizar tarefa com ID: ${id}`);
      console.log('Dados recebidos:', req.body);
  
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
  
      task.title = title;
      task.description = description;
      task.type = type;
      task.date = date ? new Date(date) : null;
  
      await task.save();
      return res.status(200).json(task); 
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err);
      return res.status(500).json({ message: 'Erro ao atualizar a tarefa', error: err.message });
    }
  };
  
// DELETAR TAREFA   
export const deleteTask = async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);
  
      if (!task) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
      await task.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar a tarefa', error: error.message });
    }
};