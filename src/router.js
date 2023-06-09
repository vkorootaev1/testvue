import { createRouter, createWebHistory } from "vue-router";
import TreeShowPage from "./Pages/TreeShowPage.vue";
import ListQuestionPage from "./Pages/ListQuestionPage.vue";
import TreeCreatePage from "./Pages/TreeCreatePage";
import ListUserQuestionNotResolvedPage from "./Pages/ListUserQuestionNotResolvedPage";

export default createRouter({
  history: createWebHistory(),
  mode: "history",
  routes: [
    {
      path: "/",
      name: "questions",
      component: ListQuestionPage,
    },
    {
      path: "/tree/:rootid",
      name: "showtree",
      component: TreeShowPage,
    },
    {
      path: "/tree/create",
      name: "createtree",
      component: TreeCreatePage,
    },
    {
      path: "/user/questions/notresolved",
      name: "userquestionsnotresolved",
      component: ListUserQuestionNotResolvedPage,
    },
  ],
});
