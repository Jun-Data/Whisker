<template>
    <div class="container">
      <h3>3개의 선택지 중 하나를 선택해</h3>
      <h1>나에게 선물을 주지 않으면 간택당할 수 없어. 어떤 방식으로 선물을 사 줄거야?</h1>
      <div class="options">
        <!-- 상 : 매달 일정 금액 꾸준히 -->
        <div class="option" :class="{ active: selected === 1 }" @click="selectOption(1)">
          <p>"매달 일정 금액을 저축하면서 안정적인 예산을 유지해. 고양이가 필요할 때마다 준비된 간식이 있다면 기쁨이 두 배!"</p>
        </div>

        <!-- 하 : 유동적 -->
        <div class="option" :class="{ active: selected === 2 }" @click="selectOption(2)">
          <p>"고양이가 원하는 걸 즉시 사주며, 유동적으로 예산을 조정하는 스타일!"</p>
        </div>

        <!-- 중 : 가끔 큰 지출 -->
        <div class="option" :class="{ active: selected === 3 }" @click="selectOption(3)">
          <p>"가끔 큰 선물을 사주기도 하지만, 대부분은 조금씩 모은 간식으로 충분해!"</p>
        </div>
      </div>
    <!-- 버튼들 -->
    <div class="buttons">
      <!-- 이전 문제로 가는 버튼 -->
      <button @click="goToPreviousQuestion" class="prev-btn">
        이전 문제로 돌아가기
      </button>

      <!-- 다음 문제로 넘어가는 버튼 -->
      <button @click="goToNextQuestion" :disabled="!selected" class="next-btn">
        다음 문제로 넘어가기
      </button>
    </div>
  </div>

</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const selected = ref(null); // 선택된 옵션을 추적
  const router = useRouter(); // 라우터 인스턴스 가져오기

     // 페이지가 로드될 때 로컬 스토리지에서 선택된 값을 불러오기
     onMounted(() => {
    const storedSelection = localStorage.getItem('selectedOption5');
    if (storedSelection) {
      selected.value = parseInt(storedSelection); // 문자열을 숫자로 변환하여 설정
    }
  });
  
  // 선택된 옵션을 설정하는 함수
  const selectOption = (option) => {
    selected.value = option; // 클릭한 옵션을 활성화
  }
  
  // 이전 문제로 돌아가는 함수
  const goToPreviousQuestion = () => {
    localStorage.setItem('selectedOption5', selected.value); // 선택한 값 저장
    router.push({ name: 'Game_4' }); // 'Game_4' 라우트로 이동
  }
  
  // 다음 문제로 넘어가는 함수
  const goToNextQuestion = () => {
    if (selected.value) {
      localStorage.setItem('selectedOption5', selected.value); // 선택한 값 저장
      router.push({ name: 'Game_6' }); // 'Game_6' 라우트로 이동
    }
  }
  </script>
  
  <style scoped>
  /* 스타일 */
  .container {
    text-align: center;
    padding: 20px;
  }
  
  .options {
    display: flex;
    gap: 35px; /* 선택지 간 간격*/
    justify-content: center; /* 가운데 정렬 */
    margin-bottom: 40px; /* 선택지 다음 버튼 사이 간격*/
    margin-top: 40px; /* 선택지 문제 사이 간격*/
  }
  
  .option {
    padding: 12px 24px;
    background-color: #f0f0f0;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-size: 1.2rem; /* 글씨 크기 */
    font-weight: bold; /* 텍스트 굵기 */
    width: 30%;
  }


  .option.active {
    background-color: #28a745;
    color: white;
    transform: scale(1.1); /* 선택된 옵션 확대 */
  }
  
  .option:hover {
    background-color: #007bff;
    color: white;
    transform: scale(1.05); /* hover 시 살짝 확대 */
  }
  
  .buttons {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: center; /* 가운데 정렬 */
  }
  
  button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 8px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
  }
  
  button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  
  .prev-btn {
    background-color: #ffc107;
  }
  
  .next-btn {
    background-color: #28a745;
    color: white;
  }
  
  button:hover {
    background-color: #007bff;
    color: white;
  }
  </style>