import Vue from 'vue'
import Router from 'vue-router'
// import BussinessLayout from '@/views/layouts/bussiness'
import EmployLayout from '@/views/layouts/employ'
import JobLayout from '@/views/layouts/job'
import Campbase from '@/views/job/campbase'
import Jobwanted from '@/views/job/jobwanted'
import Talent from '@/views/employ/talent'
import Jobfair from '@/views/employ/jobfair'

Vue.use(Router)
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/job'
    },
    {
      path: '/job',
      component: JobLayout,
      redirect: '/job/campbase',
      children: [
        { path: 'campbase', component: Campbase },
        { path: 'jobwanted', component: Jobwanted }
      ]
    },
    {
      path: '/employ',
      component: EmployLayout,
      redirect: '/employ/talent',
      children: [
        { path: 'talent', component: Talent },
        { path: 'jobfair', component: Jobfair }
      ]
    }
  ]
})
