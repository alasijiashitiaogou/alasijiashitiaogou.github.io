<template>
  <div class="poker-game">
    <!-- 登录界面 -->
    <div v-if="!isLoggedIn" class="login-overlay">
      <div class="login-container">
        <div class="login-box">
          <h2>百家乐计算器</h2>
          <div class="login-form">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              prefix-icon="User"
              size="large"
              class="login-input"
            />
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              size="large"
              class="login-input"
              @keyup.enter="handleLogin"
            />
            <el-button
              type="primary"
              size="large"
              class="login-button"
              @click="handleLogin"
              :loading="loginLoading"
            >
              登录
            </el-button>
            <div v-if="loginError" class="login-error">
              {{ loginError }}
            </div>
            <div class="login-tips">
              <p>测试账号：admin</p>
              <p>测试密码：kun@123</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主界面 -->
    <div v-else>
      <!-- 顶部导航栏 -->
      <div class="top-nav">
        <div class="nav-title">百家乐计算器</div>
        <div class="nav-user">
          <span class="username">欢迎，{{ currentUser }}</span>
          <el-button type="danger" size="small" @click="handleLogout">
            退出登录
          </el-button>
        </div>
      </div>

      <div
        class="card-display-area"
        :style="{ height: `calc(100vh - ${cardHeight}px - 60px)` }"
      >
        <div class="card-container">
          <div
            v-for="(card, idx) in displayedCards"
            :key="card.id"
            @click="clickHandler(card)"
            class="playing-card"
            :class="[
              { active: editCard === card.id },
              isResult && isCardInActiveResult(idx) ? 'result-active-card' : ''
            ]"
          >
            <div class="card-value">{{ card.display }}</div>
          </div>

          <!-- 空状态提示 -->
          <div v-if="displayedCards.length === 0" class="empty-state">
            请选择扑克牌
          </div>
        </div>
        <div class="h-46px w-100%"></div>
      </div>
      <div
        v-if="displayedCards.length > 0"
        class="shuffle-button"
        :style="{ bottom: `${cardHeight + 8}px` }"
      >
        <el-button
          type="primary"
          v-if="!isResult"
          round
          class="w-100px"
          @click="shuffleCards"
          >计算</el-button
        >
        <el-button
          v-if="isResult"
          round
          class="w-100px"
          @click="editCardHandler"
          >修改</el-button
        >
        <el-button
          v-if="isResult && cardHeight < 500"
          type="warning"
          round
          class="w-100px ml-10px"
          @click="cardHeight = 500"
          >更高展示</el-button
        >
        <el-button
          v-if="isResult && cardHeight > 400"
          type="warning"
          round
          class="w-100px ml-10px"
          @click="cardHeight = 400"
          >恢复高度</el-button
        >
        <el-button
          v-if="!isResult"
          type="danger"
          round
          class="w-100px"
          @click="deleteCard"
          >删除选中</el-button
        >
        <el-button
          v-if="!isResult"
          type="info"
          round
          class="w-100px"
          @click="deleteBeforeCard"
          >删除此前</el-button
        >
        <el-button
          v-if="!isResult"
          type="warning"
          round
          class="w-100px ml-10px"
          @click="deleteAfterCard"
          >删除此后</el-button
        >
      </div>
      <!-- 输入选项区域 -->
      <div
        class="input-options"
        v-if="!isResult"
        :style="{ height: `${cardHeight}px` }"
      >
        <div class="options-grid">
          <div
            v-for="option in cardOptions"
            :key="option.value"
            class="option-button"
            :class="{ selected: selectedCard === option.value }"
            @click="selectCard(option)"
          >
            <div v-if="option.display === '清空' || option.display === '删除'">
              {{ option.display }}
            </div>
            <div v-else class="card-option">
              <span :class="classStyle(option.display)"></span>
              <span
                class="ml-20px"
                v-if="['J', 'Q', 'K'].includes(option.display)"
                :class="classStyle(option.display)"
              ></span>
            </div>
            <label
              class="option-label"
              v-if="!['清空', '删除'].includes(option.display)"
              >{{ option.display }}</label
            >
          </div>
        </div>
      </div>
      <div class="input-result" v-else :style="{ height: `${cardHeight}px` }">
        <div class="result-title mb-10px">计算结果</div>
        <div class="result-content">
          <el-table
            class="text-12px w-100%"
            :data="tableData"
            style="width: 100%"
            :height="cardHeight - 50"
            :row-class-name="tableRowClassName"
            @row-click="handleRowClick"
          >
            <el-table-column property="zhuang" align="center" label="庄" />
            <el-table-column property="xian" align="center" label="闲" />
            <el-table-column property="result" align="center" label="结果">
              <template #default="scope">
                <el-tag
                  :type="
                    scope.row.result === '和局'
                      ? 'success'
                      : scope.row.result === '庄家'
                      ? 'danger'
                      : 'primary'
                  "
                  effect="dark"
                  >{{ scope.row.result }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column property="jushu" align="center" label="局数">
              <template #default="scope"> 第{{ scope.row.jushu }}局 </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button
                  type="danger"
                  size="small"
                  @click.stop="deleteResult(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted, computed } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { v4 as uuidv4 } from 'uuid';
import { calculateHandValue, simulateBaccarat } from './baccarat.ts';

// 响应式数据
const isResult = ref(false);
const editCard = ref(null);
const selectedCard = ref(null);
const displayedCards = ref([]);
const tableData = ref([]);
const cardHeight = ref(300);
const resultActiveIndex = ref(null); // 当前高亮的结果行索引

// 登录相关数据
const isLoggedIn = ref(false);
const loginForm = ref({
  username: '',
  password: ''
});
const loginLoading = ref(false);
const loginError = ref('');

// 计算当前用户名
const currentUser = computed(() => {
  return localStorage.getItem('bjlc_username') || 'admin';
});

// 扑克牌选项配置（从下至上，从左到右排列）
const cardOptions = reactive([
  { value: 'empty', display: '清空' },
  { value: 'K', display: 'K' },
  { value: 'back', display: '删除' },
  { value: '1', display: '1' },
  { value: '2', display: '2' },
  { value: '3', display: '3' },
  { value: '4', display: '4' },
  { value: '5', display: '5' },
  { value: '6', display: '6' },
  { value: '7', display: '7' },
  { value: '8', display: '8' },
  { value: '9', display: '9' },
  { value: '10', display: '10' },
  { value: 'J', display: 'J' },
  { value: 'Q', display: 'Q' }
]);

// 方法
const selectCard = option => {
  selectedCard.value = option.value;
  switch (option.value) {
    case 'empty':
      clearAll();
      break;
    case 'back':
      goBack();
      break;
    default:
      confirmSelection();
  }
};

const confirmSelection = () => {
  // 如果有选中的卡片，则在选中卡片后面插入
  if (editCard.value && selectedCard.value) {
    const newCard = {
      id: uuidv4(),
      value: selectedCard.value,
      display: selectedCard.value
    };
    const index = displayedCards.value.findIndex(
      card => card.id === editCard.value
    );
    // console.log(index);
    displayedCards.value.splice(index + 1, 0, newCard);
    selectedCard.value = null;
    editCard.value = null;
    nextTick(() => {
      const cardContainer = document.querySelector('.card-container');
      cardContainer.scrollTop = cardContainer.scrollHeight;
    });
  }
  if (selectedCard.value) {
    const newCard = {
      id: uuidv4(),
      value: selectedCard.value,
      display: selectedCard.value
    };
    displayedCards.value.push(newCard);
    selectedCard.value = null;
    nextTick(() => {
      const cardContainer = document.querySelector('.card-container');
      cardContainer.scrollTop = cardContainer.scrollHeight;
    });
  }
};

const clearAll = () => {
  if (displayedCards.value.length === 0) return;
  ElMessageBox.confirm('确定要清空所有卡片吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      displayedCards.value = [];
      selectedCard.value = null;
    })
    .catch(() => {});
};

const goBack = () => {
  console.log('回退功能触发');
  if (displayedCards.value.length > 0) {
    displayedCards.value.pop();
  }
};

// const isRedCard = value => {
//   // 红桃和方块为红色（这里简单处理，可根据需求调整）
//   return ['1', '3', '5', '7', '9', 'J', 'K'].includes(value);
// };

// const getCardSuit = value => {
//   // 简单的花色分配逻辑，可根据需求调整
//   const suits = ['♠', '♥', '♣', '♦'];
//   const index = parseInt(value) || ['J', 'Q', 'K'].indexOf(value) + 11;
//   return suits[index % 4];
// };

const classStyle = value => {
  if (['1', '2', '3'].includes(value)) {
    return 'w-20%!';
  } else if (['4', '5', '6'].includes(value)) {
    return 'w-40%!';
  } else if (['7', '8', '9'].includes(value)) {
    return 'w-60%!';
  } else if (['J', 'Q', 'K'].includes(value)) {
    return 'w-20%!';
  }
};

const clickHandler = card => {
  // 如果当前点击的卡片是正在编辑的卡片，取消编辑
  if (editCard.value === card.id) {
    editCard.value = null;
    resultActiveIndex.value = null;
    return;
  }
  editCard.value = card.id;

  // 计算结果时，找到该牌属于哪一局
  if (isResult.value) {
    let cardIdx = displayedCards.value.findIndex(c => c.id === card.id);
    let used = 0;
    for (let i = 0; i < tableData.value.length; i++) {
      used += tableData.value[i].cardsUsed || 0;
      if (cardIdx < used) {
        resultActiveIndex.value = i;
        break;
      }
    }
  }
};

// 结果行点击高亮对应牌
const handleRowClick = (row, column, event) => {
  if (!isResult.value) return;
  // 计算该局的起始和结束牌索引
  let idx = tableData.value.findIndex(r => r === row);
  resultActiveIndex.value = idx;
  // 高亮该局所有牌
  let start = 0;
  for (let i = 0; i < idx; i++) {
    start += tableData.value[i].cardsUsed || 0;
  }
  let end = start + (row.cardsUsed || 0);
  // 只高亮第一个
  if (displayedCards.value[start]) {
    editCard.value = displayedCards.value[start].id;
  }
};

const deleteCard = () => {
  // 如果当前有正在编辑的卡片，删除
  if (displayedCards.value.length === 0) return;
  if (editCard.value) {
    displayedCards.value = displayedCards.value.filter(
      card => card.id !== editCard.value
    );
    editCard.value = null;
  }
};

// 删除选中牌之后的所有牌（不包括选中这张）
const deleteAfterCard = () => {
  if (displayedCards.value.length === 0) return;
  if (editCard.value) {
    const index = displayedCards.value.findIndex(
      card => card.id === editCard.value
    );
    if (index !== -1 && index < displayedCards.value.length - 1) {
      ElMessageBox.confirm('确定要删除选中牌之后的所有牌吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除选中牌之后的所有牌（不包括选中这张）
          displayedCards.value = displayedCards.value.slice(0, index + 1);
          editCard.value = null;
        })
        .catch(() => {});
    }
  }
};

const shuffleCards = () => {
  tableData.value = [];
  const allDealtCards = displayedCards.value.map(card => card.value);
  let currentCardIndex = 0;
  let roundIndex = 0;
  while (currentCardIndex < allDealtCards.length) {
    roundIndex++;
    let obj = {};
    obj.jushu = roundIndex;
    try {
      const dealtCardsForRound = allDealtCards.slice(currentCardIndex);
      const result = simulateBaccarat(dealtCardsForRound);
      currentCardIndex += result.cardsUsed;
      obj.zhuang = calculateHandValue(result.bankerHand);
      obj.xian = calculateHandValue(result.playerHand);
      obj.result = result.winner;
      obj.cardsUsed = result.cardsUsed; // 记录本局用牌数
      tableData.value.push(obj);
    } catch (error) {
      ElMessage.error(`错误: 从第 ${currentCardIndex + 1} 张牌开始`);
      // 自动选中出错的那张牌
      if (displayedCards.value[currentCardIndex]) {
        editCard.value = displayedCards.value[currentCardIndex].id;
      }
      currentCardIndex = allDealtCards.length; // Stop processing further rounds if an error occurs
      break;
    }
  }
  if (roundIndex === 0) {
    ElMessage.error('无法识别任何有效的百家乐局。请检查输入格式。');
    return;
  }
  cardHeight.value = 400;
  isResult.value = true;
  resultActiveIndex.value = null;
};

const editCardHandler = () => {
  isResult.value = false;
  cardHeight.value = 300;
  resultActiveIndex.value = null;
};

// 判断某张牌是否属于当前高亮的结果行
function isCardInActiveResult(idx) {
  if (resultActiveIndex.value == null || !isResult.value) return false;
  let start = 0;
  for (let i = 0; i < resultActiveIndex.value; i++) {
    start += tableData.value[i].cardsUsed || 0;
  }
  let end = start + (tableData.value[resultActiveIndex.value].cardsUsed || 0);
  return idx >= start && idx < end;
}

// el-table 行高亮
function tableRowClassName({ row, rowIndex }) {
  let classes = [];
  if (rowIndex === resultActiveIndex.value) classes.push('result-active-row');
  return classes.join(' ');
}

// 删除此前按钮逻辑
const deleteBeforeCard = () => {
  if (displayedCards.value.length === 0) return;
  if (editCard.value) {
    const index = displayedCards.value.findIndex(
      card => card.id === editCard.value
    );
    if (index > 0) {
      ElMessageBox.confirm('确定要删除选中牌之前的所有牌吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除选中牌之前的所有牌（不包括选中这张）
          displayedCards.value = displayedCards.value.slice(index);
          editCard.value = null;
        })
        .catch(() => {});
    } else if (index === 0) {
      ElMessage.info('已经是第一张牌，无法删除此前的牌');
    }
  }
};

// 删除某一条结果和对应的牌
const deleteResult = idx => {
  // 计算要删除的牌的范围
  let start = 0;
  for (let i = 0; i < idx; i++) {
    start += tableData.value[i].cardsUsed || 0;
  }
  const count = tableData.value[idx].cardsUsed || 0;
  // 删除对应的牌
  displayedCards.value.splice(start, count);
  // 删除该条结果
  tableData.value.splice(idx, 1);
  // 处理高亮和编辑状态
  if (resultActiveIndex.value === idx) {
    resultActiveIndex.value = null;
    editCard.value = null;
  } else if (resultActiveIndex.value > idx) {
    resultActiveIndex.value--;
  }
};

// 检查登录状态
const checkLoginStatus = () => {
  const loginStatus = localStorage.getItem('bjlc_login_status');
  if (loginStatus === 'true') {
    isLoggedIn.value = true;
  }
};

// 登录处理
const handleLogin = () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    loginError.value = '请输入用户名和密码';
    return;
  }

  loginLoading.value = true;
  loginError.value = '';

  // 模拟异步登录
  setTimeout(() => {
    if (
      loginForm.value.username === 'admin' &&
      loginForm.value.password === 'kun@123'
    ) {
      isLoggedIn.value = true;
      localStorage.setItem('bjlc_login_status', 'true');
      localStorage.setItem('bjlc_username', loginForm.value.username);
      loginError.value = '';
      ElMessage.success('登录成功！');
    } else {
      loginError.value = '用户名或密码错误';
      ElMessage.error('登录失败，请检查用户名和密码');
    }
    loginLoading.value = false;
  }, 500);
};

// 退出登录
const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      isLoggedIn.value = false;
      localStorage.removeItem('bjlc_login_status');
      localStorage.removeItem('bjlc_username');
      loginForm.value = {
        username: '',
        password: ''
      };
      loginError.value = '';
      ElMessage.success('已退出登录');
    })
    .catch(() => {
      // 用户取消退出
    });
};

// 组件挂载时检查登录状态
onMounted(() => {
  checkLoginStatus();
});
</script>

<style scoped lang="scss">
.poker-game {
  user-select: none;
  touch-action: none;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* 扑克牌展示区域 */
.card-display-area {
  flex: 1;
  min-width: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* height: calc(100vh - 300px); */
}

.card-container {
  overflow: auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  /* height: calc(100vh - 370px); */
  /* height: 100%; */
  /* padding: 10px; */
}

.shuffle-button {
  position: fixed;
  left: 0;
  bottom: 314px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.playing-card {
  /* width: 40px; */
  /* height: 60px; */
  background: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
}

.playing-card.active {
  border: 2px solid #e53e3e;
  transform: translateY(-5px);
  color: #e53e3e;
}

.card-value {
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
}

.card-suit {
  font-size: 20px;
  line-height: 1;
}

.empty-state {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  text-align: center;
  padding: 40px;
}

/* 输入选项区域 */
.input-options {
  height: 300px;
  background: rgba(255, 255, 255, 0.95);
}

.options-grid {
  display: flex;
  flex-wrap: wrap;
}

.option-button {
  position: relative;
  flex: 1 0 33.33%;
  cursor: pointer;
  height: 60px;
  border: 1px solid #e0e0e0;
  border-bottom: none;
  border-left: none;
  background: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.option-label {
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 11px;
  line-height: 10px;
}
.card-option {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.option-button span {
  width: 100%;
  display: inline-block;
  background-color: #000;
  height: 10px;
}
.input-result {
  height: 300px;
  background: rgba(255, 255, 255, 0.95);
  padding: 10px;
}
.result-title {
  font-size: 14px;
}

/* 结果高亮样式 */
.el-table {
  :deep(.result-active-row) {
    td {
      background: #ffd666 !important;
      color: #333;
    }
  }
}
.result-active-card {
  box-shadow: 0 0 0 3px #ffe58f;
  border-color: #faad14;
}

/* 登录界面样式 */
.login-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.login-container {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  min-width: 320px;
}

.login-box {
  text-align: center;
}

.login-box h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
}

.login-form {
  margin-top: 20px;
}

.login-input {
  margin-bottom: 16px;
  width: 100%;
}

.login-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 8px;
}

.login-error {
  color: #f56c6c;
  margin-top: 12px;
  font-size: 14px;
  text-align: center;
}

.login-tips {
  margin-top: 20px;
  font-size: 12px;
  color: #999;
  text-align: center;
  line-height: 1.6;
}

.login-tips p {
  margin: 4px 0;
}

/* 顶部导航栏样式 */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.username {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}
</style>
