import Vue from 'vue'
import Vuex from 'vuex'
import { applyFilters } from '../lib/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sliderValue: {
      brightness: 0,
      contrast: 0,
      saturation: 0,
      vibrance: 0,
      shadow: 0,
      hightLight: 0,
      sharpen: 0
    },
    originalEditData: {}
  },
  mutations: {
    CHANGE_STATE_VALUE(state, { key, val }) {
      if (state[key] !== undefined) {
        state[key] = val
      }
    },
    CHANGE_SLIDER_VALUE(state, { key, val }) {
      if (state.sliderValue[key] !== undefined) {
        state.sliderValue[key] = val
      }
    }
  },
  getters: {
    editImageData({ sliderValue, originalEditData }) {
      if (originalEditData.data) {
        const imageDataCopy = new ImageData(
          new Uint8ClampedArray(originalEditData.data),
          originalEditData.width,
          originalEditData.height
        )
        return applyFilters(imageDataCopy, sliderValue)
      }
    }
  },
  modules: {}
})
