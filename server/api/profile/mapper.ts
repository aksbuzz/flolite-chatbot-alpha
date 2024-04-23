export const profileMapper = {
  profile: (data: any) => {
    return {
      ...data,
      custom_fields: [],
      profile_pic_url: "",
      report_to: {
        name: `${data.report_to.first_name} ${data.report_to.last_name}`,
      },
      reportees: data?.reportees?.map((r: any) => ({
        employee_name: r.employee_name
      })),
      responsibilites: {},
    }
  }
}