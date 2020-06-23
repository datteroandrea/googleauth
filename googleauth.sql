drop database if exists googleauth;
create database googleauth;
use googleauth;

create table User(
	userId varchar(255) primary key,
    username varchar(50) not null,
    email varchar(255) not null
);