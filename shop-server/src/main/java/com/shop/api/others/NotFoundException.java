package com.shop.api.others;



public class NotFoundException extends  RuntimeException {

    public NotFoundException(String messsage) {
        super(messsage);;
    }
}
