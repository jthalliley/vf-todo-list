package com.vf.main;

import java.util.List;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.vf.main.entities.Status;
import com.vf.main.entities.Task;
import com.vf.main.repositories.TaskRepository;

import com.google.common.collect.Lists;


@EnableAutoConfiguration
@RestController
public class TaskController {

    private TaskRepository taskRepository;

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
    public Task setTaskStatus(@PathVariable Long id, @PathVariable Status status) {
        Task task = taskRepository.findOne(id);
        if (task != null) {
            task.setStatus(status);
            taskRepository.save(task);
        }
        return task;
    }

    @RequestMapping(value="/task/{id}",  method=RequestMethod.DELETE)
    @ResponseBody
    public String deleteTask(@PathVariable Long id) {
        taskRepository.delete(id);
        return "deleted " + id;
    }

    @RequestMapping(value="/completedTasks",  method=RequestMethod.DELETE)
    @ResponseBody
    public String deleteAllCompletedTasks() {
        taskRepository.deleteByStatus(Status.COMPLETED);
        return "deleted all completed";
    }

}
