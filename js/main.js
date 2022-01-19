document
  .getElementsByClassName("mobile-hamburger")[0]
  .addEventListener("click", function () {
    document
      .getElementsByClassName("open-menu-holder")[0]
      .classList.toggle("open");
  });

document
  .getElementsByClassName("mobile-close")[0]
  .addEventListener("click", function () {
    document
      .getElementsByClassName("open-menu-holder")[0]
      .classList.toggle("open");
  });
// AJAX
const createAppointment = (appointment) => {
  //12. Tworzymy funkcje która jako parametr przyjmuje obiekt z naszymi danymi z forma i sprawdzamy za pomoca loga
  console.log(appointment);
  const appointmentMessage = document.querySelector(".appointment-message");

  fetch("https://akademia108.pl/api/ajax/post-appointment.php", {
    //13. funkcja fetch z linkiem do api i parametrem konfiguracyjnym ?? to z dokumentacji ??
    headers: {
      // dane w zwrotce w formacie js
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "POST",
    body: JSON.stringify(appointment), // 14. dane z appointment przerobione na stringa
  })
    .then((res) => res.json()) // 15. Odpowiedź zwrotna która jest tłumaczona na jsona
    .then((resJSON) => {
      //16. Ta odpowiedź zostaje wyświetlnona zxa pomocą loga
      // console.log(resJSON);
      appointmentMessage.classList.add("send"); // 17. po przyjściu odpowiedzi dodajemy klase p na btn pod formem i dodajemy tekst do p w `text`
      appointmentMessage.innerText = `Dziękujemy ${resJSON.appointment.name}. Zostałeś zapisany!`;
    });
};

//  Sprawdzenie czy wszystkie inputy sa wypełnione
document
  .getElementById("appointment-form") // 1. Pobieramy formularz
  .addEventListener("submit", function (e) {
    // 2. Nastawiamy słuchanie na zdarzenie submit i funkce zwrotna
    // e - to zdarzenie które zostanie wywołane po submicie
    // console.log(e);
    e.preventDefault(); // 3. Wyłączamy odświeżanie strony

    const appointmentMessage = document.querySelector(".appointment-message"); //4. Pobieramy appointmentMessage tak aby móc w nim wyświetlić informacje
    let formFields = document.getElementsByClassName("form-field"); // 5. Pobieramy form-field aby sprawdzić czy ich value nie jest pusty
    let allFields = false; // 6. flaga ?? sprawdzenie
    let appointment = {
      //pobranie danych z forma do AJAXa
      name: document.getElementById("appointment-name").value,
      email: document.getElementById("appointment-email").value,
      service: document.getElementById("appointment-service").value,
      phone: document.getElementById("appointment-phone").value,
      date: document.getElementById("appointment-date").value,
      time: document.getElementById("appointment-time").value,
      message: document.getElementById("appointment-message").value,
    };

    for (let i = 0; i < formFields.length; i++) {
      //7. iteracja po inputach / form-fieldach
      if (formFields[i].value === "") {
        //8. jeżeli dany input jest pusty to dodaj klasę error
        allFields = false;
        formFields[i].classList.add("error");
      } else {
        // 9. W przeciwnym wypadku usuń klasę error
        allFields = true;
        formFields[i].classList.remove("error");
      }
    }

    if (allFields) {
      //10. if wykonuje się jeśli jest true i nie trzeba tego zapisywać
      //początkowo sprawdzamy logiem czy działa w późniejsze fazie za pomocą stałej w Ajaxie dodamy tekst potwierdzający wysłanie
      createAppointment(appointment);
    } else {
      // 11. W przeciwnym wypadku dodajemy klasę error do p pod btn i dodajemy tekst
      appointmentMessage.classList.add("error");
      appointmentMessage.innerText = `Wypełnij wymagane pola`;
    }
  });
