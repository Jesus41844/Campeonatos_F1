const yearInput = document.getElementById('year')
const loadBtn = document.getElementById('loadBtn')
const result = document.getElementById('result')

const currentYear = new Date().getFullYear()
yearInput.max = currentYear

loadBtn.addEventListener('click', loadData)

async function loadData() {
  const year = yearInput.value

  if (!year) {
    result.innerHTML = 'Escribe un año válido'
    return
  }

  const url = `https://api.jolpi.ca/ergast/f1/${year}/driverStandings.json`
  result.innerHTML = ' '

  try {
    const response = await fetch(url)
    const data = await response.json()

    const list = data.MRData.StandingsTable.StandingsLists

    if (list.length === 0) {
      result.innerHTML = 'No hay datos para ese año'
      return
    }

    const standings = list[0].DriverStandings

    result.innerHTML = standings
      .map(
        (d) => `
        <div class="card">
          <span class="position">${d.position}</span>
          <span class="name">
            ${d.Driver.givenName} ${d.Driver.familyName}
          </span>
          <span class="points">${d.points} pts</span>
        </div>
      `,
      )
      .join('')
  } catch (error) {
    console.error(error)
    result.innerHTML = 'Error al cargar datos'
  }
}
