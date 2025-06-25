ALTER TABLE applications
  ADD COLUMN year INTEGER NOT NULL
    DEFAULT (EXTRACT(YEAR FROM NOW())::INT);

UPDATE applications
  SET year = (EXTRACT(YEAR FROM applied_at)::INT);