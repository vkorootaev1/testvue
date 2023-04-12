<template>
  <transition name="modal">
    <modal-window
      :node="node"
      v-if="isModalWindowVisible"
      @closeModalWindow="editNodeClose"
      @saveEditNode="saveEditNode"
    />
  </transition>
  <li>
    <i
      v-if="!isShowChildren && node.children.length"
      class="fa fa-chevron-circle-right"
      aria-hidden="true"
      @click="showChildren"
    ></i>
    <i
      v-else-if="isShowChildren && node.children.length"
      class="fa fa-chevron-circle-down"
      aria-hidden="true"
      @click="showChildren"
    ></i>
    <i v-else class="fa fa-circle-o" aria-hidden="true"> </i>
    <span class="label"> {{ truncate(node.text_ru) }}</span>
    <i
      class="fa fa-plus-square"
      @click="selectNode(node, 'add'), (isShowChildren = true)"
      aria-hidden="true"
    >
    </i>
    <i
      class="fa fa-minus-square"
      @click="selectNode(node, 'delete')"
      aria-hidden="true"
    >
    </i>
    <i
      class="fa fa-pencil-square-o"
      @click="editNodeOpen"
      aria-hidden="true"
    ></i>
    <ul v-if="node.children && node.children.length && isShowChildren">
      <node
        v-for="(child, index) in node.children"
        :node="child"
        :key="index"
        :select-node="selectNode"
      ></node>
    </ul>
  </li>
</template>

<script>
import ModalWindow from "./ModalWindow.vue";

export default {
  name: "node",
  props: {
    node: Object,
    selectNode: Function,
  },
  data() {
    return {
      isModalWindowVisible: false,
      isShowChildren: false,
    };
  },
  components: {
    ModalWindow,
  },
  methods: {
    editNodeOpen() {
      this.isModalWindowVisible = true;
    },
    editNodeClose() {
      this.isModalWindowVisible = false;
    },
    saveEditNode(editnode) {
      this.selectNode(editnode, "update");
      this.isModalWindowVisible = false;
    },
    showChildren() {
      this.isShowChildren = !this.isShowChildren;
    },
    truncate(str) {
      if (str.length > 30) {
        return str.slice(0, 30) + "...";
      } else return str;
    },
  },
};
</script>

<style>
i {
  cursor: pointer;
  padding-left: 5px;
  padding-right: 5px;
}
.list-group-item {
  border: 1px solid black;
}
</style>
