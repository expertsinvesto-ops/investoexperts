(() => {
  'use strict';
  const list = document.getElementById('bk-advisors');
  if (!list) return;
  const status = document.getElementById('bk-status');
  const title = document.getElementById('bk-calendar-title');
  const host = document.getElementById('bk-host');
  const external = document.getElementById('bk-external');
  const fallback = document.getElementById('bk-fallback');
  const config = window.INVESTO_BOOKING;
  const advisors = config && Array.isArray(config.advisors) ? config.advisors : [];
  // Explicitly allow only hosted scheduling providers; no arbitrary frame URLs.
  const safeURL = value => {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || !['cal.com', 'calendly.com'].includes(url.hostname) || url.username || url.password || url.port || url.pathname.split('/').filter(Boolean).length < 2) return null;
      return url;
    } catch { return null; }
  };
  let generation = 0;
  let timer;
  for (const advisor of advisors) {
    if (!advisor || typeof advisor.name !== 'string' || typeof advisor.id !== 'string') continue;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'bk-advisor';
    button.setAttribute('aria-pressed', 'false');
    if (typeof advisor.image === 'string' && /^images\/[\w.-]+$/.test(advisor.image)) {
      const image = document.createElement('img');
      image.src = advisor.image;
      image.alt = '';
      image.width = 64; image.height = 64;
      button.append(image);
    }
    const copy = document.createElement('span');
    const name = document.createElement('strong');
    name.textContent = advisor.name;
    const role = document.createElement('span');
    role.textContent = typeof advisor.role === 'string' ? advisor.role : '';
    copy.append(name, role); button.append(copy);
    button.addEventListener('click', () => {
      const current = ++generation;
      clearTimeout(timer);
      for (const item of list.querySelectorAll('button')) item.setAttribute('aria-pressed', String(item === button));
      host.replaceChildren(); external.hidden = true; external.removeAttribute('href');
      host.removeAttribute('aria-busy'); fallback.hidden = false;
      title.textContent = `Meet ${advisor.name}`;
      const url = safeURL(advisor.bookingUrl);
      if (!url) {
        status.textContent = 'This advisor’s online calendar is not connected yet. Please contact our team to arrange a time.';
        return;
      }
      external.href = url.href; external.hidden = false;
      status.textContent = 'Loading the advisor’s calendar. Choose your date, time and time zone there.';
      host.setAttribute('aria-busy', 'true');
      fallback.hidden = true;
      const frame = document.createElement('iframe');
      frame.title = `Book a 30-minute meeting with ${advisor.name}`;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.src = url.href;
      frame.addEventListener('load', () => {
        if (current !== generation) return;
        clearTimeout(timer); host.removeAttribute('aria-busy');
        status.textContent = 'Choose an available date and time below. If the calendar does not appear, open it in a new tab.';
      });
      frame.addEventListener('error', () => {
        if (current !== generation) return;
        clearTimeout(timer); host.removeAttribute('aria-busy'); fallback.hidden = false;
        status.textContent = 'The calendar could not load. Open it in a new tab or contact our team.';
      });
      host.append(frame);
      timer = setTimeout(() => {
        if (current !== generation) return;
        host.removeAttribute('aria-busy'); fallback.hidden = false;
        status.textContent = 'Having trouble loading the calendar? Open it in a new tab or contact our team.';
      }, 15000);
    });
    list.append(button);
  }
  if (!list.children.length) status.textContent = 'Online booking is not available yet. Please contact our team to arrange a meeting.';
})();
