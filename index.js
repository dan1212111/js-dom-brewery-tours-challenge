const breweriesList = document.querySelector("#breweries-list")

function init() {
  const url = "https://api.openbrewerydb.org/breweries"
  fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (breweries) {
      const filterEl = document.querySelector("#filter-by-type")
      filterEl.addEventListener("change", () => {
        if (filterEl.value === "micro") {
          render()
          microFilter(breweries)
        }
        if (filterEl.value === "regional") {
          render()
          regionalFilter(breweries)
        }
        if (filterEl.value === "brewpub") {
          render()
          brewpublFilter(breweries)
        }
        if (filterEl.value === "") {
          render()
          filterAll(breweries)
        }
      })
      filterAll(breweries)
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
  renderBrewery(state)
  const searchEl = document.querySelector("#search-breweries")

  searchEl.addEventListener("keyup", () => {
    let searchF = searchEl.value
    for (let i = 0; i < listOfBreweries.length; i++) {
      if (listOfBreweries[i].name.indexOf(searchF) == -1) {
        listOfBreweries.splice(i, 1)
        render()
        for (let i = 0; i < listOfBreweries.length; i++) {
          renderBrewery(listOfBreweries[i])
        }
      }
    }
  })
}

/*****Top Level Render ******/
function render() {
  clear()
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
function microFilter(brewery) {
  for (const microB of brewery) {
    if (microB.brewery_type == "micro") {
      breweryState(microB)
    }
  }
}

function regionalFilter(brewery) {
  for (const microB of brewery) {
    if (microB.brewery_type == "large") {
      breweryState(microB)
    }
  }
}

function brewpublFilter(brewery) {
  for (const microB of brewery) {
    if (microB.brewery_type == "brewpub") {
      breweryState(microB)
    }
  }
}

function filterAll(brewery) {
  for (const microB of brewery) {
    if (
      microB.brewery_type == "brewpub" ||
      microB.brewery_type == "large" ||
      microB.brewery_type == "micro"
    ) {
      breweryState(microB)
    }
  }
}
