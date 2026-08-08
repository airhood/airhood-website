# 작업 로그 / TODO

## Projects + Studies 통합 (완료)
- [x] `types/index.ts`: `Project`/`Award` 통합해서 `Project` 하나로 (slug, tags, date?, organization?, type?, githubUrl?, liveUrl?, pdf?)
- [x] `data/index.ts`: `projects` + `awards` 배열 하나로 합침 (Delibot/CanSat/R&E 포함, tags 추가, PulloBot pdf 로컬 경로로)
- [x] `ProjectIcon.tsx` — organization 없으면 코드 아이콘, 있으면 트로피(대회)/플라스크(연구)
- [x] `src/components/sections/Projects.tsx` — 통합 카드 디자인 (배너 축소, tags, GitHub+Paper 아이콘)
- [x] `src/pages/Projects.tsx`, `src/pages/ProjectDetail.tsx` — 전체 목록/상세 (배너 더 축소)
- [x] `App.tsx` 라우트: `/projects`, `/projects/:slug`
- [x] `Header.tsx` 네브: About / Projects 2개로 정리
- [x] `tsc --noEmit`, `npm run build` 통과 확인

## 대용량 PDF 호스팅 (완료)
- [x] GitHub Release `reports` 태그: PulloBot용 FTC.-.pdf(450MB), R&E용 VLA.-.pdf(98MB)
- [x] `scripts/fetch-large-reports.mjs` — 빌드/dev 전 자동 다운로드, git 미포함 (predev/prebuild 훅)
- [x] `.gitignore`에 두 파일 추가
- [x] pdfjs-dist 버전을 react-pdf가 요구하는 정확한 버전(5.4.296, 캐럿 제거)으로 고정 — 안 그러면 "API version does not match Worker version" 에러
- [x] 브라우저에서 PulloBot(450MB)/R&E(98MB) 둘 다 정상 렌더링 확인 완료

## PDF 뷰어 (완료)
- [x] react-pdf 도입, Chrome 기본 뷰어 툴바 대신 캔버스 렌더링
- [x] 세로 연속 스크롤
- [x] 다크 테마 컨테이너
- [x] 라우트 단위 code-split 확인 (PdfViewer 청크 463KB + worker 1MB가 메인 번들에서 분리됨 — PDF 없는 페이지는 이 비용 안 짊)

## 작업 디스크 이전 (완료)
- 원래 위치(`/media/airhood/로컬 디스크/git/airhood-website`, NTFS 서브 디스크)가 npm install/삭제 전부 극도로 느려서(node_modules 삭제에 1시간+) 메인 디스크(`/home/airhood/projects/airhood-website`)로 세션째 이전함
- 예전 폴더는 그대로 둠(안 지움) — 지우려면 사용자가 파일탐색기로 직접

## 다음에 할 것
- [ ] git commit (아직 안 함 — 사용자 확인 후 진행)
- [ ] About Me 실제 소개 문단 내용 (사용자가 나중에 채워주기로 함)

## 보류
- 네이티브 블로그 (Tistory 유지)
- 모션 시스템 (framer-motion) — 아직 미착수
