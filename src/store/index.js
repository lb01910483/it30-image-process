import Vue from 'vue'
import Vuex from 'vuex'
import * as filters from '../lib/filter'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sliderValue: {
      brightness: 0,
      contrast: 0,
      saturation: 0,
      vibrance: 0
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
        if (sliderValue.brightness !== 0) {
          filters.brightness(imageDataCopy.data, sliderValue.brightness)
        }
        if (sliderValue.contrast !== 0) {
          filters.contrast(imageDataCopy.data, sliderValue.contrast)
        }
        if (sliderValue.saturation !== 0) {
          filters.saturation(imageDataCopy.data, sliderValue.saturation)
        }
        if (sliderValue.vibrance !== 0) {
          filters.vibrance(imageDataCopy.data, sliderValue.vibrance)
        }
        return imageDataCopy
      }
    }
  },
  modules: {}
})
