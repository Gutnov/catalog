<template>
  <div>
    <VDialog
      v-model="dialog"
      max-width="600"
    >
      <template #activator="{ props }">
        <VScaleTransition>
          <VBtn
            color="pink"
            icon
            v-bind="props"
            class="fab-button"
            @click.stop="add"
          >
            <VIcon>mdi-plus</VIcon>
          </VBtn>
        </VScaleTransition>
      </template>
      <VCard title="Создание компании">
        <VCardText>
          <VForm
            fast-fail
            @submit.prevent
          >
            <VTextField
              v-model="companyName"
              label="Название"
            />

            <VTextField
              v-model="cretedYear"
              label="Год создания"
            />
          </VForm>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="red"
            text="Отменить"
            variant="tonal"
            @click="dialog = false"
          />
          <VBtn
            text="Подтвердить"
            variant="tonal"
            color="green"
            @click="dialog = false"
          />
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
const companyName = ref('')
const cretedYear = ref('')

const add = () => {
  dialog.value = true
}
</script>

<style scoped>
.fab-button {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}
</style>