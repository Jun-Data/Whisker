<template>
    <div>
      <h1>게임 결과</h1>

      <h1>{{ user }}님의 성향에 맞춘 금융 추천 상품 리스트</h1>
      <p>다시 해보시겠습니까?</p>
      
      <!-- 게임 다시 시작하기 버튼 -->
      <RouterLink @click="resetGame" to="/game/1" class="button">
        게임 다시하기
      </RouterLink>
    </div>
  </template>
  
  <script setup>
  import { ref, inject} from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const weights = inject('weights'); // 부모 컴포넌트에서 제공한 'weights' 값을 받음

  
  // 게임을 초기화하는 함수
  const resetGame = () => {
    // 로컬 스토리지 초기화
    for (let i=1; i<=7; i++) {
      localStorage.removeItem(`selectedOption${i}`);  
    }
    // 게임 1 페이지로 리디렉션
    router.push('/game/1');
  };
  </script>
  
  <style scoped>
  .button {
    background-color: #35aebe;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    padding: 2px 30px;
    margin: 7px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }
  
  .button:hover {
    background-color: #0056b3;
    transform: scale(1.1);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  </style>
  