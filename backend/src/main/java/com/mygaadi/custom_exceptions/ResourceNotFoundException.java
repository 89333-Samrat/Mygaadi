package com.mygaadi.custom_exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String mesg) {
        super(mesg);
    }
}