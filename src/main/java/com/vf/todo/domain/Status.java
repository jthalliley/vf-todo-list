package com.vf.todo.domain;

import org.apache.commons.lang3.text.WordUtils;

public enum Status {

    ACTIVE,
    COMPLETED;

    @Override public String toString() {
        return WordUtils.capitalize(this.name());
    }

}
