import request from '../../util/request';
import { dashboardMapper } from './mapper';

export async function getCoinBalance() {
  const response = await request.get(`/wallet/transactions?limit=10&skip=0`);
  return dashboardMapper.coinBalance(response?.data);
}

export async function getAnnouncements() {
  const response = await request.get(`/my-profile/get/announcements?type=published`);
  return dashboardMapper.annoucements(response?.data);
}

export async function getUpcomingEvents() {
  const birthdays = await getUpcomingHolidays();
  const holidays = await getUpcomingBirthdays();
  const workAnniversaries = await getUpcomingWorkAnniversaries();

  return { birthdays, holidays, workAnniversaries };
}

async function getUpcomingHolidays() {
  const response = await request.get(`/my-profile/upcoming-events/holidays`);
  return dashboardMapper.upcomingEvents(response?.data);
}

async function getUpcomingBirthdays() {
  const response = await request.get(`/my-profile/upcoming-events/anniversary_list`);
  return dashboardMapper.upcomingEvents(response?.data);
}

async function getUpcomingWorkAnniversaries() {
  const response = await request.get(`/my-profile/upcoming-events/birthday_list`);
  return dashboardMapper.upcomingEvents(response?.data);
}

export async function getPendingTasks() {
  const response = await request.get(`/my-profile/pending/tasks`);
  return dashboardMapper.tasks(response?.data);
}
