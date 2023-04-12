<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container col-12 col-lg-10" @click.stop="">
          <div class="modal-header">
            <h2>Массовая рассылка</h2>
          </div>

          <div class="modal-body">
            <h4>Введите текст рассылки на русском языке</h4>
            <textarea
              class="form-control"
              rows="6"
              style="resize: none"
              v-model="textMessageRu"
            ></textarea>
          </div>

          <div class="modal-body">
            <h4>Введите текст рассылки на английском языке</h4>
            <textarea
              class="form-control"
              rows="6"
              style="resize: none"
              v-model="textMessageEn"
            ></textarea>
          </div>

          <div class="modal-footer">
            <button class="btn btn-dark" @click="$emit('send', textMessageRu, textMessageEn)">
              Отправить
            </button>
            <button class="btn btn-dark" @click="$emit('close')">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      textMessageRu: "",
      textMessageEn: "",
    };
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

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
