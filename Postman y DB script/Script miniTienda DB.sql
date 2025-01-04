-- -----------------------------------------------
-- Script de base de datos para proyecto Tienda --
-- -----------------------------------------------


-- ----------------------------
-- schema 
-- ----------------------------
drop schema if exists "TiendaDB" cascade;
create schema "TiendaDB" authorization postgres;



-- ----------------------------
-- Tabla Productos
-- ----------------------------
drop table if exists "TiendaDB"."productos" cascade;
create table "TiendaDB"."productos" (
  "id" serial not null,
  "nombre" varchar(50) not null,
  "precio" numeric(10,2) not null,
  "cantidad" smallint not null,
  "categorias" smallint not null,
  "fecha_creacion" timestamp  null,
  "fecha_actualizacion" timestamp  null,
  "descripcion" varchar(50) not null
);


-- ----------------------------
-- Tabla Categorias
-- ----------------------------
drop table if exists "TiendaDB"."categorias" cascade;
create table "TiendaDB"."categorias" (
    "id" serial not null,
    "categorias" varchar(50) not null,
    "descripcion" varchar(50) not null
);


-- ----------------------------
-- Tabla Usuarios
-- ----------------------------
drop table if exists "TiendaDB"."usuarios" cascade;
create table "TiendaDB"."usuarios" (
   "id" serial not null,
   "nombre" varchar(50) not null,
   "contraseña" varchar(50) not null,
   "correo" varchar(50) not null,
   "rol" smallint not null
); 


-- ----------------------------
-- Tabla Rol
-- ----------------------------
drop table if exists "TiendaDB"."rol" cascade;
create table "TiendaDB"."rol" (
   "id" serial not null,
   "rol" varchar(50) not null,
   "descripcion" varchar(50) not null
);




-- ----------------------------
-- inicializacion de PK's
-- ----------------------------
alter table "TiendaDB"."productos" add constraint "PK_productos" primary key("id");
alter table "TiendaDB"."usuarios" add constraint "PK_usuarios" primary key("id");
alter table "TiendaDB"."rol" add constraint "PK_rol" primary key("id");
alter table "TiendaDB"."categorias" add constraint "PK_categoria" primary key("id");


-- ----------------------------
-- inicializacion de FK's
-- ----------------------------
alter table "TiendaDB"."productos" add constraint "FK_productos" foreign key("categorias")
references "TiendaDB"."categorias" ("id") on delete cascade;
 
alter table "TiendaDB"."usuarios" add constraint "FK_usuarios" foreign key("rol")
references "TiendaDB"."rol" ("id") on delete cascade;





-- ----------------------------
-- Records of Tables
-- ----------------------------


-- ----------------------------
-- Records of rol
-- ----------------------------
/*
drop table if exists "TiendaDB"."rol" cascade;
create table "TiendaDB"."rol" (
   "id" serial not null,
   "rol" varchar(50) not null,
   "descripcion" varchar(50) not null
);
*/

insert into "TiendaDB"."rol" values (default, 'admin', 'usuario administrador');
insert into "TiendaDB"."rol" values (default, 'usuario', 'usuario general');




-- ----------------------------
-- Records of categorias
-- ----------------------------
/*
--tabla categoria
drop table if exists "TiendaDB"."categorias" cascade;
create table "TiendaDB"."categorias" (
    "id" serial not null,
    "categorias" varchar(50) not null,
    "descripcion" varchar(50) not null
);
*/

insert into "TiendaDB"."categorias" values(default, 'software', 'categoria de software');
insert into "TiendaDB"."categorias" values(default, 'hardware', 'categoria de hardware');




-- ----------------------------
-- Records of productos
-- ----------------------------
/*
drop table if exists "TiendaDB"."productos" cascade;
create table "TiendaDB"."productos" (
  "id" serial not null,
  "nombre" varchar(50) not null,
  "precio" numeric(10,2) not null,
  "cantidad" smallint not null,
  "categorias" smallint not null,
  "fecha_creacion" timestamp  null,
  "fecha_actualizacion" timestamp  null,
  "descripcion" varchar(50) not null
);
*/

insert into "TiendaDB"."productos" values (default, 'Office', 25000, 50, 1, null, null, 'Programa ofimatica');
insert into "TiendaDB"."productos" values (default, 'Mouse', 5000, 50, 2, null, null, ' mouse');




-- ----------------------------
-- Records of usuarios
-- ----------------------------
/*-- table user
drop table if exists "TiendaDB"."usuarios" cascade;
create table "TiendaDB"."usuarios" (
   "id" serial not null,
   "nombre" varchar(50) not null,
   "contraseña" varchar(50) not null,
   "correo" varchar(50) not null,
   "rol" smallint not null
); */

insert into "TiendaDB"."usuarios" values (default, 'nefi', 'nefi', 'nefi.martinez.torres@gmail.com', 1 );
insert into "TiendaDB"."usuarios" values (default, 'carlos', 'carlos', 'carlitos@gmail.com', 2 );
