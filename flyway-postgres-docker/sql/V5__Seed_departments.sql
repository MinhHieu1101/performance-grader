INSERT INTO
    departments (name, description, created_at)
VALUES
    (
        'Khoa Khoa học',
        'Bộ môn Khoa học tổng hợp',
        NOW ()
    ),
    ('Khoa Toán', 'Bộ môn Toán học', NOW ()),
    (
        'Phòng Hành chính',
        'Phòng quản lý hành chính',
        NOW ()
    );

UPDATE roles
SET
    department_id = d.department_id
FROM
    departments d
WHERE
    roles.name = 'nhanvien'
    AND d.name = 'Khoa Khoa học';

UPDATE roles
SET
    department_id = d.department_id
FROM
    departments d
WHERE
    roles.name = 'quanly'
    AND d.name = 'Phòng Hành chính';

UPDATE roles
SET
    department_id = d.department_id
FROM
    departments d
WHERE
    roles.name = 'admin'
    AND d.name = 'Phòng Hành chính';

UPDATE user_roles ur
SET
    department_id = r.department_id
FROM
    roles r
WHERE
    ur.role_id = r.role_id;