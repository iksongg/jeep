(function () {
  /* ── 공용 푸터 컴포넌트 ──
     모든 페이지의 푸터 "링크 데이터"는 이 파일 하나(LINK_COLUMNS)에서만 관리한다.
     레이아웃(배치 방식)만 페이지 구조에 따라 3가지 모드로 나뉜다 — 콘텐츠를 두 번 유지보수하지
     않기 위해서다.

       - mode="flow"     (기본값) : <footer>가 일반 문서 흐름의 블록으로 자연스럽게 쌓임.
                                     checkout / find-dealer / model-lineup / order-complete / test-drive
       - mode="absolute" : 내부는 flow와 동일한 CSS 그리드지만, <footer> 자체를 페이지의
                            절대좌표 캔버스 안 정해진 top(px)에 고정한다(예: mypage.html).
                            data-top 값 필요.
       - mode="jeep"     : jeep.html 전용. 6개 그리드 컬럼 대신, 컬럼마다 폭이 다른 피그마
                            원본 좌표(컬럼당 개별 left px)를 그대로 재현한다 — 균등폭 그리드로
                            바꾸면 시각적 결과가 달라지므로 이 페이지만 예외로 유지.
                            data-top 값 필요(= 기존 footer-dark의 top). */

  var script = document.currentScript;
  var MODE = script.dataset.mode || 'flow';
  var TOP = Number(script.dataset.top || 0);

  var LINK_COLUMNS = [
    { title: '모델소개', links: [
      { label: 'Wrangler' }, { label: 'Wrangler 4xe' }, { label: 'Gladiator' },
      { label: 'Grand Cherokee L' }, { label: 'Grand Cherokee' }
    ] },
    { title: '3D 모델보기', links: [
      { label: 'Wrangler' }, { label: 'Wrangler 4xe' }, { label: 'Gladiator' },
      { label: 'Grand Cherokee L' }, { label: 'Grand Cherokee' }
    ] },
    { title: '구입문의', links: [
      { label: '프로모션', kr: true },
      { label: '시승 신청', kr: true, href: 'test-drive.html' },
      { label: '견적 요청', kr: true, href: 'quote.html' },
      { label: '전시장/서비스센터 검색', kr: true, href: 'find-dealer.html' }
    ] },
    { title: '서비스 프로그램', links: [
      { label: '서비스 캠페인', kr: true }, { label: '연장보증 프로그램', kr: true },
      { label: '소모품 교환 프로그램', kr: true }, { label: 'EDR', kr: true }
    ] },
    { title: '부품 및 악세서리', links: [
      { label: 'JEEP 부품 가격정보', kr: true }, { label: '전기차 배터리 정보', kr: true }
    ] },
    { title: '멤버십', links: [
      { label: '지프 웨이브 멤버십', kr: true, href: 'mypage.html' }
    ] },
    { title: '고객 지원 및 문의', links: [
      { label: '서비스 네트워크', kr: true }, { label: '정비자료', kr: true },
      { label: '자동차 전자제어장치 업데이트', kr: true }, { label: '자동차 교환환불제도 안내', kr: true }
    ] }
  ];
  // 인덱스: 0 모델소개 · 1 3D모델보기 · 2 구입문의 · 3 서비스프로그램 · 4 부품및악세서리 · 5 멤버십 · 6 고객지원및문의

  if (!document.getElementById('__jeep-footer-style')) {
    var style = document.createElement('style');
    style.id = '__jeep-footer-style';
    style.textContent = [
      /* ── 공용(그리드) 스타일: flow / absolute 모드가 공유 ── */
      'footer.__jeep-footer { background: var(--color-gray-900, #0f0f0f); padding: 60px 0 0; }',
      'footer.__jeep-footer .footer-inner {',
      '  max-width: 1920px; margin: 0 auto;',
      '  padding: 0 100px;',
      '  display: grid; grid-template-columns: 160px 1fr;',
      '  gap: 60px; margin-bottom: 40px;',
      '}',
      'footer.__jeep-footer .footer-logo img { width: 141px; height: 54px; object-fit: contain; }',
      'footer.__jeep-footer .footer-cols { display: grid; grid-template-columns: repeat(6, 1fr); gap: 20px; }',
      'footer.__jeep-footer .footer-col + .footer-col { margin-top: 0; }',
      'footer.__jeep-footer .footer-accordion + .footer-accordion { margin-top: 20px; }',
      'footer.__jeep-footer .footer-accordion summary { font-size: 16px; font-weight: 700; color: var(--color-white, #fff); margin-bottom: 16px; line-height: 1.3; list-style: none; cursor: default; pointer-events: none; }',
      'footer.__jeep-footer .footer-accordion summary::-webkit-details-marker { display: none; }',
      'footer.__jeep-footer .footer-accordion > *:not(summary) { display: block !important; }',
      'footer.__jeep-footer .footer-accordion::details-content { content-visibility: visible !important; height: auto !important; overflow: visible !important; }',
      'footer.__jeep-footer .footer-accordion ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }',
      'footer.__jeep-footer .footer-accordion ul li a { font-family: "Oswald", sans-serif; font-size: 16px; font-weight: 400; color: #d7d7d7; text-decoration: none; display: block; transition: color 0.45s; }',
      'footer.__jeep-footer .footer-accordion ul li a.kr { font-family: "Pretendard", sans-serif; }',
      'footer.__jeep-footer .footer-accordion ul li a:hover { color: var(--color-primary, #487f70); }',
      'footer.__jeep-footer .footer-follow-wrap { margin-top: 20px; }',
      'footer.__jeep-footer .footer-follow { font-size: 16px; font-weight: 700; color: white; text-transform: uppercase; line-height: 1.3; margin-bottom: 16px; }',
      'footer.__jeep-footer .footer-social-desktop { display: flex; align-items: center; gap: 12px; }',
      'footer.__jeep-footer .footer-social { display: none; gap: 16px; }',
      'footer.__jeep-footer .footer-social-btn { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; }',
      'footer.__jeep-footer .footer-bottom { background: var(--color-secondary, #000); height: 68px; display: flex; align-items: center; justify-content: center; }',
      'footer.__jeep-footer .footer-bottom p { font-size: 12px; color: #d7d7d7; }',

      '@media (max-width: 1365.98px) and (min-width: 1024px) {',
      '  footer.__jeep-footer .footer-inner { grid-template-columns: 1fr; padding: 0 24px; gap: 28px; }',
      '  footer.__jeep-footer .footer-cols { grid-template-columns: repeat(3, 1fr); gap: 24px 16px; }',
      '}',

      /* ── 태블릿 + 모바일 (<1024px): 세로 스택 + 아코디언 (jeep 모드도 공유) ── */
      '@media (max-width: 1023.98px) {',
      '  footer.__jeep-footer { padding: 0; position: static !important; left: auto !important; top: auto !important; width: 100% !important; height: auto !important; }',
      '  footer.__jeep-footer .footer-inner { display: block; max-width: none; padding: 0; margin-bottom: 0; }',
      '  footer.__jeep-footer .footer-logo {',
      '    display: flex; justify-content: center;',
      '    padding: 40px 0 24px;',
      '  }',
      '  footer.__jeep-footer .footer-cols { display: block; }',
      '  footer.__jeep-footer .footer-col { width: 100%; }',
      '  footer.__jeep-footer .footer-accordion {',
      '    width: 100%; border-top: 1px solid #757575;',
      '    padding: 18px 20px;',
      '  }',
      '  footer.__jeep-footer .footer-accordion + .footer-accordion { margin-top: 0; }',
      '  footer.__jeep-footer .footer-accordion > *:not(summary) { display: revert !important; }',
      '  footer.__jeep-footer .footer-col-body {',
      '    max-height: 0; padding-top: 0; overflow: hidden;',
      '    transition: max-height 0.6s ease, padding-top 0.6s ease;',
      '  }',
      '  footer.__jeep-footer .footer-accordion[open] .footer-col-body { max-height: 600px; padding-top: 16px; }',
      '  footer.__jeep-footer .footer-accordion summary { margin-bottom: 0; cursor: pointer; pointer-events: auto; display: flex; align-items: center; justify-content: space-between; }',
      '  footer.__jeep-footer .footer-accordion summary:focus-visible { outline: 2px solid var(--color-primary, #487f70); outline-offset: 2px; }',
      '  footer.__jeep-footer .footer-accordion summary::after {',
      '    content: ""; width: 10px; height: 10px;',
      '    border-right: 1.5px solid white; border-bottom: 1.5px solid white;',
      '    transform: rotate(45deg); transition: transform 0.6s ease;',
      '  }',
      '  footer.__jeep-footer .footer-accordion[open] summary::after { transform: rotate(-135deg); }',
      '  footer.__jeep-footer .footer-follow-wrap { display: none !important; }',
      '  footer.__jeep-footer .footer-social { display: flex; justify-content: center; padding: 24px 20px; }',
      '  footer.__jeep-footer .footer-bottom { height: auto; padding: 20px; font-size: 14px; }',
      '}',

      /* ── absolute 모드 전용: 그리드 내부는 그대로, <footer> 박스 자체만 캔버스 위 절대좌표로 고정 ── */
      'footer.__jeep-footer.is-absolute {',
      '  position: absolute; left: 0; width: 1920px;',
      '}',
      'footer.__jeep-footer.is-absolute .footer-bottom {',
      '  position: absolute; left: 0; bottom: 0; width: 100%;',
      '}',

      /* ── jeep 모드 전용: 컬럼마다 폭이 다른 피그마 원본 좌표를 그대로 재현(균등폭 그리드 아님) ── */
      '.jeep-footer-abs { position: static; }',
      '.jeep-footer-abs .footer-dark { position: absolute; left: 0; width: 1920px; height: 358.507px; background: #0f0f0f; }',
      '.jeep-footer-abs .footer-black { position: absolute; left: 0; width: 1920px; height: 68.287px; background: black; }',
      '.jeep-footer-abs .footer-logo { position: absolute; left: 100px; width: 141px; height: 54px; }',
      '.jeep-footer-abs .footer-logo img { width: 100%; height: 100%; object-fit: contain; }',
      '.jeep-footer-abs .footer-copyright { position: absolute; left: calc(50% - 109px); font-size: 12px; color: #d7d7d7; font-weight: 400; line-height: 1.3; white-space: nowrap; }',
      '.jeep-footer-abs .footer-col { position: absolute; }',
      '.jeep-footer-abs .footer-col summary { font-size: 16px; font-weight: 700; color: white; line-height: 1.3; margin-bottom: 10px; list-style: none; cursor: default; pointer-events: none; }',
      '.jeep-footer-abs .footer-col summary::-webkit-details-marker { display: none; }',
      '.jeep-footer-abs .footer-col > *:not(summary) { display: block !important; content-visibility: visible !important; }',
      '.jeep-footer-abs .footer-col::details-content { content-visibility: visible !important; height: auto !important; overflow: visible !important; }',
      '.jeep-footer-abs .footer-col ul { list-style: none; display: flex !important; flex-direction: column; gap: 10px; }',
      '.jeep-footer-abs .footer-col ul li a { font-family: "Oswald", sans-serif; font-size: 16px; font-weight: 400; color: #d7d7d7; text-decoration: none; line-height: 1.3; display: block; white-space: nowrap; transition: color 0.45s; }',
      '.jeep-footer-abs .footer-col ul li a:hover { color: var(--color-primary, #487f70); }',
      '.jeep-footer-abs .footer-col ul li a.kr { font-family: "Pretendard", sans-serif; }',
      '.jeep-footer-abs .footer-follow { position: absolute; left: 1647px; font-size: 16px; font-weight: 700; color: white; text-transform: uppercase; line-height: 1.3; }',
      '.jeep-footer-abs .footer-social-desktop { position: absolute; left: 1647px; display: flex; align-items: center; gap: 12px; }',
      '.jeep-footer-abs .footer-social-desktop img { display: block; }',
      '.jeep-footer-abs .footer-social { display: none; gap: 16px; }',
      '.jeep-footer-abs .footer-social-btn { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; }',
      '.jeep-footer-abs .footer-social-btn img { display: block; }',
      '@media (max-width: 1023.98px) {',
      /* jeep.html 모바일은 .rest-of-page{display:contents}라서, 이 래퍼(.jeep-footer-abs) 자신이
         .page(display:flex)의 실제 flex item이 된다 — 다른 섹션들의 최대 order(130)보다 큰
         값을 줘야 맨 끝(페이지 하단)에 위치한다. */
      '  .jeep-footer-abs { order: 140; }',
      '  .jeep-footer-abs .footer-dark, .jeep-footer-abs .footer-black { display: none; }',
      '  .jeep-footer-abs .footer-logo {',
      '    position: static !important; top: auto !important;',
      '    width: 100%; height: auto;',
      '    display: flex; justify-content: center;',
      '    background: #0f0f0f; padding: 40px 0 24px;',
      '  }',
      '  .jeep-footer-abs .footer-logo img { width: 141px; height: 54px; }',
      '  .jeep-footer-abs .footer-col {',
      '    position: static !important; left: auto !important; top: auto !important;',
      '    width: 100%; background: #0f0f0f;',
      '    border-top: 1px solid #757575;',
      '    padding: 18px 20px;',
      '  }',
      '  .jeep-footer-abs .footer-col > *:not(summary) { display: revert !important; }',
      '  .jeep-footer-abs .footer-col-body {',
      '    max-height: 0; padding-top: 0; overflow: hidden;',
      '    transition: max-height 0.6s ease, padding-top 0.6s ease;',
      '  }',
      '  .jeep-footer-abs .footer-col[open] .footer-col-body { max-height: 600px; padding-top: 16px; }',
      '  .jeep-footer-abs .footer-col summary { cursor: pointer; margin-bottom: 0; pointer-events: auto; display: flex; align-items: center; justify-content: space-between; }',
      '  .jeep-footer-abs .footer-col summary:focus-visible { outline: 2px solid var(--color-primary, #487f70); outline-offset: 2px; }',
      '  .jeep-footer-abs .footer-col summary::after {',
      '    content: ""; width: 10px; height: 10px;',
      '    border-right: 1.5px solid white; border-bottom: 1.5px solid white;',
      '    transform: rotate(45deg); transition: transform 0.6s ease;',
      '  }',
      '  .jeep-footer-abs .footer-col[open] summary::after { transform: rotate(-135deg); }',
      '  .jeep-footer-abs .footer-social-desktop { display: none !important; }',
      '  .jeep-footer-abs .footer-social { display: flex; justify-content: center; background: #0f0f0f; padding: 24px 20px; }',
      '  .jeep-footer-abs .footer-copyright { position: static !important; left: auto !important; background: black; text-align: center; padding: 20px; font-size: 14px; }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  /* ── 준비중 팝업 연결용: components/modal.js가 없는 페이지에서도 에러 없이 동작 ── */
  function openComingSoonSafe(e) {
    if (typeof window.openComingSoon === 'function') {
      window.openComingSoon(e);
    } else if (e) {
      e.preventDefault();
    }
  }
  window.__footerOpenComingSoon = openComingSoonSafe;

  function linkHtml(item) {
    var attrs = item.href
      ? 'href="' + item.href + '"'
      : 'href="#" onclick="__footerOpenComingSoon(event)"';
    var cls = item.kr ? ' class="kr"' : '';
    return '<li><a ' + attrs + cls + '>' + item.label + '</a></li>';
  }
  function listHtml(links) { return '<ul>' + links.map(linkHtml).join('') + '</ul>'; }
  function accordionHtml(col) {
    return '<details class="footer-accordion"><summary>' + col.title + '</summary>'
      + '<div class="footer-col-body">' + listHtml(col.links) + '</div></details>';
  }

  var logoImg = '<img src="images/main/logo.png" alt="Jeep" />';
  var socialDesktop = '<div class="footer-social-desktop desktop-only">'
    + '<a href="#" onclick="__footerOpenComingSoon(event)" aria-label="Instagram"><img src="images/main/footer-icon-instagram.svg" width="18" height="18" alt="" /></a>'
    + '<a href="#" onclick="__footerOpenComingSoon(event)" aria-label="카카오톡"><img src="images/main/footer-icon-kakao.png" width="20" height="18" alt="" /></a>'
    + '</div>';
  var socialMobile = '<div class="footer-social mobile-only">'
    + '<a href="#" onclick="__footerOpenComingSoon(event)" class="footer-social-btn" aria-label="Instagram"><img src="images/main/footer-icon-instagram.svg" width="18" height="18" alt="" /></a>'
    + '<a href="#" onclick="__footerOpenComingSoon(event)" class="footer-social-btn" aria-label="카카오톡"><img src="images/main/footer-icon-kakao.png" width="20" height="18" alt="" /></a>'
    + '</div>';
  var copyright = '©2025 FCA US LLC. All Rights Reserved.';

  var html;

  if (MODE === 'jeep') {
    /* ── jeep.html: 컬럼별 개별 left(px), footer-dark 기준 상대 top(px) 그대로 재현 ── */
    var cols = LINK_COLUMNS;
    /* 모바일에서는 이 안의 모든 요소가 position:static이 되어 순수 DOM 순서로 쌓이므로
       (예전 footer-jeep.js는 order:140~143으로 재배치했지만, 그건 이 요소들이 .rest-of-page의
       "직계" 플렉스 자식일 때만 통했음 — 지금은 .jeep-footer-abs 하나로 감싸서 그 트릭이
       더 이상 안 먹힘) 실제로 원하는 최종 순서(로고 → 컬럼 7개 → 모바일 소셜 아이콘 → 카피라이트)
       그대로 마크업을 내보낸다. 데스크톱은 전부 position:absolute라 이 순서와 무관하다. */
    html = '<div class="jeep-footer-abs">'
      + '<div class="footer-dark" style="top:' + TOP + 'px"></div>'
      + '<div class="footer-black" style="top:' + (TOP + 354.7) + 'px"></div>'
      + '<a class="footer-logo" href="jeep.html" style="top:' + (TOP + 71) + 'px">' + logoImg + '</a>'
      + '<div class="footer-follow desktop-only" style="top:' + (TOP + 70) + 'px">Follow Us</div>'
      + '<div class="footer-social-desktop desktop-only" style="top:' + (TOP + 102) + 'px">'
      +   '<a href="#" onclick="__footerOpenComingSoon(event)" aria-label="Instagram"><img src="images/main/footer-icon-instagram.svg" width="18" height="18" alt="" /></a>'
      +   '<a href="#" onclick="__footerOpenComingSoon(event)" aria-label="카카오톡"><img src="images/main/footer-icon-kakao.png" width="20" height="18" alt="" /></a>'
      + '</div>'
      + '<details class="footer-col" style="left:361px;top:' + (TOP + 70) + 'px">' + accordionInner(cols[0]) + '</details>'
      + '<details class="footer-col" style="left:544px;top:' + (TOP + 70) + 'px">' + accordionInner(cols[1]) + '</details>'
      + '<details class="footer-col" style="left:727px;top:' + (TOP + 70) + 'px">' + accordionInner(cols[2]) + '</details>'
      + '<details class="footer-col" style="left:955px;top:' + (TOP + 70) + 'px">' + accordionInner(cols[3]) + '</details>'
      + '<details class="footer-col" style="left:1168px;top:' + (TOP + 70) + 'px">' + accordionInner(cols[4]) + '</details>'
      + '<details class="footer-col" style="left:1376px;top:' + (TOP + 70) + 'px">' + accordionInner(cols[6]) + '</details>'
      + '<details class="footer-col" style="left:1168px;top:' + (TOP + 226) + 'px">' + accordionInner(cols[5]) + '</details>'
      + socialMobile
      + '<div class="footer-copyright" style="top:' + (TOP + 379) + 'px">' + copyright + '</div>'
      + '</div>';
  } else {
    /* ── flow / absolute 공용: 6열 그리드(부품및악세서리+멤버십 한 컬럼, 고객지원+Follow Us 한 컬럼) ── */
    var c = LINK_COLUMNS;
    html = '<footer class="__jeep-footer' + (MODE === 'absolute' ? ' is-absolute' : '') + '"'
      + (MODE === 'absolute' ? ' style="top:' + TOP + 'px"' : '') + '>'
      + '<div class="footer-inner">'
      +   '<a class="footer-logo" href="jeep.html">' + logoImg + '</a>'
      +   '<div class="footer-cols">'
      +     '<div class="footer-col">' + accordionHtml(c[0]) + '</div>'
      +     '<div class="footer-col">' + accordionHtml(c[1]) + '</div>'
      +     '<div class="footer-col">' + accordionHtml(c[2]) + '</div>'
      +     '<div class="footer-col">' + accordionHtml(c[3]) + '</div>'
      +     '<div class="footer-col">' + accordionHtml(c[4]) + accordionHtml(c[5]) + '</div>'
      +     '<div class="footer-col">' + accordionHtml(c[6])
      +       '<div class="footer-follow-wrap desktop-only">'
      +         '<div class="footer-follow">Follow Us</div>'
      +         socialDesktop
      +       '</div>'
      +     '</div>'
      +   '</div>'
      + '</div>'
      + socialMobile
      + '<div class="footer-bottom"><p>' + copyright + '</p></div>'
      + '</footer>';
  }

  function accordionInner(col) {
    return '<summary>' + col.title + '</summary><div class="footer-col-body">' + listHtml(col.links) + '</div>';
  }

  script.insertAdjacentHTML('beforebegin', html);
})();
