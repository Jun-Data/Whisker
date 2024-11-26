import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useCounterStore = defineStore('counter', () => {
  const articles = ref([])
  const comments = ref([])
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
          if (errorData.password1){
            
            // 비밀번호가 너무 간단한 경우 처리
            if (errorData.password1.includes('This password is too common.')) {
              alert('비밀번호가 너무 간단합니다. 더 복잡한 비밀번호를 사용해주세요.');
            }
          }
          else if (errorData.username) {
            if (errorData.username.includes('A user with that username already exists.')){

              alert('이미 존재하는 아이디입니다.')
            }
          }
          else {
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
        // console.log('로그인 성공')
      })
      .then((res) => {
        getUser()
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
        // console.log(res.data)
        token.value = null
        userData.value = []
        router.push({ name: 'MainView' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

 
  const exchangeData = ref([]); // 환율 정보를 저장할 변수

  const getExchange = function () {
    axios({
      method : 'get',
      url : `${API_URL}/api/v1/finlife/exchange/`,
    })
    .then(res => {
      exchangeData.value = res.data
    })
    .catch(err => console.log(err))
  }

  const userData = ref([])
  const getUser = function() {
    axios({
      method : 'get',
      url : `${API_URL}/accounts/user/`,
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
    .then(res => {
      userData.value = res.data
    })
    .catch(err=> console.log(err))
    // if (err.response && err.response.status === 401) {
    //   storeToRefs.logOut()
    // }
  }


  const deleteComment = (articleId, commentId) => {
    axios({
      method: 'delete',
      url: `${API_URL}/api/v1/articles/${articleId}/comment/${commentId}/`
    })
    .then(res=> {
      const index = comments.value.findIndex(e => e.id === commentId)
      comments.value.splice(index, 1)
    })
    .catch(err => console.log(err))
  }
  return { articles, comments, API_URL, getArticles, signUp, logIn, token, isLogin, logOut, user, getExchange, exchangeData, getUser, userData, deleteComment}
}, { persist: true })