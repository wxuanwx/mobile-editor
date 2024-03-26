declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Attrs {
  class?: string
  style?: string
}
interface Tag {
  type: string
  name?: string
  content?: string
  voidElement?: boolean
  attrs?: Attrs
  children?: Tag[]
}
declare module 'html-parse-stringify' {
  export const parse: (html: string) => Tag[]
  export const stringify: (ast: Tag[]) => string
}
