const breweriesList = document.querySelector("#breweries-list")

function init() {
  const url = "https://api.openbrewerydb.org/breweries"
  fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (breweries) {
      for (const brewery of breweries) {
        breweryState(brewery)
      }
    })
}
init()

const listOfBreweries = []

function breweryState(brewery) {
  const state = {
    id: brewery.id,
    name: brewery.name,
    type: brewery.brewery_type,
    street: brewery.street,
    city: brewery.city,
    state: brewery.state,
    postal_code: brewery.postal_code,
    phone: brewery.phone,
    link: brewery.website_url,
  }
  listOfBreweries.push(state)
  for (const brewery of listOfBreweries) {
    renderBrewery(brewery)
  }
}

/*****Top Level Render ******/
function render() {
  clear()

  breweryState()
}

function clear() {
  breweriesList.innerHTML = ""
}

function renderBrewery(brewery) {
  const li = document.createElement("li")
  const h2 = document.createElement("h2")
  h2.innerText = brewery.name
  const div = document.createElement("div")
  div.classList = "type"
  div.innerText = brewery.type
  const addressSection = document.createElement("section")
  addressSection.classList = "address"
  const h3 = document.createElement("h3")
  h3.innerText = "Address"
  const p = document.createElement("p")
  p.innerText = brewery.street
  const p2 = document.createElement("p")
  p2.setAttribute("style", "font-weight:bold;")
  p2.innerText = `${brewery.city}, ${brewery.postal_code}`
  addressSection.append(h3, p, p2)
  const phoneSection = document.createElement("section")
  phoneSection.classList = "phone"
  const h32 = document.createElement("h3")
  h32.innerText = "Phone:"
  const p3 = document.createElement("p")
  p3.innerText = brewery.phone
  phoneSection.append(h32, p3)
  const linkSection = document.createElement("section")
  linkSection.classList = "link"
  const a = document.createElement("a")
  a.href = brewery.link
  a.innerText = "Visit Website"
  linkSection.append(a)

  li.append(h2, div, addressSection, phoneSection, linkSection)
  breweriesList.append(li)
}

/*****FILTER *****/
const filterEl = document.querySelector("#filter-by-type")
filterEl.addEventListener("change", () => {
  if (filterEl.value === "micro") {
    microFilter()
  }
  if (filterEl.value === "regional") {
    regionalFilter()
  }
  if (filterEl.value === "brewpub") {
    brewpubFilter()
  }
})

function microFilter() {
  const microArr = []
  for (let i = 0; i < listOfBreweries.length; i++) {
    if (listOfBreweries[i].type == "micro") {
      microArr.push(listOfBreweries[i])
    }
  }
  render(microArr)
}

function regionalFilter() {
  const regionalArr = []
  for (let i = 0; i < listOfBreweries.length; i++) {
    if (listOfBreweries[i].type == "large") {
      regionalArr.push(listOfBreweries[i])
    }
  }
  render(regionalArr)
}

function brewpubFilter() {
  const brewpubArr = []
  for (let i = 0; i < listOfBreweries.length; i++) {
    if (listOfBreweries[i].type == "brewpub") {
      brewpubArr.push(listOfBreweries[i])
    }
  }
  render(brewpubArr)
}
