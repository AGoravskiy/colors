<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  name: 'date-form',
  setup () {
    const $q = useQuasar()
    // const filePath = path.join(app.getPath('userData'), '/some.file')

    const datesModel = ref(null)

    return {
      datesModel,
      events: [],

      onSubmit () {
        console.log(datesModel)
        datesModel.value = null
        //console.log(app.getPath('filePath'));
      },

      onReset () {
        datesModel.value = null
        console.log(datesModel)
      }
    }
  }
}
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-date name="wedding" v-model="datesModel" range multiple/>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
