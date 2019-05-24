import Vue from 'vue';
import vDialog from './index.vue';

const v = new Vue({
  render(createElement) {
    return createElement(vDialog);
  }
}).$mount();
document.body.append(v.$el);
const xDialog = v.$children[0];

export default function(options) {
  xDialog.show(options);
}
