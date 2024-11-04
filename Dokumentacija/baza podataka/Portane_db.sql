CREATE SCHEMA "lut";

CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "firstname" varchar,
  "lastname" varchar,
  "email" varchar,
  "password" varchar,
  "active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (now()),
  "last_updated" timestamp DEFAULT (now())
);

CREATE TABLE "closets" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "user_id" integer,
  "active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (now()),
  "last_updated" timestamp DEFAULT (now())
);

CREATE TABLE "closet_closet_components" (
  "id" integer PRIMARY KEY,
  "closet_id" integer,
  "closet_component_id" integer,
  "quantity" integer
);

CREATE TABLE "articles" (
  "id" integer PRIMARY KEY,
  "label" varchar,
  "picture" varchar,
  "public" bool,
  "closet_component_id" integer,
  "category_id" integer,
  "condition_id" integer,
  "primary_color_id" integer,
  "secondary_color_id" integer,
  "footwear_type_id" integer,
  "active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (now()),
  "last_updated" timestamp DEFAULT (now())
);

CREATE TABLE "lut"."closet_components" (
  "id" integer PRIMARY KEY,
  "label" varchar
);

CREATE TABLE "lut"."categories" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "lut"."seasons" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "lut"."footwear_types" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "lut"."styles" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "lut"."colors" (
  "id" integer PRIMARY KEY,
  "red" integer,
  "green" integer,
  "blue" integer,
  "name" varchar
);

CREATE TABLE "lut"."conditions" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

ALTER TABLE "closets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "closet_closet_components" ADD FOREIGN KEY ("closet_id") REFERENCES "closets" ("id");

ALTER TABLE "closet_closet_components" ADD FOREIGN KEY ("closet_component_id") REFERENCES "lut"."closet_components" ("id");

ALTER TABLE "articles" ADD FOREIGN KEY ("closet_component_id") REFERENCES "closet_closet_components" ("id");

ALTER TABLE "articles" ADD FOREIGN KEY ("category_id") REFERENCES "lut"."categories" ("id");

ALTER TABLE "articles" ADD FOREIGN KEY ("condition_id") REFERENCES "lut"."conditions" ("id");

ALTER TABLE "articles" ADD FOREIGN KEY ("primary_color_id") REFERENCES "lut"."colors" ("id");

ALTER TABLE "articles" ADD FOREIGN KEY ("secondary_color_id") REFERENCES "lut"."colors" ("id");

ALTER TABLE "articles" ADD FOREIGN KEY ("footwear_type_id") REFERENCES "lut"."footwear_types" ("id");

CREATE TABLE "articles_seasons" (
  "articles_id" integer,
  "seasons_id" integer,
  PRIMARY KEY ("articles_id", "seasons_id")
);

ALTER TABLE "articles_seasons" ADD FOREIGN KEY ("articles_id") REFERENCES "articles" ("id");

ALTER TABLE "articles_seasons" ADD FOREIGN KEY ("seasons_id") REFERENCES "lut"."seasons" ("id");


CREATE TABLE "articles_styles" (
  "articles_id" integer,
  "styles_id" integer,
  PRIMARY KEY ("articles_id", "styles_id")
);

ALTER TABLE "articles_styles" ADD FOREIGN KEY ("articles_id") REFERENCES "articles" ("id");

ALTER TABLE "articles_styles" ADD FOREIGN KEY ("styles_id") REFERENCES "lut"."styles" ("id");

