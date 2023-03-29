<template>
  <div class="tree">
    <ul class="tree-list">
      <node-tree :node="tree" :select-node="selectNode" />
    </ul>
  </div>
</template>

<script>
  import NodeTree from './NodeTree.vue';

  export default {
    props: {
      tree: Object
    },
    components: {
      NodeTree
    },
    methods : {
      selectNode (node, text) {
        this.$emit('select-node', {select_node: node, action:text})
      }
    }
  }
</script>

<style>
  .tree-list ul {
    margin: 6px 0;
    padding-left: 16px;
    list-style-type: none;
  }
  .tree-list li{
    list-style-type: none;
  }
</style>