<template>
  <div class="exchange-container">
    <div class="exchange-card">
      <h1 class="title">환율 계산기</h1>
      <h3 class="subtitle">나에게 맞는 환율을 계산해보세요!</h3>
      
      <!-- 출발 통화 선택 -->
      <div class="form-group">
        <label for="from-currency" class="title fs-5">출발 통화</label>
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
        <label for="to-currency" class="title fs-5">도착 통화</label>
        <select v-model="toCurrency" id="to-currency" class="dropdown">
          <option value="" disabled>도착 통화 선택</option>
          <option v-for="data in cleanedDatas" :key="data.id" :value="data.cur_unit">
            {{ data.cur_unit }} - {{ data.cur_nm }}
          </option>
        </select>
      </div>

      <!-- 금액 입력 -->
      <div class="form-group">
        <label for="amount-input" class="title fs-5">환전하고자 하는 금액</label>
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
const amount = ref(null); // 환전 금액
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
    return ""; // 기본값
  }

  const fromData = cleanedDatas.value.find(item => item.cur_unit === fromCurrency.value);
  const toData = cleanedDatas.value.find(item => item.cur_unit === toCurrency.value);

  if (!fromData || !toData) return "";

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
  // 숫자만 입력되도록 정규식 확인
  if (!/^\d*\.?\d*$/.test(amountInput.value)) {
    alert('숫자만 입력하세요.');
    amountInput.value = amount.value.toString(); // 이전 값으로 되돌림
    return;
  }

  // 값이 비어있는지 또는 잘못된 숫자인 경우를 체크
  if (amountInput.value === "" || isNaN(amountInput.value)) {
    amount.value = "";
  } else {
    amount.value = parseFloat(amountInput.value) || 0;
  }
};


const submitAmount = () => {
  if (fromCurrency.value === toCurrency.value) {
    // 출발 통화와 도착 통화가 같으면 경고 메시지
    alert('출발 통화와 도착 통화는 다르게 선택해야 합니다.');
  } else {
    // 유효한 경우, 환전 결과를 제출
    isSubmitted.value = true;
  }
};

// 출발 통화와 도착 통화 바꾸는 함수
const swapCurrencies = () => {
  if (fromCurrency.value === toCurrency.value) {
    alert('같은 나라입니다!');
    return;  // 같은 나라일 경우 함수 종료
  }

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
/* 기본 컨테이너 스타일 */
.exchange-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background-color: #f7f8fc;
  padding: 30px 15px;
}

/* 환율 카드 스타일 */
.exchange-card {
  background-color: #fff;
  padding: 60px 40px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

/* 타이틀 스타일 */
.title {
  font-size: 2.6rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.5;
}

/* 폼 그룹 스타일 */
.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

/* 레이블 스타일 */
label {
  display: block;
  font-weight: 500;
  color: #444;
  margin-bottom: 8px;
  text-align: left;
  width: 100%;
}

/* 선택 및 입력 필드 스타일 */
.dropdown, .input-field {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

/* 버튼 스타일 */
.submit-button {
  width: 100%;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #3f51b5;
  transform: scale(1.05);
}

/* 통화 바꾸기 버튼 스타일 */
.swap-button {
  width: 40px;
  height: 40px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.swap-button:hover {
  background-color: #3f51b5;
}

/* 결과 출력 스타일 */
.result {
  margin-top: 30px;
  font-size: 18px;
  font-weight: bold;
}

.conversion-amount {
  margin-top: 10px;
  font-size: 2.4rem;
  font-weight: 600;
  color: #4caf50;
  background-color: #e8f5e9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.conversion-amount:hover {
  transform: scale(1.05);
}

.conversion-info {
  margin-top: 15px;
  font-size: 14px;
  color: #777;
  font-style: italic;
  text-align: center;
}

/* 에러 메시지 스타일 */
.error-message {
  color: red;
  font-size: 12px;
}

.currency-unit {
  font-size: 14px;
  color: #666;
}
</style> 