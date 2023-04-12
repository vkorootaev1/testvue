<template>
  <div class="container listquestion">
    <div class="row" v-if="errors.error_status">
      <div class="col-md-12 col-lg-8">
        <span>{{ errors.error }}</span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-6">
        <div class="input-group searching">
          <input
            type="text"
            class="form-control"
            v-model="search"
            placeholder="Поиск вопроса"
          />
          <div class="input-group-append">
            <button class="btn btn-dark" @click="resetSearch" type="button">
              Сбросить фильтр
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-6">
        <ul class="list-group">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="question in filteredList"
            :key="question.id"
          >
            <router-link
              :to="{ name: 'showtree', params: { rootid: question.id } }"
            >
              {{ truncate(question.text_ru) }}
            </router-link>
            <span
              class="badge rounded-pill deletebutton"
              @click="deleteTree(question)"
              ><i class="fa fa-trash" aria-hidden="true"></i
            ></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.getData();
  },
  data() {
    return {
      questions: [],
      errors: {
        error: "Произошла ошибка, попробуйте снова",
        error_status: false,
      },
      search: "",
    };
  },
  methods: {
    async getData() {
      const response = await axios.get(
        "http://192.168.0.5:8000/api/v1/questionsroots/"
      );
      this.questions = response.data;
    },
    async deleteTree(delete_question) {
      const response = await axios.delete(
        `http://192.168.0.5:8000/api/v1/node/${delete_question.id}/`
      );
      if ([200, 202, 204].includes(response.status)) {
        const indexDelete = this.questions.findIndex(
          (n) => n.id === delete_question.id
        );
        if (indexDelete !== -1) {
          this.questions.splice(indexDelete, 1);
        }
        this.errors.error_status = false;
      } else {
        this.errors.error_status = true;
      }
    },
    resetSearch() {
      this.search = "";
    },
    truncate(str) {
      if (str.length > 30) {
        return str.slice(0, 30) + "...";
      } else return str;
    },
  },
  computed: {
    filteredList() {
      return this.questions.filter((question) => {
        return question.text_ru
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
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
.deletebutton {
  cursor: pointer;
}

a {
  color: #332d2d;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
</style>
