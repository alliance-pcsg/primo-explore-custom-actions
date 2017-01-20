function insertActions(actions) {
    app.service('customActionService', function() {
        return {
            actions: [],
            processCustomAction: function(prmActionCtrl, action) {
                action.slug = action.name.replace(/\s+/g, ''); // remove whitespace
                action.iconname = action.slug.toLowerCase();
                action.index = Object.keys(prmActionCtrl.actionListService.actionsToIndex).length - 1 ; // ignore "none" and RISPushTo
                this.actions.push(action);
                return action;
            },
            setCustomAction: function(prmActionCtrl, action) {
                    prmActionCtrl.actionLabelNamesMap[action.slug] = action.name;
                    prmActionCtrl.actionIconNamesMap[action.slug] = action.iconname;
                    prmActionCtrl.actionIcons[action.iconname] = {
                        icon: action.icon.name,
                        iconSet: action.icon.set,
                        type: "svg"
                    };
                    if (!prmActionCtrl.actionListService.actionsToIndex[action.slug]) { // ensure we aren't duplicating the entry
                        prmActionCtrl.actionListService.requiredActionsList[action.index] = action.slug;
                        prmActionCtrl.actionListService.actionsToDisplay.unshift(action.slug);
                        prmActionCtrl.actionListService.actionsToIndex[action.slug] = action.index;
                    }
                    if (action.type === 'rap') {
                        action.action += prmActionCtrl.item.pnx.search.recordid[0]; // adds the docID as a parameter for report a problem usage
                    }

                    if (action.type === 'template') {
                      if (action.hasOwnProperty('templateVar')) {
                          action.action = action.action.replace(/{\d}/g, (r) => action.templateVar[r.replace(/[^\d]/g,'')]);
                      }

                      action.action = action.action.replace(/{recordId}/g, (r) => prmActionCtrl.item.pnx.search.recordid[0]);
                    }

                    prmActionCtrl.onToggle[action.slug] = function(){
                        window.open(action.action, '_blank'); // opens the url in a new window
                    };

            },
            setCustomActionContainer: function(mdTabsCtrl, action) { // for further review...
            },
            getCustomActions: function() {
                return this.actions;
            }
        };
    })
    .component('prmActionListAfter', {
        require: {
            prmActionCtrl: '^prmActionList',
        },
        controller: 'customActionController'
    })
    .component('prmActionContainerAfter', {
        require: {
            mdTabsCtrl: '^mdTabs',
        },
        controller: 'customActionContainerController'
    })
    .controller('customActionController', ['$scope', 'customActionService', function($scope, customActionService) {
        var vm = this;
        vm.$onInit = function() {
            console.log(vm.prmActionCtrl);
            actions.forEach(function(action) {
                var processedAction = customActionService.processCustomAction(vm.prmActionCtrl, action);
                customActionService.setCustomAction(vm.prmActionCtrl, processedAction);
            });
        };
    }])
    .controller('customActionContainerController', ['$scope','customActionService', function($scope, customActionService) {
        var vm = this;
        vm.$onInit = function() {
            console.log(vm.mdTabsCtrl);
        };
    }]);
}
