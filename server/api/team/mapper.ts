export const teamMapper = {
  list(data: any) {
    return data?.rows?.map((employee: any) => ({
      date_of_birth: employee?.date_of_birth,
      email: employee?.email,
      name: `${employee?.first_name} ${employee?.last_name}`,
      location: employee?.location,
      manager_name: employee?.manager_name,
      is_under_pip: employee?.is_under_pip,
      user_type: employee?.user_type,
      work_anniversary: employee?.work_anniversary,
    }));
  },
};
