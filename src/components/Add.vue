<template>
  <div id="addPage">
    <div class="from-group mt-2 mb-3">
      <label for="exampleInputEmail1">添加待办事项</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="inputValue"
        @keydown.enter="add(inputValue)">
      <small id="emailHelp" class="form-text text-muted">回车即可加入</small>
    </div>
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
    <!-- Modal -->
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

    return reactive({
      inputValue,
      todos: computed(() => store.state.todos),
      add,
      check,
      deleteDialog,
      confirm,
      cancel
    })
  }
})
</script>

<style lang='scss' scoped>
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
  text-align: center;
  padding: 30px 30px;
}

</style>
