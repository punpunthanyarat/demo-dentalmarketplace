import Vue from 'vue'
import Vuetify from 'vuetify'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/center/Home'
import Appointment from '@/components/center/Home/Appointment'
import NavBar from '@/pages/NavBar'
import CounterCalendar from '@/pages/hospital/CounterCalendar'
import CounterProfile from '@/pages/hospital/CounterProfile'
import RegEmployee from '@/pages/hospital/RegEmployee'
import JobCreate from '@/pages/hospital/JobCreate'
import JobList from '@/pages/hospital/JobList'
import JobSave from '@/pages/hospital/JobSave'
import ReqToEmployee from '@/pages/hospital/ReqToEmployee'
import ManagePermission from '@/pages/hospital/ManagePermission'
import ManageHospital from '@/pages/hospital/ManageHospital'
import ManageService from '@/pages/hospital/ManageService'
import PostponedAppointmentTable from '@/pages/hospital/PostponedAppointmentTable'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/Appointment', component: Appointment },
    {
      path: '/',
      component: NavBar,
      children: [
        { path: '/hello', component: HelloWorld },
        { path: '/calendar_counter', component: CounterCalendar },
        { path: '/calendar_profile/:dentistId', component: CounterProfile },
        { path: '/reg_employee', component: RegEmployee },
        { path: '/job_create', component: JobCreate },
        { path: '/job_list', component: JobList },
        { path: '/job_save/:jobid', component: JobSave },
        { path: '/req_employee', component: ReqToEmployee },
        { path: '/manage_permission', component: ManagePermission },
        { path: '/manage_hospital', component: ManageHospital },
        { path: '/manage_service', component: ManageService },
        { path: '/postponed_appointment_table', component: PostponedAppointmentTable }
      ]
    }
  ]
})

Vue.use(Vuetify, {
  theme: {
    primary: '#27417A'
  }
})
