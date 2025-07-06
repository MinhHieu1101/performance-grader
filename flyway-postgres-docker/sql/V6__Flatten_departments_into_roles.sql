ALTER TABLE user_roles
  DROP CONSTRAINT IF EXISTS fk_userrole_department;
ALTER TABLE user_roles
  DROP COLUMN IF EXISTS department_id;

ALTER TABLE roles
  DROP CONSTRAINT IF EXISTS fk_role_department;
ALTER TABLE roles
  DROP COLUMN IF EXISTS department_id;

DROP TABLE IF EXISTS departments;

ALTER TABLE roles
  ADD COLUMN department VARCHAR(255) NULL;
