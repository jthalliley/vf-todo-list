
var newTaskDialog;
var currentTab       = "ALL";
var numTasksSelected = new Array();

numTasksSelected["ALL"]       = 0;
numTasksSelected["ACTIVE"]    = 0;
numTasksSelected["COMPLETED"] = 0;


function bodyOnload() {
    newTaskDialog = $("#newTaskDialog").dialog({
        autoOpen: false,
        height: 200,
        width:  500,
        modal: true,
        buttons: {
            "Create" : function() {
                createNewTask();
                newTaskDialog.dialog("close");
            },
            "Cancel" : function() {
                newTaskDialog.dialog("close");
            }
        },
        close: function() {
        }
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

        setTaskStatus(taskIds, "COMPLETED");
    });

    $("#reactivateTasks").button().on("click", function() {
        var taskIds = new Array();
        $.each($("#" + currentTab + " input[type='checkbox']:checked"), function() {
            taskIds.push($(this).attr('id'));
        });

        setTaskStatus(taskIds, "ACTIVE");
    });

    $("#deleteTasks").button().on("click", function() {
        var taskIds = new Array();
        $.each($("#" + currentTab + " input[type='checkbox']:checked"), function() {
            taskIds.push($(this).attr('id'));
        });

        deleteTasks(taskIds);
    });

    $("#deleteAllCompletedTasks").button().on("click", function() {
        deleteAllCompletedTasks();
    });

    $(document).ready(function() {
        enableDisableButtons("ALL");

        $("#tabs").tabs();

        $("#tabs").on("tabsactivate", function(event, ui) {
            currentTab = ui.newTab[0].innerText;
            loadTodoTable();
        });

        loadTodoTable();
    });;
}

function createNewTask() {

    var titleField = newTaskDialog.find("#titleField").val();

    if (titleField.length === 0) {
        alert("No title provided.  Task not created.");
    } else {
        newTask({title: titleField});
    }
}

function newTask(task) {
    $.ajax({
        url: "http://localhost:8080/task",
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(task),
        dataType: 'json',
        processData: false,
        success: function(data) {
            loadTodoTable();
        },
        error: function (request, status, error) {
            alert("ERROR(" + status + "): " + error);
        },
    });
};

function setTaskStatus(taskIds, status) {
    $.each(taskIds, function(index, taskId) {
        $.ajax({
            url: "http://localhost:8080/task/" + taskId + "/" + status,
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            processData: false,
            success: function(data) {
                loadTodoTable();
            },
            error: function (request, status, error) {
                alert("ERROR(" + status + "): " + error);
            },
        });
    });
};

function deleteTasks(taskIds) {
    $.each(taskIds, function(index, taskId) {
        $.ajax({
            url: "http://localhost:8080/task/" + taskId,
            type: 'DELETE',
            success: function(data) {
                loadTodoTable();
            },
            error: function (request, status, error) {
                alert("ERROR(" + status + "): " + error);
            },
        });
    });
};

function deleteAllCompletedTasks() {
    $.ajax({
        url: "http://localhost:8080/completedTasks",
        type: 'DELETE',
        processData: false,
        success: function(data) {
            loadTodoTable();
        },
        error: function (request, status, error) {
            alert("ERROR(" + status + "): " + error);
        },
    });
};

function loadTodoTable() {
    var status = (currentTab === "ALL" ? "" : "/" + currentTab);

    $.ajax({
        url: "http://localhost:8080/task" + status,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
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

            enableDisableButtons(currentTab);

            $("#" + currentTab + " input[type='checkbox']").change(function() {
                if ($(this).is(':checked')) {
                    numTasksSelected[currentTab]++;
                } else {
                    numTasksSelected[currentTab]--;
                }

                enableDisableButtons(currentTab);
            });
        
        },
        error: function (request, status, error) {
            alert("ERROR(" + status + "): " + error);
        },
    });
};

function enableDisableButtons(tab) {

    $("#completeTasks").attr("disabled",   numTasksSelected[tab] === 0);
    $("#reactivateTasks").attr("disabled", numTasksSelected[tab] === 0);
    $("#deleteTasks").attr("disabled",     numTasksSelected[tab] === 0);

    $("#newTask").attr("disabled",                 false);
    $("#deleteAllCompletedTasks").attr("disabled", false);
}


