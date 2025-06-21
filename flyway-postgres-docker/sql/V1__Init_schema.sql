CREATE TABLE
    users (
        user_id UUID PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW (),
    );

CREATE TABLE
    roles (
        role_id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255),
        created_at TIMESTAMP NOT NULL DEFAULT NOW (),
    );

CREATE TABLE
    user_roles (
        user_role_id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        role_id INT NOT NULL,
        assigned_at TIMESTAMP NOT NULL DEFAULT NOW (),
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
        CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE,
        UNIQUE (user_id, role_id)
    );

CREATE TABLE
    refresh_tokens (
        user_id UUID NOT NULL,
        token TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW (),
        PRIMARY KEY (user_id),
        CONSTRAINT fk_rt_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
    );

CREATE TABLE
    rewards (
        reward_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW ()
    );

CREATE TABLE
    criteria (
        criterion_id SERIAL PRIMARY KEY,
        reward_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        is_mandatory BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW (),
        CONSTRAINT fk_criterion_reward FOREIGN KEY (reward_id) REFERENCES rewards (reward_id) ON DELETE CASCADE,
        UNIQUE (reward_id, name)
    );

CREATE TABLE
    applications (
        application_id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        reward_id INT NULL,
        type VARCHAR(255) NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'In Progress',
        remarks TEXT NULL,
        applied_at TIMESTAMP NOT NULL DEFAULT NOW (),
        modified_at TIMESTAMP NULL,
        CONSTRAINT fk_app_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
        CONSTRAINT fk_app_reward FOREIGN KEY (reward_id) REFERENCES rewards (reward_id) ON DELETE CASCADE
    );

CREATE TABLE
    documents (
        document_id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        application_id INT NOT NULL,
        criterion_id INT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'Pending',
        reviewed_at TIMESTAMP NULL,
        remarks TEXT NULL,
        uploaded_at TIMESTAMP NOT NULL DEFAULT NOW (),
        CONSTRAINT fk_doc_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
        CONSTRAINT fk_doc_application FOREIGN KEY (application_id) REFERENCES applications (application_id) ON DELETE CASCADE,
        CONSTRAINT fk_doc_criteria FOREIGN KEY (criterion_id) REFERENCES criteria (criterion_id) ON DELETE CASCADE
    );