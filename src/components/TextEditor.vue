<template>
    <div style="border: 1px solid #ccc;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
            @onChange="onChanged"
        />
    </div>
</template>
<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  name: 'TextEditor',
  components: { Editor, Toolbar },
  data () {
    return {
      editor: null,
      html: this.value,
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default' // or 'simple'
    }
  },
  methods: {
    onCreated (editor) {
      console.log(46)
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    onChanged (editor) {
      console.log(123)
      this.$emit('input', editor.getHtml()) // 当编辑器值变化时向外传递数据
    }
  },
  mounted () {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    // }, 1500)
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  props: {
    value: { // value 为固定写法 用于父组件引用 当前组件时可以通过 v-model 传参给当前组件
      type: String
    }
  },
  watch: { // 当外部value 值变化时重新赋值给html
    value (newValue) {
      this.html = newValue
    }
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>