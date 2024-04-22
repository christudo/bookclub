drop database if exists ircbooklist;

create database ircbooklist;

\c ircbooklist

CREATE TABLE "users" (
  "id" serial,
  "name" varchar,
  "email" varchar,
  "password" varchar,
  "salt" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "books" (
  "id" serial,
  "title" varchar,
  "description" varchar,
  "publishing_year" Int,
  "year_of_rec" Int,
  PRIMARY KEY ("id")
);

CREATE TABLE "authors" (
  "id" serial,
  "first_name" varchar,
  "last_name" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "authors_books" (
  "id" serial,
  "author_id" Int,
  "book_id" Int,
  PRIMARY KEY ("id")
);

CREATE TABLE "books_users" (
  "id" serial,
  "user_id" Int,
  "book_id" Int,
  "status_id" Int,
  "read_status" varchar,
  PRIMARY KEY ("id")
);

CREATE INDEX "CCK" ON  "books_users" ("user_id", "book_id");

