describe('customActions factory', () => {
  beforeEach(module('customActions'))

  let customActionsFactory
  beforeEach(inject(function($injector, _customActions_) {
    customActionsFactory = _customActions_
  }))

  describe('actionExists', () => {
    let ctrl
    let actionExists
    beforeEach(() => {
      actionExists = customActionsFactory.actionExists;

      ctrl = {
        actionListService: {
          actionsToIndex: {
            targetAction: {},
          },
        },
      }
    })

    it('should be defined', () => {
      expect(actionExists).toBeDefined()
    })

    it('should return true if action is contained in ctrl.actionListService', () => {
      expect(actionExists({name: 'targetAction'}, ctrl)).toBe(true)
    })

    it('should return false if missing', () => {
      expect(actionExists({name: 'misingAction'}, ctrl)).toBe(false)
    })
  })

  describe('addActionIcon', () => {
    let addActionIcon
    let ctrl
    beforeEach(() => {
      addActionIcon = customActionsFactory.addActionIcon
      ctrl = {
        actionLabelNamesMap: {},
        actionIconNamesMap: {},
        actionIcons: {},
      }
    })

    it('should be defined', () => {
      expect(addActionIcon).toBeDefined()
    })

    it('should add label to ctrl.actionLabelNamesMap[actionName]', () => {
      addActionIcon({name: 'newActionName', label: 'newActionLabel', icon: 'icon'}, ctrl)
      expect(ctrl.actionLabelNamesMap.newActionName).toBeDefined()
      expect(ctrl.actionLabelNamesMap.newActionName).toEqual('newActionLabel')
    })

    it('should add name to ctrl.actionLabelNamesMap[actionName]', () => {
      addActionIcon({name: 'newActionName', label: 'newActionLabel', icon: 'icon'}, ctrl)
      expect(ctrl.actionIconNamesMap.newActionName).toBeDefined()
      expect(ctrl.actionIconNamesMap.newActionName).toEqual('newActionName')
    })

    it('should add icon to ctrl.actionIcons[actionName]', () => {
      addActionIcon({name: 'newActionName', label: 'newActionLabel', icon: 'icon'}, ctrl)
      expect(ctrl.actionIcons.newActionName).toBeDefined()
      expect(ctrl.actionIcons.newActionName).toEqual('icon')
    })
  })

  describe('removeActionIcon', () => {
    let removeActionIcon
    let ctrl
    beforeEach(() => {
      removeActionIcon = customActionsFactory.removeActionIcon
      ctrl = {
        actionLabelNamesMap: {targetAction: 'label'},
        actionIconNamesMap: {targetAction: 'name'},
        actionIcons: {targetAction: 'icon'},
      }
    })

    it('should be defined', () => {
      expect(removeActionIcon).toBeDefined()
    })

    it('should remove action.name from actionLabelNamesMap', () => {
      removeActionIcon({name: 'targetAction'}, ctrl)
      expect(ctrl.actionLabelNamesMap.targetAction).not.toBeDefined()
    })

    it('should remove action.name from actionIconNamesMap', () => {
      removeActionIcon({name: 'targetAction'}, ctrl)
      expect(ctrl.actionIconNamesMap.targetAction).not.toBeDefined()
    })

    it('should remove action.name from actionIcons', () => {
      removeActionIcon({name: 'targetAction'}, ctrl)
      expect(ctrl.actionIcons.targetAction).not.toBeDefined()
    })
  })

  describe('addAction', () => {
    let ctrl
    let newAction
    beforeEach(() => {
      newAction = {
        name: 'newAction', index: 1, onToggle: 'toggleAction',
      }

      spyOn(customActionsFactory, 'addActionIcon')

      ctrl = {
        actionListService: {
          requiredActionsList: ['action1', 'action2'],
          actionsToIndex: {},
          onToggle: {},
          actionsToDisplay: ['action1', 'action2'],
        },
      }
    })

    it('should be defined', () => {
      expect(customActionsFactory.addAction).toBeDefined()
    })

    describe('when action doesn\'t exists', () => {
      beforeEach(() => {
        spyOn(customActionsFactory, 'actionExists').and.returnValue(false)
        customActionsFactory.addAction(newAction, ctrl)
      })

      it('should add action to ctrl', () => {
        const props = ctrl.actionListService
        expect(props.requiredActionsList).toEqual(['action1', newAction.name, 'action2'])
        expect(props.actionsToIndex[newAction.name]).toEqual(newAction.index)
        expect(props.onToggle[newAction.name]).toEqual(newAction.onToggle)
        expect(props.actionsToDisplay).toEqual([newAction.name, 'action1', 'action2'])
      })

      it('should addActionIcon', () => {
        expect(customActionsFactory.addActionIcon).toHaveBeenCalled()
      })
    })

    describe('when action already exists', () => {
      let origCtrl
      beforeEach(() => {
        spyOn(customActionsFactory, 'actionExists').and.returnValue(true)
        origCtrl = angular.copy(ctrl)
        customActionsFactory.addAction(newAction, ctrl)
      })

      it('should addActionIcon', () => {
        expect(customActionsFactory.addActionIcon).toHaveBeenCalled()
      })

      it('shouldn\'t modify ctrl', () => {
        expect(ctrl).toEqual(origCtrl)
      })
    })
  })

  describe('removeAction', () => {
    let ctrl
    let targetAction
    beforeEach(() => {
      spyOn(customActionsFactory, 'removeActionIcon')

      targetAction = {
        name: 'newAction', index: 1, onToggle: 'toggleAction',
      }

      ctrl = {
        actionListService: {
          requiredActionsList: ['action1', targetAction.name, 'action2'],
          actionsToIndex: {[targetAction.name]: targetAction.index},
          onToggle: {[targetAction.name]: targetAction.onToggle},
          actionsToDisplay: [targetAction.name, 'action1', 'action2'],
        },
      }
    })

    it('should be defined', () => {
      expect(customActionsFactory.addAction).toBeDefined()
    })

    describe('when action exists', () => {
      beforeEach(() => {
        spyOn(customActionsFactory, 'actionExists').and.returnValue(true)
        customActionsFactory.removeAction(targetAction, ctrl)
      })

      it('should remove from ctrl', () => {
        const props = ctrl.actionListService
        expect(props.requiredActionsList).toEqual(['action1', 'action2'])
        expect(props.actionsToIndex[targetAction.name]).not.toBeDefined()
        expect(props.onToggle[targetAction.name]).not.toBeDefined()
        expect(props.actionsToDisplay).toEqual(['action1', 'action2'])
      })
    })

    describe('when an action doesn\'t exist', () => {
      let origCtrl
      beforeEach(() => {
        spyOn(customActionsFactory, 'actionExists').and.returnValue(false)
        origCtrl = angular.copy(ctrl)
        customActionsFactory.removeAction(targetAction, ctrl)
      })

      it('shouldn\'t modify ctrl', () => {
        expect(ctrl).toEqual(origCtrl)
      })
    })
  })

  describe('processLinkTemplate', () => {
    let processLinkTemplate
    const link = '/primo_library/libweb/jqp/record/{pnx.search.recordid[0]}.pnx'
    const item = {
      pnx: {
        search: {
          recordid: [123, 345],
        },
      },
    }
    beforeEach(() => {
      spyOn(window, 'open')
      processLinkTemplate = customActionsFactory.processLinkTemplate
    })

    it('should be defined', () => {
      expect(processLinkTemplate).toBeDefined()
    })

    it('should return a function', () => {
      const result = processLinkTemplate(link, item)
      expect(typeof result === 'function').toBe(true)
    })

    it('function should call window.open', () => {
      const resultFxn = processLinkTemplate(link, item)
      resultFxn()
      expect(window.open).toHaveBeenCalled;
    })

    it('function should call with converted link', () => {
      const resultFxn = processLinkTemplate(link, item)
      resultFxn()
      expect(window.open).toHaveBeenCalledWith('/primo_library/libweb/jqp/record/123.pnx', '_blank')
    })
  })
})
