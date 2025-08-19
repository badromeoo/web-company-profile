import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})