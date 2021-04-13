<template>
  <!-- // NEED TO CLEAN UP AFTER REMOVING NESTED COMMENT SUPPORT -->
  <div>
    <div class="comment">
      <!-- <div v-if="comment.level != 0" class="comment-prefix" :class="{ 'not-first': index !== 0 }" /> -->
      <div class="fill-x">
        <h4>
          {{ comment.profile.name || 'No One' }}
          <span class="comment-timestamp">{{ comment.createdAt | fromNow }}</span>
        </h4>

        <p class="comment-text">{{ comment.text }}</p>

        <Loader v-if="isLoading" />

        <div class="flex flex-center comment-footer">
          <IconCounter
            :icon="'clap'"
            :count="comment.clapCount || localClapCount"
            clickable
            @click="handleClap(comment)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader.vue'
import api from '@/api'
import IconCounter from '@/components/IconCounter'
import { waitForLogin } from '@/mixins'

export default {
  name: 'Comment',
  components: { IconCounter, Loader },
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
      comments: [],
      offset: 0,
      count: 0,
      isReplying: false,
      isLoading: false,
      localClapCount: 0,
      // expanded: false, TODO
    }
  },
  computed: {
    hasReplies() {
      return this.comment.replyCount > 0
    },
    hasMore() {
      return this.count > this.comments.length
    },
  },
  async created() {
    if (this.hasReplies) {
      this.fetchItems(0)
    }
  },
  methods: {
    async fetchItems(offset) {
      const { results, count } = await api.getCommentsByParentId(this.comment.id, { offset })
      this.comments = [...this.comments, ...results]
      this.offset = this.offset + results.length
      this.count = count
    },
    async handleClap({ id }) {
      await waitForLogin()
      const clapCount = await api.commentClap(id)
      this.localClapCount = clapCount
    },
    onVisible({ going }) {
      // TODO: Make paginated loading util
      if (going === 'in' && this.hasMore) {
        this.fetchItems(this.offset)
      }
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
  margin-bottom: 1.25rem;
}
.comment-timestamp {
  @extend .muted;
  font-size: 80%;
  margin-left: 0.5rem;
}
.comment-footer {
  // margin-bottom: 1.5rem;
  > * {
    margin-right: 1rem;
  }
}
</style>
