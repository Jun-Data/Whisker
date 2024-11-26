<template>
  <div class="game-container">
    <h1>나에게 간택당하고 싶다면 7개의 문항에 대한 답이 필요해!</h1>
    <!-- {{ weights }} -->
    <nav class="nav-links">
      <!-- 게임 1번 버튼 -->
      <RouterLink
        :to="{ name: 'Game_1' }"
        class="button"
        :class="{ active: weights.earn !== null,
          highlighted: $route.name === 'Game_1'
         }"
      >
        1번
        <span v-if="weights.earn !== null" class="checkmark">
          <font-awesome-icon :icon="['fas', 'paw']" />
        </span>
      </RouterLink>
      <!-- 게임 2번 버튼 -->
      <RouterLink
        :to="{ name: 'Game_2' }"
        class="button"
        :class="{ active: weights.family !== null,
           highlighted: $route.name === 'Game_2'
         }"
      >
        2번
        <span v-if="weights.family !== null" class="checkmark">
          <font-awesome-icon :icon="['fas', 'paw']" />
        </span>
      </RouterLink>
      <!-- 게임 3번 버튼 -->
      <RouterLink
        :to="{ name: 'Game_3' }"
        class="button"
        :class="{ active: weights.risk !== null 
          ,highlighted: $route.name === 'Game_3'
        }"
      >
        3번
        <span v-if="weights.risk !== null" class="checkmark">
          <font-awesome-icon :icon="['fas', 'paw']" />
        </span>
      </RouterLink>
      <!-- 게임 4번 버튼 -->
      <RouterLink
        :to="{ name: 'Game_4' }"
        class="button"
        :class="{ active: weights.term !== null 
          ,highlighted: $route.name === 'Game_4'
        }"
      >
        4번
        <span v-if="weights.term !== null" class="checkmark">
          <font-awesome-icon :icon="['fas', 'paw']" />
        </span>
      </RouterLink>
      <!-- 게임 5번 버튼 -->
      <RouterLink
        :to="{ name: 'Game_5' }"
        class="button"
        :class="{ active: weights.saving !== null
          ,highlighted: $route.name === 'Game_5'
         }"
      >
        5번
        <span v-if="weights.saving !== null" class="checkmark">
          <font-awesome-icon :icon="['fas', 'paw']" />
        </span>
      </RouterLink>
      <!-- 게임 6번 버튼 -->
      <RouterLink
        :to="{ name: 'Game_6' }"
        class="button"
        :class="{ active: weights.patience !== null
          ,highlighted: $route.name === 'Game_6'
         }"
      >
        6번
        <span v-if="weights.patience !== null" class="checkmark">
          <font-awesome-icon :icon="['fas', 'paw']" />
        </span>
      </RouterLink>
      <!-- 게임 7번 버튼 -->
      <RouterLink
        :to="{ name: 'Game_7' }"
        class="button"
        :class="{ active: weights.know !== null
          ,highlighted: $route.name === 'Game_7'
         }"
      >
        7번
        <span v-if="weights.know !== null" class="checkmark">
          <font-awesome-icon :icon="['fas', 'paw']" />
        </span>
      </RouterLink>
    </nav>

    <!-- 자식 컴포넌트가 표시될 영역 -->
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>

    <div v-if="isAllSelected">
      <button class="result-button" @click="goToEndView"><font-awesome-icon icon="cat" /> 결과 보기</button>
    </div>
    <div v-else>
    모든 문항에 답하고 결과를 확인해보세요!
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { onBeforeRouteLeave } from 'vue-router';
import { useProductStore } from '@/stores/product';

const router = useRouter();
const store = useProductStore()

const goToEndView = () => {
  console.log(weights.value)
  store.recommend(weights.value)
  router.push({ name: 'EndGameView' })
};

// 페이지 로드 후에 라우팅을 변경하도록 onMounted 훅으로 이동
onMounted(()=>{
  router.push({ name: 'Game_1' });
})

const isAllSelected = computed(() => {
  return Object.values(weights.value).every((value) => value !== null);
});

// 가중치 매핑 (각 게임 문제에 대한 선택지별 가중치)
const weightMapping = {
  earn: { 1: 10, 2: 1, 3: 5 },
  family: { 1: 10, 2: 5, 3: 1 },
  risk: { 1: 1, 2: 5, 3: 10 },
  term: { 1: 10, 2: 1, 3: 5 },
  saving: { 1: 10, 2: 1, 3: 5 },
  patience: { 1: 10, 2: 1, 3: 5 },
  know: { 1: 5, 2: 1, 3: 10 },
};

// 각 게임 문제의 가중치를 관리할 reactive 객체
const weights = ref({
  earn: null,
  family: null,
  risk: null,
  term: null,
  saving: null,
  patience: null,
  know: null,
});

// 하위 컴포넌트에 weightMapping과 weights를 제공
provide('weightMapping', weightMapping);
provide('weights', weights);

// 페이지를 벗어날 때 초기화 작업을 하도록 설정
onBeforeRouteLeave((to, from, next) => {
  if (to.name !== 'Game' && to.name !== 'EndGameView') {
    for (let i = 1; i <= 7; i++) {
      localStorage.removeItem(`selectedOption${i}`);
    }
  }
  next();
});

</script>

<style scoped>
/* 전체 게임 페이지 컨테이너 스타일 */
.game-container {
  text-align: center;
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  background-color: #f7f8fa;
}

/* 타이틀 스타일 */
h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

/* 네비게이션 영역 */
.nav-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

/* 버튼 기본 스타일 */
.button {
  background-color: #F7F7F8;
  color: rgb(73, 70, 70);
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.3s ease; /* 모든 스타일 변화를 부드럽게 처리 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  margin: 5px;
  white-space: nowrap; /* 텍스트와 아이콘이 한 줄로 표시되도록 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 버튼 hover 효과 */
.button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

/* 활성화된 버튼 스타일 */
.active {
  background-color: #9ABF80;
  color: black;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

/* 버튼 클릭 효과 */
.button:active {
  transform: scale(0.95);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 체크 표시 스타일 */
.checkmark {
  font-size: 1.2rem;
  margin-left: 8px;
  color: green;
  display: inline-block;
}

/* 아이콘 크기 제한 */
.checkmark .fa-paw {
  font-size: 1rem; /* 아이콘의 크기를 1rem으로 제한 */
}

/* 강조된 버튼 스타일 */
.highlighted {
  outline: 3px solid #0d6e22;
  transition: outline 0.001s ease; /* outline 변화만 부드럽게 처리 */;
}

.result-button {
  background: linear-gradient(45deg, #ff6f61, #f06595);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* 아이콘과 텍스트 간격 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s ease;
}

.result-button:hover {
  background: linear-gradient(45deg, #f06595, #ff6f61);
  transform: scale(1.05); /* 살짝 확대 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.result-button:active {
  transform: scale(0.95); /* 눌린 느낌 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 1.2rem; /* 아이콘 크기 */
}

/* 반응형 처리 */
@media (max-width: 600px) {
  .button {
    font-size: 1rem;
    padding: 8px 16px;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
