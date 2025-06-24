-- 1) Users
INSERT INTO users (user_id, username, email, password, created_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Nguyễn Văn A', 'nva@example.com', '$2a$10$abcdefghijklmnopqrstuv', NOW()),
  ('22222222-2222-2222-2222-222222222222', 'Trần Thị B',     'ttb@example.com', '$2a$10$abcdefghijklmnopqrstuv', NOW()),
  ('33333333-3333-3333-3333-333333333333', 'Phạm Văn C',     'pvc@example.com', '$2a$10$abcdefghijklmnopqrstuv', NOW());

-- 2) Roles
INSERT INTO roles (name, description, created_at)
VALUES
  ('nhanvien', 'Nhân viên', NOW()),
  ('quanly',   'Quản lý',    NOW()),
  ('admin',    'Quản trị viên', NOW());

-- 3) user_roles
INSERT INTO user_roles (user_id, role_id, assigned_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', (SELECT role_id FROM roles WHERE name='nhanvien'), NOW()),
  ('22222222-2222-2222-2222-222222222222', (SELECT role_id FROM roles WHERE name='quanly'),   NOW()),
  ('33333333-3333-3333-3333-333333333333', (SELECT role_id FROM roles WHERE name='admin'),    NOW());

-- 4) Refresh tokens (dummy values)
INSERT INTO refresh_tokens (user_id, token, created_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'refresh-token-nva', NOW()),
  ('22222222-2222-2222-2222-222222222222', 'refresh-token-ttb', NOW()),
  ('33333333-3333-3333-3333-333333333333', 'refresh-token-pvc', NOW());

-- 5) Rewards (Danh hiệu Thi đua) assigned per role
INSERT INTO rewards (role_id, name, description, created_at)
VALUES
  ((SELECT role_id FROM roles WHERE name='nhanvien'),
    'Danh hiệu Lao động Tiên tiến',
    'Khen thưởng nhân viên có thành tích lao động xuất sắc', NOW()),
  ((SELECT role_id FROM roles WHERE name='nhanvien'),
    'Danh hiệu Chiến sĩ Thi đua cơ sở',
    'Dành cho nhân viên có đóng góp tiêu biểu trong năm', NOW()),
  ((SELECT role_id FROM roles WHERE name='quanly'),
    'Danh hiệu Tập thể Lao động Xuất sắc',
    'Khen thưởng tập thể bộ phận quản lý xuất sắc', NOW()),
  ((SELECT role_id FROM roles WHERE name='admin'),
    'Danh hiệu Quản trị Xuất sắc',
    'Dành riêng cho quản trị viên có thành tích vượt trội', NOW());

-- 6) Criteria for each reward
-- Reward 1: Lao động Tiên tiến
INSERT INTO criteria (reward_id, name, description, is_mandatory, created_at)
VALUES
  (1, 'Không nghỉ không lý do', 'Tỷ lệ chuyên cần 100%', TRUE, NOW()),
  (1, 'Hoàn thành KPI',       'Đạt ≥ 100% chỉ tiêu giao', TRUE, NOW());

-- Reward 2: Chiến sĩ Thi đua cơ sở
INSERT INTO criteria (reward_id, name, description, is_mandatory, created_at)
VALUES
  (2, 'Đạt danh hiệu lao động tiên tiến', 'Đã được cấp trước đó', TRUE, NOW()),
  (2, 'Trong sạch gương mẫu',            'Không vi phạm quy định', TRUE, NOW());

-- Reward 3: Tập thể Lao động Xuất sắc
INSERT INTO criteria (reward_id, name, description, is_mandatory, created_at)
VALUES
  (3, 'Tỷ lệ hoàn thành nhiệm vụ ≥ 95%', 'Kết quả chung bộ phận', TRUE, NOW()),
  (3, 'Không vi phạm tập thể',           'Không có kỷ luật tập thể', TRUE, NOW());

-- Reward 4: Quản trị Xuất sắc
INSERT INTO criteria (reward_id, name, description, is_mandatory, created_at)
VALUES
  (4, 'Triển khai dự án thành công', 'Dự án đạt mục tiêu kinh doanh', TRUE, NOW()),
  (4, 'Đào tạo nhân viên',           'Tổ chức ít nhất 2 khóa đào tạo', TRUE, NOW());

-- 7) Pre-existing application + documents for testing
-- User A (UUID 1111...) applies for reward 1
INSERT INTO applications (user_id, reward_id, type, status, remarks, applied_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 1, 'reward', 'Submitted', 'Xin xét danh hiệu Lao động Tiên tiến', NOW());

-- Documents for that application (assume application_id=1)
INSERT INTO documents (user_id, application_id, criterion_id, file_name, file_path, status, uploaded_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 1, 1, 'chuyen_can.pdf', 'chuyen_can.pdf', 'Pending', NOW()),
  ('11111111-1111-1111-1111-111111111111', 1, 2, 'bao_cao_kpi.xlsx', 'bao_cao_kpi.xlsx', 'Pending', NOW());
