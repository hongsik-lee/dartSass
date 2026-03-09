// 공통 스크립트: 탭 전환 함수 등 공통 동작을 이 파일에 둡니다.
function switchTab(event, tabName) {
	if (event && event.preventDefault) event.preventDefault();

	// 모든 탭 콘텐츠 숨기기
	const tabContents = document.querySelectorAll('.tab-content');
	tabContents.forEach(content => content.classList.remove('active'));

	// 모든 버튼 비활성화
	const tabButtons = document.querySelectorAll('.tab-button');
	tabButtons.forEach(button => button.classList.remove('active'));

	// 선택된 탭 표시
	const target = document.getElementById(tabName);
	if (target) target.classList.add('active');
	if (event && event.target) event.target.classList.add('active');
}

// 다른 공통 함수가 생기면 여기에 추가

// 전역 노출(인라인 호출을 그대로 동작하게 하기 위해)
window.switchTab = switchTab;
