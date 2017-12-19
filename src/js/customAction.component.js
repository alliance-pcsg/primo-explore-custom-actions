/* eslint-disable max-len */
angular.module('customActions').component('customAction', {
  bindings: {
    name: '@',
    label: '@',
    icon: '@',
    iconSet: '@',
    link: '@',
    index: '<',
  },
  require: {
    prmActionCtrl: '^prmActionList',
  },
  controller: ['customActions', function(customActions) {
    this.$onInit = () => {
      this.action = {
        name: this.name,
        label: this.label,
        index: this.index,
        icon: {
          icon: this.icon,
          iconSet: this.iconSet,
          type: 'svg',
        },
        onToggle: customActions.processLinkTemplate(this.link, this.prmActionCtrl.item),
      }
      customActions.addAction(this.action, this.prmActionCtrl)
    }
    this.$onDestroy = () => customActions.removeAction(this.action, this.prmActionCtrl)
  }],
})
