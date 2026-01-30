# 독립 영화관 (Independent Movie Theater)

통합 영화 예매 및 관리 시스템 - 사용자는 영화 예매, 좌석 선택, 마이페이지 관리를 하고, 관리자는 영화, 상영관, 상영시간, 예약을 관리합니다.

---

## 📋 주요 기능

### 👥 사용자 기능
- **영화 조회 및 상세 보기**: KOBIS Open API와 수동 등록 영화 조회
- **영화 예매**: 영화 선택 → 상영일시 선택 → 좌석 선택 → 예매 완료
- **좌석 선택**: 실시간 좌석 예약 상태 확인 및 선택
- **예약 관리**: 예약 내역 조회, 예약 취소
- **마이페이지**: 사용자 정보 관리, 예약 이력 조회

### 🛠️ 관리자 기능
- **영화 관리**
  - KOBIS API로부터 영화 자동 동기화
  - 수동 영화 등록 (BASIC 등급)
  - 영화 정보 수정 (러닝타임, 설명, 포스터, 등급)
  - 영화 삭제 (BASIC 등급만 가능)
  - 상영 여부 토글 (노출/비노출)

- **상영관 관리**: 상영관 등록, 수정, 삭제 및 좌석 배치 관리
- **상영 일정 관리**: 상영 시간표 등록, 수정, 취소
- **예약 현황**: 전체 예약 내역 조회, 예약 취소 관리
- **사용자 관리**: 회원 정보 조회, 계정 관리

### 🔐 인증 및 권한
- 회원 가입 / 로그인 / 로그아웃
- 사용자와 관리자 역할 구분 (Role-based Access Control)
- AuthGuard를 통한 보호된 경로 관리

---

## 🛠️ 기술 스택

### 백엔드
| 항목 | 버전 | 설명 |
|------|------|------|
| **Language** | Java 21 | 최신 Java LTS 버전 |
| **Framework** | Spring Boot | 4.0.1 |
| **Build Tool** | Gradle | 8.x |
| **Database** | MySQL | JDBC 드라이버를 통한 연결 |
| **ORM/Mapper** | MyBatis | 4.0.1 Spring Boot Starter |
| **Security** | Spring Security | 데이터 보호 및 권한 관리 |
| **Validation** | Spring Validation | 요청 데이터 유효성 검사 |
| **JSON Processing** | Jackson | JSON 직렬화/역직렬화 |
| **Lombok** | 최신 | 보일러플레이트 코드 감소 |
| **External API** | KOBIS API | 한국 영화 정보 조회 |

### 프론트엔드
| 항목 | 버전 | 설명 |
|------|------|------|
| **Language** | JavaScript (ES2020+) | 최신 JavaScript 문법 |
| **UI Framework** | React | 19.2.0 |
| **Routing** | React Router DOM | 7.12.0 |
| **HTTP Client** | Axios | 1.13.2 |
| **Build Tool** | Vite | 7.2.4 (빠른 빌드) |
| **Styling** | CSS3 | 컴포넌트별 CSS 모듈화 |
| **Linting** | ESLint | 9.39.1 |
| **DevTools** | React Plugin for Vite | Fast Refresh 지원 |

### 개발 환경
- **IDE**: Eclipse / IntelliJ IDEA
- **API 통신**: Axios (Frontend), Spring RestTemplate/WebClient (Backend)
- **버전 관리**: Git
- **Port**: 백엔드 (8080), 프론트엔드 (5173)

---

## 📁 프로젝트 구조

```
independent-movie-proj/
│
├── backend/
│   └── movie-theater/              # Spring Boot 애플리케이션
│       ├── src/main/java/com/my/movietheater/
│       │   ├── admin/              # 관리자 기능 (영화, 상영관, 상영일정, 예약 관리)
│       │   ├── auth/               # 인증 (가입, 로그인)
│       │   ├── config/             # Spring Security, 설정
│       │   ├── common/             # 공통 유틸리티, 엔티티
│       │   ├── movie/              # 영화 관리 (KOBIS 연동)
│       │   ├── reservation/        # 예약 관리
│       │   ├── room/               # 상영관 관리
│       │   ├── schedule/           # 상영 일정 관리
│       │   ├── user/               # 사용자 관리
│       │   └── mypage/             # 마이페이지
│       ├── src/main/resources/
│       │   ├── application.properties    # 설정 (DB, MyBatis, KOBIS API)
│       │   ├── mapper/             # MyBatis XML 매퍼
│       │   ├── static/             # 정적 리소스
│       │   └── templates/          # 템플릿 (필요 시)
│       ├── build.gradle            # 의존성 관리
│       └── gradlew                 # Gradle Wrapper
│
├── frontend/
│   └── independent-movie/          # React + Vite 애플리케이션
│       ├── src/
│       │   ├── pages/
│       │   │   ├── Home/           # 홈페이지
│       │   │   ├── auth/           # 로그인, 회원가입
│       │   │   ├── movie/          # 영화 목록, 상세
│       │   │   ├── reserve/        # 예약 프로세스
│       │   │   ├── seat/           # 좌석 선택
│       │   │   ├── mypage/         # 마이페이지
│       │   │   └── admin/          # 관리자 대시보드
│       │   │       ├── home/       # 관리자 홈
│       │   │       ├── movie/      # 영화 관리
│       │   │       ├── room/       # 상영관 관리
│       │   │       ├── schedule/   # 상영일정 관리
│       │   │       ├── reservation/# 예약 관리
│       │   │       └── user/       # 사용자 관리
│       │   ├── components/         # 공유 컴포넌트 (Layout, Navigation)
│       │   ├── router/             # 라우팅, 보안 (AuthGuard)
│       │   ├── api.js              # API 요청 모듈
│       │   └── App.jsx             # 메인 라우팅 설정
│       ├── package.json            # 의존성 관리
│       ├── vite.config.js          # Vite 설정 (/api 프록시 설정)
│       └── eslint.config.js        # ESLint 설정
│
└── README.md                       # 프로젝트 문서
```

---

## 🚀 시작하기

### 사전 요구사항
- **JDK 21** 이상
- **Node.js 16** 이상 및 npm/yarn
- **MySQL 8.0** 이상

### 백엔드 실행

```bash
cd backend/movie-theater

# Gradle로 빌드
./gradlew build

# 애플리케이션 실행
./gradlew bootRun

# 또는 jar 파일로 실행
java -jar build/libs/movie-theater-0.0.1-SNAPSHOT.jar
```

**포트**: `http://localhost:8080`

### 프론트엔드 실행

```bash
cd frontend/independent-movie

# 의존성 설치
npm install

# 개발 서버 시작 (Hot Module Reload 지원)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 파일 미리보기
npm run preview
```

**포트**: `http://localhost:5173`

---

## ⚙️ 환경 설정

### 백엔드 설정 (`application.properties`)

```properties
# MySQL 데이터베이스
spring.datasource.url=jdbc:mysql://localhost:3306/independent_movie
spring.datasource.username=root
spring.datasource.password=1234

# KOBIS API (환경변수)
kobis.api.key=${MOVIE_API_KEY}
kobis.api.base-url=https://kobis.or.kr/kobisopenapi/webservice/rest
```

### 환경변수 설정 (`.env`)
프로젝트 루트에 `.env` 파일 생성:

```env
MOVIE_API_KEY=your_kobis_api_key
```

### 프론트엔드 프록시 설정
Vite는 `/api` 요청을 자동으로 `http://localhost:8080`로 프록시합니다 (`vite.config.js` 참고).

---

## 📊 데이터베이스 스키마

주요 테이블:
- **users**: 사용자 정보 (이메일, 비밀번호, 역할)
- **movies**: 영화 정보 (제목, 러닝타임, 가격 등급)
- **schedules**: 상영 일정 (영화, 상영관, 시간)
- **reservations**: 예약 정보 (사용자, 영화, 좌석, 상태)
- **rooms**: 상영관 정보 (이름, 좌석 배치)
- **seats**: 좌석 정보 (상영관별 좌석 번호)

자세한 스키마는 `쿼리 #6.sql`, `쿼리 #10.sql` 참고

---

## 🔄 API 엔드포인트 예시

### 사용자 API
- `GET /api/movies` - 현재 상영 영화 조회
- `GET /api/movies/{id}` - 영화 상세 조회
- `POST /api/reservations` - 예약 생성
- `GET /api/reservations/my` - 내 예약 조회

### 관리자 API
- `POST /api/admin/movies` - 영화 등록
- `PUT /api/admin/movies/{id}` - 영화 수정
- `DELETE /api/admin/movies/{id}` - 영화 삭제
- `GET /api/admin/reservations` - 전체 예약 조회

---

## 🤝 기여 가이드

1. 이슈 등록 또는 Feature Branch 생성
2. 변경사항 커밋 및 푸시
3. Pull Request 제출

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 제공됩니다.

---

## 📞 문의

프로젝트 관련 질문이나 버그 보고는 Issues 탭에서 등록해주세요.
