
const state = {
  is_admin: true,
  login_user: null,
  all_users: []
}

const getters = {
}

// データを操作する関数を管理(同期のみ)
const mutations = {

  setAllUsers(state, users) {
    state.all_users = users
  },

  setLoginUser(state, user) {
    state.login_user = user
  },

  unsetLoginUsr(state) {
    state.login_user = null
  },

  switch_admin(state) {
    state.is_admin = !state.is_admin
  }
}

// データを操作する関数を管理(同期/非同期)
const actions = {

  async getAllUsers({commit}) {

    await axios.get("/api/users/all")
      .then((response) => {
        // 出勤状態を記号に変換
        var users = response.data

        users.forEach((user) => {

          if (user.state == 0) {
            user.state = "×"
          } else {
            user.state = "◯"
          }
        })
        commit("setAllUsers", users)
      })
  },

  async getLoginUser({commit}) {

    await axios.get("/api/users/logined")
      .then((response) => {

        const get_user = response.data

        if (get_user) {
          commit("setLoginUser", get_user)
        }
      })
  },

  async register(context, { name, email, password, password_confirmation }) {

    var params = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }

    await axios.post("/api/auth/register", params)
      .then((response) => {
        console.log(response.data)
        location.href = "/"
      })
  },

  async login({commit}, { email, password }) {

    var params = {
      email: email,
      password: password
    }

    await axios.post("/api/login", params)
      .then((response) => {
        commit("setLoginUser", response.data)
        location.href = "/"
      })
  },

  async logout({commit}) {
    await axios.post("/api/logout")
      .then(() => {
        commit("unsetLoginUser")
        location.href = "/"
      })
  }
}

export default {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
}
