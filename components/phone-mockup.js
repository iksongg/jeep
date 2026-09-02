(function () {
  /* ── Jeep 포트폴리오용 공용 핸드폰 목업 프레임 ──
     외형(타이타늄 프레임 → 검정 베젤 → 스크린 → Dynamic Island)은
     D:\2026 포트폴리오\EconomyBrief\assets\css\device-mockup.css /
     assets\js\device-mockup.js 의 iPhone 프레임 구현을 그대로 참고해
     크기/반경/그림자/Dynamic Island 치수를 동일하게 재현한 것.
     EconomyBrief의 앱 화면(.device, 온보딩/피드/차트 등)과 앱 전용 드래그
     스크롤 로직은 가져오지 않았고, Screen 내부는 항상 <iframe> 하나만 있다.
     EconomyBrief 원본 파일은 참고만 했을 뿐 전혀 수정하지 않았다.

     사용법:
       <phone-mockup src="jeep.html"></phone-mockup>
       <phone-mockup src="quote.html" title="견적 페이지"></phone-mockup>
     src만 바꿔서 프로젝트의 모든 실제 모바일 페이지를 동일한 프레임 안에
     보여줄 수 있다. 각 페이지의 모바일 반응형 CSS/HTML은 그대로 두고,
     iframe으로만 불러온다(내부 복제 없음). */

  if (!document.getElementById('__jeep-phone-mockup-style')) {
    var style = document.createElement('style');
    style.id = '__jeep-phone-mockup-style';
    style.textContent = [
      /* 프레임 자체는 항상 자연 크기(426x898)로 표시 — 페이지가 여러 개를
         나란히 배치할 때의 레이아웃(grid/flex)은 호출하는 쪽의 책임이다. */
      'phone-mockup { display: inline-block; line-height: 0; }',

      /* Layer 1 — 밝은 티타늄 프레임 (EconomyBrief .iphone-device 그대로) */
      '.pm-frame {',
      '  position: relative; display: block;',
      '  box-sizing: border-box;',
      /* aspect-ratio를 명시해두면, 호출하는 쪽이 나중에 width만(또는 height만) 바꿔도
         가로/세로가 독립적으로 어긋나지 않고 426:898 비율로 자동 고정된다 */
      '  width: 426px; height: 898px; aspect-ratio: 426 / 898;',
      '  margin: 0; padding: 4px; border: 0;',
      '  background: linear-gradient(135deg, #F1F0EC 0%, #E4E2DD 22%, #CFCDC8 50%, #E0DEDA 74%, #F4F2EF 100%);',
      '  border-radius: 58px;',
      '  box-shadow:',
      '    0 30px 60px rgba(0, 0, 0, 0.16),',
      '    0 8px 20px rgba(0, 0, 0, 0.10),',
      '    inset 0 0 0 1px rgba(255, 255, 255, 0.7),',
      '    inset 0 0 0 2px rgba(0, 0, 0, 0.04);',
      '}',
      /* 물리 버튼(우측 전원 / 좌측 액션+볼륨) — EconomyBrief와 동일한 위치값 */
      '.pm-frame::before, .pm-frame::after {',
      '  content: ""; position: absolute;',
      '  background: linear-gradient(180deg, #E4E2DD, #B9B7B2);',
      '}',
      '.pm-frame::before { right: -2.5px; top: 368px; width: 2.5px; height: 107px; border-radius: 2px 0 0 2px; }',
      '.pm-frame::after {',
      '  left: -2.5px; top: 159px; width: 2.5px; height: 36px; border-radius: 0 2px 2px 0;',
      '  box-shadow: 0 64px 0 0 #cecbc6, 0 142px 0 0 #cecbc6;',
      '}',

      /* Layer 2 — 얇은 검정 디스플레이 베젤 */
      '.pm-bezel {',
      '  position: relative; display: block;',
      '  box-sizing: border-box;',
      '  width: 100%; height: 100%;',
      '  margin: 0; padding: 8px; border: 0;',
      '  background: #000000;',
      '  border-radius: 54px;',
      '}',

      /* Layer 3 — 실제 스크린 (기준 402x874).
         진짜 원인: pm-screen을 일부러 2px 더 크게(calc(100%+2px)/-1px margin) 만들어두고
         iframe은 그 안에 1px씩 inset하는 "겹침 트릭"을 쓰고 있었는데, 그 두 값이 정확히
         상쇄되지 않으면(또는 이후 inset을 0으로만 바꾸면) 딱 그 차이만큼 pm-screen의 흰
         배경(그 뒤 pm-bezel의 검정)이 iframe 밖으로 드러나 "틈"으로 보였다.
         → 겹침 트릭 자체를 없애고 pm-screen/iframe을 완전히 같은 크기(100%)로 맞춰서
         애초에 어긋날 여지를 없앰. iframe이 %를 써도, pm-frame/pm-bezel 크기가 고정 px라
         계산되는 실제 CSS px 값은 여전히 402x874로 고정된다(모바일 페이지 쪽 뷰포트도 안 바뀜). */
      '.pm-screen {',
      '  position: relative; display: block;',
      '  box-sizing: border-box;',
      '  width: 100%; height: 100%;',
      '  margin: 0; padding: 0; border: 0;',
      '  background: #fff;',
      '  border-radius: 46px;',
      '  overflow: hidden;',
      '}',
      '.pm-screen iframe {',
      '  position: absolute; top: 0; left: 0;',
      '  box-sizing: border-box;',
      '  width: 100%; height: 100%;',
      '  margin: 0; padding: 0; border: none; display: block; background: #fff;',
      '}',

      /* Dynamic Island — 스크린 상단에서 11px, EconomyBrief와 동일 치수 */
      '.pm-island {',
      '  position: absolute; left: 50%; top: 11px;',
      '  transform: translateX(-50%);',
      '  width: 116px; height: 32px;',
      '  background: #000000; border-radius: 16px;',
      '  z-index: 20; pointer-events: none;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  var FRAME_HTML = ''
    + '<div class="pm-frame">'
    +   '<div class="pm-bezel">'
    +     '<div class="pm-screen">'
    +       '<iframe loading="lazy"></iframe>'
    +       '<div class="pm-island"></div>'
    +     '</div>'
    +   '</div>'
    + '</div>';

  function upgrade(el) {
    if (el.__pmUpgraded) return;
    el.__pmUpgraded = true;
    el.insertAdjacentHTML('afterbegin', FRAME_HTML);
    var iframe = el.querySelector('iframe');
    iframe.src = el.getAttribute('src') || 'about:blank';
    var title = el.getAttribute('title') || el.getAttribute('src') || 'phone preview';
    iframe.title = title;
  }

  function syncSrc(el) {
    var iframe = el.querySelector('iframe');
    if (iframe) iframe.src = el.getAttribute('src') || 'about:blank';
  }

  if (window.customElements && !customElements.get('phone-mockup')) {
    class PhoneMockup extends HTMLElement {
      static get observedAttributes() { return ['src']; }
      connectedCallback() { upgrade(this); }
      attributeChangedCallback(name) {
        if (name === 'src' && this.__pmUpgraded) syncSrc(this);
      }
    }
    customElements.define('phone-mockup', PhoneMockup);
  } else {
    /* Custom Elements 미지원 환경을 위한 최소 폴백: 로드 시 1회만 업그레이드 */
    document.querySelectorAll('phone-mockup').forEach(upgrade);
  }
})();
