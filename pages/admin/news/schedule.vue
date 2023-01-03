<template>
  <div class="flex-container bg-polka">
    <div v-if="article" class="w-full h-full">
      <div class="w-3/4 mx-auto block">
        <TextInput v-model="article.title" type="text" label="Title">
          <bold-icon class="block mx-auto" />
        </TextInput>
        <TextError v-if="errors.title && errors.title.missing">
          You must provide a title
        </TextError>
        <DateInput v-model="article.scheduledDate" label="Scheduled Date" class="w-full mx-auto inline-block">
          <calendar-icon class="block mx-auto" />
        </DateInput>
        <TextError v-if="errors.date && errors.date.missing">
          You must provide a date
        </TextError>
        <TextError v-if="errors.date && errors.date.missing">
          date is invalid
        </TextError>
        <MarkdownInput class="block mx-auto rounded bg-white shadow" v-model="article.content" :maxlength="4096" />
        <TextError v-if="errors.content && errors.content.missing">
          You must provide some content
        </TextError>
        <div class="w-full md:w-1/2 block mx-auto my-3 grid grid-cols-2">
          <Button class="inline-block mx-0" groupPos="first" colour="complementary" :action="cancel">
            Cancel
          </Button>
          <Button class="inline-block mx-0" groupPos="last" colour="tertiary" :action="schedulePost">
            Save
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BoldIcon, CalendarIcon } from 'vue-feather-icons'

export default {
  middleware: 'isadmin',
  components: {
    BoldIcon,
    CalendarIcon
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 0,
      article: {
        title: '',
        content: '',
        scheduledDate: ''
      },
      errors: {
        title: {
          missing: false
        },
        content: {
          missing: false,
          invalid: false
        },
        date: {
          missing: false,
          invalid: false
        }
      }
    }
  },
  methods: {
    cancel () {
      this.$router.push('/admin/news')
    },
    schedulePost () {
      this.state = this.states.loading
      this.pages = []
      this.errors = { title: { missing: false }, content: { missing: false, invalid: false }, date: { missing: false, invalid: false } }
      this.$axios.$post('/news/schedule', this.article)
        .then((res) => {
          if (res.success) {
            this.$store.commit('toasts/create', { title: 'Admin', message: 'Your article has been scheduled' })
            this.$router.push('/admin/news')
          }
        })
        .catch((e) => {
          this.state = this.states.default
          this.errors = e.response.data.errors
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
