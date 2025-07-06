ALTER TABLE roles
  DROP CONSTRAINT IF EXISTS roles_name_key;

ALTER TABLE roles
  ADD CONSTRAINT roles_name_department_unique
    UNIQUE (name, department);

CREATE INDEX IF NOT EXISTS idx_roles_id_name_department
  ON roles(role_id, name, department);