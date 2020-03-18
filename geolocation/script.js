const arrow = document.querySelector('.arrow');
const city = document.querySelector('.city');

const apiToken = 'e18ea0236789ca';

navigator.geolocation.watchPosition(async userData => {
  console.log(userData);
  const { latitude, longitude, heading } = userData.coords;
  const { data } = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${apiToken}&lat=${latitude}&lon=${longitude}&format=json`);
  const { town, state, country } = data.address;
  city.textContent = `${town}, ${state} - ${country}`;

  if(heading) {
    arrow.style.transform = `rotate(${heading}deg)`;
  }
}, (err) => {
  console.log(err);
  city.textContent = 'You get allow geolocation!';
});
