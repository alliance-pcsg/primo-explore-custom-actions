function insertActions(actions) {
    app.service('customActionService', function() {
            return {
                actions: [],
                processCustomAction: function(prmActionCtrl, action) {
                    action.slug = action.name.replace(/\s+/g, ''); // remove whitespace
                    action.iconname = action.slug.toLowerCase();
                    action.index = Object.keys(prmActionCtrl.actionListService.actionsToIndex).length - 1; // ignore "none" and RISPushTo
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
                    if (action.type === 'template') {
                        // is a templateVar property is given
                        if (action.hasOwnProperty('templateVar')) {
                            action.action = action.action.replace(/{\d}/g, (r) => action.templateVar[r.replace(/[^\d]/g, '')]);
                        }
                        // replace a recordId occurence
                        action.action = action.action.replace(/{recordId}/g, (r) => prmActionCtrl.item.pnx.search.recordid[0]);

                        //replace a pnx.xxx.xxx[0] pattern ex. pnx.search.recordid[0]
                        let pnxProperties = action.action.match(/\{(pnx\..*?)\}/g) || [];
                        pnxProperties.forEach((p) => {
                            let valueForP = p.replace(/[{}]/g, '').split('.').reduce((o, i) => {
                                try {
                                    let h = /(.*)(\[\d\])/.exec(i);

                                    if (h instanceof Array) {
                                        return o[h[1]][h[2].replace(/[^\d]/g, '')];
                                    }

                                    return o[i];
                                } catch (e) {
                                    return '';
                                }
                            }, prmActionCtrl.item);
                            action.action = action.action.replace(p, valueForP);
                        });
                    }

                    prmActionCtrl.onToggle[action.slug] = function() {
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
        .controller('customActionContainerController', ['$scope', 'customActionService', function($scope, customActionService) {
            var vm = this;
            vm.$onInit = function() {
                console.log(vm.mdTabsCtrl);
            };
        }]);
}
