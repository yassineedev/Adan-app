const { createApp, ref } = Vue

  createApp({
    setup() {
        const adan = new Audio('adan.m4a')
        const allData = ref("")
        const city = ref("Agadir")
        const country = ref("Morocco")
        const date = ("today")
        const urlApi = `https://api.aladhan.com/v1/timingsByCity/${date}?city=${city.value}&country=${country.value}`
        const sobh = ref("")
        const chourouq = ref("")
        const dohr = ref("")
        const asr = ref("")
        const maghrib = ref("")
        const ichae = ref("")
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const dateNow = today.toLocaleDateString('en-US', options)
        const formattedTime = ref('');

          const url = urlApi
          axios.get(url)
          .then(function (response) {
              // handle success
              console.log(response.data.data.timings);
              const timings = response.data.data.timings
              allData.value = timings 
              sobh.value = timings.Fajr
              chourouq.value = timings.Sunrise
              dohr.value = timings.Dhuhr
              asr.value = timings.Asr
              maghrib.value = timings.Maghrib
              ichae.value = timings.Isha
              
          })
          .catch(function (error) {
              // handle error
              console.log(error);
          })
          function fetchData() {
            const url = urlApi
            axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data.data.timings);
                const timings = response.data.data.timings
                sobh.value = response.data.data.timings.Fajr
                const subh = response.data.data.timings.Fajr
                chourouq.value = response.data.data.timings.Sunrise
                dohr.value = response.data.data.timings.Dhuhr
                asr.value = response.data.data.timings.Asr
                maghrib.value = response.data.data.timings.Maghrib
                ichae.value = response.data.data.timings.Isha
                console.log(maghrib.value)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
          }
          const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            formattedTime.value = `${hours}:${minutes}:${seconds}`;
               // Array of prayer times to check against
            const prayerTimes = [sobh.value, dohr.value, asr.value, maghrib.value, ichae.value];

            // Check if the current formatted time matches any prayer time
            if (prayerTimes.includes(formattedTime.value)) {
                adan.play(); // Play audio if current time matches any prayer time
            }
          };
            setInterval(updateTime, 1000); // Update time every second
          
      
      return {
        adan,urlApi,city,country,date,sobh,chourouq,dohr,asr,maghrib,ichae,fetchData,dateNow,
        formattedTime,updateTime,allData,
      
      }
    }
  }).mount('#app')