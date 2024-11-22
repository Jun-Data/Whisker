<template>
    <div>
        <h1>나에게 간택당하고 싶다면 7개의 문항에 대답해</h1>
        <nav>
        <!-- 버튼을 눌러 다른 게임 페이지로 이동 -->
        <RouterLink :to="{ name: 'Game_1' }" class="button" :class="{ active: $route.name === 'Game_1' }">1번</RouterLink>
        <RouterLink :to="{ name: 'Game_2' }" class="button" :class="{ active: $route.name === 'Game_2' }">2번</RouterLink>
        <RouterLink :to="{ name: 'Game_3' }" class="button" :class="{ active: $route.name === 'Game_3' }">3번</RouterLink>
        <RouterLink :to="{ name: 'Game_4' }" class="button" :class="{ active: $route.name === 'Game_4' }">4번</RouterLink>
        <RouterLink :to="{ name: 'Game_5' }" class="button" :class="{ active: $route.name === 'Game_5' }">5번</RouterLink>
        <RouterLink :to="{ name: 'Game_6' }" class="button" :class="{ active: $route.name === 'Game_6' }">6번</RouterLink>
        <RouterLink :to="{ name: 'Game_7' }" class="button" :class="{ active: $route.name === 'Game_7' }">7번</RouterLink>
        </nav>
    
        <!-- 자식 컴포넌트가 표시될 영역 -->
        <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
            <component :is="Component" />
        </Transition>
        </router-view>
    </div>
</template>

<script setup>
</script>

<style scoped>
/* Fade 애니메이션 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* 네비게이션 스타일 */
nav {
  margin-bottom: 20px;
}

/* 버튼 기본 스타일 */
.button {
  background-color: #35aebe; /* 기본 색상 */
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

/* 버튼 hover 효과 */
.button:hover {
  background-color: #0056b3;
  transform: scale(1.1);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

/* 활성화된 버튼 스타일 */
.active {
  background-color: #7da6d3; /* 활성화된 버튼 초록색 */
  color: white;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

/* 버튼 클릭 효과 */
.button:active {
  transform: scale(0.95);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 반응형 처리 */
@media (max-width: 600px) {
  .button {
    font-size: 1rem;
    padding: 8px 16px;
  }
}
</style>
