package com.vf.todo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.vf.todo.domain.Status;
import com.vf.todo.domain.Task;

public interface TaskRepository extends CrudRepository<Task, Integer> {

    // implicit:  findAll, findOne(id), delete(id), count

    @Query("SELECT COUNT(*) FROM Task t WHERE t.status = :status")
    public Integer countByStatus(@Param("status") final Status status);

    @Query("SELECT t FROM Task t WHERE t.status = :status")
    public List<Task> findByStatus(@Param("status") final Status status);

    @Modifying @Transactional
    @Query("DELETE FROM Task t WHERE t.status = :status")
    public void deleteByStatus(@Param("status") final Status status);

}

