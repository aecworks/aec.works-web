<template>
  <div>
    <div class="comment">
      <div class="fill-x">
        <h4>
          <div class="comment-profile flex fill">
            <img class="profile-avatar" :src="comment.profile.avatarUrl" />
            <span class="profile-name">{{ comment.profile.name || 'No One' }}</span>
            <span class="comment-timestamp">{{ comment.createdAt | fromNow }}</span>
          </div>
        </h4>
        <div class="comment-text">
          <p class="mb-0">
            {{ comment.text }}
          </p>
          <Icon
            class="mt"
            :icon="comment.userDidClap ? 'clap' : 'clap_off'"
            icon-hover="clap"
            clickable
            @click="handleClap(comment)"
          >
            {{ comment.clapCount }}
          </Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Icon from '@/components/Icon'
import { waitForLogin } from '@/mixins'
import { clapForCount } from '@/libs/sounds'

export default {
  name: 'Comment',
  components: { Icon },
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
    }
  },
  computed: {},
  async created() {
    if (this.hasReplies) {
      this.fetchItems(0)
    }
  },
  methods: {
    async handleClap(comment) {
      await waitForLogin()
      const { id } = comment
      const clapCount = await api.commentClap(id)
      comment.userDidClap = true
      comment.clapCount = clapCount
      clapForCount(clapCount)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.comment {
  display: flex;
  margin-bottom: 2rem;
}

.comment-profile {
  line-height: 1.5rem;
  .profile-avatar {
    height: 22px;
    border-radius: 11px;
    margin-right: 0.5rem;
    @extend .border-thin;
  }
  .comment-timestamp {
    @extend .muted;
    font-size: 80%;
    margin-left: 0.5rem;
  }
}
.comment-text {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
