import { defineStore } from "pinia";
import { ref } from "vue";

export const useMapStore = defineStore("map", () => {
  const infos = ref([
    {
      id: 1,
      prov: "서울특별시",
      city: [
        "종로구",
        "중구",
        "용산구",
        "성동구",
        "광진구",
        "동대문구",
        "중랑구",
        "성북구",
        "강북구",
        "도봉구",
        "노원구",
        "은평구",
        "서대문구",
        "마포구",
        "양천구",
        "강서구",
        "구로구",
        "금천구",
        "영등포구",
        "동작구",
        "관악구",
        "서초구",
        "강남구",
        "송파구",
        "강동구",
      ],
    },
    {
      id: 2,
      prov: "부산광역시",
      city: [
        "중구",
        "서구",
        "동구",
        "영도구",
        "부산진구",
        "동래구",
        "남구",
        "북구",
        "해운대구",
        "사하구",
        "금정구",
        "강서구",
        "연제구",
        "수영구",
        "사상구",
        "기장군",
      ],
    },
    {
      id: 3,
      prov: "대구광역시",
      city: [
        "중구",
        "동구",
        "서구",
        "남구",
        "북구",
        "수성구",
        "달서구",
        "달성군",
        "군위군",
      ],
    },
    {
      id: 4,
      prov: "인천광역시",
      city: [
        "중구",
        "동구",
        "미추홀구",
        "연수구",
        "남동구",
        "부평구",
        "계양구",
        "서구",
        "강화군",
        "옹진군",
      ],
    },
    {
      id: 5,
      prov: "광주광역시",
      city: ["동구", "서구", "남구", "북구", "광산구"],
    },
    {
      id: 6,
      prov: "대전광역시",
      city: ["동구", "중구", "서구", "유성구", "대덕구"],
    },
    {
      id: 7,
      prov: "울산광역시",
      city: ["중구", "남구", "동구", "북구", "울주군"],
    },
    {
      id: 8,
      prov: "세종특별자치시",
      city: [],
    },
    {
      id: 9,
      prov: "경기도",
      city: [
        "수원시",
        "고양시",
        "용인시",
        "성남시",
        "부천시",
        "화성시",
        "안산시",
        "남양주시",
        "안양시",
        "평택시",
        "시흥시",
        "파주시",
        "의정부시",
        "김포시",
        "광주시",
        "광명시",
        "군포시",
        "하남시",
        "오산시",
        "양주시",
        "이천시",
        "구리시",
        "안성시",
        "포천시",
        "의왕시",
        "양평군",
        "여주시",
        "동두천시",
        "가평군",
        "과천시",
        "연천군",
      ],
    },
    {
      id: 10,
      prov: "강원특별자치도",
      city: [
        "춘천시",
        "원주시",
        "강릉시",
        "동해시",
        "태백시",
        "속초시",
        "삼척시",
        "홍천군",
        "횡성군",
        "영월군",
        "평창군",
        "정선군",
        "철원군",
        "화천군",
        "양구군",
        "인제군",
        "고성군",
        "양양군",
      ],
    },
    {
      id: 11,
      prov: "충청북도",
      city: [
        "청주시",
        "충주시",
        "제천시",
        "보은군",
        "옥천군",
        "영동군",
        "증평군",
        "진천군",
        "괴산군",
        "음성군",
        "단양군",
      ],
    },
    {
      id: 12,
      prov: "충청남도",
      city: [
        "천안시",
        "공주시",
        "보령시",
        "아산시",
        "서산시",
        "논산시",
        "계룡시",
        "당진시",
        "금산군",
        "부여군",
        "서천군",
        "청양군",
        "홍성군",
        "예산군",
        "태안군",
      ],
    },
    {
      id: 13,
      prov: "전라북도",
      city: [
        "목포시",
        "여수시",
        "순천시",
        "나주시",
        "광양시",
        "담양군",
        "곡성군",
        "구례군",
        "고흥군",
        "보성군",
        "화순군",
        "장흥군",
        "강진군",
        "해남군",
        "영암군",
        "무안군",
        "함평군",
        "영광군",
        "장성군",
        "완도군",
        "진도군",
        "신안군",
      ],
    },
    {
      id: 14,
      prov: "경상북도",
      city: [
        "포항시",
        "경주시",
        "김천시",
        "안동시",
        "구미시",
        "영주시",
        "영천시",
        "상주시",
        "문경시",
        "경산시",
        "의성군",
        "청송군",
        "영양군",
        "영덕군",
        "청도군",
        "고령군",
        "성주군",
        "칠곡군",
        "예천군",
        "봉화군",
        "울진군",
        "울릉군",
      ],
    },
    {
      id: 15,
      prov: "경상남도",
      city: [
        "창원시",
        "진주시",
        "통영시",
        "사천시",
        "김해시",
        "밀양시",
        "거제시",
        "양산시",
        "의령군",
        "함안군",
        "창녕군",
        "고성군",
        "남해군",
        "하동군",
        "산청군",
        "함양군",
        "거창군",
        "합천군",
      ],
    },
    {
      id: 16,
      prov: "제주특별자치도",
      city: ["제주시", "서귀포시"],
    },
  ]);

  const banks = ref([
    "산업은행",
    "광주은행",
    "기업은행",
    "제주은행",
    "국민은행",
    "전북은행",
    "수협은행",
    "경남은행",
    "농협은행",
    "새마을금고",
    "우리은행",
    "신협은행",
    "SC은행",
    "우체국",
    "씨티은행",
    "하나은행",
    "대구은행",
    "신한은행",
    "부산은행",
  ]);
  
   // 지도 상태
   const map = ref(null);
   const markers = ref([]); // 은행 마커를 위한 배열
   const latitude = ref(0);
   const longitude = ref(0);
 
   const loadMap = () => {
    if (!("geolocation" in navigator)) {
      alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(pos => {
      latitude.value = pos.coords.latitude;
      longitude.value = pos.coords.longitude;
      if (window.kakao && window.kakao.maps) {
        initMap(); 
      } else {
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(initMap);
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=5c6ff48b64b92bb770446e41b1cc440f";
        document.head.appendChild(script);
      }
    }, err => {
      console.error("Geolocation error:", err);
      alert(err.message);
    });
  };

  const initMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(latitude.value, longitude.value),
      level: 5,
    };
    map.value = new kakao.maps.Map(container, options);
    searchBanks();
  };

  let currentInfoWindow = null;

  const createInfoWindow = (place, marker) => {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const phoneNumber = place.phone ? `전화번호 : ${place.phone}` : '';
  
    const content = `
      <div style="padding: 10px; font-size: 14px; line-height: 1.6; color: #333; max-width: 300px; display: flex; flex-direction: column; justify-content: space-between; min-height: 180px; height: auto;">
        <strong style="font-size: 16px; font-weight: bold;">${place.place_name}</strong>
        <div style="margin-top: 10px; flex-grow: 1; overflow-y: auto;">
          <p style="margin: 0; font-size: 13px;">주소 : ${place.address_name}</p>
          ${phoneNumber ? `<p style="margin: 0; font-size: 13px;">${phoneNumber}</p>` : ''}
        </div>
        <button id="close-btn" style="padding: 7px; background-color: #FF7043; color: white; border: none; border-radius: 5px; margin-top: 10px; cursor: pointer; font-size: 13px; width: 100%; box-sizing: border-box;">닫기</button>
      </div>
    `;
    infowindow.setContent(content);
    infowindow.open(map.value, marker);
  
    const closeBtn = document.getElementById("close-btn");
    if (closeBtn) {
      closeBtn.onclick = () => {
        infowindow.close();
        currentInfoWindow = null;
      };
    }
  
    currentInfoWindow = infowindow;
  };
  
  

  const displayBankMarkers = (places) => {
    markers.value.forEach(marker => marker.setMap(null));
    markers.value = [];

    places.forEach((place) => {
      const marker = new kakao.maps.Marker({
        map: map.value,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      markers.value.push(marker);
      
      kakao.maps.event.addListener(marker, "click", () => createInfoWindow(place, marker));
    });
  };

  const searchBanks = (newBank = "") => {
    const placesService = new kakao.maps.services.Places(map.value);

    placesService.categorySearch(
      "BK9", // 은행 카테고리
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let filteredData = data;
          if (newBank) {
            filteredData = data.filter(bank => bank.place_name.includes(newBank));
          }
          displayBankMarkers(filteredData);
        } else {
          console.log("은행 검색 실패:", status);
        }
      },
      {
        location: map.value.getCenter(),
        radius: 5000, 
      }
    );
  };

  return {
    infos,
    banks,
    map,
    markers,
    latitude,
    longitude,
    loadMap,
    initMap,
    searchBanks,
    displayBankMarkers,
    createInfoWindow,
  };
});
