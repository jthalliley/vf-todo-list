package com.vf.todo.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Task {

    @Id @GeneratedValue(strategy=GenerationType.AUTO) private Integer id;

    private String title;
    private Status status;

    protected Task() {}

    public Task(final String title, final Status status) {
        setTitle(title);
        setStatus(status);
    }

    public void setId(final     Integer id)     { this.id     = id;     }
    public void setTitle(final  String  title)  { this.title  = title;  }
    public void setStatus(final Status  status) { this.status = status; }

    public Integer getId()     { return this.id;     }
    public String  getTitle()  { return this.title;  }
    public Status  getStatus() { return this.status; }

}
