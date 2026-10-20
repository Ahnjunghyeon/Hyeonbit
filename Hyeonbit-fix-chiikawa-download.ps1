$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$pagePath = Join-Path $repoRoot 'app/page.tsx'

if (-not (Test-Path -LiteralPath $pagePath)) {
  throw "app/page.tsx를 찾지 못했습니다. 이 스크립트를 Hyeonbit 저장소 최상위 폴더에 두고 실행해 주세요."
}

$content = [System.IO.File]::ReadAllText($pagePath)
$old = 'href: "/downloads/Chiikawa_Windows(1).zip"'
$new = 'href: "https://media.githubusercontent.com/media/Ahnjunghyeon/Hyeonbit/main/public/downloads/Chiikawa_Windows%281%29.zip"'

if ($content.Contains($new)) {
  Write-Output '이미 다운로드 링크가 수정되어 있습니다.'
  exit 0
}
if (-not $content.Contains($old)) {
  throw '기존 Chiikawa 다운로드 링크를 찾지 못했습니다. 현재 app/page.tsx 내용을 확인해 주세요.'
}

$content = $content.Replace($old, $new)
[System.IO.File]::WriteAllText($pagePath, $content, [System.Text.UTF8Encoding]::new($false))
Write-Output 'Chiikawa 다운로드 링크를 Git LFS 원본 주소로 변경했습니다.'
