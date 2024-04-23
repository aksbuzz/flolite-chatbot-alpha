export const dashboardMapper = {
  coinBalance: (data: any) => {
    return {
      ...data,
      rows: data?.rows?.map((r: any) => ({
        reason: r.reason,
      })),
    };
  },
  annoucements: (data: any) => {
    const rows = data?.data?.rows;
    return rows?.map((r: any) => ({
      content: r.content,
      title: r.title,
    }));
  },
  upcomingEvents: (data: any) => {
    const result: any[] = [];

    for (const month in data) {
      const days = data?.[month];

      for (const day in days) {
        const employees = days[day];
        employees.forEach((employee: any) => {
          const { first_name, last_name, date_of_birth, work_anniversary } = employee;
          result.push({
            name: `${first_name} ${last_name}`,
            date_of_birth,
            work_anniversary,
          });
        });
      }
    }

    return result;
  },
  tasks: (data: any) => {
    return data?.map((t: any) => ({
      heading: t.heading,
      type: t.type,
      due_date: t.due_date,
    }));
  },
};
