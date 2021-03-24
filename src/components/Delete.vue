<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="(item,index) in todos" :key="'todo-' + index">
      {{ item }}
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
    return reactive({
      todos: computed(() => store.state.deletes)
    })
  }
})
</script>

<style scoped>

</style>
