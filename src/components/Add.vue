<template>
  <div>
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
          <button type="button" class="btn btn-danger" @click="delItem(index)">删除</button>
        </div>
      </li>
      <li class="list-group-item list-group-item-primary" v-if="todos.length">
        待办事项：{{todos.length}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import store from '../store/index'

export default defineComponent({
  setup () {
    // input输入框内容
    const inputValue = ref('')

    // 添加待办事件
    const add = (value: string) => {
      if (value.trim() === '') return
      store.commit('add', value)
      inputValue.value = ''
    }

    // 删除事件
    const delItem = (index: number) => {
      store.commit('delete', index)
    }

    // 将事件置为已完成
    const check = (index: number) => {
      store.commit('check', index)
    }

    return reactive({
      inputValue,
      todos: computed(() => store.state.todos),
      add,
      delItem,
      check
    })
  }
})
</script>

<style scoped>
.checkbox {
  margin-top: 6.5px;
  align-items: center;
}
</style>
