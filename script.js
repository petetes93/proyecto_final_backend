



// require("./src/startup/routes")
// require("./src/startup/db")
const baseURL = 'http://localhost:3000/api/users'

const usersContainer = document.getElementById('users')

let usersState = []

async function main() {
	const res = await fetch(baseURL)
	const users = await res.json()
    console.log(users);
    console.log(res);
	usersState = [...users]


	render()
}

main()

function render() {
	usersContainer.innerHTML = ''

	usersState.forEach((user) => {
		usersContainer.innerHTML += 
         ` <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              ${user.username}
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">${user.logros.map(logro => `<p><strong>${logro.juego.title}</strong> ${logro.title}</p>`).join('')}</div>
          </div>`
	})

    
}

