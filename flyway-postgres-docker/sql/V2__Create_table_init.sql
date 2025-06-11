-- V1__Initial_Schema_Setup.sql
-- This script creates the initial database schema based on the provided ERD.

-- Create the 'users' table
CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Storing hashed passwords, CHAR is not suitable
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the 'roles' table
CREATE TABLE roles (
    role_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the 'user_roles' junction table
-- This table links users to their roles (many-to-many relationship)
CREATE TABLE user_roles (
    user_role_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE, -- If a user is deleted, their role assignments are also deleted

    CONSTRAINT fk_role
        FOREIGN KEY(role_id) 
        REFERENCES roles(role_id)
        ON DELETE CASCADE, -- If a role is deleted, assignments of that role are deleted

    -- Ensure a user cannot be assigned the same role twice
    UNIQUE (user_id, role_id)
);

-- Create the 'rewards' table
CREATE TABLE rewards (
    reward_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the 'criteria' table
-- This table holds the criteria required for a specific reward
CREATE TABLE criteria (
    criteria_id BIGSERIAL PRIMARY KEY,
    reward_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_reward
        FOREIGN KEY(reward_id) 
        REFERENCES rewards(reward_id)
        ON DELETE CASCADE -- If a reward is deleted, its criteria are also deleted
);

-- Create the 'applications' table
-- This table stores user applications for rewards
CREATE TABLE applications (
    application_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    reward_id BIGINT NOT NULL,
    remarks TEXT,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(user_id)
        ON DELETE RESTRICT, -- Prevent deleting a user who has applications

    CONSTRAINT fk_reward
        FOREIGN KEY(reward_id) 
        REFERENCES rewards(reward_id)
        ON DELETE RESTRICT -- Prevent deleting a reward that has applications
);

-- Create the 'documents' table
-- This table stores documents uploaded by users for their applications
CREATE TABLE documents (
    document_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    application_id BIGINT NOT NULL,
    criteria_id BIGINT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(1024) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(user_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_application
        FOREIGN KEY(application_id) 
        REFERENCES applications(application_id)
        ON DELETE CASCADE, -- If an application is deleted, its documents are also deleted

    CONSTRAINT fk_criteria
        FOREIGN KEY(criteria_id) 
        REFERENCES criteria(criteria_id)
        ON DELETE RESTRICT
);

-- Add indexes to foreign key columns for performance optimization
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);
CREATE INDEX idx_criteria_reward_id ON criteria(reward_id);
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_reward_id ON applications(reward_id);
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_application_id ON documents(application_id);
CREATE INDEX idx_documents_criteria_id ON documents(criteria_id);