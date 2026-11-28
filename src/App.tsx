import React, { lazy, Suspense, useEffect, useState } from 'react';
import { ECO_STORAGE_KEYS, readEcoCookie, setEcoCookie, writeSessionPreference } from './clientStorage';
import {
  ArrowUpRight,
  AudioLines,
  ChevronRight,
  CircleHelp,
  Clock3,
  Facebook,
  Github,
  House,
  Info,
  ListMusic,
  Music2,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Radio,
  ShieldCheck,
  Sun,
  UserPlus,
  Youtube,
  X,
} from 'lucide-react';
import MusicPlayer from './components/MusicPlayer';
import ContributionWeekEmbed from './components/ContributionWeekEmbed';
import PwaInstallButton from './components/PwaInstallButton';
import GitHubFollowButton from './components/GitHubFollowButton';
import TimelineVideo from './components/TimelineVideo';
import TimelinePage from './TimelinePage';
import ProtectedUsersPage from './protectedUSERS_root_path_secure/ProtectedUsersPage';
import { PUBLIC_PLAYLIST } from './music/playlist';
import marociasongAvatar from '../assets/MAROCAISONGSAVATAR.jpeg';

const ThreeBackground = lazy(() => import('./components/ThreeBackground'));

const PROFILE_URL = 'https://github.com/Marociasong';
const REPOSITORIES_URL = 'https://github.com/Marociasong?tab=repositories';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61590101694470';
const YOUTUBE_URL = 'https://www.youtube.com/@marociasong';
const TIKTOK_URL = 'https://www.tiktok.com/@marociasong';
const PROTECTED_USERS_URL = '/protectedUSERS_root_path_secure/';
const SOURCE_URL = 'https://github.com/Marociasong/Marociasong.github.io';

function EcoHeader({
  leftOpen,
  rightOpen,
  onToggleLeft,
  onToggleRight,
  onCloseSidebars,
}: {
  leftOpen: boolean;
  rightOpen: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
  onCloseSidebars: () => void;
}) {
  return (
    <header className="eco-header" onClick={(event) => {
      if (event.target instanceof Element && event.target.closest('button.toggle-button')) return;
      onCloseSidebars();
    }}>
      <div className="header-side">
        <button className="icon-button toggle-button" type="button" onClick={onToggleLeft} aria-label="Toggle navigation" aria-expanded={leftOpen} title="Toggle navigation (Ctrl+B)">
          {leftOpen ? <PanelLeftClose size={19} /> : <PanelLeftOpen size={19} />}
        </button>
        <a className="brand" href="/" aria-label="Marociasong home"><span className="brand-mark">ECO</span><span className="brand-label">Marociasong</span></a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about.html">About</a>
          <a href="/timeline.html">Watch</a>
          <a href="/#official-channels">Socials</a>
        </nav>
      </div>
      <div className="header-side header-side-right">
        <a className="header-link github-link" href={REPOSITORIES_URL} target="_blank" rel="noreferrer" aria-label="View all repositories on GitHub"><Github size={16} /><span>Git repo</span></a>
        <a className="header-link github-link" href="https://github.com/simoouahbiGHALINOA/HYPERSCALE-ecosystem" target="_blank" rel="noreferrer" aria-label="Open the ECO ecosystem repository" title="ECO repository"><span className="brand-mark" aria-hidden="true">ECO</span><span>ECO repo</span></a>
        <a className="icon-button toggle-button" href={PROTECTED_USERS_URL} aria-label="Sign in with GitHub" title="Sign in with GitHub"><UserPlus size={19} /></a>
        <button className="icon-button toggle-button right-toggle" type="button" onClick={onToggleRight} aria-label="Toggle right sidebar" aria-expanded={rightOpen} title="Toggle right sidebar (Ctrl+M)">
          {rightOpen ? <PanelRightClose size={19} /> : <PanelRightOpen size={19} />}
        </button>
      </div>
    </header>
  );
}

function EcoLeftSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <button className="sidebar-backdrop left-backdrop" type="button" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`left-sidebar ${open ? 'sidebar-open' : ''}`} aria-hidden={!open}>
        <div className="sidebar-content">
          <div className="sidebar-section-label">Navigation</div>
          <nav className="sidebar-nav" aria-label="ECO pages">
            <a href="/" className="sidebar-link"><House size={18} /><span>Home</span><ChevronRight size={15} /></a>
            <a href="/about.html" className="sidebar-link"><Info size={18} /><span>About</span></a>
            <a href="/timeline.html" className="sidebar-link"><Clock3 size={18} /><span>Watch on YouTube</span></a>
            <a href="/#official-channels" className="sidebar-link"><Radio size={18} /><span>Official socials</span></a>
            <a href="/#listen" className="sidebar-link"><ListMusic size={18} /><span>Listen</span></a>
            <div className="sidebar-divider" />
            <a href={SOURCE_URL} className="sidebar-link" target="_blank" rel="noreferrer"><ArrowUpRight size={18} /><span>Website repository</span></a>
            <a href={PROFILE_URL} className="sidebar-link" target="_blank" rel="noreferrer"><Github size={18} /><span>GitHub profile</span></a>
            <a href={PROTECTED_USERS_URL} className="sidebar-link"><UserPlus size={18} /><span>Protected users</span></a>
          </nav>
          <p className="sidebar-footnote">Official links for Marociasong.</p>
        </div>
        <button type="button" className="sidebar-close icon-button" aria-label="Close navigation" onClick={onClose}><X size={18} /></button>
      </aside>
    </>
  );
}

function EcoRightSidebar({
  open,
  onClose,
  theme,
  onToggleTheme,
}: {
  open: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}) {
  return (
    <>
      {open && <button className="sidebar-backdrop right-backdrop" type="button" aria-label="Close settings" onClick={onClose} />}
      <aside className={`right-sidebar ${open ? 'sidebar-open' : ''}`} aria-hidden={!open}>
        <div className="sidebar-content settings-content">
          <div className="settings-title-row"><div><span className="sidebar-section-label">PREFERENCES</span><h2>Settings</h2></div><button type="button" className="icon-button" aria-label="Close settings" onClick={onClose}><X size={18} /></button></div>
          <section className="settings-section">
            <h3>Appearance</h3>
            <button type="button" className="setting-action" onClick={onToggleTheme}>
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              <span>{theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}</span>
            </button>
          </section>
          <section className="settings-section">
            <h3>Install this app</h3>
            <PwaInstallButton />
          </section>
          <section className="settings-section">
            <h3>Your music</h3>
            <a className="setting-action" href="/#listen"><AudioLines size={17} /><span>Open your music library</span><ChevronRight size={15} /></a>
            <p className="settings-note">Private tracks and saved links stay in this browser on this device. They are never uploaded by this site.</p>
          </section>
          <section className="settings-section">
            <h3>Project information</h3>
            <a className="setting-action" href={`${SOURCE_URL}/blob/main/SECURITY.md`} target="_blank" rel="noreferrer"><ShieldCheck size={17} /><span>Security policy</span><ArrowUpRight size={14} /></a>
            <a className="setting-action" href={`${SOURCE_URL}/blob/main/TERMS.md`} target="_blank" rel="noreferrer"><CircleHelp size={17} /><span>Terms</span><ArrowUpRight size={14} /></a>
          </section>
          <a href={SOURCE_URL} target="_blank" rel="noreferrer" className="settings-version">Powered by @eco · source <ArrowUpRight size={13} /></a>
        </div>
      </aside>
    </>
  );
}

function HomePage() {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  useEffect(() => {
    if (!isAvatarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsAvatarOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAvatarOpen]);

  return (
    <main id="main" className="page-main" tabIndex={-1}>
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">OFFICIAL MUSIC · VIDEOS · SOCIAL CHANNELS</p>
          <div className="hero-heading-row">
            <h1>Hi, I’m <span>Marociasong.</span><br /><span className="gradient-text">I make music to be felt.</span></h1>
            <button
              className="hero-avatar-button"
              type="button"
              onClick={() => setIsAvatarOpen(true)}
              aria-label="Enlarge the Marociasong avatar"
            >
              <img className="hero-avatar" src={marociasongAvatar} alt="Marociasong avatar" />
            </button>
          </div>
          <p className="hero-subtitle">Find Marociasong on YouTube and social media. This page links to the official profiles; music and videos remain on their original platforms.</p>
          <div className="hero-actions">
            <a className="primary-button" href={YOUTUBE_URL} target="_blank" rel="noreferrer"><Youtube size={17} /> Watch on YouTube <ArrowUpRight size={15} /></a>
            <GitHubFollowButton />
            <a className="secondary-button" href="#listen" onClick={(event) => {
              event.preventDefault();
              window.dispatchEvent(new Event('eco:open-music-library'));
            }}><AudioLines size={16} /> Listen with me</a>
          </div>
          <p className="hero-caption">Official links · original platforms · follow Marociasong</p>
        </div>
      </section>
      <ContributionWeekEmbed
        site="marociasong"
        repository="Marociasong/Marociasong.github.io"
        branch="main"
      />
      {isAvatarOpen && (
        <div
          className="avatar-lightbox"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsAvatarOpen(false);
          }}
        >
          <div className="avatar-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Marociasong avatar">
            <button
              className="avatar-lightbox-close"
              type="button"
              onClick={() => setIsAvatarOpen(false)}
              aria-label="Close enlarged avatar"
              autoFocus
            >
              <X size={24} />
            </button>
            <img src={marociasongAvatar} alt="Marociasong avatar" />
          </div>
        </div>
      )}

      <section className="content-section intro-section" id="ecosystem">
        <div className="section-heading"><span className="eyebrow">EXPLORE MAROCIASONG</span><h2>Music, videos, and updates.</h2><p>Choose an official channel to discover the latest posts and content directly from Marociasong.</p></div>
        <div className="feature-grid">
          <article className="feature-card"><span className="feature-icon"><Youtube size={22} /></span><h3>YouTube</h3><p>Watch videos and explore the official Marociasong channel.</p><a className="secondary-button" href={YOUTUBE_URL} target="_blank" rel="noreferrer">Open YouTube <ArrowUpRight size={15} /></a></article>
          <article className="feature-card"><span className="feature-icon"><Music2 size={22} /></span><h3>TikTok</h3><p>Find short-form videos on the official account.</p><a className="secondary-button" href={TIKTOK_URL} target="_blank" rel="noreferrer">Open TikTok <ArrowUpRight size={15} /></a></article>
        </div>
      </section>

      <TimelineVideo />

      <section className="content-section source-section" id="official-channels">
        <div><span className="eyebrow">OFFICIAL SOCIAL CHANNELS</span><h2>Connect with Marociasong.</h2><p>Follow the accounts below for posts, clips, and music updates. Links open the official platforms.</p></div>
        <div className="hero-actions">
          <a className="secondary-button" href={FACEBOOK_URL} target="_blank" rel="noreferrer"><Facebook size={17} /> Facebook <ArrowUpRight size={15} /></a>
          <a className="secondary-button" href={TIKTOK_URL} target="_blank" rel="noreferrer"><Music2 size={17} /> TikTok <ArrowUpRight size={15} /></a>
          <a className="secondary-button" href={YOUTUBE_URL} target="_blank" rel="noreferrer"><Youtube size={17} /> YouTube <ArrowUpRight size={15} /></a>
        </div>
      </section>

      <section className="content-section listen-section" id="listen-section" aria-labelledby="listen-heading">
        <div className="listen-card">
          <span className="eyebrow">A LITTLE SPACE TO LISTEN</span>
          <h2 id="listen-heading">Press play. Make yourself at home.</h2>
          {PUBLIC_PLAYLIST.length ? (
            <>
              <p>Add audio files from your device or save audio links in your private browser library. The shared player only includes tracks authorized for publication.</p>
              <a className="primary-button" href="#listen">Open music player <AudioLines size={16} /></a>
              <p className="privacy-caption">Your private library stays on this device. Playback resumes after you press Play again.</p>
            </>
          ) : (
            <>
              <p>No public tracks are hosted here. Add audio you have permission to use in the private player, or listen on the official YouTube channel.</p>
              <a className="primary-button" href="#listen"><AudioLines size={16} /> Open music library</a>
              <a className="secondary-button" href={YOUTUBE_URL} target="_blank" rel="noreferrer"><Youtube size={16} /> Listen on YouTube <ArrowUpRight size={15} /></a>
              <p className="privacy-caption">Private tracks stay on this device.</p>
            </>
          )}
        </div>
      </section>

      <section className="content-section source-section" id="contact-section">
        <div><span className="eyebrow">FOLLOW ALONG</span><h2>Find the official channels.</h2><p>Explore music and videos on the platforms where Marociasong shares them.</p></div>
        <a className="secondary-button" href={YOUTUBE_URL} target="_blank" rel="noreferrer"><Youtube size={17} /> Watch on YouTube <ArrowUpRight size={15} /></a>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main id="main" className="page-main about-page" tabIndex={-1}>
      <section className="about-hero">
        <span className="eyebrow">ABOUT THIS PAGE</span>
        <h1>Discover <span className="gradient-text">Marociasong.</span></h1>
        <p>This is a discovery hub linking to the official Marociasong profiles. Music, videos, and posts are hosted and maintained by their respective platforms and account owners.</p>
        <div className="hero-actions">
          <a className="primary-button" href={YOUTUBE_URL} target="_blank" rel="noreferrer"><Youtube size={16} /> YouTube</a>
        </div>
      </section>
      <section className="content-section about-details">
        <div className="section-heading"><span className="eyebrow">OFFICIAL PROFILES</span><h2>Choose where to follow.</h2></div>
        <div className="feature-grid">
          <article className="feature-card"><span className="feature-icon"><Facebook size={22} /></span><h3>Facebook</h3><p>Open the official Facebook profile.</p><a className="secondary-button" href={FACEBOOK_URL} target="_blank" rel="noreferrer">Visit Facebook <ArrowUpRight size={15} /></a></article>
          <article className="feature-card"><span className="feature-icon"><Music2 size={22} /></span><h3>TikTok</h3><p>Open the official TikTok account.</p><a className="secondary-button" href={TIKTOK_URL} target="_blank" rel="noreferrer">Visit TikTok <ArrowUpRight size={15} /></a></article>
          <article className="feature-card"><span className="feature-icon"><Youtube size={22} /></span><h3>YouTube</h3><p>Watch videos on the official channel.</p><a className="secondary-button" href={YOUTUBE_URL} target="_blank" rel="noreferrer">Visit YouTube <ArrowUpRight size={15} /></a></article>
        </div>
      </section>
      <section className="content-section source-section">
        <div><span className="eyebrow">MUSIC AND VIDEOS</span><h2>Watch on the original platforms.</h2><p>This website links to Marociasong’s official accounts and does not host or redistribute its copyrighted music or videos.</p></div>
        <a className="secondary-button" href={YOUTUBE_URL} target="_blank" rel="noreferrer"><Youtube size={17} /> Open YouTube <ArrowUpRight size={15} /></a>
      </section>
    </main>
  );
}

function EcoFooter({ onCloseSidebars }: { onCloseSidebars: () => void }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <footer className="eco-footer" onClick={onCloseSidebars}>
      <span className="footer-license">© @eco 2026 · Built for Marociasong</span>
      <MusicPlayer />
      <a className="footer-github-link" href={REPOSITORIES_URL} target="_blank" rel="noreferrer" aria-label="View all GitHub repositories">
        <Github size={19} />
      </a>
      <div className="footer-meta">
        <time dateTime={now.toISOString()}>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</time>
        <a href={`${SOURCE_URL}/blob/main/TERMS.md`} target="_blank" rel="noreferrer">Terms</a>
        <a href={`${SOURCE_URL}/blob/main/SECURITY.md`} target="_blank" rel="noreferrer">Security</a>
      </div>
    </footer>
  );
}

export default function App() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = window.localStorage.getItem(ECO_STORAGE_KEYS.theme)
        ?? readEcoCookie(ECO_STORAGE_KEYS.cookieTheme)
        ?? window.localStorage.getItem('eco-starter:theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const isAbout = pathname.endsWith('/about.html');
  const isTimeline = pathname.endsWith('/timeline.html');
  const isProtectedUsers = pathname.startsWith('/protectedUSERS_root_path_secure');

  useEffect(() => {
    const appPaths = new Set(['/', '/index.html', '/about.html', '/timeline.html', PROTECTED_USERS_URL]);
    const handleNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return;
      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        !appPaths.has(destination.pathname)
      ) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) {
        if (destination.hash !== window.location.hash) return;
        event.preventDefault();
        return;
      }
      event.preventDefault();
      window.history.pushState(null, '', destination.href);
      setPathname(destination.pathname);
    };
    const handleHistoryNavigation = () => setPathname(window.location.pathname);
    document.addEventListener('click', handleNavigation);
    window.addEventListener('popstate', handleHistoryNavigation);
    return () => {
      document.removeEventListener('click', handleNavigation);
      window.removeEventListener('popstate', handleHistoryNavigation);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      window.requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.title = isProtectedUsers
      ? 'Protected Users | Marociasong'
      : isTimeline
        ? 'Watch | Marociasong'
        : isAbout
          ? 'About | Marociasong'
          : 'Marociasong | @eco';
    try {
      window.localStorage.setItem(ECO_STORAGE_KEYS.theme, theme);
      setEcoCookie(ECO_STORAGE_KEYS.cookieTheme, theme);
      writeSessionPreference('theme', theme);
    } catch {
      // The selected theme remains active for this page even if storage is disabled.
    }
  }, [isAbout, isProtectedUsers, isTimeline, theme]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        setLeftOpen((open) => !open);
      } else if (event.ctrlKey && event.key.toLowerCase() === 'm') {
        event.preventDefault();
        setRightOpen((open) => !open);
      } else if (event.key === 'Escape') {
        setLeftOpen(false);
        setRightOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const toggleSidebar = (side: 'left' | 'right') => {
    const setter = side === 'left' ? setLeftOpen : setRightOpen;
    (side === 'left' ? setRightOpen : setLeftOpen)(false);
    setter((open) => !open);
  };

  const closeSidebars = () => {
    setLeftOpen(false);
    setRightOpen(false);
  };

  const closeSidebar = (side: 'left' | 'right') => {
    (side === 'left' ? setLeftOpen : setRightOpen)(false);
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Suspense fallback={<div className="three-background canvas-fallback" aria-hidden="true" />}>
        <ThreeBackground theme={theme} />
      </Suspense>
      <div className="eco-public-layout">
        <EcoHeader
          leftOpen={leftOpen}
          rightOpen={rightOpen}
          onToggleLeft={() => toggleSidebar('left')}
          onToggleRight={() => toggleSidebar('right')}
          onCloseSidebars={closeSidebars}
        />
        <div className="main-container">
          <EcoLeftSidebar open={leftOpen} onClose={() => closeSidebar('left')} />
          {isProtectedUsers ? <ProtectedUsersPage /> : isTimeline ? <TimelinePage /> : isAbout ? <AboutPage /> : <HomePage />}
          <EcoRightSidebar
            open={rightOpen}
            onClose={() => closeSidebar('right')}
            theme={theme}
            onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
          />
        </div>
        <EcoFooter onCloseSidebars={closeSidebars} />
      </div>
    </>
  );
}
