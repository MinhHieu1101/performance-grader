ALTER TABLE survey_responses
ALTER COLUMN user_id TYPE UUID USING user_id::text::uuid;