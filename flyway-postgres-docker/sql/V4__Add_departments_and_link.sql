CREATE TABLE departments (
  department_id   SERIAL       PRIMARY KEY,
  name            VARCHAR(255) NOT NULL UNIQUE,
  description     VARCHAR(255),
  created_at      TIMESTAMP    NOT NULL DEFAULT NOW()
);

ALTER TABLE roles
  ADD COLUMN department_id INT NULL;

ALTER TABLE roles
  ADD CONSTRAINT fk_role_department
    FOREIGN KEY(department_id) REFERENCES departments(department_id) ON DELETE SET NULL;

ALTER TABLE user_roles
  ADD COLUMN department_id INT NULL;

ALTER TABLE user_roles
  ADD CONSTRAINT fk_userrole_department
    FOREIGN KEY(department_id) REFERENCES departments(department_id) ON DELETE SET NULL;
