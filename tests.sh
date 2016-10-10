#!/bin/bash

echo "Expect task one and task two"
curl -X GET localhost:8080/task

echo "Expect 2"
curl -X GET localhost:8080/countTasks

echo
echo "add another task"
curl -H "Content-Type: application/json" -X PUT -d '{"title":"command line task","status":"ACTIVE"}' localhost:8080/task

echo
echo "Expect task one and task two and command line task"
curl -X GET localhost:8080/task

echo
echo "delete task one"
curl -H "Content-Type: application/json" -X DELETE localhost:8080/task/1

echo
echo "Expect task two and command line task"
curl -X GET localhost:8080/task

echo
echo "list completed tasks (none)"
curl -X GET -H "Content-Type: application/json" localhost:8080/task/COMPLETED

echo
echo "set status to completed"
curl -X PUT -H "Content-Type: application/json" localhost:8080/task/2/COMPLETED

echo
echo "list completed tasks (task two)"
curl -X GET -H "Content-Type: application/json" localhost:8080/task/COMPLETED

echo
echo "delete all completed (task two)"
curl -H "Content-Type: application/json" -X DELETE localhost:8080/completedTasks

echo
echo "list completed tasks (none)"
curl -X GET -H "Content-Type: application/json" localhost:8080/task/COMPLETED


