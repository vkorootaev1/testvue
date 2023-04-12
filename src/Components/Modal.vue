<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container col-11 col-lg-6" @click.stop="">
          <div class="modal-header">
            <h2>Вопрос пользователя</h2>
          </div>

          <div class="modal-body">
            <p><b>Имя пользователя:</b> {{ questionUser.user.first_name }}</p>
            <p><b>Фамилия пользователя:</b> {{ questionUser.user.last_name }}</p>
            <p><b>Username:</b> {{ questionUser.user.username }}</p>
            <p><b>Текст сообщения:</b> {{ questionUser.text }}</p>
            <p><b>Время сообщения:</b> {{ questionUser.question_time }}</p>
          </div>

          <div class="modal-footer">
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
  props: {
    questionUser: Object,
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
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  word-break: break-all;
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
