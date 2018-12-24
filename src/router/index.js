import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const test1 = r => require.ensure([], () => r(require('@/pages/test1')), 'test1');
const test2 = r => require.ensure([], () => r(require('@/pages/test2')), 'test2');
const test3 = r => require.ensure([], () => r(require('@/pages/test3')), 'test3');
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login');
const index = r => require.ensure([], () => r(require('@/pages/index')), 'index');
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const news = r => require.ensure([], () => r(require('@/pages/news')), 'news');
const crm = r => require.ensure([], () => r(require('@/pages/crm')), 'crm');
const book = r => require.ensure([], () => r(require('@/pages/book')), 'book');
const mine = r => require.ensure([], () => r(require('@/pages/mine')), 'mine');
//  通知
const notice = r => require.ensure([], () => r(require('@/pages/notice')), 'notice');
//  站内信
const letter = r => require.ensure([], () => r(require('@/pages/letter')), 'letter');
//  发站内信
const letter_add = r => require.ensure([], () => r(require('@/pages/letter_add')), 'letter_add');
//  审批
const approval = r => require.ensure([], () => r(require('@/pages/approval')), 'approval');
//  审批详情
const approval_detail = r => require.ensure([], () => r(require('@/pages/approval_detail')), 'approval_detail');


//  营销线索
const clue = r => require.ensure([], () => r(require('@/pages/clue')), 'clue');
//  新增线索
const clue_add = r => require.ensure([], () => r(require('@/pages/clue_add')), 'clue_add');
//  线索详情
const clue_detail = r => require.ensure([], () => r(require('@/pages/clue_detail')), 'clue_detail');
//  参与成员
const clue_member = r => require.ensure([], () => r(require('@/pages/clue_member')), 'clue_member');
//  写跟进
const clue_follow = r => require.ensure([], () => r(require('@/pages/clue_follow')), 'clue_follow');
//  转化机会
const clue_opportunity = r => require.ensure([], () => r(require('@/pages/clue_opportunity')), 'clue_opportunity');


//  营销客户
const client = r => require.ensure([], () => r(require('@/pages/client')), 'client');
//  添加客户
const client_add = r => require.ensure([], () => r(require('@/pages/client_add')), 'client_add');
//  客户详情
const client_detail = r => require.ensure([], () => r(require('@/pages/client_detail')), 'client_detail');
//  客户成员
const client_member = r => require.ensure([], () => r(require('@/pages/client_member')), 'client_member');
//  写跟进
const client_follow = r => require.ensure([], () => r(require('@/pages/client_follow')), 'client_follow');
//  拜访签到
const client_visit = r => require.ensure([], () => r(require('@/pages/client_visit')), 'client_visit');
//  新增联系人
const contacts_add = r => require.ensure([], () => r(require('@/pages/contacts_add')), 'contacts_add');
//  新增机会
const opportunity_add = r => require.ensure([], () => r(require('@/pages/opportunity_add')), 'opportunity_add');
//  新增合同
const contract_add = r => require.ensure([], () => r(require('@/pages/contract_add')), 'contract_add');


//  营销机会
const opportunity = r => require.ensure([], () => r(require('@/pages/opportunity')), 'opportunity');
//  营销机会
const opportunity_detail = r => require.ensure([], () => r(require('@/pages/opportunity_detail')), 'opportunity_detail');
//  机会成员列表
const opportunity_member = r => require.ensure([], () => r(require('@/pages/opportunity_member')), 'opportunity_member');
//  添加关联联系人
const relation_contacts = r => require.ensure([], () => r(require('@/pages/relation_contacts')), 'relation_contacts');
//  写跟进
const opportunity_follow = r => require.ensure([], () => r(require('@/pages/opportunity_follow')), 'opportunity_follow');
//  转化为合同
const opportunity_contract = r => require.ensure([], () => r(require('@/pages/opportunity_contract')), 'opportunity_contract');



//  合同
const contract = r => require.ensure([], () => r(require('@/pages/contract')), 'contract');
//  合同详情
const contract_detail = r => require.ensure([], () => r(require('@/pages/contract_detail')), 'contract_detail');
//  写跟进
const contract_follow = r => require.ensure([], () => r(require('@/pages/contract_follow')), 'contract_follow');
//  配置收款计划
const collection_plan_deploy = r => require.ensure([], () => r(require('@/pages/collection_plan_deploy')), 'collection_plan_deploy');
//  新增收款
const receipt_add = r => require.ensure([], () => r(require('@/pages/receipt_add')), 'receipt_add');
//  新增开票记录
const invoicing_add = r => require.ensure([], () => r(require('@/pages/invoicing_add')), 'invoicing_add');



//  联系人
const contacts = r => require.ensure([], () => r(require('@/pages/contacts')), 'contacts');
//  联系人详情
const contacts_detail = r => require.ensure([], () => r(require('@/pages/contacts_detail')), 'contacts_detail');
//  添加联系人关联信息
const related_info_add = r => require.ensure([], () => r(require('@/pages/related_info_add')), 'related_info_add');



//  拜访签到
const sign = r => require.ensure([], () => r(require('@/pages/sign')), 'sign');
//  拜访签到
const visit_sign = r => require.ensure([], () => r(require('@/pages/visit_sign')), 'visit_sign');



//  工作报告
const work_report = r => require.ensure([], () => r(require('@/pages/work_report')), 'work_report');
//  查看工作报告
const work_check = r => require.ensure([], () => r(require('@/pages/work_check')), 'work_check');
//  工作报告
const work_write = r => require.ensure([], () => r(require('@/pages/work_write')), 'work_write');



//  修改密码
const change_password = r => require.ensure([], () => r(require('@/pages/change_password')), 'change_password');
//  意见反馈
const feedback = r => require.ensure([], () => r(require('@/pages/feedback')), 'feedback');
//  编辑个人信息
const personal_info = r => require.ensure([], () => r(require('@/pages/personal_info')), 'personal_info');

//  写跟进
const write_follow = r => require.ensure([], () => r(require('@/pages/write_follow')), 'write_follow');

//  通讯录员工
const staff = r => require.ensure([], () => r(require('@/pages/staff')), 'staff');
//  通讯录员工详细信息
const staff_detail = r => require.ensure([], () => r(require('@/pages/staff_detail')), 'staff_detail');


const routes = [
  {
    path: '/test1',
    name: 'test1',
		component: test1
	},{
    path: '/test2',
    name: 'test2',
		component: test2
	},{
    path: '/test3',
    name: 'test3',
		component: test3
	},{
    path: '/login',
    name: 'login',
		component: login,
    meta: {
      title:"登录",
    }
	},{
    path: '/notice',
    name: 'notice',
		component: notice,
    meta: {
      title:"通知",
    }
	},{
    path: '/letter',
    name: 'letter',
		component: letter,
    meta: {
      title:"站内信",
    }
	},{
    path: '/letter_add',
    name: 'letter_add',
		component: letter_add,
    meta: {
      title:"发站内信",
    }
	},{
    path: '/approval',
    name: 'approval',
		component: approval,
    meta: {
      title:"待办事项",
    }
	},{
    path: '/approval_detail',
    name: 'approval_detail',
		component: approval_detail,
    meta: {
      title:"",
    }
	},{
    path: '/clue',
    name: 'clue',
		component: clue,
    meta: {
      title:"营销线索",
    }
	},{
    path: '/clue_add',
    name: 'clue_add',
		component: clue_add,
    meta: {
      title:"营销线索",
    }
	},{
    path: '/clue_detail',
    name: 'clue_detail',
		component: clue_detail,
    meta: {
      title:"线索详情",
    }
	},{
    path: '/clue_member',
    name: 'clue_member',
		component: clue_member,
    meta: {
      title:"参与成员",
    }
	},{
    path: '/clue_follow',
    name: 'clue_follow',
		component: clue_follow,
    meta: {
      title:"写跟进",
    }
	},{
    path: '/clue_opportunity',
    name: 'clue_opportunity',
		component: clue_opportunity,
    meta: {
      title:"转化机会",
    }
	},{
    path: '/client',
    name: 'client',
		component: client,
    meta: {
      title:"营销客户",
    }
	},{
    path: '/client_add',
    name: 'client_add',
		component: client_add,
    meta: {
      title:"新增客户",
    }
	},{
    path: '/client_detail',
    name: 'client_detail',
		component: client_detail,
    meta: {
      title:"客户详情",
    }
	},{
    path: '/client_member',
    name: 'client_member',
		component: client_member,
    meta: {
      title:"参与成员",
    }
	},{
    path: '/client_follow',
    name: 'client_follow',
		component: client_follow,
    meta: {
      title:"写跟进",
    }
	},{
    path: '/client_visit',
    name: 'client_visit',
		component: client_visit,
    meta: {
      title:"拜访签到",
    }
	},{
    path: '/contacts_add',
    name: 'contacts_add',
		component: contacts_add,
    meta: {
      title:"新增联系人",
    }
	},{
    path: '/opportunity_add',
    name: 'opportunity_add',
		component: opportunity_add,
    meta: {
      title:"新增机会",
    }
	},{
    path: '/contract_add',
    name: 'contract_add',
		component: contract_add,
    meta: {
      title:"新增合同",
    }
	},{
    path: '/opportunity',
    name: 'opportunity',
		component: opportunity,
    meta: {
      title:"营销机会",
    }
	},{
    path: '/opportunity_detail',
    name: 'opportunity_detail',
		component: opportunity_detail,
    meta: {
      title:"机会详情",
    }
	},{
    path: '/opportunity_member',
    name: 'opportunity_member',
		component: opportunity_member,
    meta: {
      title:"参与成员",
    }
	},{
    path: '/relation_contacts',
    name: 'relation_contacts',
		component: relation_contacts,
    meta: {
      title:"添加关联联系人",
    }
	},{
    path: '/opportunity_follow',
    name: 'opportunity_follow',
		component: opportunity_follow,
    meta: {
      title:"写跟进",
    }
	},{
    path: '/opportunity_contract',
    name: 'opportunity_contract',
		component: opportunity_contract,
    meta: {
      title:"转化合同",
    }
	},{
    path: '/contract',
    name: 'contract',
		component: contract,
    meta: {
      title:"营销合同",
    }
	},{
    path: '/contract_detail',
    name: 'contract_detail',
		component: contract_detail,
    meta: {
      title:"合同详情",
    }
	},{
    path: '/collection_plan_deploy',
    name: 'collection_plan_deploy',
		component: collection_plan_deploy,
    meta: {
      title:"配置收款计划",
    }
	},{
    path: '/receipt_add',
    name: 'receipt_add',
		component: receipt_add,
    meta: {
      title:"新增收款",
    }
	},{
    path: '/contract_follow',
    name: 'contract_follow',
		component: contract_follow,
    meta: {
      title:"写跟进",
    }
	},{
    path: '/invoicing_add',
    name: 'invoicing_add',
		component: invoicing_add,
    meta: {
      title:"新增开票记录",
    }
	},{
    path: '/contacts',
    name: 'contacts',
		component: contacts,
    meta: {
      title:"联系人",
    }
	},{
    path: '/contacts_detail',
    name: 'contacts_detail',
		component: contacts_detail,
    meta: {
      title:"联系人详情",
    }
	},{
    path: '/related_info_add',
    name: 'related_info_add',
		component: related_info_add,
    meta: {
      title:"新增关联人",
    }
	},{
    path: '/sign',
    name: 'sign',
		component: sign,
    meta: {
      title:"拜访签到",
    }
	},{
    path: '/visit_sign',
    name: 'visit_sign',
		component: visit_sign,
    meta: {
      title:"拜访签到",
    }
	},{
    path: '/work_report',
    name: 'work_report',
		component: work_report,
    meta: {
      title:"工作日志",
    }
	},{
    path: '/work_check',
    name: 'work_check',
		component: work_check,
    meta: {
      title:"工作日志",
    }
	},{
    path: '/work_write',
    name: 'work_write',
		component: work_write,
    meta: {
      title:"写日志",
    }
	},{
    path: '/change_password',
    name: 'change_password',
		component: change_password,
    meta: {
      title:"修改密码",
    }
	},{
    path: '/feedback',
    name: 'feedback',
		component: feedback,
    meta: {
      title:"意见反馈",
    }
	},{
    path: '/personal_info',
    name: 'personal_info',
		component: personal_info,
    meta: {
      title:"个人中心",
    }
	},{
    path: '/write_follow',
    name: 'write_follow',
		component: write_follow,
    meta: {
      title:"写跟进",
    }
	},{
    path: '/staff',
    name: 'staff',
		component: staff,
    meta: {
      title:"",
    }
	},{
    path: '/staff_detail',
    name: 'staff_detail',
		component: staff_detail,
    meta: {
      title:"",
    }
	},{
    path: '/index',
    name: '',
    component: index,
    children: [
      {
        path: '/home',
        name: 'home',
        component: home
      }, {
        path: '/',
        name: 'news',
        component: news,
        meta: {
          title:"消息",
        }
      }, {
        path: '/crm',
        name: 'crm',
        component: crm,
        meta: {
          title:"工作台",
        }
      }, {
        path: '/book',
        name: 'book',
        component: book,
        meta: {
          title:"通讯录",
        }
      }, {
        path: '/mine',
        name: 'mine',
        component: mine,
        meta: {
          title:"我的",
        }
      }
    ]
	},
]

export default new Router({
  base:'/crmdd/',
	mode: 'history',
  routes,
})