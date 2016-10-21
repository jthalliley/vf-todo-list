
function ToDo() {

    "use strict";

    var newTaskDialog;
    var currentTab       = "ALL";
    var numTasksSelected = new Array();
    
    numTasksSelected["ALL"]       = 0;
    numTasksSelected["ACTIVE"]    = 0;
    numTasksSelected["COMPLETED"] = 0;
    
    return {
        bodyOnload: function() {
            var _this = this;
            newTaskDialog = $("#newTaskDialog").dialog({
                autoOpen: false,
                height:   200,
                width:    500,
                modal:    true,
                buttons:  {
                    "Create": function() {
                        _this.createNewTask();
                        newTaskDialog.dialog("close");
                    },
                    "Cancel": function() {
                        newTaskDialog.dialog("close");
                    },
                },
                close: function() {}
            });
            
            $("#newTask").button().on("click", function() {
                newTaskDialog.find("#titleField").val("");
                newTaskDialog.dialog("open");
            });

            $("#completeTasks").button().on("click", function() {
                var taskIds = new Array();
                $.each($("#" + currentTab + " input[type='checkbox']:checked"), function() {
                    taskIds.push($(this).attr('id'));
                });

                _this.setTaskStatus(taskIds, "COMPLETED");
            });

            $("#reactivateTasks").button().on("click", function() {
                var taskIds = new Array();
                $.each($("#" + currentTab + " input[type='checkbox']:checked"), function() {
                    taskIds.push($(this).attr('id'));
                });

                _this.setTaskStatus(taskIds, "ACTIVE");
            });

            $("#deleteTasks").button().on("click", function() {
                var taskIds = new Array();
                $.each($("#" + currentTab + " input[type='checkbox']:checked"), function() {
                    taskIds.push($(this).attr('id'));
                });

                _this.deleteTasks(taskIds);
            });

            $("#deleteAllCompletedTasks").button().on("click", function() {
                _this.deleteAllCompletedTasks();
            });

            $(document).ready(function() {
                _this.enableDisableButtons("ALL");

                $("#tabs").tabs();

                $("#tabs").on("tabsactivate", function(event, ui) {
                    currentTab = ui.newTab[0].innerText;
                    _this.loadTodoTable();
                });

                _this.loadTodoTable();
            });;
        },

        createNewTask: function() {
            var _this = this;
            var titleField = newTaskDialog.find("#titleField").val();

            if (titleField.length === 0) {
                alert("No title provided.  Task not created.");
            } else {
                _this.newTask({title: titleField});
            }
        },

        newTask: function(task) {
            var _this = this;
            $.ajax({
                url:         "http://localhost:8080/task",
                type:        'PUT',
                contentType: 'application/json',
                data:        JSON.stringify(task),
                dataType:    'json',
                processData: false,
                success:     function(data) {
                    _this.loadTodoTable();
                },
                error: function (request, status, error) {
                    alert("ERROR(" + status + "): " + error);
                },
            });
        },

        setTaskStatus: function(taskIds, status) {
            var _this = this;
            $.each(taskIds, function(index, taskId) {
                $.ajax({
                    url:         "http://localhost:8080/task/" + taskId + "/" + status,
                    type:        'PUT',
                    contentType: 'application/json',
                    dataType:    'json',
                    processData: false,
                    success: function(data) {
                        _this.loadTodoTable();
                    },
                    error: function (request, status, error) {
                        alert("ERROR(" + status + "): " + error);
                    },
                });
            });
        },

        deleteTasks: function(taskIds) {
            var _this = this;
            $.each(taskIds, function(index, taskId) {
                $.ajax({
                    url:  "http://localhost:8080/task/" + taskId,
                    type: 'DELETE',
                    success: function(data) {
                        _this.loadTodoTable();
                    },
                    error: function (request, status, error) {
                        alert("ERROR(" + status + "): " + error);
                    },
                });
            });
        },

        deleteAllCompletedTasks: function() {
            var _this = this;
            $.ajax({
                url:         "http://localhost:8080/completedTasks",
                type:        'DELETE',
                processData: false,
                success:     function(data) {
                    _this.loadTodoTable();
                },
                error: function (request, status, error) {
                    alert("ERROR(" + status + "): " + error);
                },
            });
        },

        loadTodoTable: function() {
            var _this = this;
            var status = (currentTab === "ALL" ? "" : "/" + currentTab);

            $.ajax({
                url:         "http://localhost:8080/task" + status,
                type:        'GET',
                contentType: 'application/json',
                dataType:    'json',
                processData: false,
                success: function(data) {
                    var todoTableBody = $("#" + currentTab + " #todoTable tbody");
                    todoTableBody.empty();
                    var activeCount = 0;
                    
                    $.each(data, function(index, value) {
                        todoTableBody.append(
                            "<tr>" +
                                '<td>' + '<input type="checkbox" name="' + value.id + '" id="' + value.id + '"/>' + '</td>' +
                                "<td>" + value.title  + "</td>" +
                                "<td>" + value.status + "</td>" +
                                "</tr>"
                        );
                        if (value.status === "ACTIVE") activeCount++
                    });

                    $("#activeTaskCount").empty().append(activeCount + " active tasks");

                    _this.enableDisableButtons(currentTab);

                    $("#" + currentTab + " input[type='checkbox']").change(function() {
                        if ($(this).is(':checked')) {
                            numTasksSelected[currentTab]++;
                        } else {
                            numTasksSelected[currentTab]--;
                        }

                        _this.enableDisableButtons(currentTab);
                    });
                    
                },
                error: function (request, status, error) {
                    alert("ERROR(" + status + "): " + error);
                },
            });
        },

        enableDisableButtons: function(tab) {
            var _this = this;
            $("#completeTasks").attr("disabled",   numTasksSelected[tab] === 0);
            $("#reactivateTasks").attr("disabled", numTasksSelected[tab] === 0);
            $("#deleteTasks").attr("disabled",     numTasksSelected[tab] === 0);

            $("#newTask").attr("disabled",                 false);
            $("#deleteAllCompletedTasks").attr("disabled", false);
        }

    };
}

var todo = ToDo();
