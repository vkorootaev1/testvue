<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('closeModalWindow')">
        <div class="modal-container col-10 col-lg-10" @click.stop="">
          <div class="modal-header">
            <h4>Изменить вопрос</h4>
          </div>

          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label"
                  ><h5>Текст на русском:</h5>
                  </label
                >
                <textarea
                  style="resize: none"
                  type="text"
                  class="form-control"
                  rows="6"
                  v-model="edition_node.text_ru"
                  id="recipient-name"
                />
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label"
                  ><h5>Текст на английском:</h5></label
                >
                <textarea
                  style="resize: none"
                  class="form-control"
                  rows="6"
                  id="message-text"
                  v-model="edition_node.text_en"
                ></textarea>
              </div>
            </form>
          </div>

          <div class="modal-footer">
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
      </div>
    </div>
  </transition>
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

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 10px 0;
}

.modal-default-button {
  display: block;
  margin-top: 10px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-footer{
  padding: 0px;
}
</style>
