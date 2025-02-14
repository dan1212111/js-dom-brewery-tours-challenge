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
      listOfBreweriesUniq(breweries)
      filterAll(breweries)
      findCities(breweries)
      searchByState()
      const clearEl = document.querySelector("#clear-all-btn")
      clearEl.addEventListener("click", () => {
        setCitiesFalse()
        clearCitiesFilter()
        findCities(breweries)
        render()
        checkAll()
      })
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

  searchEl.addEventListener("keydown", () => {
    let searchF = searchEl.value
    render()
    for (let i = 0; i < listOfBreweries.length; i++) {
      if (
        listOfBreweries[i].name
          .toLowerCase()
          .includes(searchEl.value.toLowerCase())
      ) {
        renderBrewery(listOfBreweries[i])
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

/**** PAGINATION ****/

/****SEARCH BY STATE ****/
function searchByState() {
  const stateEl = document.querySelector("#select-state-form")
  const submittedEl = document.querySelector("#select-state")
  stateEl.addEventListener("submit", function (event) {
    event.preventDefault()
    findState(submittedEl.value.toLowerCase())
  })
}

function findState(brewery) {
  render()
  for (const brew of listOfBreweries) {
    console.log(brew.state)
    if (brew.state.toLowerCase() == brewery) {
      renderBrewery(brew)
    }
  }
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

/*** CITY FILTER  ***/
function findCities(brew) {
  const brewArr = []
  const brewCities = []
  brewArr.push(brew)
  for (const brewCity of brew) {
    brewCities.push(brewCity.city)
  }
  const uniqueCities = [...new Set(brewCities)]
  for (let i = 0; i < uniqueCities.length; i++) {
    renderCitiesList(uniqueCities[i])
  }
}

function renderCitiesList(city) {
  const cityFilterEl = document.querySelector("#filter-by-city-form")
  const input = document.createElement("input")
  input.setAttribute("type", "checkbox")
  input.setAttribute("name", city)
  input.setAttribute("value", city)
  const label = document.createElement("label")
  label.setAttribute("for", city)
  const labelTxt = document.createTextNode(city)
  label.append(labelTxt)

  cityFilterEl.append(input, label)

  input.addEventListener("change", function (event) {
    event.preventDefault()
    filterByCity(city, this.checked)
    checkAll()
  })
}

const listOfBreweriesUniqs = []
function listOfBreweriesUniq (brew) {
  for(const b of brew) {
    listOfBreweriesUniqs.push(b) 
  }
}

function filterByCity(city, value) {
  render()
  console.log(listOfBreweriesUniqs)
  for (const brew of listOfBreweriesUniqs) {
    if (value === true && brew.city == city) {
      brew.value = true
    }
    if (value === false && brew.city == city) {
      brew.value = false
    }
  }
  for (const brewery of listOfBreweriesUniqs) {
    if (brewery.value === true) {
      breweryState(brewery)
    }
  }
}

function checkAll() {
  const result = listOfBreweriesUniqs.find((item) => item.value === true)
  if (result === undefined) {
    for (let i = 0; i < listOfBreweriesUniqs.length; i++) {
      breweryState(listOfBreweriesUniqs[i])
    }
  }
}

function clearCitiesFilter() {
  const cityFilterEl = document.querySelector("#filter-by-city-form")
  cityFilterEl.innerHTML = ""
}

function setCitiesFalse() {
  for (const brew of listOfBreweriesUniqs) {
    brew.value = false
  }
}


// extension 3
