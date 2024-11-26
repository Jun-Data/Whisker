import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'
import { useCounterStore } from './counter'
export const useProductStore = defineStore('product', () => {
  const API_URL = 'http://127.0.0.1:8000'

  const counterStore = useCounterStore()
  const products = ref([])
  const PRODUCTS = ref([])
  const userProducts = computed(() => {
    if (!counterStore.isLogin) return []
    return counterStore.userData.products
  })

  const productCount = computed(() => {
    return products.value.length
  })


  const getProducts = () => {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/finlife/products/`,

    })
    .then(res=> {
      PRODUCTS.value = res.data
      products.value = res.data
    })
    .catch(err => {
      console.error(err)
    })
  }
  // pagination
  const productsPerPage = 10
  const currentPage = ref(1)
  const totalPages = computed(() => {
    return productCount.value / productsPerPage
  })
  const startIndex = computed(() => {
    return (currentPage.value - 1) * productsPerPage
  })
  const endIndex = computed(() => {
    return startIndex.value + productsPerPage
  })
  const currentProducts = computed(() => {
    return products.value.slice(startIndex.value, endIndex.value)
  })

  const filterProducts = (keyword) => {
    console.log(keyword)
    products.value = Object.values(PRODUCTS.value).filter(e =>
        e.type.includes(keyword) ||
        e.kor_co_nm.includes(keyword) ||
        e.fin_prdt_nm.includes(keyword))
    }
  


  const sortProducts = (col, desc) => {
    if (col === 'intr') {
        products.value.sort((a, b) => {
        return (a.intr_rate - b.intr_rate) * desc.value;
      })
    }
    else if (col === 'intr2') {
        products.value.sort((a, b) => {
        return (a.intr_rate2 - b.intr_rate2) * desc.value;
      })
    }
    else if (col === 'term') {
        products.value.sort((a, b) => {
        return (a.save_trm - b.save_trm) * desc.value;
      })
    }
  }
  const priorityStandard = ['earn', 'family', 'saving','term', 'know']
  const standardToFields = {
    earn: {
      'max_limit': {
        1: 300000,  // 30만원 이하
        5: 1000000, // 100만원 이하
        10: null, // 제한 없음
      },
      'save_trm': {
        1: 6, // 저소득: 6개월 이하
        5: 12, // 12개월 이하
        10: null,
      },
    },
    family: {

    },
    term: {
			'save_trm' : {
				1: 12, // 12만원 이하
				5: 36, // 36만원 이하
				10: null, // 제한 없음
			},
			'intr_rate2': {
				1: 3, // 3 이하
				5: 4.25, // 4.25 이하
				10: null, // 제한없음
			},
		},
    saving: {
      'rsrv_type_nm': {
        1: '자유',
        5: null,
        10: "정액"
      }
    },
    know: {
      'etc_note': {
        1: ["자유"],
        5: null,
        10: ['## 여기는 하드코딩됨'],
      }
    },
    risk: {

    },
    patience: {
      'spcl_cnd' : {
				1: "", 
				5: -1,
				10: ["유지", "만기"]
			},
    },
  }

  const usePriorityFields = (stds) => {
    // 필드 정렬
    stds.sort((a,b) => {
      const indexA = priorityStandard.indexOf(a[0])
      const indexB = priorityStandard.indexOf(b[0])
      // index 없으면 -1
      // a, b 비교 -> return이 음수면 a가 우선, 양수면 b, 0이면 그대로 
      if (indexA === -1 && indexB === -1) return 0
      if (indexA === -1) return 1
      if (indexB === -1) return -1
      return indexA - indexB
    })
    // 우선순위별 가중치 차등 부여
    let g = 1
    const step = stds.length
    for (let i=0; i<step; i++){
      g -= (1 / step)
      stds[i].push(g)

    }
    return stds
  }
  const dataTypes =  {
    'type': 's',
    'fin_prdt_cd': 's',
    'fin_co_no': 's',
    'kor_co_nm': 's',
    'fin_prdt_nm': 's',
    'etc_note': 'length',
    'join_deny': 1,
    'join_member': 's',
    'join_way': 's',
    'max_limit': 1,
    'spcl_cnd': 'type',
    'intr_rate_type_nm': 's',
    'rsrv_type_nm': 'type',
    'save_trm': 1,
    'intr_rate': 1,
    'intr_rate2': 1,

  }


  const calculateMinMax = (field, q, attr) => {
    let min = Infinity
    let max = 0;
    PRODUCTS.value.forEach(e => {
      
      if (attr === 'length') {
        min = Math.min(min, e[field].length)
        max = Math.max(max, e[field].length)
      }
      else if (attr === 'type') {
        if (e[field].includes(q)) max = 1
        else min = 0

        if (max === 1 && min === 0 ) return {min, max}
      }
      else if (attr === 'number') {
        min = Math.min(min, e[field])
        max = Math.max(max, e[field])
      }

    })
    
    return {min, max}
  }
  const stats = ref(null)
  const recommededProduct = ref(null)
  const recommend = (payload) => {
    // const standards = Object.entries(payload)
    // console.log(standards.slice())
    const standards = usePriorityFields(Object.entries(payload))
    console.log(standards)
    const productsCopy = PRODUCTS.value.slice()
    
    productsCopy.forEach(product => {
      let score = 0
      for (let i=0; i<standards.length; i++) {
        const key = standards[i][0] // earn, family ..
        const weight = standards[i][1] // 1, 5, 10
        const g = standards[i][2] // 우선순위의 가중치
        const fields = Object.keys(standardToFields[key])
        
        for (let j=0; j<fields.length; j++) {
          const field = fields[j]
          // 점수 부여 x
          if (standardToFields[key][field][weight] === null) continue
          
          //--------- 특수한 경우 처리
          if (typeof standardToFields[key][field][weight] === 'object') {
            if (typeof product[field] === 'string') {
              // 유형
              if (dataTypes[field] === 'type') {
                for (let k=0; k<standardToFields[key][field][weight].length; k++) {
                  if (standardToFields[key][field][weight][k] === null) continue
                  const stdVal = standardToFields[key][field][weight][k]
                  
                  if (product[field].includes(stdVal)) {
                    score += 1 * g   
                    break // 유지 또는 만기 하나만 적용
                  }
                }
              }
            }

            // **etc_note
            if (field === 'etc_note') {
              
              switch (weight) {
                case 1: {
                  for (let x=0; x<standardToFields[key][field][weight].length; x++){
                    const stdVal = standardToFields[key][field][weight][x]
                  
                    if (product[field].includes(stdVal)) {
                      score += 1 * g   
                      break
                    }
                  }
                  break
                }
                case 5: {

                  break
                }
                case 10: {
                  const items = ['etc_note', 'join_deny', 'spcl_cnd']
                  for (let i in items) {
                    if (items[i] !== 'join_deny') {
                      const {min, max} = calculateMinMax(items[i], '', 'length')
                      const productVal = product[field].length
                      const normalizedProductVal = max === min ? 1 : (productVal - min) / (max - min);
                      score += normalizedProductVal * g / items.length

                    }
                    if (items[i] === 'join_deny') {
                      const {min, max} = calculateMinMax(items[i], '', 'number')
                      const productVal = product[items[i]]
                      // 정규화 - max = min인 경우 Infinity 배제
                      const normalizedProductVal = max === min ? 1 : (productVal - min) / (max - min);
                      
                      // 스케일 조정된 편차 * 우선순위의 가중치
                      score += normalizedProductVal * g / items.length 

                    }
                    
                  }
                  break
                }
              }
            }
          }
          // ---------일반
          else {
            // 숫자 필드
            if (typeof product[field] === 'number') {
              if (standardToFields[key][field][weight] === null) continue
              const stdVal = standardToFields[key][field][weight]
              
              const { min, max } = calculateMinMax(field, '', 'number')
              // console.log(stdVal)
              // -1: max_limit, intr_rate(2), rsrv_type_nm
              let productVal;
              if (field === 'intr_rate' || field === 'intr_rate2') {
                productVal = product[field] === -1? min : product[field]
              }
              else  {
                productVal = product[field] === -1? max : product[field]
              }
                          
              // 정규화 - max = min인 경우 Infinity 배제
              const normalizedProductVal = max === min ? 1 : (productVal - min) / (max - min);
              const normalizedStdVal = max === min ? 1 : (stdVal - min) / (max - min);
              const diff = Math.abs(normalizedProductVal - normalizedStdVal)
              // 스케일 조정된 편차 * 우선순위의 가중치
              score += 1 / (diff + 1) * g // diff=0인 경우 Infinity 배제
              
            }
            // 문자열 필드
            else if (typeof product[field] === 'string') {
              // 유형
              if (dataTypes[field] === 'type') {
                if (standardToFields[key][field][weight] === null) continue
                const stdVal = standardToFields[key][field][weight]
                
                if (product[field].includes(stdVal)) score += 1 * g
              }
              // 길이
              else if (dataTypes[field] === 'length') {
                
                if (standardToFields[key][field][weight] === null) continue
                const stdVal = standardToFields[key][field][weight]

                const { min, max } = calculateMinMax(field, stdVal, length)
                
                const productVal = product[field] === -1? max : product[field].length
                const normalizedProductVal = max === min ? 1 : (productVal - min) / (max - min);
                score += normalizedProductVal * g
              }
              
            }


          }


        }

      }
      product.score = score

    })
    // 점수 내림차순
    productsCopy.sort((a, b) => {
      return b.score - a.score
    })
    console.log(productsCopy[0])
    // productsCopy.forEach(e => console.log(e.score))
    recommededProduct.value = productsCopy[0]
  }
  

  // const recommend_sort = function (payload) {
  //   const standards = Object.entries(payload)
  //   // 필드 정렬
  //   standards.sort((a,b) => {
  //     const indexA = priorityStandard.indexOf(a[0])
  //     const indexB = priorityStandard.indexOf(b[0])
  //     // index 없으면 -1
  //     // a, b 비교 -> return이 음수면 a가 우선, 양수면 b, 0이면 그대로 
  //     if (indexA === -1 && indexB === -1) {
  //       return 0
  //     }
  //     if (indexA === -1) {
  //       return 1
  //     }
  //     if (indexB === -1) {
  //       return -1
  //     }
  //     return indexA - indexB
  //   })
  //   console.log(standards)
  //   const productsCopy = PRODUCTS.value.slice()
  //   // productsCopy.sort((a, b) => {
  //   //   if (a['max_limit'] > 300000) return -1
  //   //   if (b['max_limit'] > 300000) return 1
  //   //   // if (a['max_limit'] <= 300000 && b['max_limit'] > 300000) return 1
  //   //   if (a['max_limit'] !== b['max_limit']) return b['max_limit'] - a['max_limit']
  //   //   else {
  //   //     if (a['save_trm'] !== b['save_trm']) return b['save_trm'] - a['save_trm']
  //   //   }
  //   // })

  //   productsCopy.sort((a, b) => {
  //     for (let i = 0; i < standards.length; i++) {
  //       const key = standards[i][0]; // 정렬 기준 정보(earn, risk ..)
  //       const weight = payload[key] // 1 5 10 (가중치)
  //       // console.log(standardToFields[key], Boolean(standardToFields[key]))
  //       // if (!standardToFields[key]) continue // 정의한 우선순위에 없으면 무시
  //       // if (Object.keys(standardToFields[key]).length === 0) continue // 정의한 우선순위에 없으면 무시
  //       const fields = Object.keys(standardToFields[key]) // 정렬 기준 필드들
  //       // console.log(fields)
  //       for (let j=0; j < fields.length; j++){
  //         const compareVal = standardToFields[key][fields[j]][weight]
  //         if (compareVal !== null){
  //           // 기준보다 크면 뒤로 보냄
            
  //           // if (a[fields[j]] > compareVal) return 1
  //           // if (b[fields[j]] > compareVal) return -1
  //           if (a[fields[j]] === -1 || a[fields[j]] > compareVal) return 1
  //           if (b[fields[j]] === -1 || b[fields[j]] > compareVal) return -1
            
  //           // if (a[fields[j]] !== b[fields[j]]) return b[fields[j]] - a[fields[j]]
  //           if (a[fields[j]] > b[fields[j]]) return -1
            
  //         }
  //         else {
  //           // if (a[fields[j]] === -1 && b[fields[j]] !== -1) return -1
  //           // if (a[fields[j]] !== -1 && b[fields[j]] === -1) return 1
  //           // if (a[fields[j]] !== b[fields[j]]) return b[fields[j]] - a[fields[j]]
            
  //         }
          
          
  //        }
         
  //     }
  //     // return -1;
  //     // console.log(b.intr_rate2, a.intr_rate2)
  //     return b.intr_rate2 - a.intr_rate2; // 모든 기준에서 값이 같을 경우
  //   });
  //   productsCopy.forEach(e => {
  //     console.log(e.max_limit, e.save_trm, e.intr_rate2)
  //   })
  //   // console.log(productsCopy)
    
  // }
  return { 
    API_URL,  products, productCount, PRODUCTS, userProducts, stats, recommededProduct,
    totalPages, currentPage, currentProducts,
    getProducts, filterProducts, sortProducts, recommend,
   }
}, {persist: true})