package com.vf.todo;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;

//NOT NEEDED??? @ComponentScan("com.vf.todo")
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(Application.class, args);

//NOT NEEDED        System.out.println("Let's inspect the beans provided by Spring Boot:");
//NOT NEEDED
//NOT NEEDED        String[] beanNames = ctx.getBeanDefinitionNames();
//NOT NEEDED        Arrays.sort(beanNames);
//NOT NEEDED        for (String beanName : beanNames) {
//NOT NEEDED            System.out.println(beanName);
//NOT NEEDED        }
    }

}