<template>
  <transition name="modal">
    <modal
      v-if="isShowModal"
      :questionUser="currentQuestion"
      @close="isShowModal = false"
    >
    </modal>
  </transition>
  <div class="container listquestion">
    <div class="row">
      <div class="col-md-12 col-lg-10">
        <div class="input-group searching">
          <div class="dropdown">
            <button
              class="btn btn-dark dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Поиск
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a
                class="dropdown-item"
                href="#"
                @click="changeFilteredParametr(filtered_parametr)"
                v-for="(filtered_parametr, index) in filtered_parametrs"
                :key="index"
              >
                {{ filtered_parametr }}
              </a>
            </div>
          </div>
          <input
            type="text"
            class="form-control"
            v-model="search"
            :placeholder="current_filtered_parametr"
            @keyup.enter="filteredQuestion"
          />
          <div class="input-group-append">
            <button
              class="btn btn-dark"
              @click="filteredQuestion"
              type="button"
            >
              Найти
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-10">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col" class="d-none d-md-table-cell">Фамилия</th>
              <th scope="col" class="d-none d-md-table-cell">Username</th>
              <th scope="col">Вопрос</th>
              <th scope="col" class="d-none d-md-table-cell">Время</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(question, index) in questions" :key="index">
              <td>{{ question.user.first_name }}</td>
              <td class="d-none d-md-table-cell">
                {{ question.user.last_name }}
              </td>
              <td class="d-none d-md-table-cell">
                {{ question.user.username }}
              </td>
              <td>{{ truncate(question.text) }}</td>
              <td class="d-none d-md-table-cell">
                {{ question.question_time }}
              </td>
              <td>
                <i
                  class="fa fa-trash"
                  title="Удалить вопрос"
                  aria-hidden="true"
                  @click="deleteQuestion(question.id)"
                ></i>
              </td>
              <td>
                <i
                  class="fa fa-window-maximize"
                  title="Открыть содержание вопроса"
                  aria-hidden="true"
                  @click="showModal(question)"
                ></i>
              </td>
              <td>
                <i
                  class="fa fa-reply"
                  title="Ответить пользователю, что вопрос добавлен"
                  aria-hidden="true"
                  @click="replyToUser(question)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "../Components/Modal.vue";

export default {
  created() {
    this.getData();
  },
  components: {
    Modal,
  },
  data() {
    return {
      questions: [],
      filtered_parametrs: ["Имя и фамилия", "Username", "Текст вопроса"],
      current_filtered_parametr: "Текст вопроса",
      search: "",
      isShowModal: false,
      currentQuestion: Object,
      currentPage: 1,
      hasNextPage: true,
      methodOfFilterUsed: null,
    };
  },
  methods: {
    async getData() {
      const response = await axios.get(
        `http://192.168.0.5:8000/api/v1/userquestionsnotfound/?page=${this.currentPage}`
      );
      this.pushToQuestions(response.data.results);
      if (response.data.next == null) {
        this.hasNextPage = false;
      }
    },
    truncate(str) {
      if (str.length > 10) {
        return str.slice(0, 10) + "...";
      } else return str;
    },
    changeFilteredParametr(changedParametr) {
      this.current_filtered_parametr = changedParametr;
    },
    async filterUsername() {
      const response = await axios.get(
        `http://192.168.0.5:8000/api/v1/userquestionsnotfound/?username=${this.search}`
      );
      if (response.data.next == null) {
        this.hasNextPage = false;
      }
      this.pushToQuestions(response.data.results);
    },
    async filterFirstAndLastName() {
      let search_last_first_name = this.search;
      search_last_first_name = search_last_first_name
        .replace(/ +/g, " ")
        .trim()
        .split(" ");
      const response = await axios.get(
        `http://192.168.0.5:8000/api/v1/userquestionsnotfound/?first_name=${search_last_first_name[0]}&last_name=${search_last_first_name[1]}`
      );
      if (response.data.next == null) {
        this.hasNextPage = false;
      }
      this.pushToQuestions(response.data.results);
    },
    async filterText() {
      const response = await axios.get(
        `http://192.168.0.5:8000/api/v1/userquestionsnotfound/?text=${this.search}&page=${this.currentPage}`
      );
      if (response.data.next == null) {
        this.hasNextPage = false;
      }
      this.pushToQuestions(response.data.results);
    },
    pushToQuestions(questions) {
      for (let i = 0; i < questions.length; i++) {
        this.questions.push(questions[i]);
      }
    },
    async filteredQuestion() {
      this.hasNextPage = true;
      this.currentPage = 1;
      this.questions = [];
      switch (this.current_filtered_parametr) {
        case "Имя и фамилия":
          await this.filterFirstAndLastName();
          this.methodOfFilterUsed = "filterFirstAndLastName";
          break;
        case "Username":
          await this.filterUsername();
          this.methodOfFilterUsed = "filterUsername";
          break;
        case "Текст вопроса":
          await this.filterText();
          this.methodOfFilterUsed = "filterText";
          break;
      }
    },
    async deleteQuestion(deleteId) {
      await axios.delete(
        `http://192.168.0.5:8000/api/v1/userquestionsnotfound/${deleteId}/`
      );
      const indexDelete = this.questions.findIndex((n) => n.id === deleteId);
      if (indexDelete !== -1) {
        this.questions.splice(indexDelete, 1);
      }
    },
    replyToUser(replyQuestion) {
      console.log(replyQuestion);
      axios({
        method: "POST",
        url: "http://192.168.0.5:8000/api/v1/replyuser/",
        data: {
          first_name: replyQuestion.user.first_name,
          user_id: replyQuestion.user.user_id,
          language_code: replyQuestion.user.language_code,
          message_id: replyQuestion.message_id,
        },
      });
      this.deleteQuestion(replyQuestion.id);
    },
    showModal(showMoreQuestion) {
      this.isShowModal = true;
      this.currentQuestion = showMoreQuestion;
    },
  },
  mounted() {
    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow && this.hasNextPage) {
        this.currentPage += 1;
        switch (this.methodOfFilterUsed) {
          case "filterFirstAndLastName":
            this.filterFirstAndLastName();
            break;
          case "filterUsername":
            this.filterUsername();
            break;
          case "filterText":
            this.filterText();
            break;
          default:
            this.getData();
        }
      }
    };
  },
  watch: {
    search(value) {
      if (value === "") {
        this.hasNextPage = true;
        this.questions = [];
        this.methodOfFilterUsed = null;
        this.currentPage = 1;
        this.getData();
      }
    },
  },
};
</script>

<style>
.listquestion {
  margin-top: 10px;
}
.searching {
  margin-bottom: 10px;
}
</style>
