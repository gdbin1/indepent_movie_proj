# Indepent Movie Project

이 저장소는 독립 영화 프로젝트를 위한 프론트엔드(React) 기반 웹 애플리케이션과 자바 기반 백엔드를 포함한 전체 프로젝트 템플릿입니다. 저장소 구조와 파일을 확인한 결과 이 프로젝트는 Python 기반이 아니며, 주로 JavaScript(프론트엔드)와 Java(백엔드), SQL 자원으로 구성되어 있습니다.

## 한눈에 보기
- 주요 언어: JavaScript, Java, CSS, HTML
- 프론트엔드: React + Vite (frontend/independent-movie 패키지의 package.json 참조)
  - 주요 의존성: react, react-dom, react-router-dom, axios, vite
- 백엔드: Java (backend 디렉터리 존재)
- 데이터베이스: 관계형 DB (저장소에 SQL 쿼리 파일 포함)

## 디렉터리 (현재 구성)
- frontend/independent-movie: React + Vite 앱 (package.json 있음)
- backend: Java 기반 백엔드 코드(구현체 확인 필요)
- 기타: 여러 SQL 쿼리 파일(.sql)

## 권장 기술 스택
- 프론트엔드
  - React 18/19 + Vite
  - 상태관리: Zustand / Redux (필요에 따라)
  - 네트워킹: axios
- 백엔드
  - Java (권장: Spring Boot) — backend 디렉터리에 맞춰 구성
  - 데이터베이스: PostgreSQL / MySQL
- 미디어 처리
  - FFmpeg (서버 측 트랜스코딩, 썸네일 생성)
- 인프라
  - Docker / Docker Compose
  - 오브젝트 스토리지: AWS S3 or MinIO
  - CI/CD: GitHub Actions
- 인증
  - JWT 또는 OAuth2

## 주요 기능(권���/발견된 항목 기반)
- 프론트엔드에서 미디어 자산 뷰/관리(React SPA)
- 백엔드에서 SQL 기반 데이터 저장 및 쿼리(저장소의 SQL 파일 근거)
- 미디어 업로드/트랜스코딩/썸네일 생성(권장 기능)
- 사용자/권한 관리, 코멘트 및 검토 워크플로우
- Docker 기반 로컬 개발 환경 및 CI 파이프라인

## 개발/실행(프론트엔드 예시)
1. 프론트엔드 개발 서버 실행:
```bash
cd frontend/independent-movie
npm install
npm run dev
```

2. 백엔드(예시 — Spring Boot 가정):
```bash
# backend 폴더에서
./mvnw spring-boot:run
# 또는
./gradlew bootRun
```

## 추가 설명
요청하신 대로 README에서 Python 관련 예시는 제거하고, 저장소의 실제 구성(React 프론트엔드, Java 백엔드, SQL 파일)을 반영했습니다. 원하시면 다음 작업을 진행할 수 있습니다:
- README 번역(한/영 병기)
- backend 디렉터리 내부 파일을 분석해 백엔드 프레임워크(Sprint Boot 여부 등)를 정확히 명시
- CI, Docker, 환경설정(example .env) 템플릿 추가
