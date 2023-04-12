<template>
  <transition name="modal">
    <modal-mass-mailing
      v-if="isShowModal"
      :questionUser="currentQuestion"
      @close="isShowModal = false"
      @send="sendMassMessage"
    >
    </modal-mass-mailing>
  </transition>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">&nbsp;&nbsp;PSUbot</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link
            :to="{ name: 'questions' }"
            class="nav-link"
            :class="{ active: this.$route.name == 'questions' }"
            >Вопросы бота</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'createtree' }"
            class="nav-link"
            :class="{ active: this.$route.name == 'createtree' }"
            >Создать новое дерево</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'userquestionsnotresolved' }"
            class="nav-link"
            :class="{ active: this.$route.name == 'userquestionsnotresolved' }"
            >Вопросы пользователей</router-link
          >
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="showModal">Массовая рассылка</a>
        </li>
      </ul>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>
import ModalMassMailing from "./Components/ModalMassMailing.vue";
import axios from "axios";
export default {
  data() {
    return {
      isShowModal: false,
    };
  },
  components: {
    ModalMassMailing,
  },
  methods: {
    showModal() {
      this.isShowModal = true;
    },
    sendMassMessage(textMessageRu, textMessageEn) {
      axios({
        method: "POST",
        url: "http://192.168.0.5:8000/api/v1/massmailing/",
        data: {
          text_message_ru: textMessageRu,
          text_message_en: textMessageEn,
        },
      });
      this.isShowModal = false;
    },
  },
};
</script>
