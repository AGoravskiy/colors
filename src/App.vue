<script>
import DateForm from './components/date-form.vue'
export default {
  name: 'App',
  components: {
    DateForm
  },
  data() {
    return {
      interval: null,
      time: null,
      date: null,
      dayOfWeek: null,
      model: null
    }
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  created() {
    this.interval = setInterval(() => {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }).format();
      this.dayOfWeek = Intl.DateTimeFormat(navigator.language, {
        weekday: 'long'
      }).format().toUpperCase();
      this.date = Intl.DateTimeFormat(navigator.language, {
        day: 'numeric',
        month: 'numeric',
        year:'numeric'
      }).format();
    }, 1000)
  }
}
</script>

<template>
  <div id="q-app" class="column content-center justify-center relative-position">
    <q-card class="my-card column content-center">
      <q-card-section class="text-center">
        {{time}}
      </q-card-section>
      <q-card-section class="text-center">
        {{dayOfWeek}}
      </q-card-section>
      <q-card-section class="text-center">
        {{date}}
      </q-card-section>
    </q-card>
    <q-btn flat round color="primary" icon="date_range" class="absolute-top-right q-ma-md">
      <q-menu
        anchor="top left"
        self="top right"
      >
        <date-form></date-form>
      </q-menu>
    </q-btn>
  </div>
</template>
