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
WHERE title = 123;

SHOW TABLES;

DESC SCHEDULE;
DESC room;
DESC reservation;
DESC users;

SELECT * FROM schedule;

DELETE FROM schedule
WHERE schedule_id = 1;

USE independent_movie;
SHOW TABLES;

DESC box_office_cache;
DESC movie;
DESC reservation;
DESC room;
DESC SCHEDULE;
DESC users;

```sql
-- room_id 제거
ALTER TABLE schedule
DROP COLUMN room_id;
-- price_final 제거
ALTER TABLE schedule
DROP COLUMN price_final;

```sql
ALTER TABLE room
ADD COLUMN theme VARCHAR(100) AFTER room_type,
ADD COLUMN description VARCHAR(255) AFTER theme,
ADD COLUMN image_url VARCHAR(255) AFTER description;

ALTER TABLE reservation
ADD COLUMN room_id BIGINT NOT NULL AFTER schedule_id;

ALTER TABLE schedule
ADD COLUMN room_id BIGINT NOT NULL AFTER movie_id;

SELECT * FROM room;
DELETE FROM room
WHERE room_id = 1;

SELECT * FROM reservation;

DESC users;

SELECT * FROM users;
DELETE FROM users
WHERE user_id = 4;

UPDATE users
SET role = 'ADMIN'
WHERE email = 'admin@naver.com';

SELECT * FROM schedule;

SELECT * FROM reservation;

DELETE FROM reservation
WHERE status IN("CANCELLED");

DESC reservation;
DESC room;
DESC schedule;
DESC users;
DESC movie;

SELECT * FROM users;
SELECT * FROM movie;
SELECT * FROM reservation;
SELECT * FROM schedule;
SELECT * from room;

SELECT * FROM movie;

DESC schedule;

INSERT INTO schedule (movie_id,room_id,start_at,end_at,display_date,status) VALUES
-- 2026-01-27
(1, 1, '2026-01-27 19:00:00', '2026-01-27 21:00:00', '2026-01-27', 'OPEN'),
(1, 3, '2026-01-27 21:30:00', '2026-01-27 23:30:00', '2026-01-27', 'OPEN'),
(7, 2, '2026-01-27 18:00:00', '2026-01-27 20:00:00', '2026-01-27', 'OPEN'),

-- 2026-01-28
(1, 2, '2026-01-28 14:00:00', '2026-01-28 16:00:00', '2026-01-28', 'OPEN'),
(7, 3, '2026-01-28 17:00:00', '2026-01-28 19:00:00', '2026-01-28', 'OPEN'),
(8, 4, '2026-01-28 20:00:00', '2026-01-28 22:10:00', '2026-01-28', 'OPEN'),

-- 2026-01-29
(1, 1, '2026-01-29 15:00:00', '2026-01-29 17:00:00', '2026-01-29', 'OPEN'),
(7, 2, '2026-01-29 18:30:00', '2026-01-29 20:30:00', '2026-01-29', 'OPEN'),
(8, 3, '2026-01-29 21:00:00', '2026-01-29 23:10:00', '2026-01-29', 'OPEN');

INSERT INTO room (room_code,room_name,room_type,theme,description,image_url,capacity_min,capacity_max,base_price,is_active
) VALUES
-- 커플룸
('R-CP-B', '커플룸 B', 'COUPLE', '로맨틱',
 '아늑한 분위기의 커플 전용 프라이빗 상영관',
 NULL, 2, 2, 28000, 1),

-- 패밀리룸
('R-FM-B', '패밀리룸 B', 'FAMILY', '패밀리',
 '아이와 함께 편안하게 관람할 수 있는 패밀리 룸',
 NULL, 3, 6, 48000, 1),

-- 프리미엄 룸
('R-PR-M', '프리미엄 중형', 'PREMIUM', '럭셔리',
 '프리미엄 좌석과 사운드를 갖춘 중형 상영관',
 NULL, 2, 4, 55000, 1),

('R-PR-L', '프리미엄 대형', 'PREMIUM', '럭셔리',
 '대형 스크린과 최고급 환경의 프리미엄 상영관',
 NULL, 4, 6, 75000, 1),

-- 그룹룸
('R-GR-B', '그룹룸 B', 'GROUP', '파티',
 '친구들과 파티처럼 즐길 수 있는 단체 관람 룸',
 NULL, 5, 10, 70000, 1),

('R-GR-C', '그룹룸 C', 'GROUP', '파티',
 '워크숍·모임에 적합한 대형 프라이빗 상영관',
 NULL, 6, 12, 90000, 1);

INSERT INTO schedule (movie_id,room_id,start_at,end_at,display_date,status) VALUES

-- =====================
-- 2026-01-27
-- =====================
(1, 2, '2026-01-27 14:00:00', '2026-01-27 16:00:00', '2026-01-27', 'OPEN'), -- 커플룸 A
(1, 6, '2026-01-27 16:30:00', '2026-01-27 18:30:00', '2026-01-27', 'OPEN'), -- 커플룸 B
(7, 3, '2026-01-27 15:00:00', '2026-01-27 17:00:00', '2026-01-27', 'OPEN'), -- 패밀리룸 A
(7, 7, '2026-01-27 18:00:00', '2026-01-27 20:00:00', '2026-01-27', 'OPEN'), -- 패밀리룸 B
(8, 4, '2026-01-27 19:30:00', '2026-01-27 21:40:00', '2026-01-27', 'OPEN'), -- 프리미엄 소형

-- =====================
-- 2026-01-28
-- =====================
(1, 8, '2026-01-28 13:00:00', '2026-01-28 15:00:00', '2026-01-28', 'OPEN'), -- 프리미엄 중형
(7, 9, '2026-01-28 16:00:00', '2026-01-28 18:00:00', '2026-01-28', 'OPEN'), -- 프리미엄 대형
(8, 5, '2026-01-28 14:30:00', '2026-01-28 16:40:00', '2026-01-28', 'OPEN'), -- 그룹룸 A
(1, 10, '2026-01-28 19:00:00', '2026-01-28 21:00:00', '2026-01-28', 'OPEN'), -- 그룹룸 B

-- =====================
-- 2026-01-29
-- =====================
(7, 2, '2026-01-29 14:00:00', '2026-01-29 16:00:00', '2026-01-29', 'OPEN'),
(8, 6, '2026-01-29 16:30:00', '2026-01-29 18:40:00', '2026-01-29', 'OPEN'),
(1, 3, '2026-01-29 19:00:00', '2026-01-29 21:00:00', '2026-01-29', 'OPEN'),
(7, 11, '2026-01-29 20:30:00', '2026-01-29 22:30:00', '2026-01-29', 'OPEN'),

-- =====================
-- 2026-01-30
-- =====================
(1, 4, '2026-01-30 14:00:00', '2026-01-30 16:00:00', '2026-01-30', 'OPEN'),
(7, 8, '2026-01-30 16:30:00', '2026-01-30 18:30:00', '2026-01-30', 'OPEN'),
(8, 9, '2026-01-30 19:00:00', '2026-01-30 21:10:00', '2026-01-30', 'OPEN'),
(1, 5, '2026-01-30 21:30:00', '2026-01-30 23:30:00', '2026-01-30', 'OPEN');




