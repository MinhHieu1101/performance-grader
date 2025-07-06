ALTER TABLE criteria
  ADD COLUMN priority_level INT NOT NULL DEFAULT 0;

UPDATE criteria
  SET priority_level = CASE
                WHEN is_mandatory THEN 1
                ELSE 0
              END;

ALTER TABLE criteria
  DROP COLUMN is_mandatory;
