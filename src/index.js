
import './assets/common.sass'

function changeTitle() {
  window.$('#app').html('Parcel packing up')
}

setTimeout(function() {
  changeTitle()
}, 2000)
