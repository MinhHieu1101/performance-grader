TRUNCATE TABLE user_roles, roles
  RESTART IDENTITY CASCADE;

INSERT INTO roles (role_id, name, description, created_at) VALUES
  (0, 'admin',      'Administrator', NOW()),
  (1, 'canhan',    'Cá nhân', NOW()),
  (2, 'khoa',       'Khoa', NOW()),
  (3, 'bomon',     'Bộ môn - Phòng ban - Trung tâm', NOW()),
  (4, 'benhvien',  'Bệnh viện', NOW()),
  (5, 'truong',     'Trường', NOW());

INSERT INTO user_roles (user_role_id, user_id, role_id, assigned_at, department) VALUES
  (1, '11111111-1111-1111-1111-111111111111', 1, NOW(), NULL),
  (2, '22222222-2222-2222-2222-222222222222', 2, NOW(), 'Kinh tế'),
  (3, '33333333-3333-3333-3333-333333333333', 3, NOW(), 'Đường lối của Đảng');