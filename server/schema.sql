CREATE DATABASE chat;

USE chat;

CREATE TABLE Users (
  user_id INTEGER AUTO_INCREMENT,
  username VARCHAR(15),
  PRIMARY KEY(user_id)
);

CREATE TABLE Messages (
  message_id INTEGER AUTO_INCREMENT,
  message VARCHAR(50),
  user_id INTEGER,
  PRIMARY KEY(message_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

