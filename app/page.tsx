"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type MediaKind = "mobile" | "web" | "responsive" | "desktop-app";
type NotePhase = "settled" | "switching" | "entering";

type IntroNote = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
};

type Profile = {
  englishName: string;
  roleLabel: string;
  eyebrow: string;
  headlineTop: string;
  headlineBottom: string;
  introTitle: string;
  introParagraphs: string[];
  introHighlight: string;
};

type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  detail: string;
  tags: string[];
  href?: string;
  notionUrl?: string;
  downloads?: { label: string; href: string; filename: string }[];
  download?: {
    primary: string;
    zip?: string;
    filename: string;
  };
  mediaKind: MediaKind;
  media: {
    desktop?: string;
    mobile?: string;
    app?: string;
  };
};

const introNotes: IntroNote[] = [
  {
    id: "observe",
    number: "01",
    label: "IDEAS I NOTICE",
    title: "불편한 순간이 아이디어가 돼요.",
    description: "‘이런 게 있으면 좋겠다’ 싶은 순간을 그냥 지나치지 않고, 직접 만들어볼 방법을 생각해요.",
  },
  {
    id: "build",
    number: "02",
    label: "MAKING IT REAL",
    title: "생각만 하던 걸 직접 만들어봐요.",
    description: "작은 화면 하나부터 실제로 써볼 수 있는 서비스까지, 아이디어가 움직이는 순간이 제일 재밌어요.",
  },
  {
    id: "flow",
    number: "03",
    label: "THE LITTLE DETAILS",
    title: "쓰는 사람 입장도 놓치지 않으려고 해요.",
    description: "만드는 재미만큼 처음 쓰는 사람도 편하게 쓸 수 있는지 살펴보고, 어색한 부분은 계속 다듬어요.",
  },
  {
    id: "play",
    number: "04",
    label: "WHAT I’M EXPLORING",
    title: "요즘은 AI랑 이것저것 만들어봐요.",
    description: "바이브코딩으로 떠오른 아이디어를 빠르게 앱으로 만들어보고, 마음에 드는 건 실제로 써볼 수 있게 다듬어요.",
  },
];

const profile: Profile = {
  englishName: "HYEON_BIT",
  roleLabel: "현빗 | AI 바이브코딩",
  eyebrow: "HYEON_BIT / SIDE PROJECT / BUILD",
  headlineTop: "현빗의",
  headlineBottom: "사이드프로젝트 개발",
  introTitle: "IDEA + VIVE CODING",
  introParagraphs: [
    " ",
  ],
  introHighlight: " ",
};

const projects: Project[] = [
  {
    id: "chiikawa-license",
    number: "01",
    title: "치이카와 자격증 시험",
    category: "CHIIKAWA CERTIFICATE EXAM",
    summary: "치이카와 친구들과 함께하는 자격증 시험",
    description: "치이카와 세계관으로 즐기는 제초 자격증 시험 웹앱입니다.",
    detail: "문제를 풀고 시험 결과와 취득한 자격증을 확인할 수 있습니다. 카드를 누르거나 실행 버튼을 선택하면 시험장으로 바로 이동합니다.",
    tags: ["Chiikawa", "Certificate Exam", "Web App"],
    href: "https://ckwl.vercel.app/",
    mediaKind: "web",
    media: { desktop: "/projects/chiikawa-license-logo.png" },
  },
  {
    id: "chiikawa-windows",
    number: "02",
    title: "치이카와 Windows 다운로드",
    category: "WINDOWS DESKTOP APP",
    summary: "WINDOWS용 바탕화면 치이카와 굿즈",
    description: "치이카와·하치와레·우사기·모몽가가 캐릭터로 구성되어있습니다.",
    detail: "압축을 푼 뒤 Chiikawa.exe를 실행하면 됩니다. 창 옆에 매달린 캐릭터는 약 1초 뒤 벽을 타고 올라가고, 꼭대기에서 산책과 휴식 동작을 이어갑니다. 설치 방법과 단축키, 주의사항은 Notion 가이드에서 확인할 수 있습니다.",
    tags: ["Windows", "Desktop App", "Chiikawa"],
    notionUrl: "https://app.notion.com/p/Windows-3feb927d091c81079696fd0a07485589?source=copy_link",
    downloads: [{ label: "Windows 앱 ZIP 다운로드", href: "/downloads/Chiikawa_Windows(1).zip", filename: "Chiikawa_Windows(1).zip" }],
    mediaKind: "desktop-app",
    media: { app: "/projects/chiikawa-logo.png" },
  },
  {
    id: "chiikawa-assets",
    number: "03",
    title: "치이카와 프롬프트",
    category: "AI APP BUILD GUIDE",
    summary: "Assets와 프롬프트로 바탕화면 캐릭터 앱 만들기",
    description: "이미지 assets를 준비하고 GPT-ASTRA에 구현 프롬프트를 입력해 Windows 캐릭터 앱을 만드는 가이드입니다.",
    detail: "Node.js와 편집기 설치부터 assets 배치, Electron 앱 구조, 캐릭터의 걷기·매달리기·벽타기 상태, 빌드 및 실제 Windows 검증까지 안내합니다. 전체 설명과 복사용 프롬프트는 Notion 페이지에서 확인할 수 있습니다.",
    tags: ["GPT-ASTRA", "Assets", "Prompt"],
    notionUrl: "https://app.notion.com/p/GPT-ASTRA-Assets-3feb927d091c81ae926cd1e7b7d6deec?source=copy_link",
    downloads: [{ label: "Assets ZIP 다운로드", href: "/downloads/Chiikawa_Assets.zip", filename: "Chiikawa_Assets.zip" }],
    mediaKind: "desktop-app",
    media: { app: "/projects/chiikawa-logo.png" },
  },
  {
    id: "chiikawa-mac",
    number: "04",
    title: "치이카와 Mac 다운로드(임시)",
    category: "MAC DESKTOP APP",
    summary: "Apple Silicon 맥에서 실행하는 치이카와 데스크톱 앱",
    description: "Apple Silicon(arm64) Mac용 Chiikawa 앱입니다. macOS 13 이상에서 사용할 수 있습니다.",
    detail: "ZIP 파일을 다운로드한 뒤 압축을 풀고 Chiikawa.app을 실행하세요. 앱을 자주 사용할 경우 응용 프로그램 폴더로 옮겨두면 편리합니다.",
    tags: ["macOS", "Apple Silicon", "Desktop App", "Chiikawa"],
    downloads: [{ label: "Mac 앱 ZIP 다운로드", href: "/downloads/Chiikawa_Mac.zip", filename: "Chiikawa_Mac.zip" }],
    mediaKind: "desktop-app",
    media: { app: "/projects/chiikawa-logo.png" },
  },
  {
    id: "flowmark",
    number: "05",
    title: "Flowmark",
    category: "WEB + MOBILE",
    summary: "중요한 시장 흐름을 빠르게 확인하는 경제 뉴스 서비스",
    description:
      "기존 NEWDAM을 리디자인해, 쏟아지는 경제 뉴스 속에서 지금 먼저 봐야 할 이슈와 관련 종목을 더 빠르게 파악할 수 있도록 만든 서비스입니다.",
    detail:
      "뉴스를 많이 보여주는 것보다 사용자가 시장의 흐름을 놓치지 않도록 우선순위와 맥락을 정리하는 데 집중했습니다. 웹과 모바일 모두에서 핵심 이슈와 신호를 빠르게 읽을 수 있도록 설계했습니다.",
    tags: ["Next.js", "Responsive", "Market", "News"],
    href: "https://j-flowmark.vercel.app/",
    mediaKind: "responsive",
    media: {
      desktop: "/projects/flowmark.jpg",
      mobile: "/projects/flowmark-mobile.png",
    },
  },
  {
    id: "bap",
    number: "06",
    title: "BAP.P",
    category: "MOBILE FIRST",
    summary: "밥 프레지던트 — 식사 선택을 더 재미있게 만드는 모바일 중심 서비스",
    description:
      "매번 반복되는 메뉴 고민을 조금 더 가볍고 재미있게 해결하기 위해 만든 서비스입니다.",
    detail:
      "손에 들고 바로 사용하는 상황을 중심으로 설계한 모바일 퍼스트 제품입니다. 카드와 선택 흐름이 작은 화면에서도 빠르고 자연스럽게 이어지도록 구성했습니다.",
    tags: ["Next.js", "Mobile First", "Interaction", "Utility"],
    href: "https://bap-p.vercel.app/",
    mediaKind: "mobile",
    media: { mobile: "/projects/bap-mobile.jpg" },
  },
  {
    id: "usagi",
    number: "07",
    title: "USAGI",
    category: "MOBILE FIRST",
    summary: "우리 사이의 기류를 해석하는 AI 관계 분석 서비스",
    description:
      "대화 데이터를 바탕으로 커뮤니케이션 패턴과 관계의 흐름을 리포트 형태로 보여주는 AI 기반 서비스입니다.",
    detail:
      "사용자가 실제 대화를 가져오고 결과를 읽는 흐름을 모바일 화면에 맞춰 설계했습니다. 분석 결과를 복잡한 수치보다 친근하고 읽기 쉬운 리포트로 전달하는 데 집중했습니다.",
    tags: ["AI", "Mobile First", "Next.js", "Analysis"],
    href: "https://usagivico.vercel.app/",
    mediaKind: "mobile",
    media: { mobile: "/projects/usagi-mobile.jpg" },
  },
  {
    id: "folder-tree",
    number: "08",
    title: "Folder Tree",
    category: "WEB ONLY",
    summary: "폴더의 구조만 빠르게 복제하는 웹 전용 도구",
    description:
      "기존 폴더 안의 파일은 제외하고 디렉터리 구조만 분석해 새로운 빈 폴더 구조로 만들어주는 서비스입니다.",
    detail:
      "폴더 선택과 구조 확인이 중요한 도구라 넓은 화면의 웹 사용성을 중심으로 설계했습니다. 학교·회사·반복 업무에서 동일한 빈 폴더 트리를 빠르게 다시 만들 수 있습니다.",
    tags: ["Next.js", "TypeScript", "Desktop Web", "Utility"],
    href: "https://foldertree99.vercel.app/",
    mediaKind: "web",
    media: { desktop: "/projects/folder-tree.jpg" },
  },
  {
    id: "file-bowling",
    number: "09",
    title: "File Bowling",
    category: "DESKTOP APP",
    summary: "바탕화면의 파일을 볼링처럼 날리는 Windows 설치형 프로그램",
    description:
      "실제 파일 위치는 건드리지 않고, 데스크톱 위 아이콘을 물리 오브젝트처럼 굴려 잠깐의 재미를 주는 Windows용 인터랙티브 프로그램입니다.",
    detail:
      "웹이 아니라 실제 데스크톱 환경에서 동작하는 설치형 제품입니다. 트레이, 단축키, 멀티모니터, 아이콘 충돌과 복귀 같은 데스크톱 전용 경험을 중심으로 설계했습니다.",
    tags: ["Desktop App", "Windows", "Tauri", "Interaction"],
    download: {
      primary: "/downloads/File-Bowling-0.1.0-x64-setup.exe",
      zip: "/downloads/File-Bowling-0.1.0-x64-setup.zip",
      filename: "File Bowling_0.1.0_x64-setup.exe",
    },
    mediaKind: "desktop-app",
    media: { app: "/projects/file-bowling.png" },
  },
];

function ArrowUpRight() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectMedia({ project, modal = false }: { project: Project; modal?: boolean }) {
  const desktop = project.media.desktop;
  const mobile = project.media.mobile;
  const app = project.media.app;
  const cls = `project-media media-${project.mediaKind} media-project-${project.id}${modal ? " is-modal" : ""}`;

  if (project.mediaKind === "mobile") {
    return (
      <div className={cls}>
        <div className="phone-frame">
          <span className="phone-notch" aria-hidden="true" />
          {mobile && <img src={mobile} alt={`${project.title} 모바일 화면`} loading="lazy" decoding="async" />}
        </div>
        <span className="media-label">MOBILE EXPERIENCE</span>
      </div>
    );
  }

  if (project.mediaKind === "responsive") {
    return (
      <div className={cls}>
        <div className="browser-frame responsive-browser">
          <div className="browser-chrome" aria-hidden="true"><i /><i /><i /></div>
          {desktop && <img src={desktop} alt={`${project.title} 웹 화면`} loading="lazy" decoding="async" />}
        </div>
        <div className="phone-frame responsive-phone">
          <span className="phone-notch" aria-hidden="true" />
          {mobile && <img src={mobile} alt={`${project.title} 모바일 화면`} loading="lazy" decoding="async" />}
        </div>
        <span className="media-label">WEB + MOBILE</span>
      </div>
    );
  }

  if (project.mediaKind === "desktop-app") {
    return (
      <div className={cls}>
        <div className="desktop-app-frame">
          <div className="desktop-app-bar">
            <span>{project.title}</span>
            <span aria-hidden="true">— □ ×</span>
          </div>
          {app && <img src={app} alt={`${project.title} 데스크톱 프로그램 화면`} loading="lazy" decoding="async" />}
        </div>
        <span className="media-label">WINDOWS DESKTOP APP</span>
      </div>
    );
  }

  return (
    <div className={cls}>
      <div className="browser-frame">
        <div className="browser-chrome" aria-hidden="true"><i /><i /><i /></div>
        {desktop && <img src={desktop} alt={`${project.title} 웹 화면`} loading="lazy" decoding="async" />}
      </div>
      <span className="media-label">DESKTOP WEB</span>
    </div>
  );
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);
  const routeInitializedRef = useRef(false);
  const [introNoteIndex, setIntroNoteIndex] = useState(0);
  const [notePhase, setNotePhase] = useState<NotePhase>("settled");
  const [peelProgress, setPeelProgress] = useState(0);
  const [isDraggingNote, setIsDraggingNote] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const noteTimerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef<number | null>(null);
  const skipClickRef = useRef(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (!routeInitializedRef.current) {
      routeInitializedRef.current = true;
      const projectId = url.searchParams.get("project");
      if (projectId) {
        const routedProject = projects.find((project) => project.id === projectId);
        if (routedProject) {
          setSelected(routedProject);
          return;
        }
      }
    }

    if (selected) url.searchParams.set("project", selected.id);
    else url.searchParams.delete("project");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [selected]);

  useEffect(() => {
    return () => {
      if (noteTimerRef.current) window.clearTimeout(noteTimerRef.current);
      if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const introNote = introNotes[introNoteIndex];
  const noteBusy = notePhase !== "settled";

  const stopAnimations = () => {
    if (noteTimerRef.current) {
      window.clearTimeout(noteTimerRef.current);
      noteTimerRef.current = null;
    }
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const animateProgress = (from: number, to: number, duration: number, onComplete?: () => void) => {
    stopAnimations();
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const t = clamp(elapsed / duration, 0, 1);
      const eased = easeOutCubic(t);
      const next = from + (to - from) * eased;
      setPeelProgress(next);

      if (t < 1) {
        animationFrameRef.current = window.requestAnimationFrame(step);
      } else {
        animationFrameRef.current = null;
        onComplete?.();
      }
    };

    animationFrameRef.current = window.requestAnimationFrame(step);
  };

  const showNextNote = () => {
    setIntroNoteIndex((current) => (current + 1) % introNotes.length);
    setPeelProgress(0);
    setNotePhase("entering");
    noteTimerRef.current = window.setTimeout(() => {
      setNotePhase("settled");
      noteTimerRef.current = null;
    }, 220);
  };

  const triggerNoteChange = (fromProgress = peelProgress) => {
    if (noteBusy) return;
    setIsDraggingNote(false);
    setNotePhase("switching");
    animateProgress(fromProgress, 1, 420, () => {
      noteTimerRef.current = window.setTimeout(() => {
        showNextNote();
      }, 24);
    });
  };

  const handlePostitClick = () => {
    if (skipClickRef.current) {
      skipClickRef.current = false;
      return;
    }
    if (isDraggingNote || noteBusy) return;
    triggerNoteChange(0);
  };

  const handlePostitPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (noteBusy) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const insidePeelZone = offsetX >= rect.width * 0.6 && offsetY >= rect.height * 0.45;
    if (!insidePeelZone) return;

    stopAnimations();
    dragPointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    skipClickRef.current = false;
    setIsDraggingNote(true);
    setNotePhase("settled");
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePostitPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!isDraggingNote || dragPointerIdRef.current !== event.pointerId || dragStartXRef.current === null) return;
    const deltaX = Math.max(0, dragStartXRef.current - event.clientX);
    const progress = clamp(deltaX / 140, 0, 1);
    setPeelProgress(progress);
  };

  const handlePostitPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (dragPointerIdRef.current !== event.pointerId) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragPointerIdRef.current = null;
    dragStartXRef.current = null;
    setIsDraggingNote(false);

    if (peelProgress >= 0.36) {
      skipClickRef.current = true;
      triggerNoteChange(peelProgress);
    } else {
      skipClickRef.current = true;
      animateProgress(peelProgress, 0, 240, () => {
        setPeelProgress(0);
      });
    }
  };

  const handlePostitPointerCancel = () => {
    dragPointerIdRef.current = null;
    dragStartXRef.current = null;
    setIsDraggingNote(false);
    animateProgress(peelProgress, 0, 180, () => {
      setPeelProgress(0);
    });
  };

  return (
    <main>
      <header className="site-header">
        <div className="site-header-inner page-shell">
          <a className="wordmark" href="#top" aria-label="홈으로 이동">· {profile.englishName}</a>
          <nav aria-label="주요 메뉴"><a href="#projects">Projects</a><a href="#contact">Contact</a></nav>
        </div>
      </header>

      <section className="hero hero-notes" id="top">
        <div className="page-shell hero-inner">
          <div className="hero-kicker"><span className="live-dot" /> {profile.roleLabel}</div>

          <div className="hero-stage">
            <div className="hero-statement">
              <p className="hero-eyebrow">{profile.eyebrow}</p>
              <h1>{profile.headlineTop}<span>{profile.headlineBottom}</span></h1>
              <p className="hero-intro-title">{profile.introTitle}</p>
              <div className="hero-subcopy hero-personal-copy">
                {profile.introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p><strong>{profile.introHighlight}</strong></p>
              </div>
              {/* <p className="hero-signature">A FEW NOTES ABOUT HYEON_BIT.</p> */}
            </div>

            <div className={`playground note-playground phase-${notePhase}`} aria-live="polite">
              <div className="notes-caption">
                <span>NOTE BOARD · ABOUT ME</span>
                <strong>{introNote.number} / {String(introNotes.length).padStart(2, "0")}</strong>
              </div>

              <div className="notes-scene">
                <div className="note-board" aria-hidden="true" />
                <button
                  type="button"
                  className={`postit-stack ${isDraggingNote ? "is-dragging" : ""}`}
                  onClick={handlePostitClick}
                  onPointerDown={handlePostitPointerDown}
                  onPointerMove={handlePostitPointerMove}
                  onPointerUp={handlePostitPointerUp}
                  onPointerCancel={handlePostitPointerCancel}
                  disabled={noteBusy}
                  aria-label="포스트잇을 눌러 다음 소개 메모 보기"
                  style={{ ["--peel-progress" as string]: String(peelProgress) }}
                >
                  <span className="postit-under under-one" aria-hidden="true" />
                  <span className="postit-under under-two" aria-hidden="true" />
                  <span className="postit-note">
                    <span className="postit-content">
                      <span className="postit-label">{introNote.label}</span>
                      <strong>{introNote.title}</strong>
                      <p>{introNote.description}</p>
                      <span className="postit-index">{introNote.number}</span>
                    </span>
                    <span className="postit-peel-shadow" aria-hidden="true" />
                    <span className="postit-peel-sheet" aria-hidden="true" />
                  </span>
                </button>
              </div>

              <div className="hero-product-result note-result is-visible">
                <span className="hero-product-number">PEEL TO THE NEXT NOTE</span>
                <strong className="hero-about-title">한 장씩 넘기며 현빗을 소개합니다.</strong>
                <p>메모지를 클릭하거나 오른쪽 아래 모서리를 잡아당겨 다음 장을 넘겨보세요.</p>
              </div>

              <button type="button" className="playground-hint" onClick={() => triggerNoteChange(0)} disabled={noteBusy}>
                NEXT NOTE <span>↑</span>
              </button>
            </div>
          </div>

          <a className="hero-scroll" href="#projects">SEE SIDE PROJECTS <span>↓</span></a>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="page-shell section-shell">
          <div className="section-heading side-project-heading">
            <h2>SIDE PROJECT</h2>
            <p>현빗이 직접 만들고 배포해 본 서비스와 도구들입니다.</p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card project-card-${project.mediaKind}`} key={project.id}>
                <div className="project-card-head">
                  <div className="project-title-line"><span>{project.number}</span><h3>{project.title}</h3></div>
                  <span className="project-platform">{project.category}</span>
                </div>
                <button className="project-visual" type="button" onClick={() => setSelected(project)} aria-label={`${project.title} 상세 보기`}>
                  <ProjectMedia project={project} />
                  <span className="visual-overlay">VIEW</span>
                </button>
                <div className="project-card-foot">
                  <p>{project.summary}</p>
                  <div className="project-actions">
                    <button type="button" onClick={() => setSelected(project)}>Info</button>
                    {project.notionUrl ? (
                      <a href={project.notionUrl} target="_blank" rel="noreferrer">설명·다운로드 <ArrowUpRight /></a>
                    ) : project.downloads?.length ? (
                      <a href={project.downloads[0].href} download={project.downloads[0].filename}>앱 ZIP 다운로드 ↓</a>
                    ) : project.href ? (
                      <a href={project.href} target="_blank" rel="noreferrer">Open <ArrowUpRight /></a>
                    ) : project.download ? (
                      <a href={project.download.primary} download={project.download.filename}>Download ↓</a>
                    ) : (
                      <span className="coming-soon">Windows app</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="page-shell contact-shell">
          <p>CONTACT</p>
          {/* <h2>현빗과 함께 만들어보고 싶은 아이디어가 있다면 편하게 연락해주세요.</h2> */}
          <div className="contact-bottom">
            {/* <p>작은 아이디어부터 실제 서비스 프로토타입까지 함께 이야기할 수 있습니다.</p> */}
            <a href="mailto:hyeonbit1271@gmail.com">hyeonbit1271@gmail.com <ArrowUpRight /></a></div>
        </div>
      </section>

      <footer>
        <div className="page-shell footer-shell"><span>© 2026 HYEON_BIT</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
            <div className="modal-topbar">
              <div><span>{selected.number}</span><span className="category-pill active">{selected.category}</span></div>
              <button ref={closeButtonRef} type="button" onClick={() => setSelected(null)} aria-label="모달 닫기">✕</button>
            </div>
            <div className={`modal-image-wrap modal-media-${selected.mediaKind}`}><ProjectMedia project={selected} modal /></div>
            <div className="modal-content">
              <div className="modal-title-block"><h2 id="modal-title">{selected.title}</h2><p>{selected.summary}</p></div>
              <div className="modal-description">
                <p>{selected.description}</p><p>{selected.detail}</p>
                <div className="tag-row">{selected.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
                {selected.downloads ? (
                  <div className="modal-download-actions">
                    {selected.notionUrl && (
                      <a className="modal-cta" href={selected.notionUrl} target="_blank" rel="noreferrer">Notion에서 설치·제작 설명 보기 <ArrowUpRight /></a>
                    )}
                    {selected.downloads.map((item) => (
                      <a className="modal-download-secondary" key={item.href} href={item.href} download={item.filename}>{item.label} ↓</a>
                    ))}
                  </div>
                ) : selected.href ? (
                  <a className="modal-cta" href={selected.href} target="_blank" rel="noreferrer">서비스 실행하기 <ArrowUpRight /></a>
                ) : selected.download ? (
                  <div className="modal-download-actions">
                    <a className="modal-cta" href={selected.download.primary} download={selected.download.filename}>Windows 설치파일 다운로드 ↓</a>
                    {selected.download.zip && (
                      <a className="modal-download-secondary" href={selected.download.zip} download>ZIP으로 받기</a>
                    )}
                  </div>
                ) : (
                  <div className="modal-cta disabled">WINDOWS INSTALLER</div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
