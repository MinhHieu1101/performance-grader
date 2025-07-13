TRUNCATE TABLE survey_details
  RESTART IDENTITY CASCADE;


-- Insert survey questions
INSERT INTO survey_details (name, description) VALUES
('q1_rating', 'Nhìn chung, tôi hài lòng về mức độ dễ sử dụng của ứng dụng này.'),
('q2_rating', 'Ứng dụng này sử dụng đơn giản.'),
('q3_rating', 'Tôi đã có thể hoàn thành các tác vụ và kịch bản một cách nhanh chóng khi sử dụng ứng dụng này.'),
('q4_rating', 'Tôi cảm thấy thoải mái khi sử dụng ứng dụng này.'),
('q5_rating', 'Thật dễ dàng để học cách sử dụng ứng dụng này.'),
('q6_rating', 'Tôi tin rằng tôi có thể làm việc hiệu quả một cách nhanh chóng khi sử dụng ứng dụng này.'),
('q7_rating', 'Ứng dụng đã đưa ra các thông báo lỗi cho tôi biết rõ cách khắc phục sự cố.'),
('q8_rating', 'Bất cứ khi nào tôi mắc lỗi khi sử dụng ứng dụng, tôi đều có thể khắc phục một cách dễ dàng và nhanh chóng.'),
('q9_rating', 'Thông tin (chẳng hạn như trợ giúp trực tuyến, thông báo trên màn hình và các tài liệu khác) được cung cấp cùng với ứng dụng này rất rõ ràng.'),
('q10_rating', 'Thật dễ dàng để tìm thấy thông tin tôi cần.'),
('q11_rating', 'Thông tin này rất hữu ích trong việc giúp tôi hoàn thành các tác vụ và kịch bản.'),
('q12_rating', 'Cách tổ chức thông tin trên các màn hình của ứng dụng rất rõ ràng.'),
('q13_rating', 'Giao diện của ứng dụng này dễ chịu.'),
('q14_rating', 'Tôi thích sử dụng giao diện của ứng dụng này.'),
('q15_rating', 'Ứng dụng này có tất cả các chức năng và khả năng mà tôi mong đợi.'),
('q16_rating', 'Nhìn chung, tôi hài lòng với ứng dụng này.');
