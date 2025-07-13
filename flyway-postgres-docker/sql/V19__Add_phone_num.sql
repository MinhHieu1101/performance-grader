ALTER TABLE users
  ADD COLUMN phone_number VARCHAR(25) NULL;

UPDATE users
SET phone_number = 
  '+84 ' || 
  LPAD((FLOOR(RANDOM() * 900000000) + 100000000)::TEXT, 9, '0');
