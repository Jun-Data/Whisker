<template>
  <section class="test">
    <div id="map"></div>
  </section>

  <div class="select">
    <!-- 도/시 선택 -->
    <select v-model="province">
      <option value="" disabled>도/시</option>
      <option v-for="info in infos" :key="info.id" :value="info.prov">
        {{ info.prov }}
      </option>
    </select>
    <br><br>
    
    <!-- 시/군/구 선택 -->
    <select v-model="city" :disabled="!province">
      <option value="" disabled>시/군/구</option>
      <option v-for="city in cities" :key="city">
        {{ city }}
      </option>
    </select>
    <br><br>
    
    <!-- 은행 선택 -->
    <select v-model="bank">
      <option value="" disabled>은행명</option>
      <option v-for="bank in banks" :key="bank">
        {{ bank }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useMapStore } from "@/stores/map"; // Pinia 스토어 임포트
import { ref, watch, onMounted } from "vue";

// Store 연결
const store = useMapStore();
const infos = store.infos;
const banks = store.banks;

// 도/시 및 시/군/구 데이터 관리
const province = ref("");
const city = ref("");
const cities = ref([]);
const bank = ref("");

// 주소 기반으로 지도 이동 함수
const moveMapToLocation = (address) => {
  const geocoder = new kakao.maps.services.Geocoder();
  geocoder.addressSearch(address, (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const latlng = new kakao.maps.LatLng(result[0].y, result[0].x);
      store.map.setCenter(latlng); // 지도 중심 이동
    } else {
      console.log("주소를 찾을 수 없습니다.");
    }
  });
};

// 도/시 선택 시 해당 도/시로 지도 이동
watch(province, (newProvince) => {
  const selectedInfo = infos.find((info) => info.prov === newProvince);
  cities.value = selectedInfo ? selectedInfo.city : []; // 도시 목록 업데이트
  city.value = ""; // 시/군/구 초기화
  bank.value = ""; // 은행 초기화

  if (selectedInfo) {
    const address = selectedInfo.prov; // 도/시 이름만 사용
    moveMapToLocation(address);
  }
});

// 시/군/구 선택 시 해당 시/군/구로 지도 이동
watch(city, (newCity) => {
  const selectedInfo = infos.find((info) => info.prov === province.value);
  if (selectedInfo && newCity) {
    const address = `${province.value} ${newCity}`; // 도/시 + 시/군/구 이름
    moveMapToLocation(address);
  }
});

// 은행 선택 시 해당 은행 위치로 지도 이동
watch(bank, (newBank) => {
  if (newBank) {
    searchBanks(newBank); // 선택된 은행만 검색
  }
});

// Pinia 스토어 사용
const mapStore = useMapStore();

// 지도 로드
onMounted(() => {
  mapStore.loadMap();
});

// 위치가 변경될 때마다 지도와 마커 갱신
watch(
  () => [mapStore.latitude, mapStore.longitude],
  () => {
    if (mapStore.map) {
      const position = new kakao.maps.LatLng(mapStore.latitude, mapStore.longitude);
      mapStore.map.setCenter(position); // 지도 중심을 새 위치로 설정
      mapStore.displayMarker([[mapStore.latitude, mapStore.longitude]]); // 마커 갱신
    }
  }
);
</script>

<style scoped>
.test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
}

#map {
  width: 400px;
  height: 500px;
  border: 1px #a8a8a8 solid;
}

.select {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
