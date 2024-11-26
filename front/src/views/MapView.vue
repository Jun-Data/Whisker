<template>
  <div class="content-wrapper">
    <!-- 헤더 영역 -->
    <header class="header">
      <h1 class="title fs-1">주변 은행 찾기</h1>
    </header>

    <!-- 지도 영역 -->
    <section class="map-container">
      <div id="map"></div>
    </section>

    <!-- 선택 영역 -->
    <div class="select">
      <!-- 도/시 선택 -->
      <select v-model="province" class="custom-select">
        <option value="" disabled>도/시</option>
        <option v-for="info in infos" :key="info.id" :value="info.prov">
          {{ info.prov }}
        </option>
      </select>

      <!-- 시/군/구 선택 -->
      <select v-model="city" :disabled="!province" class="custom-select">
        <option value="" disabled>시/군/구</option>
        <option v-for="city in cities" :key="city">
          {{ city }}
        </option>
      </select>

      <!-- 은행 선택 -->
      <select v-model="bank" class="custom-select">
        <option value="" disabled>은행명</option>
        <option v-for="bank in banks" :key="bank">
          {{ bank }}
        </option>
      </select>
    </div>
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

// 주변 은행 정보 리스트
const banksList = ref([]);

// 지도 이동 함수
const moveMapToLocation = (address, isCitySelect = false) => {
  const geocoder = new kakao.maps.services.Geocoder();
  geocoder.addressSearch(address, (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const latlng = new kakao.maps.LatLng(result[0].y, result[0].x);
      store.map.setCenter(latlng); // 지도 중심 이동
      const zoomLevel = isCitySelect ? 8 : 5;
      store.map.setLevel(zoomLevel); // 확대 레벨 설정

      // 주변 은행 검색
      store.searchBanks(bank.value, (places) => {
        banksList.value = places; // 주변 은행 데이터 설정
      });
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
    moveMapToLocation(address, true);
  }
});

// 시/군/구 선택 시 해당 시/군/구로 지도 이동
watch(city, (newCity) => {
  const selectedInfo = infos.find((info) => info.prov === province.value);
  if (selectedInfo && newCity) {
    const address = `${province.value} ${newCity}`;
    moveMapToLocation(address, false);
  }
});

// 은행 선택 시 해당 은행 위치로 지도 이동
watch(bank, (newBank) => {
  if (newBank) {
    store.searchBanks(newBank, (places) => {
      banksList.value = places; // 선택한 은행에 맞는 리스트 갱신
    });
  } else {
    store.searchBanks(null, (places) => {
      banksList.value = places; // 모든 은행을 다시 검색
    });
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
      mapStore.map.setCenter(position);

      // 위치 변경 시 기존 마커를 완전히 초기화하고 새 마커 갱신
      mapStore.markers.forEach((marker) => marker.setMap(null));
      mapStore.markers = [];

      store.searchBanks(bank.value, (places) => {
        banksList.value = places; // 마커 갱신 후 은행 리스트 갱신
        places.forEach((place) => {
          if (!place.marker) {
            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(place.latitude, place.longitude),
              map: mapStore.map,
            });
            place.marker = marker; // 장소에 마커 정보 저장
          }
        });
      });
    }
  }
);
</script>

<style scoped>
.header h1 {
  font-weight: 700; /* 글자 두께를 더 두껍게 */
  font-size: 2rem; /* 글자 크기 설정 */
}

/* 콘텐츠 wrapper 스타일 */
.content-wrapper {
  padding: 20px;
  background-color: #f7f8fa;
  max-width: 1400px; /* 최대 너비 설정 */
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  overflow-x: hidden; /* 테이블이 영역을 벗어나지 않도록 설정 */
  box-sizing: border-box;
}

/* 지도 영역 */
.map-container {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  margin-top: 20px;
}

/* 지도 */
#map {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* 선택 영역 */
.select {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}

.custom-select {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.custom-select:focus {
  border-color: #007bff;
  outline: none;
}

/* 은행 리스트 */
.bank-list {
  width: 80%;
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.bank-list h3 {
  margin-bottom: 10px;
}

.bank-list ul {
  list-style-type: none;
  padding-left: 0;
}

.bank-list li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.bank-list li strong {
  font-size: 16px;
  color: #333;
}
</style>
