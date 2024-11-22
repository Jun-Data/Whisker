<template>
  <div class="exchange-container">
    <div class="exchange-card">
      <h1>환율 계산기</h1>

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
        <button class="submit-button" v-if="!isSubmitted" @click="submitAmount">제출</button>
      </div>

      <!-- 결과 출력 -->
      <div v-if="isSubmitted" class="result">
        <p>예상 환전 금액</p>
        <strong>{{ calculateConversionAmount }} {{ getCurrencyName(toCurrency) }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter';

// Vuex store에서 환율 데이터 가져오기
const store = useCounterStore();
const datas = ref([]); // datas를 ref로 정의, 기본값은 빈 배열

const fromCurrency = ref(""); // 출발 통화
const toCurrency = ref(""); // 도착 통화
const amount = ref(0); // 환전 금액
const amountInput = ref(""); // 입력값을 문자열로 처리
const isSubmitted = ref(false); // 제출 여부 체크

onMounted(() => {
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

  // 'en-US' 로케일 기준으로 숫자 포맷 (기본값은 3자리마다 쉼표 추가)
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
</script>

<style scoped>
body {
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f5e4d7; /* 베이지 색상 */
  margin: 0;
}

.exchange-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.exchange-card {
  background: white;
  padding: 50px;
  border-radius: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.dropdown, .input-field {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.submit-button {
  width: 100%;
  background-color: skyblue;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: cadetblue
}

.result {
  margin-top: 20px;
  font-size: 16px;
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
</style>
