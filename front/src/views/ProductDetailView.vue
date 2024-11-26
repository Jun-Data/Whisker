<template>
  <div class="product-detail">
    <h1 class="product-title">상품 상세 페이지</h1>

    <div v-if="product" class="product-info">
      
      <!-- 상품 정보 -->
      <div class="product-details">
        <p><strong>상품 유형 : </strong> {{ product.type === 'deposit' ? '예금' : '적금' }}</p>
        <p><strong>금융회사명 :</strong> {{ product.kor_co_nm }}</p>
        <p><strong>상품명 : </strong> {{ product.fin_prdt_nm }}</p>
        <p><strong>상품 설명 : </strong> {{ product.etc_note || '없음' }}</p>
        <p><strong>가입 자격 : </strong> {{ product.join_member || '제한 없음' }}</p>
        <p><strong>가입 방법 : </strong> {{ product.join_way || '없음' }}</p>
        <p><strong>최고 한도 : </strong> {{ product.max_limit || '제한 없음' }}</p>
        <p><strong>특별 조건 : </strong> {{ product.spcl_cnd || '없음' }}</p>

        <hr class="divider">
        
        <p><strong>금리 유형:</strong> {{ product.intr_rate_type_nm }}</p>
        <p><strong>금리:</strong> {{ product.intr_rate }}%</p>
        <p><strong>최고 금리:</strong> {{ product.intr_rate2 }}%</p>
        <p><strong>가입 기간:</strong> {{ product.save_trm }}개월</p>
      </div>

      <!-- 관심상품 추가/삭제 버튼 -->
      <div class="product-actions">
        <button v-if="counterStore.isLogin && !isInUserProducts" @click="addUserProduct(product)" class="action-btn add-btn">관심상품 추가</button>
        <button v-if="counterStore.isLogin && isInUserProducts" @click="removeUserProduct(product)" class="action-btn remove-btn">관심목록에서 삭제</button>
      </div>
      
      <!-- 뒤로가기 버튼 -->
      <div class="back-button">
        <button @click="router.go(-1)">뒤로가기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { onMounted } from 'vue';
  import { useProductStore } from '@/stores/product';
  import { useCounterStore } from '@/stores/counter';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';

  const route = useRoute();
  const router = useRouter();
  const store = useProductStore();
  const counterStore = useCounterStore();
  const product = ref(null);
  
  const isInUserProducts = computed(() => {
    return store.userProducts.some(e => e === product.value?.id);
  });
  
  onMounted(() => {
    axios({
      method: 'get',
      url: `${store.API_URL}/api/v1/finlife/products/${route.params.productId}/`
    })
    .then(res => {
      product.value = res.data;
    })
    .catch(err => console.log(err));
  });

  const addUserProduct = (prdt) => {
    axios({
      method: 'put',
      url: `${store.API_URL}/accounts/add/product/${counterStore.userData.pk}/`,
      data: {
        product: prdt,
      }
    })
    .then(res => {
      console.log(res.data);
      counterStore.getUser();
    });
  };

  const removeUserProduct = (prdt) => {
    axios({
      method: 'put',
      url: `${store.API_URL}/accounts/remove/product/${counterStore.userData.pk}/`,
      data: {
        product: prdt,
      }
    })
    .then(res => {
      console.log(res.data);
      counterStore.getUser();
    });
  };
</script>

<style scoped>
.product-detail {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.product-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
}

.product-info {
  background-color: #f9f9f9;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.product-details p {
  font-size: 1.1rem;
  margin-bottom: 12px;
  line-height: 1.6;
}

.product-details strong {
  color: #333;
  font-weight: bold;
}

.divider {
  margin: 20px 0;
  border: 0;
  border-top: 2px solid #e0e0e0;
}

.product-actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.action-btn {
  padding: 12px 25px;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  width: 180px;
  font-weight: bold;
}

.add-btn {
  background-color: #9ABF80;
  color: white;
}

.add-btn:hover {
  background-color: #6c9e4e;
}

.remove-btn {
  background-color: #f44336;
  color: white;
  padding: 12px 10px;
}

.remove-btn:hover {
  background-color: #d32f2f;
}

.back-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.back-button button {
  padding: 10px 15px;
  font-size: 1.1rem;
  border-radius: 8px;
  border: none;
  background-color: #9e9e9e;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button button:hover {
  background-color: #757575;
}

@media (max-width: 600px) {
  .product-title {
    font-size: 1.8rem;
  }

  .product-info {
    padding: 15px;
  }

  .product-details p {
    font-size: 1rem;
  }

  .action-btn {
    font-size: 1rem;
    padding: 10px 20px;
  }

  .back-button button {
    padding: 8px 12px;
    font-size: 1rem;
  }
}
</style>
