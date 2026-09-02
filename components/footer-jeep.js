(function () {
  /* ── jeep.html 전용 반응형 푸터 컴포넌트 ──
     데스크톱(1920 캔버스, 절대좌표)과 태블릿/모바일(<1024px, 아코디언) 스타일을 모두 포함.
     다른 페이지의 components/footer.js와는 별개 — jeep.html에서만 사용. */
  if (!document.getElementById('__jeep-footer-jeep-style')) {
    var style = document.createElement('style');
    style.id = '__jeep-footer-jeep-style';
    style.textContent = [
      '.footer-dark { position: absolute; left: 0; top: 5618px; width: 1920px; height: 358.507px; background: #0f0f0f; }',
      '.footer-black { position: absolute; left: 0; top: 5972.7px; width: 1920px; height: 68.287px; background: black; }',
      '.footer-logo { position: absolute; left: 100px; top: 5689px; width: 141px; height: 54px; }',
      '.footer-logo img { width: 100%; height: 100%; object-fit: contain; }',
      '.footer-copyright { position: absolute; top: 5997px; left: calc(50% - 109px); font-size: 12px; color: #d7d7d7; font-weight: 400; line-height: 1.3; white-space: nowrap; }',
      '.footer-col { position: absolute; top: 5688px; }',
      '.footer-col-membership { top: 5844px; }',
      '.footer-col summary { font-size: 16px; font-weight: 700; color: white; line-height: 1.3; margin-bottom: 10px; list-style: none; cursor: default; pointer-events: none; }',
      '.footer-col summary::-webkit-details-marker { display: none; }',
      '.footer-col > *:not(summary) { display: block !important; content-visibility: visible !important; }',
      '.footer-col::details-content { content-visibility: visible !important; height: auto !important; overflow: visible !important; }',
      '.footer-col ul { list-style: none; display: flex !important; flex-direction: column; gap: 10px; }',
      '.footer-col ul li a { font-family: "Oswald", sans-serif; font-size: 16px; font-weight: 400; color: #d7d7d7; text-decoration: none; line-height: 1.3; display: block; white-space: nowrap; transition: color 0.45s; }',
      '.footer-col ul li a:hover { color: var(--color-primary, #487f70); }',
      '.footer-col ul li a.kr { font-family: "Pretendard", sans-serif; }',
      '.footer-follow { position: absolute; left: 1647px; top: 5688px; font-size: 16px; font-weight: 700; color: white; text-transform: uppercase; line-height: 1.3; }',
      '.footer-social-desktop { position: absolute; left: 1647px; top: 5720px; display: flex; align-items: center; gap: 12px; }',
      '.footer-social-desktop img { display: block; }',
      '.footer-social { display: none; gap: 16px; }',
      '.footer-social-btn { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; }',
      '.footer-social-btn img { display: block; }',

      /* ── 태블릿 + 모바일 (<1024px): 세로 스택 + 아코디언 ── */
      '@media (max-width: 1023.98px) {',
      '  .footer-dark, .footer-black { display: none; }',
      '  .footer-logo {',
      '    order: 140; position: static !important;',
      '    width: 100%; height: auto;',
      '    display: flex; justify-content: center;',
      '    background: #0f0f0f; padding: 40px 0 24px;',
      '  }',
      '  .footer-logo img { width: 141px; height: 54px; }',
      '  .footer-col {',
      '    order: 141;',
      '    position: static !important; left: auto !important; top: auto !important;',
      '    width: 100%; background: #0f0f0f;',
      '    border-top: 1px solid #757575;',
      '    padding: 18px 20px;',
      '  }',
      '  .footer-col > *:not(summary) { display: revert !important; }',
      '  .footer-col-body {',
      '    max-height: 0; padding-top: 0; overflow: hidden;',
      '    transition: max-height 0.6s ease, padding-top 0.6s ease;',
      '  }',
      '  .footer-col[open] .footer-col-body { max-height: 600px; padding-top: 16px; }',
      '  .footer-col summary { cursor: pointer; margin-bottom: 0; pointer-events: auto; display: flex; align-items: center; justify-content: space-between; }',
      '  .footer-col summary:focus-visible { outline: 2px solid var(--color-primary, #487f70); outline-offset: 2px; }',
      '  .footer-col summary::after {',
      '    content: ""; width: 10px; height: 10px;',
      '    border-right: 1.5px solid white; border-bottom: 1.5px solid white;',
      '    transform: rotate(45deg); transition: transform 0.6s ease;',
      '  }',
      '  .footer-col[open] summary::after { transform: rotate(-135deg); }',
      '  .footer-col ul { margin-top: 0; }',
      '  .footer-social-desktop { display: none !important; }',
      '  .footer-social { order: 142; display: flex; justify-content: center; background: #0f0f0f; padding: 24px 20px; }',
      '  .footer-copyright { order: 143; position: static !important; left: auto !important; background: black; text-align: center; padding: 20px; font-size: 14px; }',
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
  window.__footerJeepOpenComingSoon = openComingSoonSafe;

  var html = ''
    + '<div class="footer-dark"></div>'
    + '<div class="footer-black"></div>'
    + '<a class="footer-logo" href="jeep.html"><img src="images/main/logo.png" alt="Jeep" /></a>'
    + '<div class="footer-copyright">©2025 FCA US LLC. All Rights Reserved.</div>'
    + '<div class="footer-follow desktop-only">Follow Us</div>'
    + '<div class="footer-social-desktop desktop-only">'
    +   '<a href="#" onclick="__footerJeepOpenComingSoon(event)" aria-label="Instagram"><img src="images/main/footer-icon-instagram.svg" width="18" height="18" alt="" /></a>'
    +   '<a href="#" onclick="__footerJeepOpenComingSoon(event)" aria-label="카카오톡"><img src="images/main/footer-icon-kakao.png" width="20" height="18" alt="" /></a>'
    + '</div>'
    + '<div class="footer-social mobile-only">'
    +   '<a href="#" onclick="__footerJeepOpenComingSoon(event)" class="footer-social-btn" aria-label="Instagram"><img src="images/main/footer-icon-instagram.svg" width="18" height="18" alt="" /></a>'
    +   '<a href="#" onclick="__footerJeepOpenComingSoon(event)" class="footer-social-btn" aria-label="카카오톡"><img src="images/main/footer-icon-kakao.png" width="20" height="18" alt="" /></a>'
    + '</div>'

    + '<details class="footer-col" style="left:361px">'
    +   '<summary>모델소개</summary>'
    +   '<div class="footer-col-body"><ul>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)">Wrangler</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)">Wrangler 4xe</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)">Gladiator</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)">Grand Cherokee L</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)">Grand Cherokee</a></li>'
    +   '</ul></div>'
    + '</details>'
    + '<details class="footer-col" style="left:544px">'
    +   '<summary>3D 모델보기</summary>'
    +   '<div class="footer-col-body"><ul>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)">Wrangler</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)">Wrangler 4xe</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)">Gladiator</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)">Grand Cherokee L</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)">Grand Cherokee</a></li>'
    +   '</ul></div>'
    + '</details>'
    + '<details class="footer-col" style="left:727px">'
    +   '<summary>구입문의</summary>'
    +   '<div class="footer-col-body"><ul>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)" class="kr">프로모션</a></li>'
    +     '<li><a href="test-drive.html" class="kr">시승 신청</a></li>'
    +     '<li><a href="quote.html" class="kr">견적 요청</a></li>'
    +     '<li><a href="find-dealer.html" class="kr">전시장/서비스센터 검색</a></li>'
    +   '</ul></div>'
    + '</details>'
    + '<details class="footer-col" style="left:955px">'
    +   '<summary>서비스 프로그램</summary>'
    +   '<div class="footer-col-body"><ul>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)" class="kr">서비스 캠페인</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)" class="kr">연장보증 프로그램</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)" class="kr">소모품 교환 프로그램</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)" class="kr">EDR</a></li>'
    +   '</ul></div>'
    + '</details>'
    + '<details class="footer-col" style="left:1168px">'
    +   '<summary>부품 및 악세서리</summary>'
    +   '<div class="footer-col-body"><ul>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)" class="kr">JEEP 부품 가격정보</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)" class="kr">전기차 배터리 정보</a></li>'
    +   '</ul></div>'
    + '</details>'
    + '<details class="footer-col" style="left:1376px">'
    +   '<summary>고객 지원 및 문의</summary>'
    +   '<div class="footer-col-body"><ul>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)" class="kr">서비스 네트워크</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)" class="kr">정비자료</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)" class="kr">자동차 전자제어장치 업데이트</a></li>'
    +     '<li><a href="#" onclick="__footerJeepOpenComingSoon(event)" class="kr">자동차 교환환불제도 안내</a></li>'
    +   '</ul></div>'
    + '</details>'
    + '<details class="footer-col footer-col-membership" style="left:1168px">'
    +   '<summary>멤버십</summary>'
    +   '<div class="footer-col-body"><ul>'
    +     '<li><a href="mypage.html" class="kr">지프 웨이브 멤버십</a></li>'
    +   '</ul></div>'
    + '</details>';

  var script = document.currentScript;
  script.insertAdjacentHTML('beforebegin', html);
})();
