<template>
  <div class="exchange-container">
    <div class="exchange-card">
      <h1 class="title">환율 계산기</h1>
      <h3 class="subtitle">나에게 맞는 환율을 계산해보세요!</h3>
      
      <!-- 출발 통화 선택 -->
      <div class="form-group">
        <label for="from-currency">출발 통화</label>
        <select v-model="fromCurrency" id="from-currency" class="dropdown">
          <option value="" disabled>출발 통화 선택</option>
          <option v-for="data in cleanedDatas" :key="data.id" :value="data.cur_unit">
            {{ data.cur_unit }} - {{ data.cur_nm }}
          </option>
        </select>
      </div>
  
      <!-- 통화 바꾸기 버튼 -->
      <div class="form-group">
        <button class="swap-button" @click="swapCurrencies"><font-awesome-icon icon="up-down" /></button>
      </div>
      
      <!-- 도착 통화 선택 -->
      <div class="form-group">
        <label for="to-currency">도착 통화</label>
        <select v-model="toCurrency" id="to-currency" class="dropdown">
          <option value="" disabled>도착 통화 선택</option>
          <option v-for="data in cleanedDatas" :key="data.id" :value="data.cur_unit">
            {{ data.cur_unit }} - {{ data.cur_nm }}
          </option>
        </select>
      </div>

      <!-- 금액 입력 -->
      <div class="form-group">
        <label for="amount-input">환전하고자 하는 금액</label>
        <input 
          id="amount-input"
          type="text" 
          v-model="amountInput" 
          class="input-field" 
          placeholder="금액을 입력하세요" 
          @input="validateAmount" 
        />
        <span v-if="amount < 0" class="error-message">입력값을 확인하세요</span>
        <span v-if="fromCurrency" class="currency-unit">({{ getCurrencyName(fromCurrency) }})</span>
      </div>


      <!-- 제출 버튼 -->
      <div class="form-group">
        <button class="submit-button" v-if="!isSubmitted" @click="submitAmount">환전하기</button>
      </div>

      <!-- 결과 출력 -->
      <div v-if="isSubmitted" class="result">
        <h2>예상 환전 금액</h2>
        <div class="conversion-amount">
          <strong>{{ calculateConversionAmount }} {{ getCurrencyName(toCurrency) }}</strong>
        </div>
        <p class="conversion-info">환전 금액은 실시간 환율에 따라 변동될 수 있습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter';
import axios from 'axios';

const store = useCounterStore();
const datas = ref([]);

const fromCurrency = ref(""); // 출발 통화
const toCurrency = ref(""); // 도착 통화
const amount = ref(0); // 환전 금액
const amountInput = ref(""); // 입력값
const isSubmitted = ref(false);

onMounted(() => {
  fetchData();
  store.getExchange();
});

watch(() => store.exchangeData, (newData) => {
  datas.value = newData || [];
});

const cleanedDatas = computed(() => {
  return datas.value.map(item => {
    item.cur_unit = item.cur_unit.replace(/\(.*\)/, '').trim(); // 괄호 내용 제거
    return item;
  });
});

const getCurrencyName = (curUnit) => {
  const currency = cleanedDatas.value.find(item => item.cur_unit === curUnit);
  return currency ? currency.cur_nm : "";
};

const calculateConversionAmount = computed(() => {
  if (!fromCurrency.value || !toCurrency.value || amount.value <= 0 || datas.value.length === 0) {
    return "0"; // 기본값
  }

  const fromData = cleanedDatas.value.find(item => item.cur_unit === fromCurrency.value);
  const toData = cleanedDatas.value.find(item => item.cur_unit === toCurrency.value);

  if (!fromData || !toData) return "0";

  const fromRate = parseFloat(fromData.deal_bas_r);
  const toRate = parseFloat(toData.deal_bas_r);

  const adjustedFromRate = ["JPY", "IDR"].includes(fromCurrency.value) ? fromRate / 100 : fromRate;
  const adjustedToRate = ["JPY", "IDR"].includes(toCurrency.value) ? toRate / 100 : toRate;

  let result = 0;
  if (fromCurrency.value === "KRW") {
    // KRW → 외화
    result = amount.value / adjustedToRate;
  } else if (toCurrency.value === "KRW") {
    // 외화 → KRW
    result = amount.value * adjustedFromRate;
  } else {
    // 외화 ↔ 외화
    result = (amount.value * adjustedFromRate) / adjustedToRate;
  }

  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(result);
});

const validateAmount = () => {
  if (!/^\d*\.?\d*$/.test(amountInput.value)) {
    alert('숫자만 입력하세요.');
    amountInput.value = amount.value.toString();
    return;
  }
  amount.value = parseFloat(amountInput.value) || 0;

  if (amount.value < 0) {
    alert('금액은 음수가 될 수 없습니다.');
    amount.value = 0;
    amountInput.value = "0";
  }
};

const submitAmount = () => {
  if (amount.value <= 0) {
    alert('금액은 0보다 커야 합니다.');
  } else {
    isSubmitted.value = true;
  }
};

// 출발 통화와 도착 통화 바꾸는 함수
const swapCurrencies = () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
};


const data = ref(null); // 데이터 변수
// 데이터 로드 함수
const fetchData = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/v1/finlife/exchange/");
    data.value = response.data;
  } catch (error) {
    if (error.response && error.response.status === 503) {
      console.log("503 오류 발생. 페이지를 새로 고칩니다.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error("에러 발생:", error);
    }
  }
};


</script>

<style scoped>
/* 기존 스타일 유지 */
.exchange-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background-color: #f9f9fb;
  padding: 40px 20px;
}

/* 환율 카드 */
.exchange-card {
  background: white;
  padding: 90px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

/* 타이틀과 서브타이틀 */
.title {
  font-size: 2.4rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
  line-height: 1.6;
}

/* 통화 바꾸기 버튼 부모 요소 가운데 정렬 */
.form-group {
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
  align-items: center; /* 가운데 정렬 */
  margin-bottom: 17px; /* 기존 여백 유지 */
}

/* 도착 통화 선택창과 금액 입력창 사이 간격 넓히기 */
.form-group:nth-child(6) {
  margin-top: 70px; /* 도착 통화 선택창과 금액 입력창 사이 간격을 넓힘 */
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
  width: 100%;
}

/* select와 input 필드에 동일한 스타일 적용 */
.dropdown, .input-field {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  box-sizing: border-box; /* padding과 border를 포함하여 너비 계산 */
}

/* 버튼 스타일 */
.submit-button {
  width: 100%;
  background-color: #585bd6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #3134c7; /* hover 시 더 진한 색상 */
  transform: scale(1.05);
}

/* 통화 바꾸기 버튼 */
.swap-button {
  width: 33px;
  height: 33px; /* 버튼을 정사각형으로 설정 */
  background-color: #8d8eb4;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.17rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.04s ease, background-color 0.3s ease;
}

.swap-button:hover {
  background-color: #585bd6;
}

/* 결과 스타일 */
.result {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
}

.error-message {
  color: red;
  font-size: 12px;
}

.currency-unit {
  margin-left: 10px;
  font-size: 14px;
  color: #666;
}

/* 결과 스타일 */
.result {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

/* 예상 환전 금액을 더 강조 */
.conversion-amount {
  margin-top: 10px;
  font-size: 2rem;
  font-weight: 600;
  color: #4caf50; /* 성공적인 환전 금액을 나타내는 초록색 */
  background-color: #f0f9f4; /* 부드러운 배경 */
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.conversion-amount:hover {
  transform: scale(1.05);
}

/* 추가 설명 텍스트 */
.conversion-info {
  margin-top: 10px;
  font-size: 14px;
  color: #777;
  font-style: italic;
  text-align: center;
}

</style>
