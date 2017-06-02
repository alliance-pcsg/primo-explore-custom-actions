app.component('prmActionListAfter', {
    require: {
        prmActionCtrl: '^prmActionList',
    },
    controller: function($scope, custom_actions) {
        let vm = this;
        vm.$onInit = function() {
            vm.addActions(custom_actions);
        };
        vm.addActions = function(actions) {
            actions.forEach(action => {
                // do some processing to create friendly names
                let slug = action.name.replace(/\s+/g, '');
                let iconname = slug.toLowerCase();
                let index = Object.keys(vm.prmActionCtrl.actionListService.actionsToIndex).length - 1;
                // add the action
                vm.prmActionCtrl.actionLabelNamesMap[slug] = action.name;
                vm.prmActionCtrl.actionIconNamesMap[slug] = iconname;
                vm.prmActionCtrl.actionIcons[iconname] = {
                    icon: action.icon.name,
                    iconSet: action.icon.set,
                    type: "svg"
                };
                if (!vm.prmActionCtrl.actionListService.actionsToIndex[slug]) {
                    vm.prmActionCtrl.actionListService.requiredActionsList[index] = slug;
                    vm.prmActionCtrl.actionListService.actionsToDisplay.unshift(slug);
                    vm.prmActionCtrl.actionListService.actionsToIndex[slug] = index;
                }
                if (action.type === 'template') {
                    // process { } in templateVars
                    if (action.hasOwnProperty('templateVar')) {
                        action.action = action.action.replace(/{\d}/g, (r) => action.templateVar[r.replace(/[^\d]/g, '')]);
                    }
                    // replace a recordId occurence
                    action.action = action.action.replace(/{recordId}/g, (r) => vm.prmActionCtrl.item.pnx.search.recordid[0]);
                    // replace a pnx.xxx.xxx[0] pattern ex. pnx.search.recordid[0]
                    let pnxProperties = action.action.match(/\{(pnx\..*?)\}/g) || [];
                    pnxProperties.forEach((p) => {
                        let valueForP = p.replace(/[{}]/g, '').split('.').reduce((o, i) => {
                            try {
                                let h = /(.*)(\[\d\])/.exec(i);
                                if (h instanceof Array) { return o[h[1]][h[2].replace(/[^\d]/g, '')]; }
                                return o[i];
                            } catch (e) {
                                return '';
                            }
                        }, vm.prmActionCtrl.item);
                        action.action = action.action.replace(p, valueForP);
                    });
                }
                // enable the action
                vm.prmActionCtrl.onToggle[slug] = () => { window.open(action.action, '_blank'); }
            });
        };
    }
});
