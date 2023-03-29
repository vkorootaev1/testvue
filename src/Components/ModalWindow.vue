<template>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Редактирование</h5>
        <button
          @click="closeModalWindow"
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label"
              >Текст на русском:</label
            >
            <textarea
              type="text"
              class="form-control"
              v-model="edition_node.text_ru"
              id="recipient-name"
            />
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label"
              >Текст на английском:</label
            >
            <textarea
              class="form-control"
              id="message-text"
              v-model="edition_node.text_en"
            ></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          @click="closeModalWindow"
          class="btn btn-dark"
          data-dismiss="modal"
        >
          Выйти
        </button>
        <button type="button" @click="saveEditNode" class="btn btn-dark">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal-window",
  props: {
    node: Object,
  },
  data() {
    return {
      edition_node: this.node,
    };
  },
  methods: {
    closeModalWindow() {
      this.$emit("closeModalWindow");
    },
    saveEditNode() {
      this.$emit("saveEditNode", this.edition_node);
    },
  },
};
</script>
