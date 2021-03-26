<template>
  <div id="addPage">
    <div class="from-group mt-2 mb-3">
      <label for="exampleInputEmail1" class="title">添加待办事项</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="inputValue"
        @keydown.enter="add(inputValue)">
      <small id="emailHelp" class="form-text text-muted">回车即可添加</small>
    </div>
    <!-- 待办事项列表 -->
    <ul class="list-group">
      <li
        class="list-group-item d-flex align-items-center justify-content-between"
        v-for="(item,index) in todos"
        :key="'todo-' + index">
        <div class="form-check">
          <input
            class="form-check-input checkbox"
            type="checkbox"
            :id="'todo-' + index"
            @click.prevent="check(index)">
          <label class="form-check-label">{{item}}</label>
        </div>
        <div class="float-right">
          <button type="button" class="btn btn-danger" @click="deleteDialog(index)">删除</button>
        </div>
      </li>
      <li class="list-group-item list-group-item-primary" v-if="todos.length">
        待办事项：{{todos.length}}
      </li>
    </ul>
    <!-- Modal弹窗 -->
    <div class="modal-dialog delete-dialog" id="delete-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-title">是否确定删除该待办事项？</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cancel">取消</button>
          <button type="button" class="btn btn-primary" @click="confirm">确定</button>
        </div>
      </div>
    </div>
    <!-- 待办事项为0显示 -->
    <div v-if="!todos.length" class="emptyList">
      快去添加待办吧！
    </div>
    <div class="doneModel mt-3 mb-3">
      <label for="exampleInputEmail1" class="title">已完成事项</label>
      <ul class="list-group">
        <li
          class="list-group-item  d-flex align-items-center justify-content-between"
          v-for="(item,index) in dones"
          :key="'done-' + index">
          <div class="form-check">
            <input
              class="form-check-input checkbox"
              type="checkbox"
              checked
              :id="'done-' + index"
              @click.prevent="recover(index)">
            <label class="form-check-label">{{item}}</label>
          </div>
          <div class="float-right">
            <button type="button" class="btn btn-secondary" @click="delDone(index)">删除</button>
          </div>
        </li>
        <li class="list-group-item list-group-item-success" v-if="dones.length">
          已完成事项：{{dones.length}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import store from '../store/index'

export default defineComponent({
  setup () {
    // input输入框内容
    const inputValue = ref('')
    // 删除项的index索引
    const delIndex = ref(-1)

    // 添加待办事件
    const add = (value: string) => {
      if (value.trim() === '') return
      store.commit('add', value)
      inputValue.value = ''
    }

    // 将事件置为已完成
    const check = (index: number) => {
      store.commit('check', index)
    }

    // 确认删除
    const confirm = () => {
      const addPage = document.getElementById('addPage')
      const mask = document.getElementById('mask')
      const delDialog = document.getElementById('delete-dialog')
      if (addPage && mask) {
        addPage.removeChild(mask)
      }
      if (delDialog) {
        delDialog.style.display = 'none'
      }
      store.commit('delete', delIndex.value)
      delIndex.value = -1
    }

    // 取消对待办事项的删除
    const cancel = () => {
      const addPage = document.getElementById('addPage')
      const mask = document.getElementById('mask')
      const delDialog = document.getElementById('delete-dialog')
      if (addPage && mask) {
        addPage.removeChild(mask)
      }
      if (delDialog) {
        delDialog.style.display = 'none'
      }
      delIndex.value = -1
    }

    // 是否删除待办事项的弹窗
    const deleteDialog = (index: number) => {
      delIndex.value = index
      const delDialog = document.getElementById('delete-dialog')
      const mask = document.createElement('div')
      const addPage = document.getElementById('addPage')
      mask.id = 'mask'
      mask.className = 'masker'
      if (addPage) {
        addPage.appendChild(mask)
      }
      if (delDialog) {
        delDialog.style.display = 'block'
      }
    }

    // 删除已完成事项
    const delDone = (index: number) => {
      store.commit('delDone', index)
    }

    // 将已完成事项重置回待办
    const recover = (index: number) => {
      store.commit('recover', { index, type: 'done' })
    }

    return reactive({
      inputValue,
      todos: computed(() => store.state.todos),
      dones: computed(() => store.state.dones),
      add,
      check,
      deleteDialog,
      confirm,
      cancel,
      recover,
      delDone
    })
  }
})
</script>

<style lang='scss' scoped>
.title {
  font-size: 20px;
}

.checkbox {
  margin-top: 6.5px;
  align-items: center;
}

.delete-dialog {
  display: none;
  position: fixed;
  z-index: 99;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -80%);
  text-align: center;
}

.modal-title {
  font-size: 22px;
  color: #6d6d6d;
  text-align: center;
  padding: 30px 30px;
}

.emptyList {
  background-color: #9c9a9a;
  background-image: radial-gradient(circle, #9c9a9a, #fff);
  padding: 30px;
  font-size: 30px;
  color: #fff;
  text-shadow:
      0 0 10px #b8b5ff,
      0 0 20px #b8b5ff,
      0 0 50px #b8b5ff,
      0 0 100px #b8b5ff,
      0 0 200px #b8b5ff;
  text-align: center;
}

</style>
