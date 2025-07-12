-- Create comprehensive survey table
CREATE TABLE survey_responses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    q1_rating INTEGER CHECK (q1_rating BETWEEN 1 AND 7),
    q2_rating INTEGER CHECK (q2_rating BETWEEN 1 AND 7),
    q3_rating INTEGER CHECK (q3_rating BETWEEN 1 AND 7),
    q4_rating INTEGER CHECK (q4_rating BETWEEN 1 AND 7),
    q5_rating INTEGER CHECK (q5_rating BETWEEN 1 AND 7),
    q6_rating INTEGER CHECK (q6_rating BETWEEN 1 AND 7),
    q7_rating INTEGER CHECK (q7_rating BETWEEN 1 AND 7),
    q8_rating INTEGER CHECK (q8_rating BETWEEN 1 AND 7),
    q9_rating INTEGER CHECK (q9_rating BETWEEN 1 AND 7),
    q10_rating INTEGER CHECK (q10_rating BETWEEN 1 AND 7),
    q11_rating INTEGER CHECK (q11_rating BETWEEN 1 AND 7),
    q12_rating INTEGER CHECK (q12_rating BETWEEN 1 AND 7),
    q13_rating INTEGER CHECK (q13_rating BETWEEN 1 AND 7),
    q14_rating INTEGER CHECK (q14_rating BETWEEN 1 AND 7),
    q15_rating INTEGER CHECK (q15_rating BETWEEN 1 AND 7),
    q16_rating INTEGER CHECK (q16_rating BETWEEN 1 AND 7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create new table
CREATE TABLE survey_details (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert survey questions
INSERT INTO survey_details (name, description) VALUES
('q1', 'Nhìn chung, tôi hài lòng về mức độ dễ sử dụng của ứng dụng này.'),
('q2', 'Ứng dụng này sử dụng đơn giản.'),
('q3', 'Tôi đã có thể hoàn thành các tác vụ và kịch bản một cách nhanh chóng khi sử dụng ứng dụng này.'),
('q4', 'Tôi cảm thấy thoải mái khi sử dụng ứng dụng này.'),
('q5', 'Thật dễ dàng để học cách sử dụng ứng dụng này.'),
('q6', 'Tôi tin rằng tôi có thể làm việc hiệu quả một cách nhanh chóng khi sử dụng ứng dụng này.'),
('q7', 'Ứng dụng đã đưa ra các thông báo lỗi cho tôi biết rõ cách khắc phục sự cố.'),
('q8', 'Bất cứ khi nào tôi mắc lỗi khi sử dụng ứng dụng, tôi đều có thể khắc phục một cách dễ dàng và nhanh chóng.'),
('q9', 'Thông tin (chẳng hạn như trợ giúp trực tuyến, thông báo trên màn hình và các tài liệu khác) được cung cấp cùng với ứng dụng này rất rõ ràng.'),
('q10', 'Thật dễ dàng để tìm thấy thông tin tôi cần.'),
('q11', 'Thông tin này rất hữu ích trong việc giúp tôi hoàn thành các tác vụ và kịch bản.'),
('q12', 'Cách tổ chức thông tin trên các màn hình của ứng dụng rất rõ ràng.'),
('q13', 'Giao diện của ứng dụng này dễ chịu.'),
('q14', 'Tôi thích sử dụng giao diện của ứng dụng này.'),
('q15', 'Ứng dụng này có tất cả các chức năng và khả năng mà tôi mong đợi.'),
('q16', 'Nhìn chung, tôi hài lòng với ứng dụng này.');
