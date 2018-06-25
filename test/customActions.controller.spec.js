describe('customAction component (controller)', () => {
  let factorySpy
  beforeEach(() => {
    factorySpy = {
      processLinkTemplate: () => {},
      addAction: () => {},
      removeAction: () => {},
    }

    spyOn(factorySpy, 'processLinkTemplate')
    spyOn(factorySpy, 'addAction')
    spyOn(factorySpy, 'removeAction')
  })

  beforeEach(module('customActions', ($provide) => {
    $provide.service('customActions', () => factorySpy)
  }))

  let $scope
  let $componentController
  let customActionsFactory
  let controller
  let bindings
  beforeEach(inject((
    _$rootScope_,
    _$componentController_,
    _customActions_
  ) => {
    $scope = _$rootScope_.$new()

    $componentController = _$componentController_
    customActionsFactory = _customActions_

    bindings = {
      name: 'open_pnx',
      label: 'Open PNX',
      index: 8,
      icon: 'ic_find_in_page_24px',
      ['icon-set']: 'action',
      link: '/primo_library/libweb/jqp/record/{pnx.search.recordid[0]}.pnx',
      prmActionCtrl: {
        item: {},
      },
    }

    controller = $componentController(
      'customAction',
      {$scope},
      bindings
    )
  }))

  describe('$onInit', () => {
    beforeEach(() => {
      controller
      controller.$onInit()
    })

    it('maps bound properties to action on controller', () => {
      expect(controller.action.name).toEqual(bindings.name)
      expect(controller.action.label).toEqual(bindings.label)
      expect(controller.action.index).toEqual(bindings.index)
      expect(controller.action.icon).toEqual({
        icon: bindings.icon,
        iconSet: bindings.iconSet,
        type: 'svg',
      })
    })

    it('should addAction', () => {
      expect(customActionsFactory.addAction).toHaveBeenCalled()
    })
  })
})
