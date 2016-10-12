# vf-todo-list

These are Mac-specific instructions.  Most will also work on Linux.

## Prerequisites

1. Install gradle, e.g., `brew install gradle`.  If you don't have brew, you can get it this way:
```
     /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2. Install java 8.  You can get it from http://www.oracle.com/technetwork/pt/java/javase/downloads/jdk8-downloads-2133151.html.

## To Run the App

1. In one terminal window, do `./run.sh`.
2. Wait until the server is up. You'll see something like this `Started Application in 7.566 seconds (JVM running for 8.043)`.
3. Point your browser to `http://localhost:8080`.

## To Run RESTful Tests

1. After "to run the app", open another terminal window and do `./tests.sh`.  You'll have to examine by eye, but it is straight forward.


## Not Implemented

1. Push notifications.  If you modify the to do list in one browser, you'll not automatically see updates in another browser.  Refresh the page to see the updates.
2. Error checking.  Errors are generally logged to the Javascript console, but mostly happy paths were implemented.
3. Browser-side filtering.  Instead of filtering tasks for the various tabs, a new fetch from the backend is done for each tab.  In a real-life situation, I'd just filter the full list of tasks.
4. Multi-user mode.  There is no notion of user implemented here, just one to-do list for all.
5. Smart checkboxes.  When you change tabs, the previously selected checkboxes are no longer selected.
6. Redundant operations.  You are allowed to reactivate an active task, complete an already completed task, and delete all completed tasks, even if there are none.

## Simplifications

1. TaskController.  Normally I'd put the repository operations into a service layer, but they're so simple, I put them directly into the controller.
