package com.vf.main.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.vf.main.entities.Status;
import com.vf.main.entities.Task;

public interface TaskRepository extends CrudRepository<Task, Long> {

    // implicit:  findAll, findOne(id), delete(id), count

    public List<Task> findByStatus(final Status status);

    public void deleteByStatus(final Status status);

}

