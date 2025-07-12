ALTER TABLE user_roles
  ADD COLUMN department VARCHAR(255) NULL;

ALTER TABLE user_roles
  ADD CONSTRAINT uq_user_roles_user_role_dept
    UNIQUE (user_id, role_id, department);

ALTER TABLE roles
  DROP CONSTRAINT IF EXISTS roles_name_department_unique;

DROP INDEX IF EXISTS roles_name_key;
DROP INDEX IF EXISTS idx_roles_id_name_department;

ALTER TABLE roles
  DROP COLUMN department;
