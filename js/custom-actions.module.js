angular
  .module('customActions', [])
  .component('prmActionContainerAfter', {
    require: { prmActionCtrl: '^prmActionList' },
    controller: ['customActionsService', 'customActions', function (customActionsService, customActions) {
      this.$onInit = function () {
        customActionsService.setController(this.prmActionCtrl)
        customActions.map(action => customActionsService.addAction(action))
      }
    }]
  })
  .factory('customActionsService', function () {
    return {
      setController: function (controller) {
        this.prmActionCtrl = controller
      },
      processAction: function (action) {
        action.iconname = action.name.replace(/\s+/g, ''),
        action.slug = action.name.replace(/\s+/g, '').toLowerCase(),
        action.index = Object.keys(this.prmActionCtrl.actionListService.actionsToIndex).length - 1
        this.prmActionCtrl.actionLabelNamesMap[action.slug] = action.name
        this.prmActionCtrl.actionIconNamesMap[action.slug] = action.iconname
        this.prmActionCtrl.actionIcons[action.iconname] = {
          icon: action.icon.name,
          iconSet: action.icon.set,
          type: "svg"
        }
        return action
      },
      addAction: function (action) {
        action = this.processAction(action)
        if (!this.prmActionCtrl.actionListService.actionsToIndex[action.slug]) {
          this.prmActionCtrl.actionListService.requiredActionsList[action.index] = action.slug
          this.prmActionCtrl.actionListService.actionsToDisplay.unshift(action.slug)
          this.prmActionCtrl.actionListService.actionsToIndex[action.slug] = action.index
        }
        if (action.type === 'template') {
            // process { } in templateVars
            if (action.hasOwnProperty('templateVar')) {
                action.action = action.action.replace(/{\d}/g, (r) => action.templateVar[r.replace(/[^\d]/g, '')])
            }
            // replace a recordId occurence
            action.action = action.action.replace(/{recordId}/g, (r) => this.prmActionCtrl.item.pnx.search.recordid[0])
            // replace a pnx.xxx.xxx[0] pattern ex. pnx.search.recordid[0]
            let pnxProperties = action.action.match(/\{(pnx\..*?)\}/g) || []
            pnxProperties.forEach((p) => {
                let valueForP = p.replace(/[{}]/g, '').split('.').reduce((o, i) => {
                    try {
                        let h = /(.*)(\[\d\])/.exec(i)
                        if (h instanceof Array) { return o[h[1]][h[2].replace(/[^\d]/g, '')] }
                        return o[i]
                    } catch (e) {
                        return ''
                    }
                }, this.prmActionCtrl.item)
                action.action = action.action.replace(p, valueForP)
            })
        }
        this.prmActionCtrl.actionListService.onToggle[action.slug] = () => window.open(action.action, '_blank')
      }
    }
  })
