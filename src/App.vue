<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">PSUbot</a>
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
        <li class="nav-item" v-if="this.$route.name != 'questions'">
          <router-link :to="{ name: 'questions' }" class="nav-link"
            ><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Назад к
            вопросам</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'createtree' }" class="nav-link"
            >Создать новое дерево</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>
export default {};
</script>
