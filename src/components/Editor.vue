<template>
  <div id="editor"></div>
</template>

<script>
import Quill from 'quill'
// https://www.npmjs.com/package/quill-image-upload
// https://www.npmjs.com/package/quill-image-resize

export default {
  name: 'Editor',
  props: {
    value: {
      default: '',
      type: String,
    },
  },

  data() {
    return {
      editorContent: null,
      editorInstance: null,
      editorOpts: {
        placeholder: 'Your words go here - select text to format it',
        bounds: document.body,
        modules: {
          toolbar: [
            // [{ header: [1, 2, false] }],
            // [{ font: [] }],
            ['bold'],
            // ['blockquote', 'code-block'],
            // [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
            // [{ color: [] }, { background: [] }],
            // ['clean'],
            ['link', 'image'],
            // [{ direction: 'rtl' }],
          ],
        },
        // theme: 'snow',
        theme: 'bubble',
      },
    }
  },

  watch: {
    value(newVal) {
      // Only update the content if it's changed from an external source
      // or else it'll act weird when you try to type anything
      if (newVal !== this.editorContent) {
        this.editorInstance.pasteHTML(newVal)
      }
    },
  },

  mounted() {
    this.initializeEditor()
  },

  beforeDestroy() {
    this.editorInstance.off('text-change')
  },

  methods: {
    initializeEditor() {
      const container = document.getElementById('editor')
      container.innerHTML = this.value
      this.container = container
      this.editorInstance = new Quill(container, this.editorOpts)
      this.editorInstance.on('text-change', this.onEditorContentChange)
      this.setEditorContent()
      this.setEditorSize()
    },
    onEditorContentChange() {
      this.setEditorContent()
      this.setEditorSize()
      this.$emit('input', this.editorContent)
    },
    setEditorSize() {
      this.container.style.height = 'auto'
      this.container.style.height = this.scrollHeight + 'px'
    },
    setEditorContent() {
      this.editorContent = this.editorInstance.getText().trim()
        ? this.editorInstance.root.innerHTML
        : ''
    },
  },
}
</script>

<style lang="scss">
#editor {
  width: 100%;

  .ql-editor {
    padding: 0;
  }
  // Editor Placeholder
  .ql-editor.ql-blank::before {
    left: 0;
    font-size: $font-size-p;
  }
}
</style>
