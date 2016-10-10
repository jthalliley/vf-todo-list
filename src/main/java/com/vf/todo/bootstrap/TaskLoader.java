package com.vf.todo.bootstrap;

import com.vf.todo.domain.Status;
import com.vf.todo.domain.Task;
import com.vf.todo.repositories.TaskRepository;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class TaskLoader implements ApplicationListener<ContextRefreshedEvent> {

    private TaskRepository taskRepository;

    private Logger log = Logger.getLogger(TaskLoader.class);

    @Autowired
    public void setTaskRepository(final TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void onApplicationEvent(final ContextRefreshedEvent event) {

        Task one = new Task("This is task 1", Status.ACTIVE);
        taskRepository.save(one);
        log.info("Saved task one, id: " + one.getId());

        Task two = new Task("This is task two", Status.ACTIVE);
        taskRepository.save(two);
        log.info("Saved task two, id: " + two.getId());

    }
}