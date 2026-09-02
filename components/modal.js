(function () {
  /* ── 팝업 스타일을 <head>에 주입 (중복 방지) ── */
  if (!document.getElementById('__jeep-coming-soon-style')) {
    var style = document.createElement('style');
    style.id = '__jeep-coming-soon-style';
    style.textContent = [
      '.modal-overlay {',
      '  display: none;',
      '  position: fixed; inset: 0;',
      '  background: rgba(0, 0, 0, 0.2);',
      '  align-items: center; justify-content: center;',
      '  z-index: 2000;',
      '}',
      '.modal-overlay.active { display: flex; }',
      '.modal-box {',
      '  position: relative;',
      '  background: var(--color-white, #fff);',
      '  padding: 56px 64px;',
      '  min-width: 360px;',
      '  display: flex; flex-direction: column; align-items: center;',
      '  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);',
      '}',
      '.modal-close {',
      '  position: absolute; top: 16px; right: 16px;',
      '  display: flex; align-items: center; justify-content: center;',
      '  width: 32px; height: 32px;',
      '  background: none; border: none; cursor: pointer;',
      '  color: var(--color-secondary, #000);',
      '}',
      '.modal-message {',
      '  font-family: "Pretendard", sans-serif;',
      '  font-size: 20px; font-weight: 700; color: var(--color-secondary, #000);',
      '  line-height: 1.5; text-align: center; white-space: nowrap;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  /* ── Material Symbols 아이콘 폰트 (페이지에 없으면 주입) ── */
  if (!document.getElementById('__jeep-material-symbols-font')) {
    var fontLink = document.createElement('link');
    fontLink.id = '__jeep-material-symbols-font';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block';
    document.head.appendChild(fontLink);
  }
  if (!document.getElementById('__jeep-material-symbols-base')) {
    var iconBase = document.createElement('style');
    iconBase.id = '__jeep-material-symbols-base';
    iconBase.textContent = [
      '.material-symbols-outlined {',
      '  font-family: "Material Symbols Rounded";',
      '  font-weight: normal; font-style: normal;',
      '  font-size: 24px; line-height: 1; letter-spacing: normal;',
      '  text-transform: none; display: inline-block; white-space: nowrap;',
      '  word-wrap: normal; direction: ltr;',
      '  -webkit-font-smoothing: antialiased;',
      '  vertical-align: middle;',
      '  font-variation-settings: \'FILL\' 0, \'wght\' 300, \'GRAD\' 0, \'opsz\' 24;',
      '  width: 1em; height: 1em; overflow: hidden;',
      '}'
    ].join('\n');
    document.head.appendChild(iconBase);
  }

  /* ── 팝업 HTML 삽입 (중복 방지) ── */
  if (!document.getElementById('comingSoonOverlay')) {
    var html = '<div class="modal-overlay" id="comingSoonOverlay" onclick="closeComingSoon()">'
      + '<div class="modal-box" onclick="event.stopPropagation()">'
      +   '<button type="button" class="modal-close" aria-label="닫기" onclick="closeComingSoon()">'
      +     '<span class="material-symbols-outlined">close</span>'
      +   '</button>'
      +   '<p class="modal-message">현재 페이지는 준비중입니다</p>'
      + '</div>'
      + '</div>';
    var script = document.currentScript;
    script.insertAdjacentHTML('afterend', html);
  }

  window.openComingSoon = function (e, message) {
    if (e) e.preventDefault();
    var overlay = document.getElementById('comingSoonOverlay');
    overlay.querySelector('.modal-message').textContent = message || '현재 페이지는 준비중입니다';
    overlay.classList.add('active');
  };
  window.closeComingSoon = function () {
    document.getElementById('comingSoonOverlay').classList.remove('active');
  };
})();
