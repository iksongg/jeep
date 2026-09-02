(function () {
  /* ── nav이 쓰는 Google Material Symbols 아이콘 폰트 (페이지에 없으면 주입) ── */
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

  /* ── nav 스타일을 <head>에 주입 ── */
  var style = document.createElement('style');
  style.textContent = [
    'nav.__jeep-nav {',
    '  position: fixed; top: 0; left: 0;',
    '  width: 1920px; height: 80px; background: var(--color-secondary, #000);',
    '  display: flex; align-items: center; justify-content: space-between;',
    '  padding: 0 30px; z-index: 1000;',
    '}',
    'nav.__jeep-nav .jnav-logo { display: block; height: 34px; width: 88px; }',
    'nav.__jeep-nav .jnav-logo img { height: 100%; width: auto; object-fit: contain; display: block; }',
    'nav.__jeep-nav .jnav-center { display: flex; gap: 81px; align-items: center; }',
    'nav.__jeep-nav .jnav-center a { color: var(--color-white, #fff); text-decoration: none; font-size: 16px; font-weight: 700; white-space: nowrap; line-height: 1.3; transition: color 0.45s; }',
    'nav.__jeep-nav .jnav-center a:hover { color: var(--color-primary, #487f70); }',
    'nav.__jeep-nav .jnav-right { display: flex; align-items: center; gap: 18px; }',
    'nav.__jeep-nav .jnav-action { display: flex; align-items: center; gap: 4px; color: var(--color-white, #fff); text-decoration: none; font-size: 16px; font-weight: 700; white-space: nowrap; line-height: 1.3; transition: color 0.45s; }',
    'nav.__jeep-nav .jnav-action:hover { color: var(--color-primary, #487f70); }',
    'nav.__jeep-nav .jnav-action .material-symbols-outlined { font-size: 20px; }',
    'nav.__jeep-nav .jnav-burger {',
    '  display: none; width: 28px; height: 28px; padding: 0; border: none; background: none; cursor: pointer;',
    '  color: var(--color-white, #fff); flex-shrink: 0;',
    '}',
    'nav.__jeep-nav .jnav-burger .material-symbols-outlined { font-size: 28px; }',
    'nav.__jeep-nav .jnav-mobile-menu { display: contents; }',
    'nav.__jeep-nav .jnav-overlay { display: none; }',
    /* 데스크톱(≥1024px)에서만 3분할 그리드(로고/센터메뉴/우측메뉴) */
    '@media (min-width: 1024px) {',
    '  nav.__jeep-nav { display: grid; grid-template-columns: 1fr auto 1fr; }',
    '  nav.__jeep-nav .jnav-logo { justify-self: start; }',
    '  nav.__jeep-nav .jnav-center { justify-self: center; }',
    '  nav.__jeep-nav .jnav-right { justify-self: end; }',
    '}',
    /* 1920px 초과 해상도: 디자인 폭(1920px)을 유지한 채 가운데 정렬 */
    '@media (min-width: 1920px) {',
    '  nav.__jeep-nav { left: 50%; transform: translateX(-50%); }',
    '}',
    /* 모바일 + 태블릿(<1024px) 공용: 로고/햄버거만 남고, 드롭다운 메뉴는 position:fixed로 그리드 흐름에서
       빠지기 때문에 그리드 대신 flex + space-between을 써서 로고-햄버거가 항상 양 끝에 오도록 함
       (이전엔 페이지마다 이 블록을 복붙해서 썼는데, 여기 컴포넌트 하나로 합침) */
    '@media (max-width: 1023.98px) {',
    '  nav.__jeep-nav {',
    '    display: flex; justify-content: space-between; align-items: center;',
    '    left: 0; transform: none;',
    '    width: 100%; height: 56px; padding: 0 20px;',
    '    background: var(--color-secondary, #000);',
    '  }',
    '  nav.__jeep-nav .jnav-logo { height: 30px; width: auto; }',
    '  nav.__jeep-nav .jnav-mobile-menu {',
    '    display: block;',
    '    position: fixed; left: 0; top: 56px; width: 100%;',
    '    background: var(--color-secondary, #000); max-height: 0; overflow: hidden; transition: max-height 0.6s ease;',
    '  }',
    '  nav.__jeep-nav.is-open .jnav-mobile-menu { max-height: calc(100vh - 56px); overflow-y: auto; }',
    /* 오버레이: mypage.html의 .mp-mobile-lnb-overlay(rgba(0,0,0,0.45), opacity/visibility
       0.6s ease-out 페이드) 구현을 그대로 재사용. 메뉴(.jnav-mobile-menu)는 불투명 배경 +
       DOM 순서상 오버레이보다 뒤에 와서 항상 오버레이 위에 그려짐 */
    '  nav.__jeep-nav .jnav-overlay {',
    '    display: block;',
    '    position: fixed; left: 0; right: 0; top: 56px; bottom: 0;',
    '    background: rgba(0, 0, 0, 0.45);',
    '    opacity: 0; visibility: hidden; pointer-events: none;',
    '    transition: opacity 0.6s ease-out, visibility 0.6s ease-out;',
    '  }',
    '  nav.__jeep-nav.is-open .jnav-overlay {',
    '    opacity: 1; visibility: visible; pointer-events: auto;',
    '  }',
    '  nav.__jeep-nav .jnav-center, nav.__jeep-nav .jnav-right {',
    '    flex-direction: column; align-items: stretch; gap: 0; padding: 8px 20px;',
    '  }',
    '  nav.__jeep-nav .jnav-center a, nav.__jeep-nav .jnav-right .jnav-action { padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.15); }',
    '  nav.__jeep-nav .jnav-right .jnav-action:last-child { border-bottom: none; }',
    '  nav.__jeep-nav .jnav-burger { display: block; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  /* ── nav HTML ── */
  var html = '<nav class="__jeep-nav">'
    + '<a class="jnav-logo" href="jeep.html">'
    +   '<img src="images/main/logo.png" alt="Jeep" />'
    + '</a>'
    + '<div class="jnav-overlay"></div>'
    + '<div class="jnav-mobile-menu">'
    +   '<div class="jnav-center">'
    +     '<a href="model-lineup.html">모델소개</a>'
    +     '<a href="quote.html">구입문의</a>'
    +     '<a href="mypage.html">멤버십</a>'
    +     '<a href="mypage.html">서비스</a>'
    +     '<a href="quote.html">3D모델보기</a>'
    +   '</div>'
    +   '<div class="jnav-right">'
    +     '<a href="test-drive.html" class="jnav-action">'
    +       '<span class="material-symbols-outlined">search_hands_free</span>'
    +       '시승신청'
    +     '</a>'
    +     '<a href="find-dealer.html" class="jnav-action">'
    +       '<span class="material-symbols-outlined">location_on</span>'
    +       '딜러찾기'
    +     '</a>'
    +   '</div>'
    + '</div>'
    + '<button type="button" class="jnav-burger" aria-label="메뉴">'
    +   '<span class="material-symbols-outlined">dehaze</span>'
    + '</button>'
    + '</nav>';

  /* script 태그 바로 앞에 nav 삽입 */
  var script = document.currentScript;
  script.insertAdjacentHTML('beforebegin', html);

  var navEl = script.previousElementSibling;
  var burger = navEl.querySelector('.jnav-burger');
  var overlay = navEl.querySelector('.jnav-overlay');

  function closeHeaderMenu() {
    navEl.classList.remove('is-open');
    burger.querySelector('.material-symbols-outlined').textContent = 'dehaze';
  }

  burger.addEventListener('click', function () {
    if (navEl.classList.contains('is-open')) {
      closeHeaderMenu();
      return;
    }
    /* 헤더 메뉴와 마이페이지 드롭다운이 동시에 열리지 않도록, 다른 모바일 메뉴에게 닫힘을 알림 */
    window.dispatchEvent(new CustomEvent('jeep:mobile-menu-open', { detail: { source: 'header' } }));
    navEl.classList.add('is-open');
    burger.querySelector('.material-symbols-outlined').textContent = 'close';
  });

  if (overlay) {
    overlay.addEventListener('click', closeHeaderMenu);
  }

  /* 다른 모바일 메뉴(예: 마이페이지 LNB 드롭다운)가 열리면 헤더 메뉴는 닫는다 */
  window.addEventListener('jeep:mobile-menu-open', function (e) {
    if (e.detail && e.detail.source !== 'header') closeHeaderMenu();
  });

  /* ── 준비중 팝업 연결용: components/modal.js가 없는 페이지에서도 에러 없이 동작 ── */
  window.__headerOpenComingSoon = function (e) {
    if (typeof window.openComingSoon === 'function') {
      window.openComingSoon(e);
    } else if (e) {
      e.preventDefault();
    }
  };

  /* 아코디언/필터 접기·펼치기 공용 함수 (quote.html, model-lineup.html에서 공유) */
  window.toggleCollapsed = function (btn) {
    btn.parentElement.classList.toggle('collapsed');
  };
})();
