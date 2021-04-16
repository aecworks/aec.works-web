<template>
  <div>
    <div class="comment">
      <div class="fill-x">
        <h4>
          {{ comment.profile.name || 'No One' }}
          <span class="comment-timestamp">{{ comment.createdAt | fromNow }}</span>
        </h4>

        <div class="flex fill-x">
          <p class="comment-text">{{ comment.text }}</p>
          <IconCounter
            class="flex-right"
            :class="{ unclapped: (comment.clapCount || localClapCount) == 0 }"
            :icon="'clap'"
            :count="comment.clapCount || localClapCount"
            clickable
            @click="handleClap(comment)"
          />
        </div>

        <!-- <div class="flex flex-center comment-footer"> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import IconCounter from '@/components/IconCounter'
import { waitForLogin } from '@/mixins'

export default {
  name: 'Comment',
  components: { IconCounter },
  props: {
    threadId: {
      type: Number,
      required: true,
    },
    comment: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isLoading: false,
      localClapCount: 0,
    }
  },
  computed: {},
  async created() {
    if (this.hasReplies) {
      this.fetchItems(0)
    }
  },
  methods: {
    async handleClap({ id }) {
      await waitForLogin()
      const clapCount = await api.commentClap(id)
      this.localClapCount = clapCount
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.comment {
  display: flex;
  margin-bottom: 2rem;

  .comment-prefix {
    flex-shrink: 0;
    height: 1rem;
    width: 1rem;
    border-left: 1px solid $light-gray;
    border-bottom: 1px solid $light-gray;
    margin-right: 1rem;
    &.not-first {
      border: none;
    }
  }
}
.comment-text {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
}
.comment-timestamp {
  @extend .muted;
  font-size: 80%;
  margin-left: 0.5rem;
}
.comment-footer {
  margin-left: 0.5rem;
}
</style>
