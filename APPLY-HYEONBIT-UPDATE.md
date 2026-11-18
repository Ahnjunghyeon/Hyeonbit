# Hyeonbit 업데이트 적용 안내

Hyeonbit2 (3).zip의 최종 소스 변경사항을 기존 Hyeonbit.zip에 적용하는 덮어쓰기 패키지입니다.

## 적용
1. 기존 Hyeonbit 폴더를 백업하세요.
2. 이 ZIP의 app 폴더와 루트 파일들을 기존 Hyeonbit 프로젝트 루트(package.json이 있는 폴더)에 덮어쓰세요. 별도 새 프로젝트로 실행하지 마세요.
3. .git 폴더와 기존 public 폴더는 삭제하지 마세요. 저장소 연결 및 Vercel 프로젝트 연결은 변경하지 않습니다.
4. 원래 작업하던 Hyeonbit2 폴더에서 public/projects/hyeonbit-rug.webp 파일을 Hyeonbit의 같은 경로로 복사하세요. 두 첨부 ZIP에는 public 파일들이 하나도 없어 이 패키지에 포함할 수 없었습니다. Mac/Assets/볼링 다운로드 파일 등 기존 public 파일도 유지해야 합니다.
5. PowerShell에서 Hyeonbit 프로젝트 루트로 이동하여 다음을 실행하세요.

```powershell
git remote -v
npm ci
npm run build
git status
git add app/page.tsx app/globals.css app/layout.tsx vercel.json .gitignore .gitattributes
# 러그 이미지도 복사한 경우 아래 명령을 실행하세요.
git add public/projects/hyeonbit-rug.webp
git commit -m "Apply latest Hyeonbitsub updates to Hyeonbit"
git push origin main
```

remote가 Ahnjunghyeon/Hyeonbit.git을 가리키는지 확인하세요. Hyeonbitsub 저장소의 .git 폴더를 복사하지 마세요. 로컬 변경이나 원격 변경과 충돌하면 강제 push하지 말고 상태를 확인하세요. Vercel에서 원래 Hyeonbit 연결 프로젝트의 자동 배포 완료를 확인하세요.

## 반영 사항
- 최신 현빗러그 카드 및 설명/번호, 전용 이미지 표시 및 모바일 CSS
- 치이카와 Windows 버튼: 공개 Hyeonbit Release의 Chiikawa.v2.zip 사용
- 예전 Windows ZIP 경로 2개는 공개 Release ZIP으로 임시 리다이렉트(307)
- Mac ZIP 헤더 유지, 최신 LFS/ignore 설정 반영
- package.json과 package-lock.json은 두 ZIP이 같으므로 재첨부하지 않음

## 추가 확인할 사항
- 러그 다운로드 버튼은 최신 원본 그대로 Hyeonbitsub의 rug-v0.1.0을 가리킵니다. 비공개 저장소이므로 일반 사용자에게는 404가 날 수 있습니다. 공개 Hyeonbit Release에는 치이카와 ZIP만 확인됐습니다. 러그도 공개 Release에 올린 뒤 app/page.tsx의 러그 href를 실제 링크로 교체해야 합니다. 존재하지 않는 새 링크를 임의 생성하지 않았습니다.
- 두 첨부 ZIP에는 public 폴더가 없어 이미지/다운로드 파일의 존재나 동작은 검증할 수 없습니다.
- 이 패키지는 로컬 파일 제공용이며 GitHub push 또는 Vercel 배포를 직접 실행하지 않았습니다.

## 검증 결과
Next.js 프로덕션 빌드, 타입 검사 및 정적 페이지 생성 통과. 변경 파일의 충돌 마커와 ZIP 무결성 검사 통과. 이미지 및 배포 ZIP은 첨부되지 않아 실제 다운로드 및 브라우저 시각 검증은 포함하지 않습니다.
