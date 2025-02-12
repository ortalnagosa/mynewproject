const searchCity = async () => {
    const searchInput = document.getElementById('search-input');
    const cityName = searchInput.value.trim(); 

    if (!cityName) { 
        alert("נא להזין שם עיר");
        return;
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`);
        const data = await response.json();

        if (data.length === 0) {
            alert("עיר לא נמצאה");
            return;
        }

        let bestMatch = data.find(item => item.type === "city" || item.type === "town") || data[0];

        const { lat, lon, display_name } = bestMatch;

        const timezoneRes = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=TF3ISO4TNVPA&format=json&by=position&lat=${lat}&lng=${lon}`);
        const timezoneData = await timezoneRes.json();
        const cityTimeZone = timezoneData.zoneName; 

        const keywords = [ "sea", "beautiful","black", "views", "trees", "sunset", "mountains", "nature", "skyline","partys"];

        const randomKeywords = keywords.sort(() => 0.5 - Math.random()).slice(0, 4).join(" ");

        const searchQuery = `${cityName} ${randomKeywords}`;

              const imageRes = await fetch(`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1`, {
                headers: {
                    Authorization: "mecIXxJ55ls9Kt7N5OnXTothGSzlQ5rWIsSNxkQCeei8JW5myJfXDOxV"  
                }
            });
            const imageData = await imageRes.json();
            const imageUrl = imageData.photos[0]?.src.medium || ''; 
    

        displayCityTime(display_name, cityTimeZone, imageUrl);
    } catch (error) {
        console.error('שגיאה בחיפוש העיר:', error);
        alert("שגיאה בעת חיפוש העיר");
    }
};


let timeInterval; 

const displayCityTime = (cityName, timeZone, imageUrl) => {
    const cityContainer = document.getElementById('search-result');

    cityContainer.innerHTML = `
        <div class="newCountry" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center; padding: 20px; ">
            <h3>${cityName.split(',')[0]}</h3> 
            <h2 id="city-time"></h2>
        </div>
    `;

    const updateTime = () => {
        const time = new Intl.DateTimeFormat('he-IL', {
            timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(new Date());
    
        document.getElementById('city-time').textContent = time;
    };

    if (timeInterval) {
        clearInterval(timeInterval);
    }

    timeInterval = setInterval(updateTime, 1000);
    updateTime();
};


document.getElementById('search-button').addEventListener('click', searchCity);
