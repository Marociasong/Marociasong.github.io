import { ArrowUpRight, Facebook, Music2, Youtube } from 'lucide-react';
import TimelineVideo from './components/TimelineVideo';

export default function TimelinePage() {
  return (
    <main id="main" className="page-main timeline-page" tabIndex={-1}>
      <section className="timeline-hero">
        <span className="eyebrow">OFFICIAL CHANNELS</span>
        <h1>Watch and <span className="gradient-text">follow.</span></h1>
        <p>Open Marociasong’s official profiles to view music, videos, and social updates on their original platforms.</p>
      </section>

      <TimelineVideo showTimelineLink={false} />

      <section className="content-section about-details" aria-labelledby="channels-heading">
        <div className="section-heading">
          <span className="eyebrow">MAROCIASONG ONLINE</span>
          <h2 id="channels-heading">Choose a platform.</h2>
        </div>
        <div className="feature-grid">
          <article className="feature-card"><span className="feature-icon"><Youtube size={22} /></span><h3>YouTube</h3><p>Official channel for videos and music.</p><a className="secondary-button" href="https://www.youtube.com/@marociasong" target="_blank" rel="noreferrer">Watch on YouTube <ArrowUpRight size={15} /></a></article>
          <article className="feature-card"><span className="feature-icon"><Music2 size={22} /></span><h3>TikTok</h3><p>Official short-form video account.</p><a className="secondary-button" href="https://www.tiktok.com/@marociasong" target="_blank" rel="noreferrer">Follow on TikTok <ArrowUpRight size={15} /></a></article>
          <article className="feature-card"><span className="feature-icon"><Facebook size={22} /></span><h3>Facebook</h3><p>Official Facebook profile.</p><a className="secondary-button" href="https://www.facebook.com/profile.php?id=61590101694470" target="_blank" rel="noreferrer">Visit Facebook <ArrowUpRight size={15} /></a></article>
        </div>
      </section>
    </main>
  );
}
