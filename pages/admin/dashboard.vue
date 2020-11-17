<template>
  <div class="flex-container justify-center flex flex-wrap bg-polka">
    <DashboardCard title="Activity" link="/admin/stats">
      <trending-up-icon size="8x" class="block mx-auto" />
    </DashboardCard>
    <DashboardCard title="Reports" link="/admin/reports">
      <alert-octagon-icon size="8x" class="block mx-auto" />
    </DashboardCard>
    <DashboardCard title="Users" link="/admin/users">
      <user-icon size="8x" class="block mx-auto" />
    </DashboardCard>
    <DashboardCard title="Locations" link="/admin/locations">
      <map-icon size="8x" class="block mx-auto" />
    </DashboardCard>
    <DashboardCard title="Referrals" link="/admin/referrals">
      <navigation-icon size="8x" class="block mx-auto" />
    </DashboardCard>
  </div>
</template>

<script>
import { TrendingUpIcon, AlertOctagonIcon, UserIcon, MapIcon, NavigationIcon } from 'vue-feather-icons'
import DashboardCard from '~/components/Widgets/Admin/DashboardCard'
export default {
  middleware: 'isadmin',
  components: {
    DashboardCard,
    TrendingUpIcon,
    AlertOctagonIcon,
    UserIcon,
    MapIcon,
    NavigationIcon
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
