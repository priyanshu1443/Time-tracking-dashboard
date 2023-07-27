const nav_items = document.getElementsByClassName('nav_items');
const nav_select = document.getElementsByClassName('nav_select');
const timec = document.getElementsByClassName(' timec');
const timel = document.getElementsByClassName('timel');

var data;
var i = 0;
var active = 1;

const update_data = (d1, d2, d3) => {
  timec[i].innerHTML = d1;
  nav_select[i].innerHTML = d2;
  timel[i].innerHTML = d3;
  i++;
  if (i === 6) i = 0;
}

const fetchdata = async () => {
  const res = await fetch("./data.json")
  data = await res.json();
  data.map((d) => {
    update_data(`${d.timeframes.weekly.current}hrs`, "week", d.timeframes.weekly.previous)
  })
}

window.addEventListener('load', () => fetchdata())

const change_class = (v) => {
  nav_items[active].classList.remove('active');
  nav_items[v].classList.add('active');
  active = v;
}

nav_items[0].addEventListener('click', () => {
  data.map((d) => {
    update_data(`${d.timeframes.daily.current}hrs`, "day", d.timeframes.daily.previous)
  })
  change_class(0)
})
nav_items[1].addEventListener('click', () => {
  data.map((d) => {
    update_data(`${d.timeframes.weekly.current}hrs`, "week", d.timeframes.weekly.previous)
  })
  change_class(1)
})
nav_items[2].addEventListener('click', () => {
  data.map((d) => {
    update_data(`${d.timeframes.monthly.current}hrs`, "month", d.timeframes.monthly.previous)
  })
  change_class(2)
})
