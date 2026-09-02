(function () {
  /* ── 푸터 스타일을 <head>에 주입 (중복 방지) ──
     데스크톱: 기존 6열 그리드 레이아웃 그대로 (.footer-col = 그리드 아이템, 5/6번째 컬럼은
     아코디언 2개를 세로로 묶어서 담음).
     모바일/태블릿(<1024px): components/footer-jeep.js와 동일한 아코디언 스타일로 통일
     (.footer-accordion 각각이 자기 테두리+토글을 가진 독립 행이 됨). */
  if (!document.getElementById('__jeep-footer-style')) {
    var style = document.createElement('style');
    style.id = '__jeep-footer-style';
    style.textContent = [
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

      /* ── 태블릿 + 모바일 (<1024px): 세로 스택 + 아코디언 (footer-jeep.js와 동일한 패턴) ── */
      '@media (max-width: 1023.98px) {',
      '  footer.__jeep-footer { padding: 0; }',
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

  /* ── 푸터 HTML ── */
  var html = '<footer class="__jeep-footer">'
    + '<div class="footer-inner">'
    +   '<a class="footer-logo" href="jeep.html"><img src="images/main/logo.png" alt="Jeep" /></a>'
    +   '<div class="footer-cols">'

    +     '<div class="footer-col"><details class="footer-accordion">'
    +       '<summary>모델소개</summary>'
    +       '<div class="footer-col-body"><ul>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)">Wrangler</a></li>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)">Wrangler 4xe</a></li>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)">Gladiator</a></li>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)">Grand Cherokee L</a></li>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)">Grand Cherokee</a></li>'
    +       '</ul></div>'
    +     '</details></div>'

    +     '<div class="footer-col"><details class="footer-accordion">'
    +       '<summary>3D 모델보기</summary>'
    +       '<div class="footer-col-body"><ul>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)">Wrangler</a></li>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)">Wrangler 4xe</a></li>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)">Gladiator</a></li>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)">Grand Cherokee L</a></li>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)">Grand Cherokee</a></li>'
    +       '</ul></div>'
    +     '</details></div>'

    +     '<div class="footer-col"><details class="footer-accordion">'
    +       '<summary>구입문의</summary>'
    +       '<div class="footer-col-body"><ul>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)" class="kr">프로모션</a></li>'
    +         '<li><a href="test-drive.html" class="kr">시승 신청</a></li>'
    +         '<li><a href="quote.html" class="kr">견적 요청</a></li>'
    +         '<li><a href="find-dealer.html" class="kr">전시장/서비스센터 검색</a></li>'
    +       '</ul></div>'
    +     '</details></div>'

    +     '<div class="footer-col"><details class="footer-accordion">'
    +       '<summary>서비스 프로그램</summary>'
    +       '<div class="footer-col-body"><ul>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)" class="kr">서비스 캠페인</a></li>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)" class="kr">연장보증 프로그램</a></li>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)" class="kr">소모품 교환 프로그램</a></li>'
    +         '<li><a href="#" onclick="__footerOpenComingSoon(event)" class="kr">EDR</a></li>'
    +       '</ul></div>'
    +     '</details></div>'

    +     '<div class="footer-col">'
    +       '<details class="footer-accordion">'
    +         '<summary>부품 및 악세서리</summary>'
    +         '<div class="footer-col-body"><ul>'
    +           '<li><a href="#" onclick="__footerOpenComingSoon(event)" class="kr">JEEP 부품 가격정보</a></li>'
    +           '<li><a href="#" onclick="__footerOpenComingSoon(event)" class="kr">전기차 배터리 정보</a></li>'
    +         '</ul></div>'
    +       '</details>'
    +       '<details class="footer-accordion">'
    +         '<summary>멤버십</summary>'
    +         '<div class="footer-col-body"><ul>'
    +           '<li><a href="mypage.html" class="kr">지프 웨이브 멤버십</a></li>'
    +         '</ul></div>'
    +       '</details>'
    +     '</div>'

    +     '<div class="footer-col">'
    +       '<details class="footer-accordion">'
    +         '<summary>고객 지원 및 문의</summary>'
    +         '<div class="footer-col-body"><ul>'
    +           '<li><a href="#" onclick="__footerOpenComingSoon(event)" class="kr">서비스 네트워크</a></li>'
    +           '<li><a href="#" onclick="__footerOpenComingSoon(event)" class="kr">정비자료</a></li>'
    +           '<li><a href="#" onclick="__footerOpenComingSoon(event)" class="kr">자동차 전자제어장치 업데이트</a></li>'
    +           '<li><a href="#" onclick="__footerOpenComingSoon(event)" class="kr">자동차 교환환불제도 안내</a></li>'
    +         '</ul></div>'
    +       '</details>'
    +       '<div class="footer-follow-wrap desktop-only">'
    +         '<div class="footer-follow">Follow Us</div>'
    +         '<div class="footer-social-desktop">'
    +           '<a href="#" onclick="__footerOpenComingSoon(event)" aria-label="Instagram"><img src="images/main/footer-icon-instagram.svg" width="18" height="18" alt="" /></a>'
    +           '<a href="#" onclick="__footerOpenComingSoon(event)" aria-label="카카오톡"><img src="images/main/footer-icon-kakao.png" width="20" height="18" alt="" /></a>'
    +         '</div>'
    +       '</div>'
    +     '</div>'

    +   '</div>'
    + '</div>'

    + '<div class="footer-social mobile-only">'
    +   '<a href="#" onclick="__footerOpenComingSoon(event)" class="footer-social-btn" aria-label="Instagram"><img src="images/main/footer-icon-instagram.svg" width="18" height="18" alt="" /></a>'
    +   '<a href="#" onclick="__footerOpenComingSoon(event)" class="footer-social-btn" aria-label="카카오톡"><img src="images/main/footer-icon-kakao.png" width="20" height="18" alt="" /></a>'
    + '</div>'

    + '<div class="footer-bottom"><p>©2025 FCA US LLC. All Rights Reserved.</p></div>'
    + '</footer>';

  document.currentScript.insertAdjacentHTML('beforebegin', html);
})();
