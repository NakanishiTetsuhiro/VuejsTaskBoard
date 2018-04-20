var filters = {
    open: function (tasks) {
        return tasks.filter(function (task) {
            return task.status === 1
        })
    },
    doing: function (tasks) {
        return tasks.filter(function (task) {
            return task.status === 2
        })
    },
    closed: function (tasks) {
        return tasks.filter(function (task) {
            return task.status === 3
        })
    }
}

// Componentの作成
Vue.component('task-card', {
    // props プロパティは task-card コンポーネントへデータを受け渡すのに使います。
    props: ['task'],
    template: `<div class="card">
                  <div class="card-content">
                    {{ task.name }}
                  </div>
                  <footer class="card-footer">
                    <div class="card-footer-item">
                      {{ task.assignee }}
                    </div>
                    <div class="card-footer-item">
                      {{ task.mandays }} 人日
                    </div>
                  </footer>
                  <footer class="card-footer">
                    <a class="card-footer-item" v-on:click="decrementStatus(task)">◀︎</a>
                    <a class="card-footer-item" v-on:click="incrementStatus(task)">▶︎</a>
                  </footer>
                </div>`,
    methods: {
        incrementStatus: function (task) {
            if (1 <= task.status && task.status <= 2) {
                task.status++
            }
        },
        decrementStatus: function (task) {
            if (2 <= task.status && task.status <= 3) {
                task.status--
            }
        }
    }
})

var vm = new Vue({

    el: '#board',
    data: {
        // status の数値と状態の対応は、1: 未対応 2: 処理中 3: 完了
        tasks: [
            {name: 'task 1', status: 1, assignee: '🐱', mandays: 3 },
            {name: 'task 2', status: 1, assignee: '🐶', mandays: 2 },
            {name: 'task 3', status: 2, assignee: '🐱', mandays: 1 },
            {name: 'task 4', status: 3, assignee: '🐹', mandays: 1 },
        ],
        newTaskName: '',
        newTaskAssignee: '',
        newTaskMandays: ''
    },
    computed: {
        tasksOpen: function () {
            return filters.open(this.tasks)
        },
        tasksDoing: function () {
            return filters.doing(this.tasks)
        },
        tasksClosed: function () {
            return filters.closed(this.tasks)
        }
    },
    methods: {
        addTask () {
            this.tasks.push({
                name: this.newTaskName,
                status: 1,
                assignee: this.newTaskAssignee,
                mandays: this.newTaskMandays
            })
        }
    }
})
