export const getMonthDayList = (year: number, month: number, week?: number) => {
    const dayList = [];
    const lastday = new Date(year, month, 0).getDate();
    const weekday = new Date(year, month - 1).getDay();

    const beforeMonth = month - 1 < 0 ? 12 : month - 1;
    const beforeYear = beforeMonth === 12 ? year - 1 : year;

    const beforeLastday = new Date(beforeYear, beforeMonth, 0).getDate();

    for (let i = weekday; i > 0; i--) {
        dayList.push((beforeLastday - i + 1).toString());
    }
    for (let i = 1; i <= lastday; i++) {
        dayList.push(i.toString());
    }
    for (let i = 1; dayList.length % 7 !== 0; i++) {
        dayList.push(i.toString());
    }
    return dayList;
};

export const getWeekDayList = (date: Date) => {
    const newDate = new Date(date);
    const dayOfWeek = newDate.getDay();
    const diff = newDate.getDate() - dayOfWeek + 1;
    const monday = new Date(newDate.setDate(diff));
    const sunday = new Date(newDate.setDate(monday.getDate() - 1));
    const weeks = [sunday.getDate().toString(), monday.getDate().toString()];

    for (let i = 1; i < 6; i++) {
        const nextDay = new Date(monday);
        nextDay.setDate(monday.getDate() + i);
        weeks.push(nextDay.getDate().toString());
    }
    return weeks;
};

export const getWeekOfMonth = (date: Date) => {
    const inputDate = new Date(date);

    // 인풋의 년, 월
    let year = inputDate.getFullYear();
    let month = inputDate.getMonth() + 1;

    // 목요일 기준 주차 구하기
    const getWeek = (paramDate: Date) => {
        const year = paramDate.getFullYear();
        const month = paramDate.getMonth();
        const date = paramDate.getDate();

        // 인풋한 달의 첫 날과 마지막 날의 요일
        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDate.getDay();
        const lastDayOfweek = lastDate.getDay();

        // 인풋한 달의 마지막 일
        const lastDay = lastDate.getDate();

        // 첫 날의 요일이 목, 금, 토요일 이라면 true
        const firstWeekCheck = firstDayOfWeek === 4 || firstDayOfWeek === 5 || firstDayOfWeek === 6;
        // 마지막 날의 요일이 일, 월, 화라면 true
        const lastWeekCheck = lastDayOfweek === 0 || lastDayOfweek === 1 || lastDayOfweek === 2;

        // 해당 달이 총 몇주까지 있는지
        const lastWeek = Math.ceil((firstDayOfWeek + lastDay) / 7);

        // 날짜 기준으로 몇주차 인지
        let week = Math.ceil((firstDayOfWeek + date) / 7);

        // 인풋한 날짜가 첫 주에 있고 첫 날이 목, 금, 토로 시작한다면 'prev'(전달 마지막 주)
        if (week === 1 && firstWeekCheck) week = -1;
        // 인풋한 날짜가 마지막 주에 있고 마지막 날이 일, 월, 화로 끝난다면 'next'(다음달 첫 주)
        else if (week === lastWeek && lastWeekCheck) week = 99;
        // 인풋한 날짜의 첫 주는 아니지만 첫날이 일, 월, 화로 시작하면 -1;
        else if (firstWeekCheck) week = week - 1;

        return week;
    };

    // 목요일 기준의 주차
    let week = getWeek(inputDate);

    // 이전달의 마지막 주차일 떄
    if (week === -1) {
        // 이전 달의 마지막날
        const afterDate = new Date(year, month - 1, 0);
        year = month === 1 ? year - 1 : year;
        month = month === 1 ? 12 : month - 1;
        week = getWeek(afterDate);
    }
    // 다음달의 첫 주차일 때
    if (week === 99) {
        year = month === 12 ? year + 1 : year;
        month = month === 12 ? 1 : month + 1;
        week = 1;
    }

    return { year, month, week };
};
