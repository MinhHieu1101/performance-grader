TRUNCATE TABLE user_roles, roles
  RESTART IDENTITY CASCADE;

INSERT INTO roles (name, description, department, created_at) VALUES
  ('nhanvien', 'Nhân viên',     'Khoa Khoa học',    NOW()),
  ('quanly',   'Quản lý',       'Phòng Hành chính', NOW()),
  ('admin',    'Quản trị viên', 'Phòng Hành chính', NOW());

INSERT INTO user_roles (user_id, role_id, assigned_at) VALUES
  -- User “Nguyễn Văn A” (UUID 1111...) → nhanvien (role_id = 1)
  ('11111111-1111-1111-1111-111111111111', 1, NOW()),
  -- User “Trần Thị B” (UUID 2222...)    → quanly   (role_id = 2)
  ('22222222-2222-2222-2222-222222222222', 2, NOW()),
  -- User “Phạm Văn C” (UUID 3333...)    → admin    (role_id = 3)
  ('33333333-3333-3333-3333-333333333333', 3, NOW());
