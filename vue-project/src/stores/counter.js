import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useCounterStore = defineStore('counter', () => {
  const articles = ref([])
  const API_URL = 'http://127.0.0.1:8000'
  const token = ref(null)
  const user = ref(null)

  const isLogin = computed(() => {
    if (token.value === null) {
      return false
    } else {
      return true
    }
  })
  const router = useRouter()

  // DRF로 전체 게시글 요청을 보내고 응답을 받아 articles에 저장하는 함수
  const getArticles = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/articles/`,
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
      .then((res) => {
        // console.log(res.data)
        articles.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 회원가입 요청 액션
  const signUp = function (payload) {
    // const username = payload.username
    // const password1 = payload.password1
    // const password2 = payload.password2
    const { username, password1, password2 } = payload

    if (password1.length < 6) {
      alert('비밀번호는 최소 6자리 이상이어야 합니다!')
      return
    }

    if (password1 !== password2) {
      alert('비밀번호가 일치하지 않습니다!')
      return
    }

    axios({
      method: 'post',
      url: `${API_URL}/accounts/signup/`,
      data: {
        username, password1, password2
      }
    })
      .then((res) => {
        // console.log(res)
        // console.log('회원가입 성공')
        const password = password1
        logIn({ username, password })
      })
      .catch((err) => {
        // 에러 처리
        if (err.response && err.response.data) {
          const errorData = err.response.data
          // 비밀번호가 너무 간단한 경우 처리
          if (errorData.password1.includes('This password is too common.')) {
            alert('비밀번호가 너무 간단합니다. 더 복잡한 비밀번호를 사용해주세요.');
          } else {
            // 다른 에러 메시지 처리
            console.log(errorData)
            alert('회원가입에 실패했습니다. 다시 시도해주세요!')
          }
        }
      // .catch((err) => {
      //   console.log(err.response.data)
      })
  }

  // 로그인 요청 액션
  const logIn = function (payload) {
    // const username = payload.username
    // const password1 = payload.password
    const { username, password } = payload

    axios({
      method: 'post',
      url: `${API_URL}/accounts/login/`,
      data: {
        username, password
      }
    })
      .then((res) => {
        token.value = res.data.key
        user.value = username
        router.push({ name: 'MainView' })
        // console.log(res.data)
        // console.log('로그인 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  // [추가기능] 로그아웃
  const logOut = function () {
    axios({
      method: 'post',
      url: `${API_URL}/accounts/logout/`,
    })
      .then((res) => {
        console.log(res.data)
        token.value = null
        router.push({ name: 'MainView' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const exchangeRates = ref({}); // 환율 정보를 저장할 변수
  const selectedCurrency = ref('USD'); // 기본 선택된 국가 통화
  const inputAmount = ref(0); // 사용자 입력 금액
  const convertedAmount = ref(0); // 변환된 금액
  const error = ref(null); // 에러 메시지

    // 환율 정보 가져오기
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/KRW');
        exchangeRates.value = response.data.conversion_rates; // 환율 데이터 저장
      } catch (err) {
        error.value = '환율 정보를 불러오는 데 실패했습니다.';
        console.error(err);
      }
    }
  
    // 환율 변환 함수
    const convertCurrency = () => {
      if (!inputAmount.value) return;
  
      if (exchangeRates.value[selectedCurrency.value]) {
        convertedAmount.value = (inputAmount.value * exchangeRates.value[selectedCurrency.value]).toFixed(2);
      } else {
        error.value = '선택한 통화에 대한 환율 정보가 없습니다.';
      }
    }

    fetchExchangeRates()

  return { articles, API_URL, getArticles, signUp, logIn, token, isLogin, logOut, user, exchangeRates, 
    selectedCurrency, 
    inputAmount, 
    convertedAmount, 
    convertCurrency, }
}, { persist: true })
