document.addEventListener('DOMContentLoaded', () => {
    const holidays = [
        { name: "Rachel's Birthday", date: "2025-02-06", theme: "birthday", image: "rachel.png" },
        { name: "Claudia's Birthday", date: "2025-06-06", theme: "birthday", image: "claudia.png" },
        { name: "Mike's Birthday", date: "2025-09-06", theme: "birthday", image: "mike.png" },
        { name: "Halloween", date: "2024-10-31", theme: "halloween", image: "halloween.png" },
        { name: "Thanksgiving", date: "2024-11-28", theme: "thanksgiving", image: "thanksgiving.png" },
        { name: "Christmas", date: "2024-12-25", theme: "christmas", image: "christmas.png" },
        { name: "New Year's Day", date: "2025-01-01", theme: "newyear", image: "newyear.png" }
    ];

    let currentHolidayIndex = 0;
    const daysImages = [
        document.getElementById('daysImage1'),
        document.getElementById('daysImage2'),
        document.getElementById('daysImage3')
    ];
    const holidayImageElement = document.getElementById('holidayImage');
    const prevHolidayButton = document.getElementById('prevHoliday');
    const nextHolidayButton = document.getElementById('nextHoliday');

    function updateCountdown() {
        const selectedHoliday = holidays[currentHolidayIndex];
        let selectedDate = new Date(selectedHoliday.date);
        const now = new Date();

        // Adjust the year if the selected holiday has already passed in the current year
        if (selectedDate < now && selectedDate.getMonth() !== 0) {
            selectedDate.setFullYear(now.getFullYear() + 1);
        } else if (selectedDate < now && selectedDate.getMonth() === 0 && selectedDate.getDate() === 1) {
            selectedDate.setFullYear(now.getFullYear() + 1);
        }

        const diff = selectedDate - now;

        if (diff <= 0) {
            setImages(daysImages, 0, selectedHoliday.theme);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        setImages(daysImages, days, selectedHoliday.theme);
        holidayImageElement.src = `images/holidays/${selectedHoliday.image}`;
    }

    function setImages(imageElements, value, theme) {
        const valueString = value.toString().padStart(3, '0');
        imageElements[0].src = `images/counting-blocks/${theme}/${valueString[0]}.png`;
        imageElements[1].src = `images/counting-blocks/${theme}/${valueString[1]}.png`;
        imageElements[2].src = `images/counting-blocks/${theme}/${valueString[2]}.png`;
    }

    function changeHoliday(direction) {
        if (direction === 'next') {
            currentHolidayIndex = (currentHolidayIndex + 1) % holidays.length;
        } else if (direction === 'prev') {
            currentHolidayIndex = (currentHolidayIndex - 1 + holidays.length) % holidays.length;
        }
        updateCountdown();
    }

    prevHolidayButton.addEventListener('click', () => changeHoliday('prev'));
    nextHolidayButton.addEventListener('click', () => changeHoliday('next'));
    setInterval(updateCountdown, 1000);

    // Initial update
    updateCountdown();
});
