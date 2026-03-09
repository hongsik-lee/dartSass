// 로그인 폼 처리
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // 입력값 가져오기
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;

      // 간단한 검증
      if (!email || !password) {
        alert('이메일과 비밀번호를 입력해주세요.');
        return;
      }

      // 이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('올바른 이메일 형식을 입력해주세요.');
        return;
      }

      // 비밀번호 길이 검증
      if (password.length < 6) {
        alert('비밀번호는 최소 6자 이상이어야 합니다.');
        return;
      }

      // 로컬스토리지에 이메일 저장 (선택사항)
      if (remember) {
        localStorage.setItem('savedEmail', email);
      } else {
        localStorage.removeItem('savedEmail');
      }

      // 로그인 처리 (실제로는 서버로 요청)
      alert('로그인 되었습니다!\n이메일: ' + email);
      
      // 홈페이지로 리다이렉트
      // window.location.href = 'index.html';
    });

    // 페이지 로드 시 저장된 이메일 복원
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      document.getElementById('email').value = savedEmail;
      document.getElementById('remember').checked = true;
    }
  }
});
