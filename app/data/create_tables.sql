BEGIN;

 DROP TABLE IF EXISTS "chatbot_responses", "users";

-- Table pour les réponses du chatbot
CREATE TABLE chatbot_responses (
  "id" SERIAL PRIMARY KEY,
  "response" TEXT NOT NULL
);

-- Table pour les utilisateurs
CREATE TABLE users (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(50) NOT NULL,
  "email" VARCHAR(128) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "is_admin" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz
);

 COMMIT;