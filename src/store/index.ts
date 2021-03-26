import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: [] as string[],
    dones: [] as string[],
    deletes: [] as string[]
  },
  mutations: {
    // 添加待办
    add (state, value) {
      state.todos.push(value)
    },
    // 删除待办
    delete (state, index) {
      const item = state.todos[index]
      state.todos.splice(index, 1)
      state.deletes.push(item)
    },
    // 将待办置为完成
    check (state, index) {
      const item = state.todos[index]
      state.todos.splice(index, 1)
      state.dones.push(item)
    },
    // 删除已完成
    delDone (state, index) {
      const item = state.dones[index]
      state.dones.splice(index, 1)
      state.deletes.push(item)
    },
    // 删除已删除事项
    delDelete (state, index) {
      state.deletes.splice(index, 1)
    },
    // 恢复已删除事项
    recover (state, info) {
      if (info.type === 'done') {
        const item = state.dones[info.index]
        state.dones.splice(info.index, 1)
        state.todos.push(item)
      } else if (info.type === 'delete') {
        const item = state.deletes[info.index]
        state.deletes.splice(info.index, 1)
        state.todos.push(item)
      }

    }
  },
  actions: {
  },
  modules: {
  }
})
