/* Lazy section video backgrounds with crossfade and reduced-motion support. */
class SectionVideoBackgrounds {
  constructor() {
    this.sections = [...document.querySelectorAll('.section-video[data-video]')];
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.observer = null;

    this.sections.forEach(section => {
      const layer = this.getLayer(section);
      if (layer) layer.style.backgroundImage = `url("${section.dataset.poster}")`;
    });

    if (this.reducedMotion || !this.sections.length) return;
    this.bindObserver();
    this.bindVisibility();
  }

  bindObserver() {
    if (!('IntersectionObserver' in window)) {
      this.sections.forEach(section => this.activate(section));
      return;
    }

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const tallSection = entry.target.offsetHeight > window.innerHeight;
        const shouldActivate = entry.isIntersecting && (entry.intersectionRatio >= 0.3 || tallSection);
        if (shouldActivate) {
          this.activate(entry.target);
        } else if (!entry.isIntersecting) {
          this.deactivate(entry.target);
        }
      });
    }, { threshold: [0, 0.3, 0.7] });

    this.sections.forEach(section => this.observer.observe(section));
  }

  bindVisibility() {
    document.addEventListener('visibilitychange', () => {
      this.sections.forEach(section => {
        const video = section.querySelector('.section-video-video');
        if (!video) return;
        if (document.hidden) video.pause();
        else if (section.classList.contains('is-video-visible')) this.play(video);
      });
    });
  }

  activate(section) {
    if (this.reducedMotion) return;
    section.classList.add('is-video-visible');
    let video = section.querySelector('.section-video-video');

    if (!video) {
      video = this.createVideo(section);
      this.getLayer(section).appendChild(video);
    }

    video.classList.add('is-active');
    this.play(video);
  }

  deactivate(section) {
    section.classList.remove('is-video-visible');
    const video = section.querySelector('.section-video-video');
    if (!video) return;
    video.classList.remove('is-active');
    video.pause();
  }

  createVideo(section) {
    const video = document.createElement('video');
    video.className = 'section-video-video';
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('aria-hidden', 'true');
    video.preload = 'none';
    video.poster = section.dataset.poster;

    const source = document.createElement('source');
    source.src = section.dataset.video;
    source.type = 'video/mp4';
    video.appendChild(source);
    return video;
  }

  getLayer(section) {
    let layer = section.querySelector('.section-video-layer');
    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'section-video-layer';
      layer.setAttribute('aria-hidden', 'true');
      section.prepend(layer);
    }
    return layer;
  }

  play(video) {
    video.muted = true;
    video.play().catch(() => {});
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.sectionVideoBackgrounds = new SectionVideoBackgrounds();
});
