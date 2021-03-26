<template>
  <ul class="list-group">
    <li
      class="list-group-item  d-flex align-items-center justify-content-between"
      v-for="(item,index) in todos"
      :key="'todo-' + index">
      <label class="form-check-label">{{item}}</label>
      <div class="float-right">
        <button type="button" class="btn btn-primary recover" @click="recover(index)">恢复</button>
        <button type="button" class="btn btn-secondary" @click="delDelete(index)">删除</button>
      </div>
    </li>
    <li class="list-group-item list-group-item-danger" v-if="todos.length">
      已删除事项：{{todos.length}}
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import store from '../store'

export default defineComponent({
  setup () {
    // 删除已删除项
    const delDelete = (index: number) => {
      store.commit('delDelete', index)
    }

    // 恢复已删除项到待办项
    const recover = (index: number) => {
      store.commit('recover', { index, type: 'delete' })
    }
    return reactive({
      todos: computed(() => store.state.deletes),
      delDelete,
      recover
    })
  }
})
</script>

<style scoped>
.recover {
  margin-right: 3px;
}
</style>
