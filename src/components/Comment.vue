<template>
  <div>
    <div class="comment">
      <div v-if="comment.level != 0" class="comment-prefix" :class="{'not-first': index !== 0}" />
      <div>
        <h4>
          {{comment.profile.name || "No One"}}
          <span class="comment-timestamp">{{relativeTimestamp}}</span>
        </h4>

        <p>{{comment.text}}</p>
        <div class="flex flex-center comment-footer">
          <div class="button-text">
            <span>Reply</span>
          </div>
          <IconCounter :icon="'chat'" :count="comment.repliesCount" />
          <IconCounter :icon="'clap'" :count="comment.clapCount" />
        </div>
      </div>
    </div>
    <Comment
      v-for="(comment, index) in comments"
      :key="comment.id"
      v-bind="{comment, index}"
      v-waypoint="{ active: index + 1=== comments.length, callback: onVisible }"
    />
  </div>
</template>

<script>
import api from '@/api'
import IconCounter from '@/components/IconCounter'
import moment from 'moment'

export default {
  name: 'Comment',
  props: ['comment', 'index'],
  components: { IconCounter },
  data() {
    return {
      comments: [],
      offset: 0,
      // expanded: false, TODO
    }
  },
  async created() {
    if (this.hasReplies) {
      this.fetchItems(0)
    }
  },
  computed: {
    hasReplies() {
      return this.comment.repliesCount > 0
    },
    relativeTimestamp() {
      return moment(this.comment.createdAt).fromNow()
    },
  },
  methods: {
    async fetchItems(offset) {
      const { results: comments } = await api.getCommentsByParentId(this.comment.id, { offset })
      this.comments = [...this.comments, ...comments]
      this.offset = this.offset + comments.length
    },
    onVisible({ going }) {
      if (going === 'in') {
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
