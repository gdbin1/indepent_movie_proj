SHOW DATABASES;

CREATE DATABASE independent_movie;

USE independent_movie;

SHOW TABLES;

CREATE TABLE users (
  user_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
  email       VARCHAR(100) NOT NULL,
  password    VARCHAR(255) NOT NULL,
  name        VARCHAR(50)  NOT NULL,
  phone       VARCHAR(20),
  role        VARCHAR(20)  NOT NULL COMMENT 'USER / ADMIN',
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                         ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_users_email (email)
);

CREATE TABLE movie (
  movie_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
  source        VARCHAR(20)  NOT NULL COMMENT 'KOBIS / MANUAL',
  movie_cd      VARCHAR(50)  COMMENT 'KOBIS movie code',
  title         VARCHAR(255) NOT NULL,
  description   TEXT,
  runtime_min   INT          NOT NULL,
  open_date     VARCHAR(20),
  poster_url    VARCHAR(500),
  price_grade   VARCHAR(20)  NOT NULL COMMENT 'PREMIUM / BASIC',
  is_active     TINYINT(1)   NOT NULL DEFAULT 1,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_movie_cd (movie_cd),
  KEY idx_movie_active (is_active)
);

CREATE TABLE room (
  room_id        BIGINT AUTO_INCREMENT PRIMARY KEY,
  room_code      VARCHAR(20)  NOT NULL COMMENT '관리용 코드 (R1, R2...)',
  room_name      VARCHAR(100) NOT NULL,
  room_type      VARCHAR(30)  NOT NULL COMMENT 'COUPLE / PRIVATE_4 / PRIVATE_6 / GROUP',
  capacity_min   INT          NOT NULL,
  capacity_max   INT          NOT NULL,
  base_price     INT          NOT NULL,
  is_active      TINYINT(1)   NOT NULL DEFAULT 1,
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                            ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_room_code (room_code),
  KEY idx_room_active (is_active)
);

CREATE TABLE schedule (
  schedule_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
  movie_id      BIGINT      NOT NULL,
  room_id       BIGINT      NOT NULL,
  start_at      DATETIME    NOT NULL,
  end_at        DATETIME    NOT NULL,
  display_date  DATE        NOT NULL,
  status        VARCHAR(20) NOT NULL COMMENT 'OPEN / CLOSED / CANCELED',
  price_final   INT         NOT NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                          ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_schedule_date (display_date),
  KEY idx_schedule_movie (movie_id),
  KEY idx_schedule_room (room_id),
  KEY idx_schedule_time (start_at, end_at)
);

CREATE TABLE reservation (
  reservation_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
  reservation_no   VARCHAR(50) NOT NULL COMMENT '사용자 노출용 예약번호',
  user_id          BIGINT      NOT NULL,
  schedule_id      BIGINT      NOT NULL,
  people_count     INT         NOT NULL,
  price_total      INT         NOT NULL,
  status           VARCHAR(20) NOT NULL COMMENT 'RESERVED / CANCELED',
  canceled_at      DATETIME,
  created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                             ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_reservation_no (reservation_no),
  KEY idx_reservation_user (user_id),
  KEY idx_reservation_schedule (schedule_id)
);

CREATE TABLE box_office_cache (
  cache_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
  target_date  DATE        NOT NULL COMMENT '박스오피스 기준일',
  rank         INT         NOT NULL,
  movie_cd     VARCHAR(50) NOT NULL,
  movie_title  VARCHAR(255) NOT NULL,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_boxoffice_date (target_date),
  KEY idx_boxoffice_movie (movie_cd)
);

SHOW TABLES;

DESC users;

SELECT * FROM users;

SELECT * FROM users;

INSERT INTO users (
  email,
  password,
  name,
  role
) VALUES (
  'admin@test.com',
  '1234',
  '관리자',
  
  'ADMIN'
);

SELECT * FROM movie;

DELETE FROM movie 
WHERE price_grade = 'BASIC';
