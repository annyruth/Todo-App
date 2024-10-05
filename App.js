import React, { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Task Card Component
const TaskItem = ({ task, onToggleStatus, onDeleteTask }) => {
  return (
    <View style={styles.taskCard}>
      {/* Apply the style for crossed text if the task is done */}
      <Text style={[styles.taskTitle, task.status && styles.taskTitleDone]}>
        {task.title}
      </Text>
      <Switch
        value={task.status}
        onValueChange={() => onToggleStatus(task.id)}
      />
      <TouchableOpacity onPress={() => onDeleteTask(task.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main App Component
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Function to add a new task
  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle,
        status: false, // default status is 'due/false'
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle(''); // clear the input after adding
    }
  };

  // Function to toggle task status
  const toggleTaskStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: !task.status } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Task Title"
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
      />
      <Button
        title="Add Task"
        onPress={addTask}
        disabled={!newTaskTitle.trim()} // Disable button if title is empty
      />

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleStatus={toggleTaskStatus}
            onDeleteTask={deleteTask}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 1,
  },
  taskTitle: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  // New style for done task (crossed out)
  taskTitleDone: {
    textDecorationLine: 'line-through', // Adds the strike-through
    color: 'gray', // Optionally change the text color
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskList: {
    marginTop: 20,
  },
});

export default App;
