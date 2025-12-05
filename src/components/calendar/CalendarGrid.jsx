import CalendarDay from "./CalendarDay";

/**
 * CalendarGrid
 *
 * Semantic month calendar:
 * - <section> defines a standalone interactive unit
 * - <header> contains the month title
 * - <ul> + <li> used for calendar structure, improving accessibility
 * - Each date cell rendered by <CalendarDay />
 */

export default function CalendarGrid({weatherData, selectedDay, setSelectedDay}) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // First and last day of current month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const days = [];

    // Push all days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push(new Date(currentYear, currentMonth, i));
    }

    // If today is near month end → add next month's days so 14-day weather fits inside
    const daysRemainingInMonth = lastDay.getDate() - today.getDate();

    if (daysRemainingInMonth < 14) {
        const nextMonthExtraDays = 14 - daysRemainingInMonth;

        for (let i = 1; i <= nextMonthExtraDays; i++) {
            days.push(new Date(currentYear, currentMonth + 1, i));
        }
    }

    // Compute empty slots before the 1st of current month
    const leadingEmptySlots = Array(firstDay.getDay()).fill(null);

    return (
        <section aria-labelledby="calendar-title" className="w-full" role="grid">
            <header className="text-center mb-4">
                <h3 id="calendar-title" className="text-xl font-semibold">
                    {today.toLocaleString("default", {month: "long"})} {currentYear}
                </h3>
            </header>

            <ul className="grid grid-cols-7 gap-2" role="rowgroup">
                {leadingEmptySlots.map((_, i) => (
                    <li key={`empty-${i}`} role="presentation"></li>
                ))}

                {days.map((day) => (
                    <li key={day.toISOString()} role="gridcell">
                        <CalendarDay
                            day={day}
                            today={today}
                            weatherData={weatherData}
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}
