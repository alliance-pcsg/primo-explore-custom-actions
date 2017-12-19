var app = angular.module('viewCustom', ['customActions'])

app.component('prmActionListAfter', {
  template: `<custom-action name="open_pnx"
                            label="Open PNX"
                            index=8
                            icon="ic_find_in_page_24px"
                            icon-set="action"
                            link="/primo_library/libweb/jqp/record/{pnx.search.recordid[0]}.pnx" />
            <custom-action  name="report_bug"
                            label="Report Bug"
                            index=7
                            icon="ic_bug_report_24px"
                            icon-set="action"
                            link="http://my.institution.edu/report_problem?record_id={pnx.search.recordid[0]}" />`
})
