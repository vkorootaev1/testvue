<template>
  <div class="container treecreatepage">
    <div class="row" v-if="errors.error_status">
      <div class="col-md-12 col-lg-6">
        <span>{{ errors.error }}</span>
      </div>
    </div>
    <div class="row" v-if="haveRoot">
      <div class="col-md-12 col-lg-6">
        <tree :tree="tree" @select-node="selectNodeAction" />
      </div>
    </div>
    <div class="row createroot" v-else>
      <button class="btn btn-dark" @click="addRoot" type="button">Создать корень</button>
    </div>
  </div>
</template>

<script>
import Tree from "../Components/Tree.vue";
import axios from "axios";

export default {
  data() {
    return {
      tree: null,
      errors: {
        error: "Произошла ошибка, попробуйте снова",
        error_status: false,
      },
      haveRoot: false,
    };
  },
  components: {
    Tree,
  },
  methods: {
    async addRoot() {
      const response = await axios({
        method: "POST",
        url: "http://192.168.0.5:8000/api/v1/node/",
        data: {
          parent_id: null,
          text_ru: "root_text_ru",
          text_en: "root_text_en",
        },
      });
      if ([200, 201].includes(response.status)) {
        this.tree = {
          id: response.data.id,
          parent_id: response.data.parent_id,
          text_ru: response.data.text_ru,
          text_en: response.data.text_en,
          children: [],
        };
        this.haveRoot = true;
      } else {
        this.errors.error_status = true;
      }
    },
    selectNodeAction(node) {
      if (node.action === "update") {
        this.updateNode(node.select_node);
      } else if (node.action === "add") {
        this.addNode(node.select_node);
      } else {
        this.deleteNode(node.select_node);
      }
    },
    async updateNode(update_node) {
      const response = await axios({
        method: "PUT",
        url: `http://192.168.0.5:8000/api/v1/node/${update_node.id}/`,
        data: {
          parent_id: update_node.parent_id,
          text_ru: update_node.text_ru,
          text_en: update_node.text_en,
        },
      });
      if (![200, 201, 204].includes(response.status)) {
        this.errors.error_status = true;
      }
    },
    async addNode(add_node) {
      const response = await axios({
        method: "POST",
        url: "http://192.168.0.5:8000/api/v1/node/",
        data: {
          parent_id: add_node.id,
          text_ru: "default_ru",
          text_en: "default_en",
        },
      });
      if ([200, 201].includes(response.status)) {
        add_node.children.push({
          id: response.data.id,
          parent_id: response.data.parent_id,
          text_ru: response.data.text_ru,
          text_en: response.data.text_en,
          children: [],
        });
      } else {
        this.errors.error_status = true;
      }
    },
    async deleteNode(delete_node) {
      const response = await axios.delete(
        `http://192.168.0.5:8000/api/v1/node/${delete_node.id}/`
      );
      if ([200, 202, 204].includes(response.status)) {
        const remove = (tree, id) => {
          let index;
          tree.children.some((o, i) => {
            if (o.id === id) {
              index = i;
              return true;
            }
            return remove(o, id);
          });
          if (index !== undefined) {
            tree.children.splice(index, 1);
            return true;
          }
        };
        remove(this.tree, delete_node.id);
        this.errors.error_status = false;
      } else {
        this.errors.error_status = true;
      }
    },
  },
};
</script>

<style>
  .createroot{
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 6em
  }
  .treecreatepage{
    margin-top: 10px;
  }
</style>