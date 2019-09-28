<script>
  import { getImageUrl } from '../../lib/utils'
  export default {
    name: 'CssFilters',
    data() {
      return {
        blobSrc: '',
        cssFilterList: [
          {
            class: 'blur',
            value: '(10px)'
          },
          {
            class: 'brightness',
            value: '(150%)'
          },
          {
            class: 'contrast',
            value: '(150%)'
          },
          {
            class: 'drop-shadow',
            value: '(10px 10px)'
          },
          {
            class: 'grayscale',
            value: '(50%)'
          },
          {
            class: 'hue-rotate',
            value: '(180deg)'
          },
          {
            class: 'invert',
            value: '(100%)'
          },
          {
            class: 'opacity',
            value: '(50%)'
          },
          {
            class: 'saturate',
            value: '(150%)'
          },
          {
            class: 'sepia',
            value: '(150%)'
          }
        ],
        cssGramList: [
          '_1977',
          'aden',
          'amaro',
          'brannan',
          'brooklyn',
          'clarendon',
          'gingham',
          'hudson',
          'inkwell',
          'kelvin',
          'lark',
          'lofi'
        ]
      }
    },
    methods: {
      getData(event) {
        const file = event.target.files[0]
        this.blobSrc = getImageUrl(file)
      },
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />