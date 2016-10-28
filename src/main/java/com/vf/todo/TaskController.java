package com.vf.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.vf.todo.domain.Status;
import com.vf.todo.domain.Task;
import com.vf.todo.repositories.TaskRepository;

import com.google.common.collect.Lists;


@RestController
public class TaskController {

    private TaskRepository taskRepository;

    @Autowired
    public void setTaskRepository(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }


    @RequestMapping(value="/task",  method=RequestMethod.PUT)
    @ResponseBody
    public Task newTask(@RequestBody Task task) {
        task.setStatus(Status.ACTIVE);
        return taskRepository.save(task);
    }

    @RequestMapping(value="/task",  method=RequestMethod.GET)
    @ResponseBody
    public List<Task> getAllTasks() {
        return Lists.newArrayList(taskRepository.findAll());
    }

    @RequestMapping(value="/task/{status}",  method=RequestMethod.GET)
    @ResponseBody
    public List<Task> getTasksByStatus(@PathVariable Status status) {
        return Lists.newArrayList(taskRepository.findByStatus(status));
    }

    @RequestMapping(value="/task/{id}/{status}",  method=RequestMethod.PUT)
    @ResponseBody
    public Task setTaskStatus(@PathVariable Integer id, @PathVariable Status status) {
        Task task = taskRepository.findOne(id);
        if (task != null) {
            task.setStatus(status);
            taskRepository.save(task);
        }
        return task;
    }

    @RequestMapping(value="/task/{id}",  method=RequestMethod.DELETE)
    @ResponseBody
    public void deleteTask(@PathVariable Integer id) {
        taskRepository.delete(id);
    }

    @RequestMapping(value="/completedTasks",  method=RequestMethod.DELETE)
    @ResponseBody
    public void deleteAllCompletedTasks() {
        taskRepository.deleteByStatus(Status.COMPLETED);
    }

    @RequestMapping(value="/countActiveTasks",  method=RequestMethod.GET)
    @ResponseBody
    public Integer countActiveTasks() {
        return taskRepository.countByStatus(Status.ACTIVE);
    }

}
